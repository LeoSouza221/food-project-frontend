import { Utensils } from "lucide-react";

const AdminHeader = () => (
  <header className="flex h-16 items-center gap-3 border-b bg-background px-6">
    <Utensils className="size-6" />
    <h1 className="text-xl font-heading font-semibold">Food Project</h1>

    <span className="ml-auto text-sm text-muted-foreground">Administração</span>
  </header>
);

export default AdminHeader;
