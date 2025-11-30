'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Users, Fuel, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- HELPER FUNCTIONS (The Fix) ---
const formatMoney = (val: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'GNF', 
    notation: 'compact' 
  }).format(val);
};

// --- 1. FINANCIAL DATA ---
const financialKPIs = [
  { title: 'Total Revenue', value: '7.17B GNF', trend: '+100%', color: 'text-green-600', border: 'border-green-500' },
  { title: 'Net Profit', value: '2.50B GNF', trend: '34.8% Margin', color: 'text-blue-600', border: 'border-blue-500' },
  { title: 'Operating Costs', value: '3.28B GNF', trend: '45% Ratio', color: 'text-red-600', border: 'border-red-500' },
  { title: 'Cash on Hand', value: '97.08M GNF', trend: '⚠ Low Liquidity', color: 'text-amber-600', border: 'border-amber-500' },
];

// --- 2. OPERATIONAL DATA ---
const fleet = [
  { id: 'TRK-01', type: 'XCMG', driver: 'Mamadou B.', status: 'Active', fuel: 54, target: 55 },
  { id: 'TRK-02', type: 'XCMG', driver: 'Ibrahima S.', status: 'Active', fuel: 55, target: 55 },
  { id: 'TRK-03', type: 'XCMG', driver: 'Alpha O.', status: 'Maintenance', fuel: 0, target: 55 },
  { id: 'TRK-04', type: 'XCMG', driver: 'Ousmane D.', status: 'Active', fuel: 56, target: 55 },
  { id: 'TRK-05', type: 'XCMG', driver: 'Sekou T.', status: 'Active', fuel: 53, target: 55 },
  { id: 'TRK-06', type: 'XCMG', driver: 'Fode K.', status: 'Active', fuel: 55, target: 55 },
  { id: 'TRK-07', type: 'Sinotruk', driver: 'Moussa C.', status: 'Active', fuel: 58, target: 55 },
  { id: 'TRK-08', type: 'Sinotruk', driver: 'Abdoulaye K.', status: 'Grounded', fuel: 0, target: 55 },
  { id: 'TNK-01', type: 'Tanker', driver: 'Salifou D.', status: 'Active', fuel: 48, target: 50 },
];

const workersData = [
  { role: 'Drivers', count: 16, cost: '69M GNF/mo' },
  { role: 'Mechanics', count: 3, cost: 'Fixed' },
  { role: 'Admin/Ops', count: 4, cost: 'Fixed' },
];

// --- 3. REVENUE DATA ---
const monthlyRevenue = [
  { name: 'Feb', income: 450000000 }, { name: 'Mar', income: 680000000 }, { name: 'Apr', income: 720000000 },
  { name: 'May', income: 810000000 }, { name: 'Jun', income: 790000000 }, { name: 'Jul', income: 850000000 },
  { name: 'Aug', income: 620000000 }, { name: 'Sep', income: 750000000 }, { name: 'Oct', income: 910000000 },
  { name: 'Nov', income: 590000000 },
];
const weeklyRevenue = [
  { name: 'Wk 1', income: 185000000 }, { name: 'Wk 2', income: 192000000 },
  { name: 'Wk 3', income: 210000000 }, { name: 'Wk 4', income: 178000000 },
];
const dailyRevenue = [
  { name: 'Mon', income: 28000000 }, { name: 'Tue', income: 32000000 }, { name: 'Wed', income: 29500000 },
  { name: 'Thu', income: 35000000 }, { name: 'Fri', income: 31000000 }, { name: 'Sat', income: 18000000 },
  { name: 'Sun', income: 0 },
];

export default function ProlinkinDashboard() {
  // CRITICAL FIX: Ensure Client-Side Rendering for Charts
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="p-10 text-center text-slate-500">Initializing AXIOM Neural Link...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#004e92]">PROLINKON GUINEE</h1>
          <p className="text-slate-600">Operational Command Center v5.0</p>
        </div>
        <div className="px-4 py-2 bg-white border rounded shadow-sm flex gap-4">
           <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-blue-600"/> <span className="font-bold">9 Trucks</span></div>
           <div className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-600"/> <span className="font-bold">16 Drivers</span></div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border p-1 rounded-lg shadow-sm flex-wrap h-auto">
          <TabsTrigger value="overview" className="px-6 py-2">📊 CFO Overview</TabsTrigger>
          <TabsTrigger value="operations" className="px-6 py-2">🚚 Ops & Fleet</TabsTrigger>
          <TabsTrigger value="revenue" className="px-6 py-2">📈 Revenue Detail</TabsTrigger>
          <TabsTrigger value="plan" className="px-6 py-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">📘 Business Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {financialKPIs.map((kpi) => (
              <Card key={kpi.title} className={`border-l-4 ${kpi.border} shadow-sm`}>
                <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">{kpi.title}</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className={`text-xs font-bold ${kpi.color}`}>{kpi.trend}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
           <Card>
             <CardHeader><CardTitle>Fleet Status</CardTitle></CardHeader>
             <CardContent>
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                   <tr><th className="px-4 py-3">Unit</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Driver</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Fuel</th></tr>
                 </thead>
                 <tbody>
                   {fleet.map((t) => (
                     <tr key={t.id} className="border-b hover:bg-slate-50">
                       <td className="px-4 py-3 font-bold">{t.id}</td>
                       <td className="px-4 py-3">{t.type}</td>
                       <td className="px-4 py-3">{t.driver}</td>
                       <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-slate-100 text-xs font-bold">{t.status}</span></td>
                       <td className="px-4 py-3">{t.fuel} L</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                 <CardHeader><CardTitle>Monthly Income (2024)</CardTitle></CardHeader>
                 <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={monthlyRevenue}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(val) => (val/1000000) + 'M'} />
                          <Tooltip formatter={(val) => formatMoney(Number(val))} />
                          <Line type="monotone" dataKey="income" stroke="#004e92" strokeWidth={3} />
                       </LineChart>
                    </ResponsiveContainer>
                 </CardContent>
              </Card>
              <div className="space-y-6">
                 <Card><CardHeader><CardTitle>Weekly Income</CardTitle></CardHeader><CardContent className="h-[150px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeklyRevenue}><XAxis dataKey="name" /><Tooltip formatter={(val) => formatMoney(Number(val))} /><Bar dataKey="income" fill="#22c55e" /></BarChart></ResponsiveContainer></CardContent></Card>
                 <Card><CardHeader><CardTitle>Daily Income</CardTitle></CardHeader><CardContent className="h-[150px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={dailyRevenue}><XAxis dataKey="name" /><Tooltip formatter={(val) => formatMoney(Number(val))} /><Bar dataKey="income" fill="#3b82f6" /></BarChart></ResponsiveContainer></CardContent></Card>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
            <Card className="bg-white border-l-4 border-purple-500">
               <CardHeader><CardTitle className="text-2xl text-purple-900">Prolinkon Guinea: Strategic Roadmap (2025)</CardTitle></CardHeader>
               <CardContent className="prose max-w-none text-slate-700 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">1. Executive Summary</h3>
                    <p>Prolinkon Guinee is a high-growth logistics company operating in the Boké mining corridor. Launched on Feb 14, 2024, it generated <strong>7.17 Billion GNF</strong> in revenue with a <strong>34.8% Net Profit Margin</strong>. The company currently faces a liquidity paradox: high profitability but low cash reserves due to fleet expansion.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded border border-slate-200">
                       <h4 className="font-bold text-[#004e92] mb-2">2. Operational Baseline</h4>
                       <ul className="list-disc list-inside text-sm space-y-1">
                          <li><strong>Fleet:</strong> 9 Heavy Units (6 XCMG, 2 Sinotruk, 1 Tanker)</li>
                          <li><strong>Workforce:</strong> 16 Drivers</li>
                          <li><strong>Route:</strong> Boké Corridor (60km)</li>
                          <li><strong>Fuel Protocol:</strong> 55L per trip (Strict)</li>
                       </ul>
                    </div>
                    <div className="p-4 bg-slate-50 rounded border border-slate-200">
                       <h4 className="font-bold text-green-700 mb-2">3. Financial Ground Truth</h4>
                       <ul className="list-disc list-inside text-sm space-y-1">
                          <li><strong>Revenue:</strong> 7.17B GNF</li>
                          <li><strong>EBITDA:</strong> 5.08B GNF</li>
                          <li><strong>Net Profit:</strong> 2.50B GNF</li>
                          <li><strong>Cash:</strong> 97M GNF (Critical)</li>
                       </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">4. Strategic Objectives (Q1-Q3 2025)</h3>
                    <div className="space-y-4">
                       <div className="flex gap-3 items-start">
                          <div className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded text-xs mt-0.5">PHASE 1</div>
                          <div><strong>Stabilize Liquidity:</strong> Restructure 2.45B GNF short-term debt to long-term to free up cash flow for operations.</div>
                       </div>
                       <div className="flex gap-3 items-start">
                          <div className="bg-purple-100 text-purple-800 font-bold px-2 py-1 rounded text-xs mt-0.5">PHASE 2</div>
                          <div><strong>Optimize Operations:</strong> Deploy AI-COO (GPS) to enforce fuel caps and reduce maintenance costs by 15%.</div>
                       </div>
                       <div className="flex gap-3 items-start">
                          <div className="bg-green-100 text-green-800 font-bold px-2 py-1 rounded text-xs mt-0.5">PHASE 3</div>
                          <div><strong>Scale Fleet:</strong> Reinvest profits to acquire 2 additional units, targeting 10B GNF annual revenue.</div>
                       </div>
                    </div>
                  </div>
               </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
