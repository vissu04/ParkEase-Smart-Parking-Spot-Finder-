import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <div className="fixed top-0 left-0 h-screen w-64">
        <Sidebar />
      </div>
      
      <div className="ml-64 bg-gray-100 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
}