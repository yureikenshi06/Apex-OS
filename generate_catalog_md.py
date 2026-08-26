import json

with open("detailed_catalog.json", "r", encoding="utf-8") as f:
    catalog = json.load(f)

def build_schema_report():
    lines = []
    lines.append("# Comprehensive Excel Schema & Data Catalog\n")
    lines.append("This document contains the complete extracted schema, column definitions, sheet layouts, and sample data for all 4 Excel workbooks.\n")

    for fname, finfo in catalog.items():
        lines.append(f"\n{'='*90}")
        lines.append(f"# WORKBOOK: {fname}")
        lines.append(f"**File Path:** `{finfo['file_path']}`  ")
        lines.append(f"**Total Sheets:** `{finfo['total_sheets']}`  ")
        lines.append(f"**Sheet List:** {', '.join([f'`{s}`' for s in finfo['sheets'].keys()])}")
        lines.append(f"{'='*90}\n")

        for sidx, (sname, sdata) in enumerate(finfo['sheets'].items(), 1):
            lines.append(f"### {sidx}. Sheet: `{sname}`")
            lines.append(f"- **Dimensions:** {sdata['max_row']} rows × {sdata['max_column']} columns (Non-empty rows: {sdata['non_empty_row_count']})")
            if sdata['merged_cells']:
                lines.append(f"- **Merged Cell Ranges ({len(sdata['merged_cells'])}):** {', '.join(sdata['merged_cells'][:6])}{' ...' if len(sdata['merged_cells']) > 6 else ''}")

            rows = sdata['all_non_empty_rows']
            if not rows:
                lines.append("- *Sheet is empty*\n")
                continue

            # Determine layout type: Table with headers vs Dashboard/Form
            # Look for header row
            header_candidates = []
            for r_idx, (r_num, r_vals) in enumerate(rows[:10]):
                if len(r_vals) >= 3 and all(isinstance(v, str) and len(v) < 60 for v in r_vals if v):
                    # Check if next row has data
                    header_candidates.append((r_idx, r_num, r_vals))

            lines.append("\n**Structure & Sample Rows:**\n")
            lines.append("| Row # | Content / Columns |")
            lines.append("| :--- | :--- |")
            for r_num, r_vals in rows[:8]:
                # Format cell values cleanly
                val_display = " `|` ".join([str(v).replace('\n', ' ') if str(v).strip() else "*(empty)*" for v in r_vals])
                lines.append(f"| **Row {r_num}** | {val_display} |")
            
            if len(rows) > 8:
                lines.append(f"| *...* | *({len(rows) - 8} more non-empty rows)* |")

            lines.append("\n" + "-"*60 + "\n")

    return "\n".join(lines)

report = build_schema_report()
with open("c:\\Users\\singh\\Desktop\\Manager\\Productivity\\EXCEL_SCHEMA_CATALOG.md", "w", encoding="utf-8") as f:
    f.write(report)

print("EXCEL_SCHEMA_CATALOG.md written successfully!")
