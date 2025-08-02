import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setAuthUser } from "../Redux/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;
        const userData = {
            username,
            password
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/user/login",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            // console.log(res)
            if (res.status === 200) {
                dispatch(setAuthUser(res.data));
                toast.success("Login Successfully");
                navigate("/");
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-7 backdrop-blur-xs w-100 border rounded-2xl">
                <h1 className="text-3xl font-semibold mb-5 text-center">
                    Login
                </h1>
                <form
                    onSubmit={onSubmitHandler}
                    className="flex flex-col gap-3"
                >
                    <div>
                        <label className="label block mb-1.5">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="input w-full"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <label className="label block mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input w-full"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div>
                        Don't have any account?
                        <Link to="/signup"> Create account.</Link>
                    </div>
                    <button className="btn btn-block btn-neutral">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
