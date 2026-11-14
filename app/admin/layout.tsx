import type { ReactNode } from "react";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import AdminShell from "@/components/layout/admin-shell";
import { getCurrentUser } from "@/lib/dal";

interface AdminContentProps {
  children: ReactNode;
}

async function AdminContent({ children }: AdminContentProps) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">Carregando painel...</div>
      }
    >
      <AdminContent>{children}</AdminContent>
    </Suspense>
  );
}
