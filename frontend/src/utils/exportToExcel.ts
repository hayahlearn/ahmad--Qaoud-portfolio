export function exportToCSV<T>(
  data: T[],
  filename: string,
  columns: { key: keyof T; header: string }[]
) {
  if (data.length === 0) return;

  // Create CSV header
  const headers = columns.map(col => `"${col.header}"`).join(',');
  
  // Create CSV rows
  const rows = data.map(item => 
    columns.map(col => {
      const value = item[col.key];
      // Handle null/undefined and escape quotes
      const cellValue = value === null || value === undefined ? '' : String(value).replace(/"/g, '""');
      return `"${cellValue}"`;
    }).join(',')
  );

  // Combine header and rows
  const csvContent = [headers, ...rows].join('\n');
  
  // Add BOM for UTF-8 support in Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
