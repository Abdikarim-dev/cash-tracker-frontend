import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

// Create Context
const AuthContext = createContext();
// initialState
const initialState = {
  isAuthenticated: false,
  user: null,
};
// isAthenticated: true || false
// user : userObject || null

// Function awaamiirta aan ku qeexayno
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

// dispatch({
//     type:"LOGIN",
//     payload:{
//         token:"127846-12478/sadfh-df",
//         user:{
//             id:1,
//             name:Abdikarim,
//             ...
//         }
//         into this
//         {
//             "id":1,
//             "name":"Abdikarim",
//             ...
//         }
//     }
// })

// Wrapper
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook (useAuth)
export const useAuth = () => useContext(AuthContext);
