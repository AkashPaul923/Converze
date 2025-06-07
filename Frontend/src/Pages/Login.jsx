import React from "react";

const Login = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">User Name</label>
                <input type="text" className="input" placeholder="username" />

                <label className="label">Password</label>
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                />

                <button className="btn btn-neutral mt-4">Login</button>
            </form>
        </div>
    );
};

export default Login;
