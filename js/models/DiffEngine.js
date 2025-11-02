export default class DiffEngine {
  constructor(tableA, tableB, keyA, keyB) {
    this.tableA = tableA;
    this.tableB = tableB;
    this.keyA = keyA;
    this.keyB = keyB;
  }

  normalize(value) {
    if (value === null || value === undefined) return '';
    const s = String(value).trim();
    const n = Number(s);
    return Number.isFinite(n) && s !== '' ? String(n) : s;
  }

  indexBy(table, key) {
    const map = new Map();
    for (const row of table.rows) {
      const k = this.normalize(row[key]);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(row);
    }
    return map;
  }

  compute() {
    const idxA = this.indexBy(this.tableA, this.keyA);
    const idxB = this.indexBy(this.tableB, this.keyB);

    const keysA = new Set(idxA.keys());
    const keysB = new Set(idxB.keys());

    const onlyA = [];
    const onlyB = [];
    const changed = [];
    const allHeaders = Array.from(new Set([...this.tableA.headers, ...this.tableB.headers]));

    // Identify rows only in A
    for (const k of keysA) {
      if (!keysB.has(k)) {
        for (const row of idxA.get(k)) onlyA.push({ key: k, row });
      }
    }

    // Identify rows only in B
    for (const k of keysB) {
      if (!keysA.has(k)) {
        for (const row of idxB.get(k)) onlyB.push({ key: k, row });
      }
    }

    // Identify changed rows
    for (const k of keysA) {
      if (!keysB.has(k)) continue;
      const rowA = idxA.get(k)[0];
      const rowB = idxB.get(k)[0];
      const diffs = [];

      for (const header of allHeaders) {
        const a = this.normalize(rowA[header]);
        const b = this.normalize(rowB[header]);
        if (a !== b) diffs.push({ header, a, b });
      }

      if (diffs.length) changed.push({ key: k, rowA, rowB, diffs });
    }

    return {
      onlyA,
      onlyB,
      changed,
      allHeaders,
      counts: {
        keysA: keysA.size,
        keysB: keysB.size,
      },
    };
  }
}
