const UserForm = () => {
  return (
    <div className="mx-auto bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2">
        CREATE USER
      </h2>

      <form className="space-y-8">
        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="tel"
              name="phone"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
              type="file"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            CREATE USER
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
