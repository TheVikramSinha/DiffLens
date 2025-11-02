// Parses CSV, XLSX, XLS using SheetJS, and DOCX tables using Mammoth
export async function parseFileToTables(file) {
  const name = file.name.toLowerCase();

  if (name.endsWith('.csv') || name.endsWith('.xlsx') || name.endsWith('.xls')) {
    return parseSpreadsheet(file);
  } else if (name.endsWith('.docx')) {
    return parseDocxTables(file);
  }

  throw new Error('Unsupported file type');
}

async function parseSpreadsheet(file) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });

  const tables = workbook.SheetNames.map(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    if (!json.length) return { name: sheetName, headers: [], rows: [] };
    const headers = Object.keys(json[0]);
    return { name: sheetName, headers, rows: json };
  });

  return tables;
}

async function parseDocxTables(file) {
  const arrayBuffer = await file.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

  // Convert the HTML to a DOM to extract tables
  const doc = document.implementation.createHTMLDocument('docx');
  doc.body.innerHTML = html;

  const tables = [...doc.querySelectorAll('table')];
  if (!tables.length) {
    return [{ name: 'DOCX — no tables found', headers: [], rows: [] }];
  }

  return tables.map((table, index) => {
    const rows = [...table.querySelectorAll('tr')].map(tr =>
      [...tr.children].map(td => td.textContent.trim())
    );

    if (!rows.length) return { name: `Table ${index + 1}`, headers: [], rows: [] };

    const headers = rows[0].map((h, idx) => h || `col_${idx + 1}`);
    const dataRows = rows.slice(1).map(r => {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = r[idx] ?? ''; });
      return obj;
    });

    return { name: `DOCX Table ${index + 1}`, headers, rows: dataRows };
  });
}
