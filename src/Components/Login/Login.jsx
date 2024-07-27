import { useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/Authprovider";
// import { Helmet } from "react-helmet-async";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { GithubAuthProvider } from "firebase/auth";
import { FaGithub, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import ParticlesBackground from "../Particles/ParticlesBackground";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { Helmet } from "react-helmet";
import app from "../../../Firebase/Firebase.config";
import LoginParticlesBG from "../LoginParticlesBG/LoginParticlesBG";
const Login = () => {
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [user, setUser] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const naviGate = useNavigate();
    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        signIn(email, password)
            .then(result => {
                toast.success('Logged in with Google successfully!');
                naviGate(location?.state ? location.state : '/home')
            })
            .catch(error => {
                console.error(error);
            });
    };
    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user)
                const loggedInUser = result.user;
                setUser(loggedInUser);
                toast.success('Logged in with Google successfully!');
                naviGate(location?.state ? location.state : '/home')
            })
            .catch(error => {
                console.log(error.message);
                toast.error('Failed to login with Google.');
            });
    };
    
    const gitSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                toast.success('Logged in with GitHub successfully!');
            })
            .catch(error => {
                console.log(error.message);
                toast.error('Failed to login with GitHub.');
            });
    };

    return ( 
        <div className="min-h-screen lbg p-2  "> 
        
        <Helmet>
            <title>Login</title>
        </Helmet>
        
        <div  className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto shadow-2xl p-5 bg-orange-300  rounded-lg my-20 animated-bg ">
            <h2 className="text-2xl font-bold text-center my-3">Please Login First before you Enter</h2>
            <form onSubmit={handleLogin}>


                <p>Email</p>
                <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="email" name="email" placeholder="Email" id="email" required />

                <p>Password</p>
                <div className="relative">
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                    <span className="absolute top-1/4 right-3" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                    </span>
                </div>

                <input className=" w-full px-4 py-2 text-center text-lg rounded-md animated-bg hover:bg-orange-400 border hover:border-red-500 text-black font-bold my-3" type="submit" value="Login" />
            </form>

            <p>Do not have an account ? <Link to='/register' className="text-red-500 font-bold underline">please Register</Link></p>

            <div className="divider my-5"></div>
            <div className="mb-t flex justify-center gap-10">
                <div>
                    <button onClick={googleSignIn} className=" text-2xl animated-bg p-3 rounded-2xl"><FcGoogle size={32} /></button>
                    <p>Google</p>
                </div>
                <div>
                    <button
                        onClick={gitSignIn}
                        className="  text-2xl animated-bg p-3 rounded-2xl"> <FaGithub size={32} /></button>
                    <p>Github</p>
                </div>
            </div>

        </div>
        <LoginParticlesBG></LoginParticlesBG>
    </div>
    );
};

export default Login;