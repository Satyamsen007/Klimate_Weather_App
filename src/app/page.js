'use client';

import DashboardPage from "@/pages/DashboardPage";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      < DashboardPage />
    </div>
  );
}
