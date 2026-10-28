import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import logoImg from '../assets/PMSlogobg.png'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 py-8 sm:py-12 bg-white">
            {/* Top Navigation */}
            <div className="max-w-md w-full mx-auto flex items-center justify-between">
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
                >
                    <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    <span>Back to Login</span>
                </Link>
                <Link to="/">
                    <img src={logoImg} alt="Logo" className="h-7 w-auto object-contain" />
                </Link>
            </div>

            {/* Main Form Container */}
            <div className="max-w-md w-full mx-auto my-auto py-8">
                <div className="text-center sm:text-left mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        Forgot Password?
                    </h1>
                    <p className="mt-2.5 text-sm sm:text-base text-slate-500">
                        No worries, enter your registered email address and we'll send you reset instructions.
                    </p>
                </div>

                {submitted ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <FiCheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-emerald-900">Reset Link Sent</h3>
                            <p className="text-xs text-emerald-700 mt-1">
                                We've sent password reset instructions to <strong>{email}</strong>.
                            </p>
                        </div>
                        <Link
                            to="/login"
                            className="inline-block text-xs font-semibold text-blue-600 hover:text-indigo-600 underline"
                        >
                            Return to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input - Minimal Bottom Line Style */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-transparent border-b border-slate-300 py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                        >
                            Send Reset Instructions
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center text-sm text-slate-600">
                    <span>Remember your password? </span>
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors underline cursor-pointer"
                    >
                        Log in
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-400">
                © {new Date().getFullYear()} Project Management System. All rights reserved.
            </div>
        </div>
    )
}

export default ForgetPassword
