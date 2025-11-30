'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Users, Fuel, AlertTriangle, Wallet, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- 1. FINANCIAL DATA (Source: ETAT PROVISOIRE) ---
const financialKPIs = [
  { title: 'Total Revenue', value: '7.17B GNF', trend: '+100%', color: 'text-green-600', border: 'border-green-500' },
  { title: 'Net Profit', value: '2.50B GNF', trend: '34.8% Margin', color: 'text-blue-600', border: 'border-blue-500' },
  { title: 'Operating Costs', value: '3.28B GNF', trend: '45% Ratio', color: 'text-red-600', border: 'border-red-500' },
  { title: 'Cash on Hand', value: '97.08M GNF', trend: '⚠ Low Liquidity', color: 'text-amber-600', border: 'border-amber-500' },
];

// --- 2. OPERATIONAL DATA (Source: User Input + Fleet Logs) ---
const fleetData = [
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

// --- 3. REVENUE TRENDS (Simulated Breakdown of 7.17B Total) ---
const monthlyData = [
  { name: 'Feb', income: 450 }, { name: 'Mar', income: 680 }, { name: 'Apr', income: 720 },
  { name: 'May', income: 810 }, { name: 'Jun', income: 790 }, { name: 'Jul', income: 850 },
  { name: 'Aug', income: 620 }, { name: 'Sep', income: 750 }, { name: 'Oct', income: 910 },
  { name: 'Nov', income: 590 },
]; // Values in Million GNF

const weeklyData = [
  { name: 'Wk 1', income: 185 }, { name: 'Wk 2', income: 192 },
  { name: 'Wk 3', income: 210 }, { name: 'Wk 4', income: 178 },
];

const dailyData = [
  { name: 'Mon', income: 28 }, { name: 'Tue', income: 32 }, { name: 'Wed', income: 29 },
  { name: 'Thu', income: 35 }, { name: 'Fri', income: 31 }, { name: 'Sat', income: 18 },
  { name: 'Sun', income: 0 },
];

const formatMoney = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GNF', notation: 'compact' }).format(val * 1000000);


export default function ProlinkinDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#004e92]">PROLINKON GUINEE</h1>
          <p className="text-slate-600">Operational Command Center</p>
        </div>
        <div className="px-4 py-2 bg-white border rounded shadow-sm flex gap-4">
           <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-blue-600"/> <span className="font-bold">9 Trucks</span></div>
           <div className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-600"/> <span className="font-bold">16 Drivers</span></div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border p-1 rounded-lg shadow-sm">
          <TabsTrigger value="overview" className="px-6 py-2">📊 CFO Overview</TabsTrigger>
          <TabsTrigger value="operations" className="px-6 py-2">🚚 Ops & Fleet</TabsTrigger>
          <TabsTrigger value="revenue" className="px-6 py-2">📈 Revenue Detail</TabsTrigger>
        </TabsList>

        {/* --- TAB 1: CFO OVERVIEW --- */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card>
               <CardHeader><CardTitle>Expense Breakdown</CardTitle></CardHeader>
               <CardContent>
                 <div className="space-y-4">
                    <div className="flex justify-between border-b pb-1"><span>Fuel & Consumables</span><span className="font-bold">1.15B GNF</span></div>
                    <div className="flex justify-between border-b pb-1"><span>Personnel</span><span className="font-bold">551M GNF</span></div>
                    <div className="flex justify-between border-b pb-1"><span>Maintenance/Services</span><span className="font-bold">386M GNF</span></div>
                    <div className="flex justify-between border-b pb-1"><span>Depreciation</span><span className="font-bold">1.30B GNF</span></div>
                 </div>
               </CardContent>
             </Card>
             <Card className="bg-red-50 border-red-200">
                <CardHeader><CardTitle className="text-red-800">Critical Alerts</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm text-red-700">
                   <div className="flex gap-2"><AlertTriangle className="w-4 h-4"/> <span><strong>Liquidity:</strong> Cash (97M) covers only 3% of Supplier Debt.</span></div>
                   <div className="flex gap-2"><AlertTriangle className="w-4 h-4"/> <span><strong>Tire Stock:</strong> Critical shortage of 13R22.5 spares.</span></div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>

        {/* --- TAB 2: OPERATIONS --- */}
        <TabsContent value="operations" className="space-y-6">
           <Card>
             <CardHeader><CardTitle>Fleet & Driver Status</CardTitle></CardHeader>
             <CardContent>
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                   <tr>
                     <th className="px-4 py-3">Unit</th>
                     <th className="px-4 py-3">Type</th>
                     <th className="px-4 py-3">Driver</th>
                     <th className="px-4 py-3">Status</th>
                     <th className="px-4 py-3">Fuel (L/Trip)</th>
                   </tr>
                 </thead>
                 <tbody>
                   {fleet.map((t) => (
                     <tr key={t.id} className="border-b hover:bg-slate-50">
                       <td className="px-4 py-3 font-bold">{t.id}</td>
                       <td className="px-4 py-3">{t.type}</td>
                       <td className="px-4 py-3">{t.driver}</td>
                       <td className="px-4 py-3">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${t.status==='Active'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{t.status}</span>
                       </td>
                       <td className="px-4 py-3 flex items-center gap-2">
                         {t.fuel} 
                         {t.fuel > t.target && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </CardContent>
           </Card>
           <div className="grid grid-cols-3 gap-4">
              {workersData.map(w => (
                 <Card key={w.role}>
                    <CardContent className="pt-6 text-center">
                       <div className="text-2xl font-bold text-[#004e92]">{w.count}</div>
                       <div className="text-sm text-slate-500">{w.role}</div>
                       <div className="text-xs text-slate-400 mt-1">{w.cost}</div>
                    </CardContent>
                 </Card>
              ))}
           </div>
        </TabsContent>

        {/* --- TAB 3: REVENUE DETAILS --- */}
        <TabsContent value="revenue" className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                 <CardHeader><CardTitle>Monthly Income (2024)</CardTitle></CardHeader>
                 <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(val) => (val/1000000) + 'M'} />
                          <Tooltip formatter={(val) => formatMoney(Number(val)/1000000)} />
                          <Line type="monotone" dataKey="income" stroke="#004e92" strokeWidth={3} />
                       </LineChart>
                    </ResponsiveContainer>
                 </CardContent>
              </Card>
              <div className="space-y-6">
                 <Card>
                    <CardHeader><CardTitle>Weekly Income (Last 4 Weeks)</CardTitle></CardHeader>
                    <CardContent className="h-[150px]">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyData}>
                             <XAxis dataKey="name" />
                             <Tooltip formatter={(val) => formatMoney(Number(val)/1000000)} />
                             <Bar dataKey="income" fill="#22c55e" />
                          </BarChart>
                       </ResponsiveContainer>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader><CardTitle>Daily Income (Last 7 Days)</CardTitle></CardHeader>
                    <CardContent className="h-[150px]">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dailyData}>
                             <XAxis dataKey="name" />
                             <Tooltip formatter={(val) => formatMoney(Number(val)/1000000)} />
                             <Bar dataKey="income" fill="#3b82f6" />
                          </BarChart>
                       </ResponsiveContainer>
                    </CardContent>
                 </Card>
              </div>
           </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
