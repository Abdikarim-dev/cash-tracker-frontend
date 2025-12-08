import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { loginUser } from "../../apicalls/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const schema = z.object({
  identifier: z
    .string()
    .min(3, { message: "Username or Phone must be at least 3 characters long" })
    .max(20, {
      message: "Username or Phone must be at maximum 20 characters long",
    }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" })
    .max(20, { message: "Password must be at maximum 20 characters long" }),
});

// const user = {
//   identifier:Abdikarim,
//   password:123456
// }
const LoginPage = () => {
  const { state, dispatch } = useAuth();

  const { isAuthenticated } = state;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (user) => {
    setLoading(true);
    const response = await loginUser(user);
    if (response.success) {
      toast.success(response.message);

      const { activeUser, token } = response;

      dispatch({
        type: "LOGIN",
        payload: {
          token,
          activeUser,
        },
      });

      setLoading(false);
      navigate("/dashboard");
    } else {
      setLoading(false);
      toast.error(response.message);
    }
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* Header */}
        <h3 className="text-3xl font-bold text-gray-800 text-center">Login</h3>

        {/* Username / Phone */}
        <div className="flex flex-col">
          <input
            {...register("identifier")}
            type="text"
            placeholder="john.doe"
            className="px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400"
          />
          {errors.identifier && (
            <p className="text-red-600 text-sm mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <input
            {...register("password")}
            type="password"
            placeholder="********"
            className="px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          {loading ? "Loggin in" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
