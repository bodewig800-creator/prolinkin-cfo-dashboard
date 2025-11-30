'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, User, Users, Wrench, Fuel, Calendar, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

// --- GROUND TRUTH DATA & SIMULATION ---

// 1. FLEET DATA (9 Units)
const fleet = [
  { id: 'TRK-001', type: 'XCMG Dump', status: 'Active', driver: 'Mamadou B.', fuel_avg: 54.2, target: 55 },
  { id: 'TRK-002', type: 'XCMG Dump', status: 'Active', driver: 'Ibrahima S.', fuel_avg: 56.1, target: 55 },
  { id: 'TRK-003', type: 'XCMG Dump', status: 'Maintenance', driver: 'Unassigned', fuel_avg: 0, target: 55 },
  { id: 'TRK-004', type: 'XCMG Dump', status: 'Active', driver: 'Alpha O.', fuel_avg: 53.8, target: 55 },
  { id: 'TRK-005', type: 'XCMG Dump', status: 'Active', driver: 'Ousmane D.', fuel_avg: 55.0, target: 55 },
  { id: 'TRK-006', type: 'XCMG Dump', status: 'Active', driver: 'Sekou T.', fuel_avg: 54.5, target: 55 },
  { id: 'TRK-007', type: 'Sinotruk', status: 'Active', driver: 'Moussa C.', fuel_avg: 58.2, target: 55 }, // Less efficient
  { id: 'TRK-008', type: 'Sinotruk', status: 'Tire Issue', driver: 'Abdoulaye K.', fuel_avg: 0, target: 55 },
  { id: 'TNK-001', type: 'Tanker', status: 'Active', driver: 'Fode S.', fuel_avg: 48.0, target: 50 },
];

// 2. WORKFORCE DATA (16 Drivers + Staff)
const workforce = [
  { role: 'Drivers (Heavy)', count: 16, status: '14 Active / 2 Rest', cost: '4.3M GNF/mo avg' },
  { role: 'Mechanics', count: 3, status: 'Active', cost: 'Fixed Salary' },
  { role: 'Admin/Ops', count: 4, status: 'Active', cost: 'Fixed Salary' },
];

// 3. REVENUE DATA (Simulated based on 7.17B Total)
// Monthly (Feb - Nov)
const monthlyRevenue = [
  { name: 'Feb', value: 450000000 },
  { name: 'Mar', value: 680000000 },
  { name: 'Apr', value: 720000000 },
  { name: 'May', value: 810000000 },
  { name: 'Jun', value: 790000000 },
  { name: 'Jul', value: 850000000 },
  { name: 'Aug', value: 620000000 }, // Rain impact
  { name: 'Sep', value: 750000000 },
  { name: 'Oct', value: 910000000 },
  { name: 'Nov', value: 590000000 }, // Current partial
];

// Weekly (Last 4 Weeks)
const weeklyRevenue = [
  { name: 'Wk 42', value: 185000000 },
  { name: 'Wk 43', value: 192000000 },
  { name: 'Wk 44', value: 210000000 },
  { name: 'Wk 45', value: 178000000 },
];

// Daily (Last 7 Days)
const dailyRevenue = [
  { name: 'Mon', value: 28000000 },
  { name: 'Tue', value: 32000000 },
  { name: 'Wed', value: 29500000 },
  { name: 'Thu', value: 35000000 },
  { name: 'Fri', value: 31000000 },
  { name: 'Sat', value: 18000000 },
  { name: 'Sun', value: 0 }, // Rest day
];

const formatGNF = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GNF', notation: 'compact' }).format(val);

export default function ProlinkinDashboardV3() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#004e92]">PROLINKON GUINEE</h1>
          <p className="text-slate-600">Operations Command Center v3.0</p>
        </div>
        <div className="flex gap-3">
           <div className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium shadow-sm flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-500" /> 9 Units
           </div>
           <div className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium shadow-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" /> 23 Staff
           </div>
        </div>
      </header>

      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg border shadow-sm">
          <TabsTrigger value="financials" className="px-6 py-2">💰 Financial Overview</TabsTrigger>
          <TabsTrigger value="operations" className="px-6 py-2">🚚 Ops & Fleet (New)</TabsTrigger>
          <TabsTrigger value="revenue" className="px-6 py-2">📈 Detailed Income (New)</TabsTrigger>
        </TabsList>

        {/* --- 1. FINANCIALS (Summary) --- */}
        <TabsContent value="financials">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-t-4 border-green-500">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Total Revenue</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">7.17B GNF</div></CardContent>
            </Card>
            <Card className="border-t-4 border-blue-500">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Net Profit</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">2.50B GNF</div></CardContent>
            </Card>
            <Card className="border-t-4 border-red-500">
               <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Burn Rate (Fuel/Salaries)</CardTitle></CardHeader>
               <CardContent><div className="text-2xl font-bold">~320M GNF/mo</div></CardContent>
            </Card>
           </div>
        </TabsContent>

        {/* --- 2. OPERATIONS (Fleet & Workers) --- */}
        <TabsContent value="operations" className="space-y-6">
           {/* Fleet Status Table */}
           <Card>
             <CardHeader><CardTitle className="flex items-center gap-2"><Truck className="w-5 h-5" /> Fleet Status</CardTitle></CardHeader>
             <CardContent>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                     <tr>
                       <th className="px-4 py-3">Unit ID</th>
                       <th className="px-4 py-3">Type</th>
                       <th className="px-4 py-3">Status</th>
                       <th className="px-4 py-3">Assigned Driver</th>
                       <th className="px-4 py-3">Fuel Avg</th>
                       <th className="px-4 py-3">Efficiency</th>
                     </tr>
                   </thead>
                   <tbody>
                     {fleet.map((truck) => (
                       <tr key={truck.id} className="border-b hover:bg-slate-50">
                         <td className="px-4 py-3 font-medium">{truck.id}</td>
                         <td className="px-4 py-3">{truck.type}</td>
                         <td className="px-4 py-3">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold ${truck.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {truck.status}
                           </span>
                         </td>
                         <td className="px-4 py-3">{truck.driver}</td>
                         <td className="px-4 py-3">{truck.fuel_avg} L/Trip</td>
                         <td className="px-4 py-3">
                            {truck.fuel_avg > 0 && truck.fuel_avg <= truck.target ? 
                              <CheckCircle className="w-4 h-4 text-green-500" /> : 
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                            }
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </CardContent>
           </Card>

           {/* Workforce Summary */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Workforce Allocation</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workforce.map((group) => (
                      <div key={group.role} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <div>
                          <div className="font-medium">{group.role}</div>
                          <div className="text-xs text-slate-500">{group.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{group.count}</div>
                          <div className="text-xs text-slate-500">{group.cost}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                 <CardHeader><CardTitle className="text-blue-800">Operational Alerts</CardTitle></CardHeader>
                 <CardContent className="space-y-3">
                    <div className="flex gap-3 items-start">
                       <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                       <p className="text-sm text-blue-900"><strong>Tire Mismatch:</strong> TRK-008 is grounded. Missing 13R22.5 spare. Impact: -25M GNF/week.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                       <Fuel className="w-5 h-5 text-amber-600 shrink-0" />
                       <p className="text-sm text-blue-900"><strong>Fuel Drift:</strong> TRK-007 (Sinotruk) averaging 58.2L (+3.2L over target). Driver coaching required.</p>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        {/* --- 3. REVENUE (Charts) --- */}
        <TabsContent value="revenue" className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Monthly Income Trend (2024)</CardTitle></CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} tickFormatter={formatGNF} />
                      <Tooltip formatter={(value) => formatGNF(Number(value))} />
                      <Line type="monotone" dataKey="value" stroke="#004e92" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Weekly Income (Last Month)</CardTitle></CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} tickFormatter={formatGNF} />
                      <Tooltip formatter={(value) => formatGNF(Number(value))} />
                      <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
           </div>
           
           <Card>
              <CardHeader><CardTitle>Daily Income (Last 7 Days)</CardTitle></CardHeader>
              <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyRevenue} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={50} />
                      <Tooltip formatter={(value) => formatGNF(Number(value))} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
