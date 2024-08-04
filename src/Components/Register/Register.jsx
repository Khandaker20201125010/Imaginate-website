import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash, FaXmark } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  GoogleAuthProvider, updateProfile } from "firebase/auth";

import Swal from "sweetalert2";
import { AuthContext } from "../Providers/Authprovider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import moment from "moment";
import LoginParticlesBG from "../LoginParticlesBG/LoginParticlesBG";




const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {

    const { createUser,loading } =  useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider();
   

    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [userSuccess, setUserSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const name = form.get('name')
        const email = form.get('email')
        const password = form.get('password')
        const photoFile = form.get('photo');
       

        console.table(name, email, password, photoFile)
        

        setUserSuccess('');
        setPasswordError('');
        setEmailError('');


        if (password.length < 6) {
            setPasswordError('Password should be at least 6 characters or longer')
            return;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('password should have minimum one character in upper case')
            return;
        }


        try {
            const imageData = new FormData();
            imageData.append('image', photoFile);

            const imageRes = await axios.post(imageHostingApi, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;
            // console.log(imageUrl)

            createUser(email, password)
                .then(result => {
                    updateProfile(result.user, {
                        displayName: name,
                        photoURL: imageUrl
                    })
                })
                .then(() => {
                    const userInfo = {
                        name: name,
                        email: email,
                        photoURL: imageUrl,
                        role: 'Guest',
                        postTime:moment().format('MMMM Do YYYY, h:mm:ss a')
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) { 
                                Swal.fire({
                                    title: "Success!",
                                    text: "Register successfully!",
                                    icon: "success"
                                });
                            }
                            setUserSuccess('user created successfully')
                            navigate(location?.state ? location.state : '/home')
                        })
                })
                .catch(error => {
                    console.log(error.message)
                })

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
    }


  



    return ( 

        <div className="min-h-screen">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <LoginParticlesBG></LoginParticlesBG>

            <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto 0 animated-bg shadow-xl p-5 rounded-lg my-20">

                <div className="flex justify-end ">
                    <Link to='/' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="md:text-3xl text-orange-600 my-0"></FaXmark></Link>
                </div>

                <h2 className="text-2xl font-bold text-center my-3 animate__animated animate__rubberBand text-orange-600">Please Register </h2>

                {
                    userSuccess && <p className="  text-green-500">{userSuccess}</p>
                }

                <form onSubmit={handleRegister}>

                    <p className="font-semibold text-sm md:text-base">Name</p>
                    <input className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" type="text" name="name" placeholder="Name" id="name" required />


                    <p className="font-semibold text-sm md:text-base">Email</p>
                    <input className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" type="email" name="email" placeholder="Email" id="email" required />
                    {
                        emailError && <p className="  text-red-500">{emailError}</p>
                    }

                    <p className="font-semibold text-sm md:text-base">Password</p>
                    <div className="relative">
                        <input className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                        <span className="absolute md:top-1/4 top-[5px] right-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                        </span>
                    </div>
                    {
                        passwordError && <p className="text-red-500">  {passwordError}</p>
                    }

                    <p className="font-semibold text-sm md:text-base">Your Photo</p>
                    <input type="file" placeholder="" name="photo" id="" className="border-2 rounded-sm md:rounded-md w-full text-sm md:text-base  mb-2 bg-white" />

                    {
                        loading ? 
                        <button disabled className="w-full px-4 py-1 md:py-2 text-center text-lg rounded-md bg-orange-500 hover:bg-orange-600 border hover:border-black-500 text-white font-bold my-3"><span className="loading loading-spinner loading-md"></span></button> 
                        :
                            <input disabled={loading} className="w-full px-4 py-1 md:py-2 text-center text-lg rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-bold my-3" type="submit" value="Register" />
                    }

                </form>

                <p>Already have an account ? <Link to='/loginRegister/login' className="text-red-500 font-bold underline">please Login</Link></p>
                <div className="divider my-5"></div>
                <div className="mb-t">
                    
                </div>
            </div>
        </div>
    );

};

export default Register;