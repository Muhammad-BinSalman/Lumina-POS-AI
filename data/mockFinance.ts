
export const FINANCE_KPI_DATA = [
  { label: 'Total Revenue', value: '$245,800', change: '+14.2%', sparkline: [40, 55, 45, 60, 50, 75, 80], tooltip: 'Gross income from all sales this month.' },
  { label: 'Gross Profit', value: '$102,450', change: '+8.1%', sparkline: [30, 40, 35, 50, 45, 60, 65], tooltip: 'Revenue minus Cost of Goods Sold (COGS).' },
  { label: 'Net Profit', value: '$64,200', change: '+5.4%', sparkline: [20, 30, 25, 35, 30, 45, 50], tooltip: 'Profit after all expenses and taxes.' },
  { label: 'Operating Margin', value: '41.6%', change: '-1.2%', sparkline: [42, 41, 43, 40, 39, 41, 41], tooltip: 'Percentage of revenue left after operating expenses.' },
  { label: 'Cash on Hand', value: '$312,000', change: 'Stable', sparkline: [280, 290, 300, 305, 308, 310, 312], tooltip: 'Liquid cash available for immediate use.' },
  { label: 'Monthly Burn', value: '$38,500', change: '-2.4%', sparkline: [45, 42, 40, 39, 38, 38, 38], tooltip: 'Average monthly operating expenses.' }
];

export const PROFIT_LOSS_CHART = [
  { month: 'Jan', revenue: 180000, expenses: 110000, profit: 70000 },
  { month: 'Feb', revenue: 210000, expenses: 125000, profit: 85000 },
  { month: 'Mar', revenue: 195000, expenses: 115000, profit: 80000 },
  { month: 'Apr', revenue: 240000, expenses: 135000, profit: 105000 },
  { month: 'May', revenue: 230000, expenses: 130000, profit: 100000 },
  { month: 'Jun', revenue: 285000, expenses: 145000, profit: 140000 }
];

export const EXPENSE_DISTRIBUTION = [
  { name: 'COGS', value: 45, color: '#4F46E5' },
  { name: 'Payroll', value: 25, color: '#22D3EE' },
  { name: 'Rent', value: 15, color: '#818CF8' },
  { name: 'Marketing', value: 10, color: '#C084FC' },
  { name: 'Utils', value: 5, color: '#F472B6' }
];

export const AI_FINANCE_INSIGHTS = [
  {
    icon: 'TrendingDown',
    title: 'Margin Alert',
    content: 'Gross margin dropped 4.8% this week. Primary cause: 22% increase in shipping surcharges from Region-B suppliers.',
    type: 'critical'
  },
  {
    icon: 'BrainCircuit',
    title: 'Profit Optimization',
    content: 'Coffee beans inventory is overstocked by 32%. Switch to local vendor "Atlas Roast" to save $1,200/mo on logistics.',
    type: 'suggestion'
  },
  {
    icon: 'AlertCircle',
    title: 'Anomaly Detected',
    content: 'Transaction voids increased 320% on Friday evenings. Correlation found with shift staff ID: #4421.',
    type: 'warning'
  },
  {
    icon: 'Zap',
    title: 'Cash Flow Forecast',
    content: 'Positive trend. Projected cash reserve to hit $400k by Q3 if current conversion rate (34%) holds.',
    type: 'positive'
  }
];
