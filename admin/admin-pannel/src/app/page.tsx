import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex gap-20">
      <Sidebar />
      <h1>Admin Dashboard</h1>
    </div>
  );
}
