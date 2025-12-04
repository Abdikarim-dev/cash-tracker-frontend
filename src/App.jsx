import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountsPage from "./components/Account/AccountsPage";
import AuditsPage from "./components/Audit/AuditsPage";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import TransactionsPage from "./components/Transaction/TransactionsPage";
import TransfersPage from "./components/Transfer/TransfersPage";
import UsersPage from "./components/User/UsersPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<UsersPage />} />
          <Route path="account" element={<AccountsPage />} />
          <Route path="transaction" element={<TransactionsPage />} />
          <Route path="transfer" element={<TransfersPage />} />
          <Route path="audit" element={<AuditsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
