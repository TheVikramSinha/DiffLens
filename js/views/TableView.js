export default class TableView {
  static render(container, tableModel, maxRows = 250) {
    if (!tableModel) {
      container.innerHTML = '';
      return;
    }

    const { headers, rows } = tableModel;
    const visibleRows = rows.slice(0, maxRows);

    const thead = `
      <thead>
        <tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
      </thead>
    `;

    const tbody = `
      <tbody>
        ${visibleRows
          .map(row =>
            `<tr>${headers.map(h => `<td>${escapeHtml(row[h])}</td>`).join('')}</tr>`
          )
          .join('')}
      </tbody>
    `;

    container.innerHTML = `<table class="table">${thead}${tbody}</table>`;
  }
}

function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
