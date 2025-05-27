import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data, title, columns) => {

  const adjustedColumns = [...columns.slice(0, 3)];
  while (adjustedColumns.length < 3) {
    adjustedColumns.push('');
  }

  const doc = new jsPDF();
  doc.text(`Listado de ${title}`, 14, 10);


  const tableRows = data.map(item =>
    adjustedColumns.map(col => col ? item[col] : '')
  );

  autoTable(doc, {
    head: [adjustedColumns],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 10, halign: 'center' },
    headStyles: { fillColor: [100] },
    tableWidth: '100%'
  });

  const fecha = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175); 
  doc.text(`Generado el ${fecha}`, 14, doc.internal.pageSize.height - 20);
  doc.text("Alejo Pinatti — 2025", 14, doc.internal.pageSize.height - 14);

  doc.save(`${title}.pdf`);
};
