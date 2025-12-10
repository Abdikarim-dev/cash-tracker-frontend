import { FaEdit, FaTrash } from "react-icons/fa";

const UserTableView = () => {

  const dummyData = [
    {
      id: 1,
      fullname: "Amina Yusuf",
      email: "amina.yusuf@example.com",
      username: "amina",
      phone: "+251911223344",
      role: "admin",
      image: "avatar1.jpg",
    },
    {
      id: 2,
      fullname: "Mohamed Ali",
      email: "mohamed.ali@example.com",
      username: "mohamed",
      phone: "+251912334455",
      role: "manager",
      image: "avatar2.jpg",
    },
    {
      id: 3,
      fullname: "Fatima Abdi",
      email: "fatima.abdi@example.com",
      username: "fatima",
      phone: "+251913445566",
      role: "user",
      image: "avatar3.jpg",
    },
    {
      id: 4,
      fullname: "Hassan Omar",
      email: "hassan.omar@example.com",
      username: "hassan",
      phone: "+251914556677",
      role: "user",
      image: "avatar4.jpg",
    },
    {
      id: 5,
      fullname: "Leyla Hassan",
      email: "leyla.hassan@example.com",
      username: "leyla",
      phone: "+251915667788",
      role: "manager",
      image: "avatar5.jpg",
    },
    {
      id: 6,
      fullname: "Abdirahman Noor",
      email: "abdirahman.noor@example.com",
      username: "abdirahman",
      phone: "+251916778899",
      role: "user",
      image: "avatar6.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-primary/30 to-primary/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                User Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyData?.map((user, index) => (
              <tr
                key={user.id}
                className={`transition duration-200 ${
                  index % 2 === 0
                    ? "bg-white hover:bg-gray-100"
                    : "bg-gray-50 hover:bg-gray-200"
                }`}
              >
                {/* User Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                        user.image
                      }`}
                      alt="avatar"
                      className="w-12 h-12 rounded-full shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-lg">
                        {user.fullname}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Username */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {user.username}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {user.phone}
                </td>

                {/* Role */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : user.role === "manager"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  {/* Edit Button */}
                  <button
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors duration-200 shadow-sm"
                    title="Edit User"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-colors duration-200 shadow-sm"
                    title="Delete User"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableView;
