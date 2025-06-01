import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { message } from 'antd'
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import Navbar from '../components/NavBarHome'
import Footer from '../components/Footer'

const Contact = () => {


    document.title = "Contact Us | CodeWhisper";


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })


    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        let errors = {}
        if (!formData.name.trim()) errors.name = 'Name is required'
        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid'
        }
        if (!formData.subject.trim()) errors.subject = 'Subject is required'
        if (!formData.message.trim()) errors.message = 'Message is required'
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateForm()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true)

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: ACCESS_KEY,
                        ...formData,
                        subject: `New Contact Form Submission: ${formData.subject}`,
                    })
                })

                const result = await response.json()

                if (response.status === 200) {
                    message.success('Thank you for your message. We\'ll get back to you soon!');
                    setFormData({ name: '', email: '', subject: '', message: '' })
                } else {
                    throw new Error(result.message || 'Something went wrong!')
                }
            } catch (error) {
                message.error(error.message || 'Failed to send message. Please try again later.');
            } finally {
                setIsSubmitting(false)
            }
        } else {
            message.error('Please fill out all required fields correctly.');
        }
    }

    return (

        <>

            <Navbar />

            <div className="py-24 bg-black min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold text-gray-100 mb-6">Contact Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-lg text-gray-200 mb-6">
                                We'd love to hear from you. Please fill out this form or use our contact information below.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm ${errors.name ? 'border-red-500 border' : ''}`}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</Label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md  shadow-sm ${errors.subject ? 'border-red-500' : ''}`}
                                    />
                                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</Label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full text-gray-200 px-2 rounded-md bg-neutral-800 ${errors.message ? 'border-red-500' : ''}`}
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center px-4 py-2 border border-neutral-600 text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-white/20 focus:outline-none disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        <Send className="ml-2 -mr-1 h-5 w-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-neutral-900 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gray-100 mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Mail className="h-6 w-6 text-gray-200 mr-3 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-200">Email</h3>
                                        <p className="text-gray-300">devtrivedi.work@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="h-6 w-6 text-gray-200 mr-3 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-200">Address</h3>
                                        <p className="text-gray-300">
                                            DAIICT-campus<br />
                                            near, Reliance Cross Rd<br />
                                            Gandhinagar, Gujarat, India, 382007
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact