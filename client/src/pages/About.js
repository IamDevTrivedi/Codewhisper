import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Mail, User, Code, Palette } from 'lucide-react'
import Navbar from '../components/NavBarHome'
import Footer from '../components/Footer'

const TeamMember = ({ name, role, icon: Icon }) => (
    <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-zinc-200 flex items-center justify-center mb-4">
            <Icon size={48} className="text-gray-900" />
        </div>
        <h3 className="text-lg font-semibold text-gray-200">{name}</h3>
        <p className="text-sm text-gray-300">{role}</p>
    </div>
)

const About = () => {
    const teamMembers = [
        { name: "Dev Trivedi", role: "CEO & Founder", icon: User },
        { name: "Dev Trivedi", role: "CTO", icon: Code },
        { name: "Dev Trivedi", role: "Head of Design", icon: Palette },
    ]

    document.title = "About CodeWhisper | CodeWhisper";

    return (


        <>

            <Navbar />

            <div className="py-24 bg-black min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <section className="mb-16">
                        <h1 className="text-4xl font-bold text-gray-100 mb-6">About CodeWhisper</h1>
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Who We Are</h2>
                        <p className="text-lg text-gray-300 mb-4">
                            CodeWhisper is a cutting-edge platform designed to provide developers with a seamless coding experience across various programming languages. Our mission is to empower developers by offering a robust and intuitive environment for coding, collaboration, and learning.
                        </p>
                        <p className="text-lg text-gray-300">
                            Founded in 2025, CodeWhisper has quickly become a trusted solution for developers collegewide. We are committed to fostering a community where developers can share knowledge, collaborate on projects, and enhance their coding skills.
                        </p>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-6">Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map((member, index) => (
                                <TeamMember key={index} {...member} />
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Connect With Us</h2>
                        <p className="text-lg text-gray-200 mb-4">
                            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, don't hesitate to reach out.
                        </p>
                        <Link to="/contact" className="inline-block bg-transparent border border-neutral-600 hover:bg-white/20 rounded-xl text-white font-semibold py-2 px-4 transition duration-300">
                            Contact Us
                        </Link>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Follow Us</h2>
                        <div className="flex space-x-4 mb-4">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors">
                                <Instagram size={24} />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
                                <Twitter size={24} />
                                <span className="sr-only">Twitter</span>
                            </a>
                        </div>
                        <div className="flex items-center text-gray-600 hover:text-white transition-colors">
                            <Mail size={24} className="mr-2" />
                            <a href="mailto:devtrivedi.work@gmail.com" className="hover:text-white transition-colors">devtrivedi.work@gmail.com</a>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default About;