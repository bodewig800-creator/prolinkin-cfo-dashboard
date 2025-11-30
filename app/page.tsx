'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, AlertTriangle, CheckCircle, TrendingUp, Wallet, PieChart, Fuel, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- GROUND TRUTH DATA (Sourced from CSVs) ---
const financialData = [
  { name: 'Transport Revenue', value: 7170576018, color: '#22c55e' },
  { name: 'Operating Costs', value: 3275306842, color: '#ef4444' }, // Transport + Ext. Services + Personnel + Consumables
  { name: 'Net Profit', value: 2495555977, color: '#3b82f6' }
];

const costBreakdown = [
  { name: 'Fuel/Consumables', value: 1152555000 }, // Note 23
  { name: 'Ext. Services', value: 386730631 }, // Note 24
  { name: 'Personnel', value: 551168000 }, // Note 27A
  { name: 'Depreciation', value: 1299712296 }, // Note 28
];

export default function ProlinkinDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#004e92]">PROLINKON GUINEE</h1>
          <p className="text-slate-600">AI-Driven Business Plan & Operations (Live)</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium border border-blue-200">
          <CheckCircle className="w-4 h-4" />
          <span>Data Source: ETAT PROVISOIRE (Feb 2024)</span>
        </div>
      </header>

      <Tabs defaultValue="financials" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg border shadow-sm">
          <TabsTrigger value="financials" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">💰 Financial Performance</TabsTrigger>
          <TabsTrigger value="operations" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">🚚 Fleet Operations</TabsTrigger>
          <TabsTrigger value="risks" className="px-6 py-2 data-[state=active]:bg-red-50 data-[state=active]:text-red-700">⚠️ Risk Radar</TabsTrigger>
        </TabsList>

        {/* --- FINANCIALS TAB --- */}
        <TabsContent value="financials" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-green-500 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.17B GNF</div>
                <div className="text-xs text-green-600 font-medium">+100% (New Ops)</div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-blue-500 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Net Profit (Resultat)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.50B GNF</div>
                <div className="text-xs text-blue-600 font-medium">34.8% Margin</div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-red-500 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Total Debt</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.87B GNF</div>
                <div className="text-xs text-slate-500">Leverage Ratio: High</div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-amber-500 shadow-sm bg-amber-50/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Cash on Hand</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">97.08M GNF</div>
                <div className="text-xs text-amber-600 font-bold">⚠ LIQUIDITY ALERT</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader><CardTitle>P&L Overview</CardTitle></CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis hide />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GNF', notation: 'compact' }).format(Number(value))} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {financialData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader><CardTitle>Cost Structure Analysis</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costBreakdown.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-slate-500">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GNF', notation: 'compact' }).format(item.value)}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: `${(item.value / 3275306842) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 mt-4 border-t text-xs text-slate-500">
                    *Fuel/Consumables is the #1 Cash Expense. Strict monitoring required.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- OPERATIONS TAB --- */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Fleet Size</CardTitle>
                 <Truck className="h-4 w-4 text-slate-500" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">9 Units</div>
                 <p className="text-xs text-slate-500">6 XCMG, 2 Sino, 1 Tanker</p>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Workforce</CardTitle>
                 <Users className="h-4 w-4 text-slate-500" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">16 Drivers</div>
                 <p className="text-xs text-slate-500">Avg Salary: 4.3M GNF/mo</p>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Fuel Target</CardTitle>
                 <Fuel className="h-4 w-4 text-slate-500" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">55 L/Trip</div>
                 <p className="text-xs text-slate-500">Current Cost: 1.15B GNF</p>
               </CardContent>
             </Card>
          </div>
        </TabsContent>

         {/* --- RISKS TAB --- */}
         <TabsContent value="risks" className="space-y-6">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-800">Liquidity Crunch Warning</h3>
                  <p className="text-red-700 mt-1">
                    Cash on hand (97M GNF) is insufficient to cover immediate Supplier Debts (3.08B GNF).
                    <br/><strong>Recommendation:</strong> Prioritize receivable collection and restructure short-term bank debt (2.45B GNF).
                  </p>
                </div>
              </div>
            </div>
         </TabsContent>
      </Tabs>
    </div>
  );
}
