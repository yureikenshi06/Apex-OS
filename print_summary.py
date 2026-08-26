import json

with open("excel_analysis.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for fname, finfo in data.items():
    print("=" * 80)
    print(f"FILE: {fname}")
    print("=" * 80)
    for sheet in finfo["sheets"]:
        sname = sheet["sheet_name"]
        print(f"\n--- Sheet: '{sname}' (max_row={sheet['max_row']}, max_column={sheet['max_column']}, non_empty_rows={sheet['non_empty_rows']}) ---")
        if sheet["merged_ranges"]:
            print(f"  Merged ranges: {sheet['merged_ranges'][:5]}")
        print("  Sample rows (values):")
        for i, row in enumerate(sheet["sample_rows_val"][:12], 1):
            # clean trailing None
            row_clean = list(row)
            while row_clean and row_clean[-1] is None:
                row_clean.pop()
            if any(x is not None for x in row_clean):
                print(f"    R{i:02d}: {row_clean}")
            else:
                print(f"    R{i:02d}: <EMPTY>")
