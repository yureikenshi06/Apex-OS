/**
 * DEV-ONLY visual preview harness.
 *
 * `npm run dev` then open  /?preview=1  to render the whole app against an
 * in-memory fake of the Supabase REST API — realistic data, real hooks, no
 * login. Everything that imports this file sits behind `import.meta.env.DEV`,
 * so it is compiled out of production builds.
 */
import { addDays, format, subDays } from 'date-fns';

type Row = Record<string, any>;

const today = new Date();
const d = (offset: number) => format(addDays(today, offset), 'yyyy-MM-dd');
const OWNER = 'preview-user';
let seq = 1000;
const id = () => `p-${seq++}`;

const ymd = format(today, 'yyyy-MM-dd');
const monthStart = format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd');
const inMonth = (offset: number) => {
  const day = format(addDays(today, offset), 'yyyy-MM-dd');
  return day < monthStart ? monthStart : day;
};

const hh = (h: number, m = 0) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
const nowH = today.getHours();

const habit = (date: string, over: Row = {}): Row => ({
  id: id(), owner_id: OWNER, date,
  workout_completed: true, steps_completed: true, calories_within_target: true, protein_target_hit: true,
  water_target_hit: true, sleep_target_hit: true, fruits_veg_consumed: true, no_junk_food: false, mobility_stretching: true,
  ...over,
});

const tables: Record<string, Row[]> = {
  tasks: [
    { id: id(), owner_id: OWNER, title: 'Finish reading LOS 12 — Fixed Income', category: 'CFA', priority: 'High', status: 'To Do', deadline: ymd },
    { id: id(), owner_id: OWNER, title: 'Submit placement form', category: 'Placement', priority: 'High', status: 'To Do', deadline: d(-2) },
    { id: id(), owner_id: OWNER, title: 'Reconcile HDFC statement', category: 'Finance', priority: 'Medium', status: 'To Do', deadline: d(2) },
    { id: id(), owner_id: OWNER, title: 'Update LinkedIn headline', category: 'Personal', priority: 'Low', status: 'In Progress', deadline: d(5) },
    { id: id(), owner_id: OWNER, title: 'Log breakfast macros', category: 'Fitness', priority: 'Low', status: 'Done', deadline: ymd },
  ],
  budgets: [
    { id: id(), owner_id: OWNER, category: 'Dining', monthly_budget: 20000 },
    { id: id(), owner_id: OWNER, category: 'Rent', monthly_budget: 14000 },
    { id: id(), owner_id: OWNER, category: 'Shopping', monthly_budget: 10000 },
    { id: id(), owner_id: OWNER, category: 'Transport', monthly_budget: 8000 },
    { id: id(), owner_id: OWNER, category: 'Subscriptions', monthly_budget: 3000 },
  ],
  transactions: [
    { id: id(), owner_id: OWNER, date: ymd, transaction_type: 'Expense', category: 'Dining', description: 'Blue Tokai Coffee', amount: 340, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: ymd, transaction_type: 'Expense', category: 'Transport', description: 'Uber', amount: 210, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: inMonth(-1), transaction_type: 'Income', category: 'Salary', description: 'Salary — TrueAlpha', amount: 185000, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: inMonth(-1), transaction_type: 'Expense', category: 'Subscriptions', description: 'Netflix', amount: 649, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: inMonth(-2), transaction_type: 'Expense', category: 'Dining', description: 'Restaurants & delivery', amount: 18460, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: inMonth(-3), transaction_type: 'Expense', category: 'Transport', description: 'Metro & fuel', amount: 3070, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: inMonth(-3), transaction_type: 'Expense', category: 'Subscriptions', description: 'Spotify + iCloud', amount: 1091, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: inMonth(-4), transaction_type: 'Expense', category: 'Rent', description: 'Monthly rent', amount: 14000, status: 'Completed' },
    { id: id(), owner_id: OWNER, date: inMonth(-4), transaction_type: 'Expense', category: 'Shopping', description: 'Amazon', amount: 4360, status: 'Completed' },
  ],
  // 12-day workout run that today hasn't extended yet → an "at risk" streak
  fitness_habit_daily: [
    habit(ymd, { workout_completed: false, no_junk_food: false }),
    ...Array.from({ length: 12 }, (_, i) => habit(d(-(i + 1)))),
  ],
  habit_tracker_daily: Array.from({ length: 12 }, (_, i) => ({
    id: id(), owner_id: OWNER, date: d(-(i + 1)), gym: true, cfa_hours: i < 8 ? 2 + (i % 3) * 0.5 : 0, reading_min: 20,
  })),
  cfa_topics: Array.from({ length: 58 }, (_, i) => ({
    id: id(), owner_id: OWNER, module: 'Quant', chapter_topic: `LOS ${i + 1}`, priority: i === 43 ? 'High' : 'Medium',
    status: i < 42 ? 'Completed' : 'Not Started', completed: i < 42, revision_status: 'Not Started', row_type: 'LOS', planned_hours: 1.5,
  })),
  daily_planner_entries: [
    { id: id(), owner_id: OWNER, date: ymd, planned_activity: 'Gym — Push day', start_time: hh(6, 30), end_time: hh(7, 30), category: 'Fitness', priority: 'P1', completion_status: 'Completed' },
    { id: id(), owner_id: OWNER, date: ymd, planned_activity: 'Deep Work — CFA Quant', start_time: hh(Math.max(0, nowH - 1), 0), end_time: hh(Math.min(23, nowH + 1), 30), category: 'CFA', priority: 'P0', completion_status: 'In Progress' },
    { id: id(), owner_id: OWNER, date: ymd, planned_activity: 'Dinner', start_time: hh(Math.min(22, nowH + 2), 0), end_time: hh(Math.min(23, nowH + 2), 45), category: 'Personal', priority: 'P3', completion_status: null },
    { id: id(), owner_id: OWNER, date: ymd, planned_activity: 'Placement prep — aptitude set', start_time: hh(Math.min(22, nowH + 3), 0), end_time: hh(Math.min(23, nowH + 4), 0), category: 'Placement', priority: 'P1', completion_status: null },
  ],
};

// Any table not listed above is simply empty
const rows = (t: string) => (tables[t] ??= []);

/** Minimal PostgREST filter engine: eq / neq / gt / gte / lt / lte / in. */
function applyFilters(data: Row[], params: URLSearchParams): Row[] {
  let out = data;
  params.forEach((value, key) => {
    if (['select', 'order', 'limit', 'offset', 'on_conflict', 'columns', 'owner_id'].includes(key)) return;
    const m = value.match(/^(eq|neq|gt|gte|lt|lte|in)\.(.*)$/);
    if (!m) return;
    const [, op, raw] = m;
    out = out.filter((r) => {
      const v = r[key];
      if (v === undefined || v === null) return op === 'neq';
      const a = String(v);
      switch (op) {
        case 'eq': return a === raw;
        case 'neq': return a !== raw;
        case 'gt': return a > raw;
        case 'gte': return a >= raw;
        case 'lt': return a < raw;
        case 'lte': return a <= raw;
        case 'in': return raw.replace(/[()]/g, '').split(',').includes(a);
        default: return true;
      }
    });
  });
  return out;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export function installPreviewMock() {
  const realFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, location.href);
    if (!url.hostname.endsWith('.supabase.co')) return realFetch(input, init);

    // Auth endpoints: nothing to do in preview
    if (url.pathname.startsWith('/auth/')) return new Response(null, { status: 204 });

    const table = url.pathname.replace(/^\/rest\/v1\//, '');
    const method = (init?.method ?? 'GET').toUpperCase();
    const accept = new Headers(init?.headers).get('Accept') ?? '';
    const wantsObject = accept.includes('vnd.pgrst.object');
    const respond = (list: Row[]) =>
      wantsObject ? (list[0] ? json(list[0]) : json({ code: 'PGRST116', message: 'The result contains 0 rows', details: null, hint: null }, 406)) : json(list);

    // Simulate a little latency so loading/skeleton states are visible
    await new Promise((r) => setTimeout(r, 120));

    if (method === 'GET' || method === 'HEAD') return respond(applyFilters(rows(table), url.searchParams));

    const body = init?.body ? JSON.parse(String(init.body)) : {};
    if (method === 'POST') {
      const incoming: Row[] = (Array.isArray(body) ? body : [body]).map((r: Row) => ({ id: id(), ...r }));
      // upsert: replace a row with the same id, else append
      incoming.forEach((r) => {
        const i = rows(table).findIndex((x) => x.id === r.id || (table.endsWith('_daily') && x.date === r.date && x.owner_id === r.owner_id));
        if (i >= 0) rows(table)[i] = { ...rows(table)[i], ...r };
        else rows(table).push(r);
      });
      return respond(incoming);
    }
    if (method === 'PATCH') {
      const hit = applyFilters(rows(table), url.searchParams);
      hit.forEach((r) => Object.assign(r, body));
      return respond(hit);
    }
    if (method === 'DELETE') {
      const hit = new Set(applyFilters(rows(table), url.searchParams));
      tables[table] = rows(table).filter((r) => !hit.has(r));
      return new Response(null, { status: 204 });
    }
    return json([]);
  };

  // handy for poking at state from devtools
  (window as any).__previewTables = tables;
  console.info('%c[preview] Supabase is mocked — no data leaves this tab.', 'color:#7C9BF7');
}

export const PREVIEW_USER = {
  id: OWNER,
  email: 'preview@apex.local',
  user_metadata: { first_name: 'Prakhar' },
  app_metadata: {},
  aud: 'authenticated',
  created_at: subDays(today, 30).toISOString(),
} as any;
