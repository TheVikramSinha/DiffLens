# DiffLens

**See your data clearly.**  
DiffLens is a browser-based visual comparison tool for tabular data — it highlights differences across **CSV**, **Excel (.xlsx/.xls)**, and **Word (.docx)** files with a clean, minimal interface.

---

## Features
- Upload two data files (A and B) for comparison  
- Supported formats: `.csv`, `.xlsx`, `.xls`, `.docx`  
- Choose which sheet or table to compare and select key columns independently  
- Preview both datasets before running the comparison  
- Highlights:
  - **Only in A** – rows unique to the first file  
  - **Only in B** – rows unique to the second file  
  - **Changed Rows** – same keys but modified values  
- Export the complete diff report as a `.csv` snapshot  
- Runs entirely in your browser (no backend, no frameworks)

---

## Important Note on Word (.docx) Files
DiffLens does **not** analyze Word documents as text files.  
It specifically looks for and extracts **tables** embedded in `.docx` documents.  
Each table is parsed separately — the first row must serve as **column headers**.  
Text outside tables, paragraphs, or other formatting elements are ignored during comparison.

---

## How It Works
1. Upload your two files.  
2. Select the sheet (for Excel) or table (for Word) you wish to compare.  
3. Pick the **key column** on both sides — used to match rows.  
4. Click **Run Diff** to see the result instantly in your browser.  
5. Review rows that exist only in one file or have changed between both.

---

## Technology
- **JavaScript (MVC architecture)** – clean separation of logic, data, and UI  
- **SheetJS** – for parsing CSV and Excel files  
- **Mammoth.js** – for reading tables from Word documents  
- **No frameworks, no build step** – works natively on GitHub Pages

---

## Hosting
You can host DiffLens for free:
1. Fork or clone this repository.  
2. Enable **GitHub Pages** (branch: `main`, folder: `/`).  
3. Open the generated site URL and start using DiffLens.

---

## Limitations
- The `.docx` parser only works with **tables** — paragraphs, bullet lists, or free text are not compared.  
- Merged or complex table cells may produce partial data alignment.  
- Large Excel sheets (above ~10 MB) may take time to load in the browser.  
- Comparison is case-sensitive; values are trimmed and normalized.

---

## License
Distributed under the **GNU Affero General Public License v3 (AGPL-3.0)**.  
You are free to modify, share, and host DiffLens provided that all changes remain open-source under the same license.

---

**Author:** Vikram Kumar Sinha
**Project:** DiffLens  
**Purpose:** Visual data comparison across multiple table formats.
