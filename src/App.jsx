import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountsPage from "./components/Account/AccountsPage";
import AuditsPage from "./components/Audit/AuditsPage";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import TransactionsPage from "./components/Transaction/TransactionsPage";
import TransfersPage from "./components/Transfer/TransfersPage";
import UsersPage from "./components/User/UsersPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Admin-only routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="user" element={<UsersPage />} />
              <Route path="account" element={<AccountsPage />} />
              <Route path="audit" element={<AuditsPage />} />
            </Route>

            {/* Admin + Staff Routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["ADMIN", "STAFF"]} />}
            >
              <Route index element={<HomePage />} />
              <Route path="transaction" element={<TransactionsPage />} />
              <Route path="transfer" element={<TransfersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
