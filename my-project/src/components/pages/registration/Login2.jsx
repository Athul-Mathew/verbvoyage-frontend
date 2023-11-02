import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../Loader';
import login from '../../../actions/auth';
import { getLocal } from '../../../actions/auth';

const login2Img = 'https://wallpaperaccess.com/full/4910984.gif'; // Your provided gif link

function Login() {
  const token =getLocal('authtoken')
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoader] = useState(false);

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    setIsLoader(true);

    try {
      e.preventDefault();
      const loginResponse = await login(e);

      if (loginResponse) {
        navigate('/userhome');
        localStorage.setItem('userJWT', loginResponse);
      } else {
        toast.error('Invalid credentials', { duration: 1000 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/userhome');}

  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section
          className="bg-cyberpunk" // Set a custom CSS class for the cyberpunk theme
          style={{
            backgroundImage: `url(${login2Img})`,
            
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <Toaster position="top-center" reverseOrder={false}></Toaster>

           
            <div className="w-full bg-cyan-400 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-cyan-300">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-cyan-400 md:text-2xl ">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-cyan-400 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-cyan-400 border border-cyan-400 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-cyan-400 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      minLength={6}
                      placeholder="••••••••"
                      className="bg-cyan-400 border border-cyan-400 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-cyan-400 dark:text-cyan-400">Remember me</label>
                      </div>
                    </div>
                    <Link to="/forgot-password" className="text-sm font-medium text-cyan-400 hover:underline dark:text-primary-500">
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-cyan-400 dark:text-cyan-400">
                    Don’t have an account yet? <Link to="/signup">Sign up</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;
