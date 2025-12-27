import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { addUser, editUser } from "../../apicalls/user";
import toast from "react-hot-toast";
import { useState } from "react";

const acceptedImageTypes = ["image/png", "image/jpeg"];
const MAX_SIZE_IMAGE = 1024 * 1024 * 3; // 3MB MAX

const schema = (isEdit = false) =>
  z
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
      email: z.string().email(),
      phone: z.string().min(1, { message: "Phone cannot be empty" }),
      role: z.enum(["ADMIN", "STAFF"]),
      image: z
        .instanceof(FileList)
        .refine(
          (files) =>
            files.length === 0 || acceptedImageTypes.includes(files[0]?.type),
          {
            message:
              "Only JPG and PNG images are allowed",
          }
        )
        .refine((file) => file.length === 0 || file[0].size <= MAX_SIZE_IMAGE, {
          message:
            "Image Must be less than or equal 3MB",
        })
        .optional(),
      password: isEdit
        ? z
            .string()
            // .min(3, { message: "Password must be at least 3 characters long" })
            .max(20, {
              message: "username must be at maximum 20 characters long",
            })
            .optional()
        : z
            .string()
            .min(3, { message: "Password must be at least 3 characters long" })
            .max(20, {
              message: "username must be at maximum 20 characters long",
            }),
      confirmPassword: isEdit ? z.string().optional() : z.string(),
    })
    .refine((user) => user.password === user.confirmPassword, {
      message: "Passwords do not match",
      path: ["password"],
    })
    .refine((user) => user.password === user.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
const UserForm = ({
  user,
  setCreateModal,
  setEditingUser,
  getNewData,
  setGetNewData,
}) => {
  const isEdit = Boolean(user);
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
          {isEdit && (
            <div className="flex items-center justify-center">
              <span>
                I{changePassword ? " don't" : ""} want to change my password
              </span>
              <a
                className="text-red-600 underline cursor-pointer text-sm"
                onClick={() => {
                  setChangePassword(!changePassword);
                }}
              >
                Click here
              </a>
            </div>
          )}
          {(changePassword || !isEdit) && (
            <>
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
              {/* Confirm Password */}
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
            </>
          )}
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
