import React, { useState, useEffect } from 'react';
import { 
  Database, 
  LayoutDashboard, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  BarChart3,
  Server,
  FileText,
  RefreshCw,
  Search,
  Upload,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
    red: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [etlStatus, setEtlStatus] = useState({
    bronze: 'pending',
    silver: 'pending',
    gold: 'pending'
  });
  const [isRunning, setIsRunning] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const [logs, setLogs] = useState([
    { id: 1, time: '10:42 AM', msg: 'System check complete. Warehouse connection active.', type: 'info' },
  ]);

  // Dynamic Data based on ETL state
  const kpiData = dataLoaded ? [
    { label: "Total Revenue", value: "$29.3M", change: "+12.5%", icon: DollarSign, color: "text-emerald-600" },
    { label: "Total Orders", value: "60,398", change: "+8.2%", icon: ShoppingCart, color: "text-blue-600" },
    { label: "Active Customers", value: "18,484", change: "+3.1%", icon: Users, color: "text-violet-600" },
    { label: "Avg Order Value", value: "$485", change: "-1.2%", icon: BarChart3, color: "text-amber-600" },
  ] : [
    { label: "Total Revenue", value: "$0.00", change: "--", icon: DollarSign, color: "text-slate-400" },
    { label: "Total Orders", value: "0", change: "--", icon: ShoppingCart, color: "text-slate-400" },
    { label: "Active Customers", value: "0", change: "--", icon: Users, color: "text-slate-400" },
    { label: "Avg Order Value", value: "$0", change: "--", icon: BarChart3, color: "text-slate-400" },
  ];

  const categoryData = dataLoaded ? [
    { name: 'Bikes', value: 65, color: 'bg-blue-500' },
    { name: 'Components', value: 25, color: 'bg-cyan-400' },
    { name: 'Clothing', value: 8, color: 'bg-indigo-400' },
    { name: 'Accessories', value: 2, color: 'bg-slate-300' },
  ] : [
    { name: 'No Data', value: 0, color: 'bg-slate-200' }
  ];

  const recentTransactions = dataLoaded ? [
    { id: 'ORD-2024-001', customer: 'Nichole Nara', amount: '$4,200', status: 'Completed', date: '2024-03-15' },
    { id: 'ORD-2024-002', customer: 'Christopher J.', amount: '$1,850', status: 'Processing', date: '2024-03-14' },
    { id: 'ORD-2024-003', customer: 'Kaitlyn Ross', amount: '$345', status: 'Completed', date: '2024-03-14' },
    { id: 'ORD-2024-004', customer: 'Gerry S.', amount: '$2,100', status: 'Failed', date: '2024-03-13' },
  ] : [];

  const handleFileUpload = (e) => {
    // Simulate file upload
    setFileUploaded("CRM_Sales_Export_2024.csv");
    setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'File uploaded: CRM_Sales_Export_2024.csv', type: 'info' }, ...prev]);
  };

  const runEtlProcess = () => {
    if (!fileUploaded) {
      alert("Please upload a CSV file first!");
      return;
    }
    
    setIsRunning(true);
    setEtlStatus({ bronze: 'running', silver: 'waiting', gold: 'waiting' });
    setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Started ETL Pipeline...', type: 'info' }, ...prev]);

    // Simulate Bronze Load
    setTimeout(() => {
      setEtlStatus(prev => ({ ...prev, bronze: 'completed', silver: 'running' }));
      setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Bronze Layer: Bulk Insert Completed (18k rows)', type: 'success' }, ...prev]);
      
      // Simulate Silver Load
      setTimeout(() => {
        setEtlStatus(prev => ({ ...prev, silver: 'completed', gold: 'running' }));
        setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Silver Layer: Data Cleaning & Standardization Finished', type: 'success' }, ...prev]);

        // Simulate Gold Load
        setTimeout(() => {
          setEtlStatus(prev => ({ ...prev, gold: 'completed' }));
          setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Gold Layer: Star Schema Updated. Refreshing Dashboard...', type: 'success' }, ...prev]);
          setIsRunning(false);
          setDataLoaded(true); // Unlock dashboard data
        }, 2000);
      }, 2500);
    }, 2000);
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {!dataLoaded && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r shadow-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-800">Warehouse Empty</h3>
            <p className="text-sm text-amber-700">No data detected in the Gold Layer. Please go to the <strong className="cursor-pointer underline" onClick={() => setActiveTab('etl')}>ETL Pipelines</strong> tab to ingest data.</p>
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="p-6 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-opacity-10 ${kpi.color.replace('text', 'bg')}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-emerald-600' : kpi.change === '--' ? 'text-slate-400' : 'text-rose-600'}`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{kpi.label}</h3>
            <p className={`text-2xl font-bold text-slate-900 mt-1 ${dataLoaded ? 'animate-pulse-once' : ''}`}>{kpi.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Mock) */}
        <Card className="lg:col-span-2 p-6 relative">
          {!dataLoaded && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> No Data Available
              </span>
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Revenue Trends (2024)</h2>
            <select className="text-sm border-slate-200 rounded-md text-slate-500">
              <option>Last 12 Months</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[35, 45, 30, 60, 75, 50, 65, 80, 70, 85, 90, 60].map((h, i) => (
              <div key={i} className="w-full h-full bg-blue-50 rounded-t-sm relative group cursor-pointer hover:bg-blue-100 transition-colors">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-blue-600"
                  style={{ height: dataLoaded ? `${h}%` : '0%' }}
                ></div>
                {/* Tooltip */}
                {dataLoaded && (
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                    ${(h * 0.4).toFixed(1)}M
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400">
            <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6 relative">
           {!dataLoaded && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                 Waiting for data...
              </span>
            </div>
          )}
          <h2 className="text-lg font-bold text-slate-800 mb-6">Sales by Category</h2>
          <div className="space-y-6">
            {categoryData.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">{cat.name}</span>
                  <span className="text-slate-500">{cat.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${cat.color} transition-all duration-1000 ease-out`} style={{ width: dataLoaded ? `${cat.value}%` : '0%' }}></div>
                </div>
              </div>
            ))}
          </div>
          {dataLoaded && (
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 animate-fade-in">
              <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Insight</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-blue-600">Bikes</span> account for 65% of total revenue, driven primarily by the "Road Bikes" sub-category in the North American market.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700" disabled={!dataLoaded}>View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.length > 0 ? recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{tx.id}</td>
                  <td className="px-6 py-4 text-slate-600">{tx.customer}</td>
                  <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <Badge color={tx.status === 'Completed' ? 'green' : tx.status === 'Processing' ? 'blue' : 'yellow'}>
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="5" className="px-6 py-8 text-center text-slate-400 italic">No transactions found. Please run ETL load.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderETL = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Control */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">ETL Pipeline Orchestration</h2>
              <p className="text-sm text-slate-500 mt-1">Ingest CSV data, transform, and load into the Gold Layer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Step 1: Upload */}
            <div className={`p-4 rounded-xl border-2 border-dashed transition-all ${fileUploaded ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:border-blue-400 bg-slate-50'}`}>
              <div className="flex flex-col items-center text-center gap-3">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${fileUploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                   {fileUploaded ? <FileSpreadsheet className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                 </div>
                 {fileUploaded ? (
                   <div>
                     <h4 className="font-bold text-slate-800">Source File Ready</h4>
                     <p className="text-xs text-slate-500">{fileUploaded}</p>
                   </div>
                 ) : (
                   <div>
                     <h4 className="font-bold text-slate-800">Upload Source Data</h4>
                     <p className="text-xs text-slate-500 mb-3">Drag & drop CSV files or click to browse</p>
                     <button onClick={handleFileUpload} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">Select File</button>
                   </div>
                 )}
              </div>
            </div>

            {/* Step 2: Run */}
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <ArrowRight className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Trigger Pipeline</span>
              </div>
              <button 
                onClick={runEtlProcess}
                disabled={isRunning || !fileUploaded || dataLoaded}
                className={`w-full max-w-xs flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                  dataLoaded ? 'bg-emerald-500 cursor-default' :
                  isRunning ? 'bg-slate-400 cursor-not-allowed' : 
                  !fileUploaded ? 'bg-slate-300 cursor-not-allowed' :
                  'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-blue-500/30'
                }`}
              >
                {dataLoaded ? (
                   <>
                     <CheckCircle className="w-5 h-5" /> Pipeline Completed
                   </>
                ) : isRunning ? (
                  <>
                     <RefreshCw className="w-5 h-5 animate-spin" /> Processing Data...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" /> Run Data Load
                  </>
                )}
              </button>
              {!fileUploaded && <span className="text-xs text-rose-500">⚠ Waiting for source file</span>}
            </div>
          </div>

          <div className="relative pt-8 pb-4">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>

            <div className="relative z-10 flex justify-between gap-4">
              {[
                { id: 'bronze', label: 'Bronze Layer', desc: 'Raw Ingestion', icon: FileText },
                { id: 'silver', label: 'Silver Layer', desc: 'Cleaning & Logic', icon: RefreshCw },
                { id: 'gold', label: 'Gold Layer', desc: 'Star Schema', icon: Database },
              ].map((step, i) => {
                const status = etlStatus[step.id];
                const isComplete = status === 'completed';
                const isRunningStep = status === 'running';

                return (
                  <div key={step.id} className="flex flex-col items-center text-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full max-w-[200px]">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-500 ${isComplete ? 'bg-emerald-100 text-emerald-600' : isRunningStep ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                      {isComplete ? <CheckCircle className="w-6 h-6" /> : <step.icon className={`w-6 h-6 ${isRunningStep ? 'animate-spin' : ''}`} />}
                    </div>
                    <h3 className="font-bold text-slate-800">{step.label}</h3>
                    <p className="text-xs text-slate-500 mb-2">{step.desc}</p>
                    <Badge color={isComplete ? 'green' : isRunningStep ? 'blue' : 'slate'}>
                      {isComplete ? 'Success' : isRunningStep ? 'Running' : 'Pending'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Data Quality Metrics */}
        <Card className="p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">Quality Gates</h2>
          {[
            { label: 'Duplicate Check', status: dataLoaded ? 'Passed' : 'Pending', val: dataLoaded ? '0 found' : '--' },
            { label: 'Null Values', status: dataLoaded ? 'Passed' : 'Pending', val: dataLoaded ? '< 0.1%' : '--' },
            { label: 'Referential Integrity', status: dataLoaded ? 'Passed' : 'Pending', val: dataLoaded ? '100%' : '--' },
            { label: 'Schema Validation', status: dataLoaded ? 'Passed' : 'Pending', val: dataLoaded ? 'Verified' : '--' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                {dataLoaded ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
              <span className="text-xs font-mono text-slate-500">{item.val}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Logs Console */}
      <Card className="bg-slate-900 text-slate-300 font-mono text-sm p-0 overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            System Logs
          </span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-4 h-48 overflow-y-auto space-y-2 custom-scrollbar">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-4 hover:bg-white/5 p-1 rounded">
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'error' ? 'text-rose-400' : 'text-blue-300'}>
                {log.type.toUpperCase()}:
              </span>
              <span>{log.msg}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderDataCatalog = () => (
    <Card className="overflow-hidden">
       <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Data Dictionary</h2>
            <p className="text-sm text-slate-500">Schema definitions for the Gold Layer (Analytics)</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search tables..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" />
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { name: 'fact_sales', type: 'FACT', rows: '60,398', desc: 'Transactional sales data linked to customers and products.', cols: ['order_number (PK)', 'customer_key (FK)', 'product_key (FK)', 'sales_amount', 'order_date'] },
            { name: 'dim_customers', type: 'DIMENSION', rows: '18,484', desc: 'Customer profiles including demographics and location.', cols: ['customer_key (PK)', 'first_name', 'last_name', 'country', 'marital_status'] },
            { name: 'dim_products', type: 'DIMENSION', rows: '295', desc: 'Product catalog hierarchy and pricing details.', cols: ['product_key (PK)', 'product_name', 'category', 'sub_category', 'standard_cost'] },
          ].map((table, i) => (
            <div key={i} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-800 text-lg">{table.name}</h3>
                  <Badge color={table.type === 'FACT' ? 'blue' : 'yellow'}>{table.type}</Badge>
                </div>
                <span className="text-sm font-mono text-slate-500">{table.rows} rows</span>
              </div>
              <p className="text-slate-600 mb-4">{table.desc}</p>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Columns</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {table.cols.map((col, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-mono border border-slate-200">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Styles injected here to avoid external file issues */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-radius: 20px;
        }
      `}</style>
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                DW
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">Data<span className="text-blue-600">Ware</span></span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                System Operational
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 sticky top-24">
              {[
                { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                { id: 'etl', label: 'ETL Pipelines', icon: Server },
                { id: 'catalog', label: 'Data Dictionary', icon: Book },
              ].map((item) => {
                 const Icon = item.icon === Book ? Database : item.icon; 
                 return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                    {item.label}
                  </button>
                )
              })}
            </div>
            
            <div className="mt-6 bg-indigo-900 rounded-xl p-6 text-white relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-700 rounded-full blur-xl opacity-50"></div>
               
               <h3 className="font-bold relative z-10">Project Status</h3>
               <p className="text-indigo-200 text-xs mt-1 mb-4 relative z-10">Final Submission Ready</p>
               <div className="space-y-2 relative z-10">
                 <div className="flex justify-between text-xs">
                   <span>Documentation</span>
                   <span>100%</span>
                 </div>
                 <div className="w-full h-1.5 bg-indigo-800 rounded-full">
                   <div className="h-full bg-indigo-400 rounded-full w-full"></div>
                 </div>
               </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">
                {activeTab === 'dashboard' && 'Executive Overview'}
                {activeTab === 'etl' && 'ETL Orchestration'}
                {activeTab === 'catalog' && 'Data Warehouse Catalog'}
              </h1>
              <p className="text-slate-500">
                {activeTab === 'dashboard' && 'Real-time insights from the Gold Layer.'}
                {activeTab === 'etl' && 'Manage and monitor data pipelines.'}
                {activeTab === 'catalog' && 'Documentation for facts and dimensions.'}
              </p>
            </div>

            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'etl' && renderETL()}
            {activeTab === 'catalog' && renderDataCatalog()}
          </main>
        </div>
      </div>
    </div>
  );
}

// Temporary Helper for the missing "Book" icon import
const Book = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);