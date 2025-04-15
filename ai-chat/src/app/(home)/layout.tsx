import AppHeader from "@/components/app-header/app-header";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col">
          <AppHeader />
          <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
