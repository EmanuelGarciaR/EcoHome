import MobileNav from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-[60px] lg:pb-0">
      {children}
      <MobileNav />
    </div>
  );
}
