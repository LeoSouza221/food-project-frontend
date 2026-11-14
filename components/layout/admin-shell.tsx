import type { ReactNode } from "react";

import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";

interface AdminShellProps {
  children: ReactNode;
}

const AdminShell = ({ children }: AdminShellProps) => (
  <div className="flex min-h-screen flex-col">
    <AdminHeader />

    <div className="flex flex-1">
      <AdminSidebar />

      <main className="min-w-0 flex-1 bg-muted/30 p-6">{children}</main>
    </div>
  </div>
);

export default AdminShell;
