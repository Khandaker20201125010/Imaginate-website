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
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import moment from "moment/moment";


const Login = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleLogin = async (e)=> {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    postTime:moment().format('MMMM Do YYYY, h:mm:ss a'),
                    
                };

                const res = axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate(location.state?.from || '/home');
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'You have successfully logged in',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                           
                        }
                    });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Seems like you dont have an account. Please register.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                const userInfo = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    photoURL: loggedInUser.photoURL,
                    postTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
                    
                };

              
                navigate(location.state?.from || '/home');

               
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'You have successfully logged in with Google',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error saving user data:", error);
                    });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const gitSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedInUser = result.user;
            const userInfo = {
                name: loggedInUser.displayName,
                email: loggedInUser.email,
                photoURL: loggedInUser.photoURL,
                postTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
                
            };

            // Navigate immediately after login
            navigate(location.state?.from || '/home');

            // Send user data to the backend in the background
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully logged in with GitHub',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                })
                .catch(error => {
                    console.error("Error saving user data:", error);
                });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

   
    return ( 
        <div className="min-h-screen lbg p-2  "> 
        
        <Helmet>
            <title>Login</title>
        </Helmet>
        
        <div  className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto shadow-2xl p-5 bg-orange-300  rounded-lg my-20 animated-bg text-white">
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

                <input className=" w-full px-4 py-2 text-center text-lg rounded-md animated-bg hover:bg-orange-400 border hover:border-red-500 text-white font-bold my-3" type="submit" value="Login" />
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