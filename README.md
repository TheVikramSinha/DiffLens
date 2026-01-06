# DiffLens 👁️

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fthevikramsinha.github.io%2FDiffLens%2F&label=System%20Status&style=flat-square)](https://thevikramsinha.github.io/DiffLens/)
[![Platform](https://img.shields.io/badge/Platform-Browser-blueviolet?style=flat-square)]()

> **"See your data clearly."**

**DiffLens** is a futuristic, browser-based visual comparison engine for tabular data. It ingests complex datasets from **Excel**, **CSV**, and **Word** files and highlights discrepancies with surgical precision using a Cyberpunk/HUD interface.

---

## 🚀 Live Demo
**[Initialize System: thevikramsinha.github.io/DiffLens](https://thevikramsinha.github.io/DiffLens/)**

![DiffLens Interface Preview](https://via.placeholder.com/800x400/050b14/00f3ff?text=DiffLens+Interface+Preview)
*(Capture a screenshot of your app and replace this link to make your repo pop!)*

---

## ⚡ Core Capabilities

* **Multi-Format Ingestion:** Seamlessly parses `.csv`, `.xlsx`, `.xls`, and even tables embedded in `.docx` files.
* **Privacy-First Architecture:** Zero server uploads. All processing happens locally in your browser's memory using JavaScript.
* **Intelligent Key Matching:** Select specific columns (Primary Keys) to align datasets, ensuring accurate row-by-row comparison even if data is unsorted.
* **Visual Diffing:**
    * <span style="color:#00ff9d">🟢 **Only in A:**</span> Rows unique to the source file.
    * <span style="color:#ff0055">🔴 **Only in B:**</span> Rows unique to the target file.
    * <span style="color:#ffce00">🟡 **Changed:**</span> Rows where values differ between files.
* **Exportable Intelligence:** Download a comprehensive `.csv` report of all discrepancies.

---

## 🛠️ Tech Stack

* **Core:** Vanilla JavaScript (ES6+), HTML5, CSS3 (CSS Variables for theming).
* **Parsers:**
    * `SheetJS` (Excel/CSV parsing)
    * `Mammoth.js` (Word Document parsing)
* **Deployment:** GitHub Pages (Static hosting).
* **Design System:** Custom "Neon-Glass" UI with responsive layouts.

---

## ⚠️ Critical Note on Word (.docx) Files

DiffLens is designed to compare **Structured Data**.
* It specifically scans `.docx` files for **embedded tables**.
* Paragraphs, headers, and free-form text outside of tables are ignored.
* The first row of any table is treated as the **Header Row**.

---

## 📦 Deployment Instructions

DiffLens is designed to be hosted instantly for free.

1.  **Fork** this repository.
2.  Navigate to **Settings** > **Pages**.
3.  Select **Source**: `Deploy from a branch`.
4.  Select **Branch**: `main` / `root`.
5.  Click **Save**. Your system will be live in 60 seconds.

---

## 🤝 How to Use

1.  **Upload Datasets:** Load your Source (A) and Target (B) files.
2.  **Configure Parameters:**
    * Select the specific **Sheet** (Excel) or **Table** (Word) to analyze.
    * Select the **Unique Key Column** (ID, Email, SKU, etc.) to anchor the comparison.
3.  **Execute:** Click `INITIALIZE COMPARISON`.
4.  **Analyze & Export:** Review the visual dashboard or export the raw difference report.

---

## 📜 License

Distributed under the **GNU Affero General Public License v3 (AGPL-3.0)**.
You are free to modify and distribute this system, provided that all changes remain open-source under the same license.

**Author:** [Vikram Kumar Sinha](https://thevikramsinha.github.io/)
