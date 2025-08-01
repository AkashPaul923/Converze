import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fullname = form.fullname.value;
        const username = form.username.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const gender = form.gender.value;
        const user = {
            fullname, 
            username, 
            password, 
            confirmPassword, 
            gender
        };

        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/register", user, {
                headers : {
                    'Content-Type' : 'application/json'
                },
                withCredentials : true
            });
            if(res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
        }
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-7 backdrop-blur-xs w-100 border rounded-2xl">
                <h1 className="text-3xl font-semibold mb-5 text-center">Signup</h1>
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
                    <div>
                        <label className="label block mb-1.5">Full Name</label>
                        <input type="text" name="fullname" className="input w-full" placeholder="Full Name" required/>
                    </div>
                    <div>
                        <label className="label block mb-1.5">Username</label>
                        <input type="text" name="username" className="input w-full" placeholder="Username" required/>
                    </div>
                    <div>
                        <label className="label block mb-1.5">Password</label>
                        <input type="password" name="password" className="input w-full" placeholder="Password" required/>
                    </div>
                    <div>
                        <label className="label block mb-1.5">Confirm Password</label>
                        <input type="password" name="confirmPassword" className="input w-full" placeholder="Confirm Password" required/>
                    </div>
                    <div>
                        <label className="label block mb-1.5">Gender</label>
                        <div className="flex items-center gap-2">
                            <p>Male</p>
                            <input type="radio" name="gender" value="male" class="radio radio-xs" defaultChecked />
                            <p>Female</p>
                            <input type="radio" name="gender" value="female" class="radio radio-xs" />
                        </div>
                    </div>
                    <div >
                        Have any account?<Link to="/login"> Login.</Link>
                    </div>
                    <button className="btn btn-block btn-neutral">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
