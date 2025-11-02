export default class DiffView {
  static renderOnly(container, items, label) {
    if (!items.length) {
      container.innerHTML = '<p class="badge ok">None</p>';
      return;
    }

    const headers = Object.keys(items[0].row);
    const thead = `<thead><tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>`;
    const tbody = `
      <tbody>
        ${items
          .map(it =>
            `<tr class="${label === 'A' ? 'diff-removed' : 'diff-added'}">
              ${headers.map(h => `<td>${escapeHtml(it.row[h])}</td>`).join('')}
            </tr>`
          )
          .join('')}
      </tbody>
    `;
    container.innerHTML = `<table class="table">${thead}${tbody}</table>`;
  }

  static renderChanged(container, items, allHeaders) {
    if (!items.length) {
      container.innerHTML = '<p class="badge ok">None</p>';
      return;
    }

    const thead = `<thead><tr>${allHeaders.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>`;
    const tbody = `
      <tbody>
        ${items
          .map(({ rowA, rowB, diffs }) => {
            const diffSet = new Set(diffs.map(d => d.header));
            const tds = allHeaders.map(h => {
              if (diffSet.has(h)) {
                return `<td class="cell-diff diff-changed">${escapeHtml(rowA[h])} → ${escapeHtml(rowB[h])}</td>`;
              }
              return `<td>${escapeHtml(rowB[h])}</td>`;
            }).join('');
            return `<tr>${tds}</tr>`;
          })
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
