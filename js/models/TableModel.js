export default class TableModel {
  constructor(name, headers, rows) {
    this.name = name || 'Untitled Table';
    this.headers = headers || [];
    this.rows = rows || []; // array of objects, each representing one row
  }

  get rowCount() {
    return this.rows.length;
  }

  get columnCount() {
    return this.headers.length;
  }
}
