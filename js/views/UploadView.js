export default class UploadView {
  static showParsing(container) {
    container.classList.remove('hidden');
    container.innerHTML = `<span class="badge">Parsing...</span>`;
  }

  static showError(container, message) {
    container.classList.remove('hidden');
    container.innerHTML = `<span class="badge bad">Error: ${escapeHtml(message)}</span>`;
  }

  static renderPicker(container, models) {
    const parts = models.map(
      (m, i) =>
        `<span class="badge">#${i + 1} ${escapeHtml(m.name)} — ${m.columnCount} cols, ${m.rowCount} rows</span>`
    );
    container.classList.remove('hidden');
    container.innerHTML = parts.join(' ');
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
