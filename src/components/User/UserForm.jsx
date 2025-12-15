import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { addUser, editUser } from "../../apicalls/user";
import toast from "react-hot-toast";

const acceptedImageTypes = ["image/png", "image/jpeg"];

const schema = z
  .object({
    fullname: z
      .string()
      .min(10, { message: "Fullname  must be at least 10 characters long" })
      .max(40, {
        message: "Fullname must be at maximum 40 characters long",
      }),
    username: z
      .string()
      .min(3, { message: "Username  must be at least 3 characters long" })
      .max(20, {
        message: "username must be at maximum 20 characters long",
      }),
    email: z.string().email().optional(),
    phone: z.string().min(1, { message: "Phone cannot be empty" }),
    role: z.enum(["ADMIN", "STAFF"]),
    image: z
      .instanceof(FileList)
      .refine((fileList) => fileList.length > 0, {
        message: "Please upload an image",
      })
      .refine((filelists) => acceptedImageTypes.includes(filelists[0]?.type),{
        message:"Only JPG and PNG images are allowed"
      }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters long" })
      .max(20, {
        message: "username must be at maximum 20 characters long",
      }),
    confirmPassword: z.string(),
  })
  .refine((user) => user.password === user.confirmPassword, {
    message: "Passwords do not match",
    path: ["password"],
  })
  .refine((user) => user.password === user.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const UserForm = ({ user, setCreateModal, setEditingUser }) => {
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
    resolver: zodResolver(schema),
  });
  const handleUser = async (userToBeSent) => {
    delete userToBeSent.confirmPassword;

    if (user) {
      const userUpdate = {
        id: user.id,
        user: userToBeSent,
      };
      const response = await editUser(userUpdate);

      if (response.success) {
        toast.success(response?.message);
        setEditingUser(null);
        reset();
      } else {
        toast.error(response?.message);
      }
    } else {
      const response = await addUser(userToBeSent);

      if (response.success) {
        toast.success(response?.message);
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("fullname")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              {...register("phone")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="tel"
              name="phone"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a role</option>
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              {...register("image")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="file"
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="********"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="********"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
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
            {user ? "EDIT" : "CREATE"} USER
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
