import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector((s) => s.user.authUser)
    console.log(user);

    return <div>Home</div>;
};

export default Home;
