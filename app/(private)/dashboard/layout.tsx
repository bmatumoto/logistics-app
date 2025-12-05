import SideNav from "@/components/layout/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 bg-stone-950">
        <SideNav />
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-12 bg-stone-600 font-sans">
        {children}
      </div>
    </div>
  );
}
