import { addDays, format, getDay } from 'date-fns';

/**
 * Turns a short utterance or typed command into a structured action.
 * Pure and dependency-free so it runs on-device: nothing is sent anywhere.
 *
 *   "add task: finish LOS 12 tomorrow high priority"
 *   "log expense 340 dining"          "spent 340 on coffee"
 *   "received 5000 salary"            "did my workout"
 */
export type ParsedCommand =
  | { kind: 'task'; title: string; priority?: 'High' | 'Medium' | 'Low'; deadline?: string }
  | { kind: 'expense' | 'income'; amount: number; category: string; description: string }
  | { kind: 'workout'; note: string };

export interface ParseOptions {
  /** The user's own finance categories; matched before the built-in keywords. */
  categories?: string[];
  now?: Date;
}

// Keyword → built-in category (names line up with DEFAULT_FINANCE_CATEGORIES)
const CATEGORY_KEYWORDS: Array<[string, RegExp]> = [
  ['Food', /\b(food|dining|dine|restaurant|cafe|coffee|tea|lunch|dinner|breakfast|snack|snacks|groceries|grocery|swiggy|zomato|pizza|burger|biryani|meal|chai)\b/],
  ['Transport', /\b(uber|ola|rapido|cab|taxi|auto|metro|bus|train|fuel|petrol|diesel|parking|toll|transport)\b/],
  ['Education', /\b(book|books|course|courses|tuition|cfa|exam|study|udemy|coursera|education)\b/],
  ['Health', /\b(medicine|medicines|doctor|pharmacy|gym|hospital|health|supplement|supplements|protein)\b/],
  ['Housing', /\b(rent|electricity|wifi|internet|maintenance|water bill|gas|housing)\b/],
  ['Entertainment', /\b(netflix|spotify|prime|hotstar|movie|movies|game|games|subscription|subscriptions|concert|entertainment)\b/],
  ['Shopping', /\b(amazon|flipkart|myntra|clothes|clothing|shoes|shopping|electronics|gadget)\b/],
  ['Travel', /\b(flight|flights|hotel|trip|travel|airbnb|train ticket|vacation)\b/],
  ['Finance', /\b(emi|loan|bank fee|insurance|investment|sip)\b/],
  ['Personal', /\b(gift|donation|salon|haircut|personal)\b/],
];
const INCOME_KEYWORDS: Array<[string, RegExp]> = [
  ['Salary', /\b(salary|stipend|pay ?check|payroll)\b/],
  ['Freelance', /\b(freelance|consulting|client|tutoring)\b/],
  ['Investment', /\b(dividend|interest|capital gain|investment)\b/],
  ['Reimbursement', /\b(reimbursement|refund)\b/],
];

const AMOUNT = String.raw`(?:rs\.?|₹|inr|rupees)?\s*(\d[\d,]*(?:\.\d+)?)\s*(k|thousand|lakh|lakhs|lac)?`;

function toAmount(num: string, unit?: string): number {
  let n = parseFloat(num.replace(/,/g, ''));
  const u = unit?.toLowerCase();
  if (u === 'k' || u === 'thousand') n *= 1_000;
  else if (u === 'lakh' || u === 'lakhs' || u === 'lac') n *= 100_000;
  return Math.round(n * 100) / 100;
}

const cap = (s: string) => s.trim().replace(/^\w/, (c) => c.toUpperCase());
const clean = (s: string) =>
  s.replace(/\b(rupees|rs\.?|inr)\b/gi, '').replace(/[₹]/g, '').replace(/\s+/g, ' ').replace(/^[\s:,\-–]+|[\s:,.\-–]+$/g, '');

const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function extractDeadline(text: string, now: Date): { rest: string; deadline?: string } {
  let rest = text;
  let deadline: string | undefined;

  const rel = rest.match(/\b(?:due|by|on|for)?\s*(today|tonight|tomorrow|tmrw)\b/i);
  if (rel) {
    deadline = format(/^(today|tonight)$/i.test(rel[1]) ? now : addDays(now, 1), 'yyyy-MM-dd');
    rest = rest.replace(rel[0], ' ');
  } else {
    const wd = rest.match(new RegExp(`\\b(?:due|by|on|next)?\\s*(${WEEKDAYS.join('|')})\\b`, 'i'));
    if (wd) {
      const target = WEEKDAYS.indexOf(wd[1].toLowerCase());
      const diff = (target - getDay(now) + 7) % 7 || 7;
      deadline = format(addDays(now, diff), 'yyyy-MM-dd');
      rest = rest.replace(wd[0], ' ');
    }
  }
  return { rest, deadline };
}

function extractPriority(text: string): { rest: string; priority?: 'High' | 'Medium' | 'Low' } {
  const high = /\b(high priority|urgent(?:ly)?|important|asap|critical)\b/i;
  const low = /\b(low priority|whenever|someday)\b/i;
  const med = /\b(medium priority|normal priority)\b/i;
  if (high.test(text)) return { rest: text.replace(high, ' '), priority: 'High' };
  if (low.test(text)) return { rest: text.replace(low, ' '), priority: 'Low' };
  if (med.test(text)) return { rest: text.replace(med, ' '), priority: 'Medium' };
  return { rest: text };
}

function pickCategory(text: string, type: 'expense' | 'income', custom: string[] = []): { category: string; matched?: string } {
  const lower = text.toLowerCase();
  // 1) the user's own categories win ("dining" → their "Dining" budget)
  for (const c of custom) {
    const name = c.toLowerCase().replace(/s$/, ''); // stem, so "subscription" matches "Subscriptions"
    if (name.length > 2 && new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?\\b`).test(lower)) {
      return { category: c, matched: name };
    }
  }
  // 2) built-in keywords
  for (const [category, re] of type === 'income' ? INCOME_KEYWORDS : CATEGORY_KEYWORDS) {
    const m = lower.match(re);
    if (m) {
      const exact = custom.find((c) => c.toLowerCase() === category.toLowerCase());
      return { category: exact ?? category };
    }
  }
  return { category: 'Other' };
}

export function parseQuickCommand(input: string, opts: ParseOptions = {}): ParsedCommand | null {
  const now = opts.now ?? new Date();
  const text = input.trim().replace(/^(?:hey |ok |okay )?apex[,:]?\s*/i, '').replace(/[.!?]+$/, '');
  if (text.length < 3) return null;

  // ── Money ───────────────────────────────────────────────────────────────
  const incomeRe = new RegExp(String.raw`^(?:log|add|record)?\s*(?:an?\s+)?income\s*[:\-]?\s*(?:of\s+)?${AMOUNT}\s*(.*)$`, 'i');
  const receivedRe = new RegExp(String.raw`^(?:i\s+)?(?:received|earned|got|credited)\s+${AMOUNT}\s*(?:from|for|as|of)?\s*(.*)$`, 'i');
  const expenseRe = new RegExp(String.raw`^(?:log|add|record)?\s*(?:an?\s+)?expense\s*[:\-]?\s*(?:of\s+)?${AMOUNT}\s*(?:on|for|at|to)?\s*(.*)$`, 'i');
  const spentRe = new RegExp(String.raw`^(?:i\s+)?(?:spent|paid|bought|purchased|gave)\s+${AMOUNT}\s*(?:on|for|at|to)?\s*(.*)$`, 'i');

  // Item before amount: "bought groceries for 850"
  const itemFirstRe = new RegExp(String.raw`^(?:i\s+)?(?:bought|purchased|ordered|paid for|spent on)\s+(.+?)\s+(?:for|at|worth)\s+${AMOUNT}\s*(?:rupees|rs|inr)?$`, 'i');
  const itemFirst = text.match(itemFirstRe);
  if (itemFirst) {
    const amount = toAmount(itemFirst[2], itemFirst[3]);
    if (amount > 0) {
      const rest = clean(itemFirst[1]);
      const { category } = pickCategory(rest, 'expense', opts.categories);
      return { kind: 'expense', amount, category, description: cap(rest) };
    }
  }

  for (const [re, kind] of [[incomeRe, 'income'], [receivedRe, 'income'], [expenseRe, 'expense'], [spentRe, 'expense']] as const) {
    const m = text.match(re);
    if (m) {
      const amount = toAmount(m[1], m[2]);
      if (!amount || amount <= 0) return null;
      const rest = clean(m[3] ?? '');
      const { category, matched } = pickCategory(rest, kind, opts.categories);
      let description = rest;
      if (matched) description = clean(rest.replace(new RegExp(`\\b${matched}s?\\b`, 'i'), ''));
      description = description.replace(/^(on|for|at|to|from)\s+/i, '');
      return { kind, amount, category, description: cap(description || category) };
    }
  }

  // ── Task ────────────────────────────────────────────────────────────────
  const taskRe = /^(?:(?:add|create|new|make)\s+(?:an?\s+)?)?(?:task|todo|to-do|reminder)\s*[:\-]?\s*(.+)$/i;
  const remindRe = /^(?:remind me to|i need to|i have to|i must|don'?t forget to)\s+(.+)$/i;
  const tm = text.match(taskRe) ?? text.match(remindRe);
  if (tm) {
    const { rest: r1, priority } = extractPriority(tm[1]);
    const { rest: r2, deadline } = extractDeadline(r1, now);
    const title = clean(r2);
    if (title.length < 2) return null;
    return { kind: 'task', title: cap(title), priority, deadline };
  }

  // ── Workout ─────────────────────────────────────────────────────────────
  if (
    /^(?:log|add|record)\s+(?:a\s+|my\s+)?(?:workout|gym|training|exercise|session)\b/i.test(text) ||
    /\b(?:did|done|finished|completed|hit|smashed|crushed)\s+(?:my\s+|a\s+|the\s+)?(?:workout|gym|leg day|push day|pull day|chest day|back day|training)\b/i.test(text) ||
    /^(?:worked out|went to (?:the )?gym)\b/i.test(text)
  ) {
    return { kind: 'workout', note: cap(text) };
  }

  return null;
}

export function describeParsed(p: ParsedCommand): { title: string; detail: string } {
  switch (p.kind) {
    case 'task':
      return {
        title: p.title,
        detail: ['Task', p.priority && `${p.priority} priority`, p.deadline && `due ${p.deadline}`].filter(Boolean).join(' · '),
      };
    case 'expense':
      return { title: `−₹${p.amount.toLocaleString('en-IN')} · ${p.description}`, detail: `Expense · ${p.category}` };
    case 'income':
      return { title: `+₹${p.amount.toLocaleString('en-IN')} · ${p.description}`, detail: `Income · ${p.category}` };
    case 'workout':
      return { title: 'Workout completed', detail: 'Marks today’s workout as done' };
  }
}
