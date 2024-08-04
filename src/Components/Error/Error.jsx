import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="ex">
            <h1 className="flex flex-col justify-center items-center">
                <h1 className="text-9xl p-10 text-red-500"><b><i>O0ps</i></b></h1>
                <h1 className="text-9xl p-20 text-red-500"><b><i>404</i></b></h1>
                <Link to='/home'> <button className="text-center btn bg-sky-200 text-orange-400 ">Go Back Home</button></Link>
            </h1>
        </div>
    );
};

export default Error;