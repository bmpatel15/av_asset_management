'use client'

import { InventoryReport } from "@/components/reports/inventory-report"
import { UsageReport } from "@/components/reports/usage-report"
import { MaintenanceReport } from "@/components/reports/maintenance-report"
import { useAuth } from "@/hooks/use-auth"

export default function ReportsPage() {
  const { hasPermission } = useAuth()

  if (!hasPermission('VIEW_REPORTS')) {
    return <div>You don&apos;t have permission to view reports.</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="grid gap-6">
        <InventoryReport />
        <UsageReport />
        <MaintenanceReport />
      </div>
    </div>
  )
}

