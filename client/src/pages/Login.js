import React, { useContext, useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavBarHome";
import { AppContext } from "../Context/AppContext";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const { login, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted", formData);

    if (await login(formData)) {
      navigate("/editor");
    }
  };


  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  })

  document.title = "Login | CodeWhisper";

  return (

    <>

      <Navbar />

      <div className="bg-black min-h-screen flex items-center justify-center px-3">

        <div className=" border border-neutral-600 max-w-md w-full mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
          <h2 className="font-bold text-xl text-neutral-200">
            Welcome back to CodeWhisper
          </h2>
          <p className="text-sm max-w-sm mt-2 text-neutral-300">
            Login to your CodeWhisper account
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                placeholder="batman@codewhisper.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="text-sm text-neutral-300">
                Forgot Password?{" "}
                <Link to="/forgot-password" className="text-neutral-200 font-medium hover:text-white">
                  Click here
                </Link>
              </div>
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit">
              Log in &rarr;
              <BottomGradient />
            </button>
          </form>


          <div className="text-center text-neutral-300">
            Didn't have a Account?{" "}
            <Link to="/signup" className="text-neutral-200 font-medium hover:text-white">
              Sign Up
            </Link>
          </div>
        </div>


      </div>

      <Footer />
    </>

  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ className, children }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};