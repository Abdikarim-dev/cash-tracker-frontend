import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const {
    state: { isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
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
