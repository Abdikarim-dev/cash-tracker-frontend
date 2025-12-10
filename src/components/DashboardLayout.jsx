import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex bg-slate-50">
      {/* Sidebar 250px - width iyo full height */}
      <Sidebar />
      {/* Main area */}
      <main className="p-8 flex-1 overflow-y-auto">
        <Outlet />
        {/* Dashboard/Home */}
        {/* Users */}
        {/* Accounts */}
        {/* Transactions */}
        {/* Transfers */}
        {/* Audits*/}
      </main>
    </div>
  );
};

export default DashboardLayout;
