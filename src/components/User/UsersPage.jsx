import { PlusIcon } from "lucide-react";
import UserForm from "./UserForm";
import UserTableView from "./UserTableView";
import { useState } from "react";

const UsersPage = () => {
  const [changeState, setChangeState] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Users</span>
        <button
          onClick={() => setChangeState(!changeState)}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Create User
        </button>
      </div>

      {changeState && <UserForm />}

      <div>
        <input
          className="w-full max-w-sm rounded-md border bg-white border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          name="name"
          placeholder="Search here (By Name or By Phone)..."
          required
        />
      </div>

      {/* <div>User Table View</div> */}
      <UserTableView />
    </div>
  );
};

export default UsersPage;
