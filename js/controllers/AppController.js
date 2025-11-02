import { parseFileToTables } from '../utils/FileParser.js';
import TableModel from '../models/TableModel.js';
import DiffEngine from '../models/DiffEngine.js';
import UploadView from '../views/UploadView.js';
import TableView from '../views/TableView.js';
import DiffView from '../views/DiffView.js';

export default class AppController {
  constructor() {
    // File inputs
    this.fileA = document.getElementById('fileA');
    this.fileB = document.getElementById('fileB');
    this.pickerA = document.getElementById('pickerA');
    this.pickerB = document.getElementById('pickerB');

    // Mapping section
    this.mappingSection = document.getElementById('mapping-section');
    this.selectTabA = document.getElementById('selectTabA');
    this.selectTabB = document.getElementById('selectTabB');
    this.keyA = document.getElementById('keyA');
    this.keyB = document.getElementById('keyB');

    // Preview
    this.btnPreview = document.getElementById('btnPreview');
    this.previewSection = document.getElementById('preview-section');
    this.previewA = document.getElementById('previewA');
    this.previewB = document.getElementById('previewB');

    // Results
    this.btnDiff = document.getElementById('btnDiff');
    this.resultsSection = document.getElementById('results-section');
    this.summary = document.getElementById('summary');
    this.tabs = document.querySelectorAll('.tab');
    this.panes = {
      onlyA: document.getElementById('pane-onlyA'),
      onlyB: document.getElementById('pane-onlyB'),
      changed: document.getElementById('pane-changed'),
    };
    this.btnExport = document.getElementById('btnExport');

    // Data models
    this.tablesA = [];
    this.tablesB = [];
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.fileA.addEventListener('change', async (e) => this.loadFile(e.target.files[0], 'A'));
    this.fileB.addEventListener('change', async (e) => this.loadFile(e.target.files[0], 'B'));

    this.btnPreview.addEventListener('click', () => this.handlePreview());
    this.btnDiff.addEventListener('click', () => this.runDiff());

    this.tabs.forEach((tab) => tab.addEventListener('click', () => this.switchTab(tab)));

    this.btnExport.addEventListener('click', () => this.exportCSV());

    this.selectTabA.addEventListener('change', () => this.populateKeySelect('A'));
    this.selectTabB.addEventListener('change', () => this.populateKeySelect('B'));
  }

  async loadFile(file, side) {
    if (!file) return;
    const picker = side === 'A' ? this.pickerA : this.pickerB;
    UploadView.showParsing(picker);

    try {
      const tables = await parseFileToTables(file);
      const models = tables.map(t => new TableModel(t.name, t.headers, t.rows));
      if (side === 'A') this.tablesA = models;
      else this.tablesB = models;

      UploadView.renderPicker(picker, models);

      const select = side === 'A' ? this.selectTabA : this.selectTabB;
      select.innerHTML = '';
      models.forEach((m, idx) => {
        const opt = document.createElement('option');
        opt.value = String(idx);
        opt.textContent = m.name;
        select.appendChild(opt);
      });

      this.populateKeySelect(side);
      this.mappingSection.classList.toggle('hidden', !(this.tablesA.length && this.tablesB.length));
    } catch (err) {
      UploadView.showError(picker, err.message);
      console.error(err);
    }
  }

  populateKeySelect(side) {
    const models = side === 'A' ? this.tablesA : this.tablesB;
    const selectTab = side === 'A' ? this.selectTabA : this.selectTabB;
    const keySel = side === 'A' ? this.keyA : this.keyB;

    const model = models[Number(selectTab.value) || 0];
    keySel.innerHTML = '';
    (model?.headers || []).forEach(h => {
      const o = document.createElement('option');
      o.value = h;
      o.textContent = h;
      keySel.appendChild(o);
    });
  }

  handlePreview() {
    const tA = this.tablesA[Number(this.selectTabA.value) || 0];
    const tB = this.tablesB[Number(this.selectTabB.value) || 0];
    TableView.render(this.previewA, tA);
    TableView.render(this.previewB, tB);
    this.previewSection.classList.remove('hidden');
  }

  switchTab(tabBtn) {
    this.tabs.forEach(t => t.classList.remove('active'));
    tabBtn.classList.add('active');
    const target = tabBtn.getAttribute('data-tab');
    Object.entries(this.panes).forEach(([k, el]) => el.classList.toggle('active', k === target));
  }

  runDiff() {
    const tA = this.tablesA[Number(this.selectTabA.value) || 0];
    const tB = this.tablesB[Number(this.selectTabB.value) || 0];
    if (!tA || !tB) return;

    const keyA = this.keyA.value || tA.headers[0];
    const keyB = this.keyB.value || tB.headers[0];

    const engine = new DiffEngine(tA, tB, keyA, keyB);
    const result = engine.compute();

    this.summary.innerHTML = [
      `<span class="badge">Keys A: <strong>${result.counts.keysA}</strong></span>`,
      `<span class="badge">Keys B: <strong>${result.counts.keysB}</strong></span>`,
      `<span class="badge warn">Only in A: <strong>${result.onlyA.length}</strong></span>`,
      `<span class="badge warn">Only in B: <strong>${result.onlyB.length}</strong></span>`,
      `<span class="badge ok">Changed: <strong>${result.changed.length}</strong></span>`
    ].join(' ');

    DiffView.renderOnly(this.panes.onlyA, result.onlyA, 'A');
    DiffView.renderOnly(this.panes.onlyB, result.onlyB, 'B');
    DiffView.renderChanged(this.panes.changed, result.changed, result.allHeaders);

    this.resultsSection.classList.remove('hidden');
    this.previewSection.classList.add('hidden');
  }

  exportCSV() {
    const sections = [
      { title: 'Only in A', el: this.panes.onlyA },
      { title: 'Only in B', el: this.panes.onlyB },
      { title: 'Changed Rows', el: this.panes.changed }
    ];

    let csv = '';
    sections.forEach(({ title, el }) => {
      const table = el.querySelector('table');
      if (!table) return;
      csv += `### ${title}\n`;
      const rows = [...table.querySelectorAll('tr')].map(tr =>
        [...tr.children]
          .map(td => `"${String(td.textContent).replace(/"/g, '""')}"`)
          .join(',')
      );
      csv += rows.join('\n') + '\n\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'difflens-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
