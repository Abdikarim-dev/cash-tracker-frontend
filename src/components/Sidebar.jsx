import {
  FaAirbnb,
  FaHome,
  FaPiggyBank,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { FaAmazon } from "react-icons/fa6";

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { dispatch } = useAuth();

  return (
    <div className="h-full w-16 lg:w-64 bg-white flex flex-col border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        {/* Logo */}
        <span className="text-2xl font-semibold">
          <h2 className="hidden lg:block">CASH</h2>
          <h4 className="lg:hidden">C</h4>
        </span>
      </div>
      <nav className="flex-grow">
        {/* Navigation Links */}
        <ul className="space-y-2 py-4">
          <SidebarItem
            title={"Home"}
            icon={FaHome}
            href="/dashboard"
            text="Home"
          />
          <SidebarItem
            title={"Users"}
            icon={FaUsers}
            href="/dashboard/user"
            text="Users"
          />
          <SidebarItem
            title={"Accounts"}
            icon={FaPiggyBank}
            href="/dashboard/account"
            text="Accounts"
          />
          <SidebarItem
            title={"Transactions"}
            icon={FaAirbnb}
            href="/dashboard/transaction"
            text="Transactions"
          />
          <SidebarItem
            title={"Transfers"}
            icon={FaAmazon}
            href="/dashboard/transfer"
            text="Transfers"
          />
          <SidebarItem
            title={"Audits"}
            icon={FaAmazon}
            href="/dashboard/audit"
            text="Audits"
          />
        </ul>
      </nav>
      <div className="flex items-center justify-center lg:justify-start p-4 border-t border-gray-200">
        <button
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            toast.error("User Logged out successfully")
          }}
          className="flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          <FaSignOutAlt className={"lg:mr-2 text-lg"} />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ href, text, icon: Icon, title }) => {
  const location = useLocation();
  const checkActive = location.pathname === href;
  return (
    <li>
      <NavLink
        to={href}
        title={title}
        className={`flex items-center justify-center lg:justify-start px-4 py-2 text-gray-800 hover:bg-gray-200 ${
          checkActive ? "bg-gray-200" : ""
        }`}
      >
        <Icon className="lg:mr-4 text-xl" />
        <span className="hidden lg:block">{text}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
