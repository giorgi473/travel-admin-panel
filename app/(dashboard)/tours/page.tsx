import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { SidebarProvider } from "@/components/sidebar-provider";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Tours</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's your tourism overview.
                </p>
              </div>
              <section>sdsdsd</section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
