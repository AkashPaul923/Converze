
import { Link } from "react-router";

const Login = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;

        console.log({username, password});
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-7 backdrop-blur-xs w-100 border rounded-2xl">
                <h1 className="text-3xl font-semibold mb-5 text-center">Login</h1>
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
                    <div>
                        <label className="label block mb-1.5">Username</label>
                        <input type="text" name="username" className="input w-full" placeholder="Username" required/>
                    </div>
                    <div>
                        <label className="label block mb-1.5">Password</label>
                        <input type="password" name="password" className="input w-full" placeholder="Password" required/>
                    </div>
                    <div >
                        Don't have any account?<Link to="/signup"> Create account.</Link>
                    </div>
                    <button className="btn btn-block btn-neutral">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
