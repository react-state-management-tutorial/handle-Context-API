import { createContext, useReducer } from "react";

const AuthContext = createContext();
const user = {
  id: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  gender: null,
  image: null,
  token: localStorage.getItem("testToken"),
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...action.payload };
    case "logout":
      return { token: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, user);

  const loginHandler = (data) => {
    localStorage.setItem("testToken", data.token);
    dispatch({ type: "login", payload: data });
  };

  const logoutHandler = () => {
    localStorage.removeItem("testToken");
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ authState, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
