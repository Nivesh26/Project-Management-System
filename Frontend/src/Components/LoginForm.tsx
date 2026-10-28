import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { z } from 'zod'
import { FiEye, FiEyeOff, FiArrowLeft, FiCheckSquare, FiUsers, FiTrendingUp } from 'react-icons/fi'
import googleIcon from '../assets/google.png'
import logoImg from '../assets/PMSlogobg.png'

const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters long'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setSubmitSuccess(false)

        const result = loginSchema.safeParse({ email, password })

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof LoginFormData
                if (field && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message
                }
            })
            setErrors(fieldErrors)
            return
        }

        setErrors({})
        setIsSubmitting(true)

        // Simulated submit handler
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)
            console.log('Login successful with:', result.data)
        }, 600)
    }

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
            {/* Left Side: Brand & Product Showcase (Plan. Track. Deliver.) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-[#F8FAFD] via-[#F1F6FE] to-[#EBF3FC] border-r border-slate-200/90 shadow-[6px_0_30px_-5px_rgba(37,99,235,0.06)] p-10 xl:p-14 overflow-hidden flex-col justify-between">
                {/* Background Wave & Organic Flow Pattern matching user reference image */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                    {/* Subtle dot matrix grid for high-end SaaS feel */}
                    <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

                    {/* Ambient top-left soft glow */}
                    <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl" />

                    {/* Layered Organic SVG Waves (matching reference design) */}
                    <svg
                        className="absolute w-full h-full inset-0"
                        viewBox="0 0 700 1000"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            {/* Wave 1: Soft Sky Blue Gradient */}
                            <linearGradient id="waveBlue" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#CBE2F9" stopOpacity="0.85" />
                                <stop offset="50%" stopColor="#DBEAFE" stopOpacity="0.75" />
                                <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.5" />
                            </linearGradient>

                            {/* Wave 2: Soft Mint / Emerald Gradient */}
                            <linearGradient id="waveEmerald" x1="100%" y1="20%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.75" />
                                <stop offset="50%" stopColor="#D1FAE5" stopOpacity="0.65" />
                                <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0.4" />
                            </linearGradient>

                            {/* Wave 3: Lower Azure/Periwinkle Gradient */}
                            <linearGradient id="waveAzure" x1="100%" y1="50%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.7" />
                                <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>

                        {/* Upper Soft Blue Wave sweeping down-left from the split border */}
                        <path
                            d="M 700 380 C 560 410 420 500 280 600 C 160 690 60 770 0 840 L 0 1000 L 700 1000 Z"
                            fill="url(#waveBlue)"
                        />

                        {/* Middle Mint Green Wave sweeping from right border */}
                        <path
                            d="M 700 520 C 580 550 440 640 320 730 C 200 810 90 880 0 930 L 0 1000 L 700 1000 Z"
                            fill="url(#waveEmerald)"
                        />

                        {/* Lower Azure Wave finishing the organic curve */}
                        <path
                            d="M 700 680 C 590 710 480 790 360 860 C 240 920 120 970 0 990 L 0 1000 L 700 1000 Z"
                            fill="url(#waveAzure)"
                        />
                    </svg>
                </div>

                {/* Top: Logo & Trust Badge */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link to="/" className="inline-block cursor-pointer">
                        <img 
                            src={logoImg} 
                            alt="Project Management System" 
                            className="h-10 w-auto object-contain drop-shadow-2xs" 
                        />
                    </Link>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-xs border border-blue-200/80 text-blue-700 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        100+ Companies Registered
                    </span>
                </div>

                {/* Center: Headline & Feature List */}
                <div className="relative z-10 max-w-lg my-auto pt-6">
                    <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Plan. <span className="text-blue-600">Track.</span> <span className="text-emerald-500">Deliver.</span>
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                        Streamline your projects, manage your team, and achieve more — all in one place.
                    </p>

                    {/* Features List */}
                    <div className="mt-8 space-y-3.5 max-w-sm">
                        {/* 1. Organize Tasks */}
                        <div className="flex items-center gap-3.5 p-2 rounded-xl bg-white/60 backdrop-blur-xs border border-white/80 shadow-2xs transition-all duration-200 hover:bg-white hover:shadow-xs group">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-2xs transition-transform duration-200 group-hover:scale-105 shrink-0">
                                <FiCheckSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">Organize Tasks</h3>
                                <p className="text-xs text-slate-500">Keep your work on track</p>
                            </div>
                        </div>

                        {/* 2. Collaborate Efficiently */}
                        <div className="flex items-center gap-3.5 p-2 rounded-xl bg-white/60 backdrop-blur-xs border border-white/80 shadow-2xs transition-all duration-200 hover:bg-white hover:shadow-xs group">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-2xs transition-transform duration-200 group-hover:scale-105 shrink-0">
                                <FiUsers className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">Collaborate Efficiently</h3>
                                <p className="text-xs text-slate-500">Work together, get more done</p>
                            </div>
                        </div>

                        {/* 3. Track Progress */}
                        <div className="flex items-center gap-3.5 p-2 rounded-xl bg-white/60 backdrop-blur-xs border border-white/80 shadow-2xs transition-all duration-200 hover:bg-white hover:shadow-xs group">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-600 shadow-2xs transition-transform duration-200 group-hover:scale-105 shrink-0">
                                <FiTrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">Track Progress</h3>
                                <p className="text-xs text-slate-500">Stay informed, meet your goals</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom empty spacing (kept clean & empty as requested) */}
                <div className="relative z-10 h-12" />
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-8 sm:py-12 bg-white min-h-screen">
                {/* Top Nav: Back to Home & Logo */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
                    >
                        <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                        <span>Back to Home</span>
                    </Link>
                    <Link to="/" className="lg:hidden cursor-pointer">
                        <img src={logoImg} alt="Logo" className="h-7 w-auto object-contain" />
                    </Link>
                </div>

                {/* Form Container */}
                <div className="max-w-md w-full mx-auto my-auto py-8">
                    <div className="text-center sm:text-left mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                            Welcome Back
                        </h1>
                        <p className="mt-2.5 text-sm sm:text-base text-slate-500">
                            Enter your email and password to access your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        {submitSuccess && (
                            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-medium">Validation successful! Logging into your workspace...</span>
                            </div>
                        )}

                        {/* Email Input - Minimal Bottom Line Style */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (errors.email) {
                                            setErrors((prev) => ({ ...prev, email: undefined }))
                                        }
                                    }}
                                    placeholder="name@company.com"
                                    className={`w-full bg-transparent border-b py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                                        errors.email
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-slate-300 focus:border-blue-600'
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                    <span>•</span> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input - Minimal Bottom Line Style with Eye Toggle */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (errors.password) {
                                            setErrors((prev) => ({ ...prev, password: undefined }))
                                        }
                                    }}
                                    placeholder="••••••••••••"
                                    className={`w-full bg-transparent border-b py-2.5 pr-10 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                                        errors.password
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-slate-300 focus:border-blue-600'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="w-4 h-4" />
                                    ) : (
                                        <FiEye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                    <span>•</span> {errors.password}
                                </p>
                            )}

                            {/* Forgot Password Link */}
                            <div className="flex justify-end pt-1">
                                <Link
                                    to="/forgetpassword"
                                    className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    Forget Your Password?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button with button gradient */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
                                isSubmitting ? 'opacity-80 cursor-wait' : ''
                            }`}
                        >
                            {isSubmitting ? 'Signing in...' : 'Log in'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-7 flex items-center justify-center">
                        <div className="w-full border-t border-slate-200"></div>
                        <span className="absolute bg-white px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Or Login With
                        </span>
                    </div>

                    {/* Google Login Button */}
                    <div>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80 rounded-xl text-sm font-medium text-slate-700 shadow-xs transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                            <img src={googleIcon} alt="Google" className="w-5 h-5 object-contain" />
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    {/* Footer: Signup Link */}
                    <div className="mt-8 text-center text-sm text-slate-600">
                        <span>Don't have an account? </span>
                        <Link
                            to="/signup"
                            className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors underline cursor-pointer"
                        >
                            Signup
                        </Link>
                    </div>
                </div>

                {/* Footer copyright / info */}
                <div className="text-center lg:text-left text-xs text-slate-400">
                    © {new Date().getFullYear()} Project Management System. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default LoginForm