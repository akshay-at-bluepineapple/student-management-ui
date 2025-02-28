import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUserAction } from "../redux/slices/user/userSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //dispacth
  const dispacth = useDispatch();
  //get data from store
  const user = useSelector(state => state?.user)
  const { error, userAuth } = user
  console.log('userAuth: ', userAuth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      email,
      password,
    }
    try {
      dispacth(loginUserAction(values));
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication failed:", error.response.data.message);
    }
  };

  useEffect(() => {
    if (userAuth) { navigate("/dashboard") }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth])

  return (
    <div>
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="flex flex-wrap items-center justify-center h-full lg:justify-between">
            {/* <!-- Left column container with background--> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            {/* <!-- Right column container with form --> */}
            <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
              <div className="text-4xl font-semibold text-center py-7">
                Sign In
              </div>
              <form onSubmit={handleSubmit}>
                {/* <!-- Email input --> */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-[#e8f0fe] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="relative mb-6">
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-[#e8f0fe] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  {/* <!-- Forgot password link --> */}
                  <a
                    href="#!"
                    className="text-primary focus:outline-none dark:text-primary-400"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  Sign in
                </button>
                <div className="pt-2 text-lg">
                  {error && (
                    <div style={{ color: "red" }}>{error}</div>
                  )}{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
