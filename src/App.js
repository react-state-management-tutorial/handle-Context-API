import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import UserInfo from "./pages/UserInfo";
import NotFound from "./pages/NotFound";
import "./style.css";

function Main() {
  const { authState } = useContext(AuthContext);
  const access = !!authState.token;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={access ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/logout"
          element={access ? <Logout /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/user"
          element={access ? <UserInfo /> : <Navigate to="/login" />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <>
      <Main />
    </>
  );
}
