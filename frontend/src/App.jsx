import { Navigate, Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
const App = () => {
  const token = localStorage.getItem("jwt");
  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
