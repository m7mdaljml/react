import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type ExportFormat = 'xlsx' | 'csv';

interface SheetDefinition {
  name: string;
  data: Record<string, unknown>[];
  headers?: Record<string, string>;
}

interface ExportOptions {
  fileName?: string;
  sheetName?: string;
  headers?: Record<string, string>;
  format?: ExportFormat;
  sheets?: SheetDefinition[];
}

function createSheet(
  data: Record<string, unknown>[],
  headers?: Record<string, string>
): XLSX.WorkSheet {
  if (headers) {
    const headerKeys = Object.keys(headers);
    const headerLabels = Object.values(headers);
    const mappedData = data.map((row) => headerKeys.map((key) => row[key]));
    return XLSX.utils.aoa_to_sheet([headerLabels, ...mappedData]);
  }
  return XLSX.utils.json_to_sheet(data);
}

export function exportToExcel(
  data: Record<string, unknown>[],
  options: ExportOptions = {}
): void {
  const {
    fileName = 'export',
    sheetName = 'Sheet1',
    headers,
    format = 'xlsx',
    sheets,
  } = options;

  const wb = XLSX.utils.book_new();

  if (sheets && sheets.length > 0) {
    for (const sheet of sheets) {
      const ws = createSheet(sheet.data, sheet.headers);
      XLSX.utils.book_append_sheet(wb, ws, sheet.name);
    }
  } else {
    const ws = createSheet(data, headers);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  }

  if (format === 'csv') {
    const firstSheet = wb.Sheets[wb.SheetNames[0]];
    const csvContent = XLSX.utils.sheet_to_csv(firstSheet);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${fileName}.csv`);
  } else {
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${fileName}.xlsx`);
  }
}
