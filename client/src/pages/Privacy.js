import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/NavBarHome'

const PrivacyPolicy = () => {
    const sections = [
        { id: 'information-collection', title: 'Information Collection and Use' },
        { id: 'data-sharing', title: 'Data Sharing and Disclosure' },
        { id: 'cookies', title: 'Cookies and Tracking Technologies' },
        { id: 'data-security', title: 'Data Security' },
        { id: 'user-rights', title: 'Your Rights and Choices' },
        { id: 'children-privacy', title: "Children's Privacy" },
        { id: 'international-transfers', title: 'International Data Transfers' },
        { id: 'policy-changes', title: 'Changes to This Privacy Policy' },
        { id: 'contact-us', title: 'Contact Us' },
    ]

    document.title = "Privacy Policy | CodeWhisper";

    return (
        <>

            <Navbar />

            <div className="py-24 bg-black min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold text-gray-100 mb-6">Privacy Policy</h1>
                    <p className="text-lg text-gray-200 mb-8">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <div className="bg-neutral-900 p-6 rounded-lg mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Table of Contents</h2>
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="text-gray-300 hover:text-sky-500 transition-colors">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <section id="information-collection" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Information Collection and Use</h2>
                        <p className="text-gray-300 mb-4">
                            We collect information you provide directly to us when you create an account, set up your profile, or use our services. This may include your name, email address, and any other information you choose to provide.
                        </p>
                        <p className="text-gray-300">
                            We use this information to provide and improve CodeWhisper, communicate with you, and analyze how our services are used.
                        </p>
                    </section>

                    <section id="data-sharing" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Data Sharing and Disclosure</h2>
                        <p className="text-gray-300 mb-4">
                            We do not sell your personal information. We may share your information in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>With your consent</li>
                            <li>To comply with legal obligations</li>
                            <li>To protect our rights, privacy, safety, or property</li>
                            <li>In connection with a merger, sale, or acquisition of all or a portion of our company</li>
                        </ul>
                    </section>

                    <section id="cookies" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Cookies and Tracking Technologies</h2>
                        <p className="text-gray-300">
                            We use cookies and similar tracking technologies to collect information about your interactions with CodeWhisper. You can control cookies through your browser settings and other tools.
                        </p>
                    </section>

                    <section id="data-security" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Data Security</h2>
                        <p className="text-gray-300">
                            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section id="user-rights" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Your Rights and Choices</h2>
                        <p className="text-gray-300 mb-4">
                            Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Accessing your personal information</li>
                            <li>Correcting inaccurate information</li>
                            <li>Deleting your information</li>
                            <li>Objecting to or restricting certain processing</li>
                        </ul>
                    </section>

                    <section id="children-privacy" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Children's Privacy</h2>
                        <p className="text-gray-300">
                            CodeWhisper is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.
                        </p>
                    </section>

                    <section id="international-transfers" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">International Data Transfers</h2>
                        <p className="text-gray-300">
                            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in these cases.
                        </p>
                    </section>

                    <section id="policy-changes" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Changes to This Privacy Policy</h2>
                        <p className="text-gray-300">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section id="contact-us" className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Contact Us</h2>
                        <p className="text-gray-300 mb-4">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="text-gray-300">
                            Email: <a href="mailto:devtrivedi.work@gmail.com" className="text-gray-300 hover:text-white transition-colors">devtrivedi.work@gmail.com</a>
                        </p>
                    </section>

                    <div className="mt-12 text-center">
                        <Link to="/" className="text-gray-300 hover:text-white border border-dashed p-3 rounded border-neutral-600 transition-colors">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    )
}

export default PrivacyPolicy