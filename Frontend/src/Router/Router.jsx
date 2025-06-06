import { Route, Routes } from "react-router";
import SignUp from "../Pages/SignUp.jsx";
import Login from "../Pages/Login.jsx";
import Home from "../Pages/Home.jsx";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
