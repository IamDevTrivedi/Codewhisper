import React, { useContext, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBarHome";
import Footer from "../components/Footer";
import { message } from "antd";
import { AppContext } from "../Context/AppContext";

export function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const { register } = useContext(AppContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            message.error("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            message.error("Passwords do not match");
            return;
        }

        if (await register(formData)) {
            navigate("/verify-email");
        }
    };

    // useEffect(() => {
    //     if (userData) {
    //         navigate("/");
    //     }
    // })

    document.title = "Sign Up | CodeWhisper";

    return (

        <>
            <Navbar />
            <div className="pt-32 bg-black min-h-screen flex items-center justify-center py-20 px-3">

                <div className="border-neutral-600 border max-w-md w-full mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
                    <h2 className="font-bold text-xl text-neutral-200">
                        Welcome to CodeWhisper
                    </h2>
                    <p className="text-sm max-w-sm mt-2 text-neutral-300">
                        Sign up to get started with CodeWhisper
                    </p>
                    <form className="my-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstName">First name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Bruce"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastName">Last name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Wyane"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </LabelInputContainer>
                        </div>
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
                        <LabelInputContainer className="mb-4">
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
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="••••••••"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit">
                            Sign up &rarr;
                            <BottomGradient />
                        </button>
                    </form>

                    <div className="text-center text-neutral-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-neutral-200 font-medium hover:text-white">
                            Log in
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