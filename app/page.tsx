'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, AlertTriangle, CheckCircle, TrendingUp, Wallet } from 'lucide-react';

export default function ProlinkinDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Prolinkin Guinea AI-CFO</h1>
          <p className="text-slate-600">Autonomous Financial & Operational Oversight</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
          <CheckCircle className="w-4 h-4" />
          <span>System Status: OPTIMAL</span>
        </div>
      </header>

      <Tabs defaultValue="cfo" className="space-y-4">
        <TabsList className="bg-white p-1 rounded-lg border">
          <TabsTrigger value="cfo" className="px-4 py-2">💰 AI-CFO Dashboard</TabsTrigger>
          <TabsTrigger value="coo" className="px-4 py-2">🚚 AI-COO Operations</TabsTrigger>
          <TabsTrigger value="audit" className="px-4 py-2">🛡️ Justinian Audit Log</TabsTrigger>
        </TabsList>

        {/* --- CFO TAB: The Financial Truth --- */}
        <TabsContent value="cfo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-green-500 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Monthly Revenue (Proj.)</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">7.17B GNF</div></CardContent>
            </Card>
            <Card className="border-l-4 border-blue-500 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Monthly Net Profit</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">6.37B GNF</div></CardContent>
            </Card>
            <Card className="border-l-4 border-red-500 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Total Debt Service</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">(148.2M) GNF</div></CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="shadow-sm">
              <CardHeader><CardTitle>Active Liabilities (Verified)</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                    <div>
                      <div className="font-semibold">VISTA Bank Lease</div>
                      <div className="text-sm text-slate-500">5x XCMG Trucks (36mo)</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">3.72B GNF</div>
                      <div className="text-xs text-slate-400">148M/mo</div>
                    </div>
                  </li>
                  <li className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                    <div>
                      <div className="font-semibold">Founder Loan</div>
                      <div className="text-sm text-slate-500">Capital Injection</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">92,000 EUR</div>
                      <div className="text-xs text-slate-400">Repayment Pending</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
               <CardHeader><CardTitle>Cash Flow Alerts</CardTitle></CardHeader>
               <CardContent>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-yellow-800">Dec 2025 Maturity</div>
                      <p className="text-sm text-yellow-700">Principal payment of 728M GNF due for Internal Loan. Verify liquidity.</p>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- COO TAB: Operations & Risks --- */}
        <TabsContent value="coo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm">
              <CardHeader><CardTitle>Fleet Status</CardTitle></CardHeader>
               <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span>Dump Trucks (XCMG)</span>
                    <span className="font-mono font-bold">6 Units</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Dump Trucks (SINOTRUK)</span>
                    <span className="font-mono font-bold">2 Units</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Petrol Tanker</span>
                    <span className="font-mono font-bold">1 Unit</span>
                  </div>
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded flex gap-2 items-center text-red-700">
                     <AlertTriangle className="w-4 h-4" />
                     <span className="text-sm font-bold">COMPLIANCE ALERT: 8/10 Trucks (UMS Min.)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader><CardTitle>Maintenance Risks</CardTitle></CardHeader>
              <CardContent>
                 <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="font-bold text-red-800 flex items-center gap-2">
                       <AlertTriangle className="w-4 h-4" /> CRITICAL: Tire Mismatch
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      Inventory: 130x 12.00R20 (XCMG Only)<br/>
                      <span className="font-bold">Stockout:</span> 0x 13R22.5 (SINOTRUK)<br/>
                      Risk: 2 Trucks grounded if flat tire occurs.
                    </p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
