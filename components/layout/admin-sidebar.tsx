import { Package, Users, Settings } from "lucide-react";

import Link from "next/link";

const AdminSidebar = () => (
  <aside className="w-60 shrink-0 border-r bg-sidebar py-4">
    <nav>
      <ul className="flex flex-col gap-1 px-3">
        <li>
          <Link
            className="flex items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 text-sm font-medium"
            href="/admin/products"
          >
            <Package className="size-4" />
            Produtos
          </Link>
        </li>

        <li>
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
            href="/admin/users"
          >
            <Users className="size-4" />
            Usuários
          </Link>
        </li>

        <li>
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
            href="/admin/settings"
          >
            <Settings className="size-4" />
            Configurações
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default AdminSidebar;
