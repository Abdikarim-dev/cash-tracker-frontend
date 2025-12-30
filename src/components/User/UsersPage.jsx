import { PlusIcon } from "lucide-react";
import UserForm from "./UserForm";
import UserTableView from "./UserTableView";
import { useState } from "react";
import { useEffect } from "react";
import { getUsers } from "../../apicalls/user";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const UsersPage = () => {
  const [getNewData, setGetNewData] = useState(false);
  const [users, setUsers] = useState([]);
  const [createFormModal, setCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // const [deleteModal, setDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    const getUsersFn = async () => {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.users);
      } else {
        toast.error(response?.message || "Fetching users failed");
      }
    };
    getUsersFn();
  }, [getNewData]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Users</span>
        <button
          onClick={() => setCreateModal(!createFormModal)}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Create User
        </button>
      </div>

      {(createFormModal || editingUser) && (
        <UserForm
          getNewData={getNewData}
          setGetNewData={setGetNewData}
          setCreateModal={setCreateModal}
          user={editingUser}
          setEditingUser={setEditingUser}
        />
      )}

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
      <UserTableView
        users={users}
        setEditingUser={setEditingUser}
        setDeletingUser={setDeletingUser}
      />

      {deletingUser && (
        <DeleteConfirmationModal
          modalState={Boolean(deletingUser)}
          onCancel={() => {
            setDeletingUser(null);
          }}
          title={'user'}
          object={deletingUser}
        />
      )}
    </div>
  );
};

export default UsersPage;
