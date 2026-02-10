import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { addUser, editUser } from "../../apicalls/user";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = () =>
  z.object({
    account: z.string(),
    type: z.string(),
    amount: z.string(),
    description: z.string(),
  });
const TransactionForm = ({
  user,
  setCreateModal,
  setEditingUser,
  getNewData,
  setGetNewData,
}) => {
  const isEdit = Boolean(user);
  const [image, setImage] = useState(user?.image ? user.image : ""); // 92183479-1248.png
  const [changePassword, setChangePassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      username: user?.username,
      phone: user?.phone,
      email: user?.email,
      role: user?.role,
    },
    resolver: zodResolver(schema(isEdit)),
  });
  const handleUser = async (userToBeSent) => {
    // delete userToBeSent.confirmPassword;
    console.log(userToBeSent);

    const userFormData = new FormData();

    userFormData.append("fullname", userToBeSent.fullname);
    userFormData.append("username", userToBeSent.username);
    userFormData.append("phone", userToBeSent.phone);
    userFormData.append("email", userToBeSent.email);
    userFormData.append("role", userToBeSent.role);
    userFormData.append("image", userToBeSent.image[0]);

    if (user) {
      if (userToBeSent?.password) {
        userFormData.append("password", userToBeSent.password);
      }
      const response = await editUser(userFormData, user.id);

      if (response.success) {
        toast.success(response?.message);
        setGetNewData(!getNewData);
        setEditingUser(null);
        reset();
      } else {
        toast.error(response?.message);
      }
    } else {
      userFormData.append("password", userToBeSent.password);
      const response = await addUser(userFormData);

      if (response.success) {
        toast.success(response?.message);
        setGetNewData(!getNewData);
        setCreateModal(false);
        reset();
      } else {
        toast.error(response?.message);
      }
    }
  };
  return (
    <div className="mx-auto bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2">
        {user ? "EDIT" : "CREATE"} USER
      </h2>

      <form onSubmit={handleSubmit(handleUser)} className="space-y-8">
        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a type (DEBIT/CREDIT)</option>
              <option value="debit">DEBIT(-)</option>
              <option value="credit">CREDIT(+)</option>
            </select>
            {errors.type && (
              <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a type (DEBIT/CREDIT)</option>
              <option value="debit">DEBIT(+)</option>
              <option value="credit">CREDIT(-)</option>
            </select>
            {errors.type && (
              <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              {...register("amount")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
            />
            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              {...register("description")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => {
              setCreateModal(false);
              setEditingUser(null);
            }}
            type="button"
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            {user ? "EDIT" : "CREATE"} Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
