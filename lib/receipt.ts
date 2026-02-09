
import { jsPDF } from 'jspdf';
import { CartItem, Customer } from '../types';

export const generateReceiptPDF = (
  cart: CartItem[], 
  totals: { subtotal: number; tax: number; total: number; discount: number },
  paymentMethod: string,
  customer: Customer | null,
  orderNumber: string
) => {
  const doc = new jsPDF({
    unit: 'mm',
    format: [80, 200] // Typical 80mm roll
  });

  const margin = 5;
  const width = 80;
  let y = 10;

  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('LUMINA POS', width / 2, y, { align: 'center' });
  y += 6;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('123 Future Avenue, Innovation City', width / 2, y, { align: 'center' });
  y += 4;
  doc.text('Tel: +1 (555) LUMINA-AI', width / 2, y, { align: 'center' });
  y += 8;

  // Info
  const date = new Date().toLocaleString();
  doc.text(`Date: ${date}`, margin, y);
  y += 4;
  doc.text(`Order: #${orderNumber}`, margin, y);
  y += 4;
  doc.text(`Cashier: Marcus Smith`, margin, y);
  y += 4;
  if (customer) {
    doc.text(`Customer: ${customer.name}`, margin, y);
    y += 4;
  }
  
  y += 2;
  doc.line(margin, y, width - margin, y);
  y += 5;

  // Items
  doc.setFont('helvetica', 'bold');
  doc.text('Item', margin, y);
  doc.text('Qty', width - 25, y, { align: 'right' });
  doc.text('Price', width - margin, y, { align: 'right' });
  y += 4;
  doc.setFont('helvetica', 'normal');

  cart.forEach(item => {
    const itemTotal = (item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2);
    doc.text(item.name.substring(0, 20), margin, y);
    doc.text(item.quantity.toString(), width - 25, y, { align: 'right' });
    doc.text(`$${itemTotal}`, width - margin, y, { align: 'right' });
    y += 4;
  });

  y += 2;
  doc.line(margin, y, width - margin, y);
  y += 6;

  // Totals
  doc.text('Subtotal:', margin, y);
  doc.text(`$${totals.subtotal.toFixed(2)}`, width - margin, y, { align: 'right' });
  y += 4;
  doc.text('Discount:', margin, y);
  doc.text(`-$${totals.discount.toFixed(2)}`, width - margin, y, { align: 'right' });
  y += 4;
  doc.text('Tax (8%):', margin, y);
  doc.text(`+$${totals.tax.toFixed(2)}`, width - margin, y, { align: 'right' });
  y += 6;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL:', margin, y);
  doc.text(`$${totals.total.toFixed(2)}`, width - margin, y, { align: 'right' });
  y += 8;

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Paid via ${paymentMethod}`, width / 2, y, { align: 'center' });
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for shopping at Lumina!', width / 2, y, { align: 'center' });
  
  doc.save(`receipt-${orderNumber}.pdf`);
};
