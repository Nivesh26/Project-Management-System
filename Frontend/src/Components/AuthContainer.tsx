import { useState, useEffect, type FormEvent, type MouseEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { z } from 'zod'
import {
    FiEye,
    FiEyeOff,
    FiArrowLeft,
    FiCheckSquare,
    FiUsers,
    FiTrendingUp,
    FiUser,
    FiBriefcase,
    FiBookOpen
} from 'react-icons/fi'
import googleIcon from '../assets/google.png'
import logoImg from '../assets/PMSlogobg.png'

/* =========================================================================
   ZOD VALIDATION SCHEMAS
   ========================================================================= */

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

const signupSchema = z
    .object({
        role: z.enum(['user', 'company', 'professor']),
        fullName: z
            .string()
            .min(1, 'Full name is required')
            .min(2, 'Name must be at least 2 characters'),
        email: z
            .string()
            .min(1, 'Email is required')
            .email('Please enter a valid email address'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z
            .string()
            .min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface AuthContainerProps {
    initialMode?: 'login' | 'signup'
}

export const AuthContainer = ({ initialMode = 'login' }: AuthContainerProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    // Mode state: 'login' (Showcase Left, Form Right) or 'signup' (Form Left, Showcase Right)
    const [mode, setMode] = useState<'login' | 'signup'>(() => {
        if (location.pathname === '/signup') return 'signup'
        if (location.pathname === '/login') return 'login'
        return initialMode
    })

    // Listen to route changes (e.g. browser back/forward buttons)
    useEffect(() => {
        if (location.pathname === '/signup') {
            setMode('signup')
        } else if (location.pathname === '/login') {
            setMode('login')
        }
    }, [location.pathname])

    // Login Form State
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [showLoginPassword, setShowLoginPassword] = useState(false)
    const [loginErrors, setLoginErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})
    const [isLoginSubmitting, setIsLoginSubmitting] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)

    // Signup Form State
    const [signupRole, setSignupRole] = useState<'user' | 'company' | 'professor'>('user')
    const [signupFullName, setSignupFullName] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
    const [showSignupPassword, setShowSignupPassword] = useState(false)
    const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false)
    const [signupErrors, setSignupErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({})
    const [isSignupSubmitting, setIsSignupSubmitting] = useState(false)
    const [signupSuccess, setSignupSuccess] = useState(false)

    const roleOptions = [
        {
            id: 'user' as const,
            label: 'User',
            subtitle: 'Individual / Student',
            icon: FiUser,
        },
        {
            id: 'company' as const,
            label: 'Company',
            subtitle: 'Organization / Team',
            icon: FiBriefcase,
        },
        {
            id: 'professor' as const,
            label: 'Professor',
            subtitle: 'Faculty / Educator',
            icon: FiBookOpen,
        },
    ]

    // Smooth Mode Switching with URL update
    const handleSwitchMode = (targetMode: 'login' | 'signup', e?: MouseEvent) => {
        if (e) e.preventDefault()
        if (mode === targetMode) return
        setMode(targetMode)
        navigate(`/${targetMode}`, { replace: false })
    }

    // Handle Login Submit
    const handleLoginSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoginSuccess(false)

        const result = loginSchema.safeParse({ email: loginEmail, password: loginPassword })

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof LoginFormData
                if (field && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message
                }
            })
            setLoginErrors(fieldErrors)
            return
        }

        setLoginErrors({})
        setIsLoginSubmitting(true)
        setTimeout(() => {
            setIsLoginSubmitting(false)
            setLoginSuccess(true)
            console.log('Login successful with:', result.data)
        }, 600)
    }

    // Handle Signup Submit
    const handleSignupSubmit = (e: FormEvent) => {
        e.preventDefault()
        setSignupSuccess(false)

        const result = signupSchema.safeParse({
            role: signupRole,
            fullName: signupFullName,
            email: signupEmail,
            password: signupPassword,
            confirmPassword: signupConfirmPassword,
        })

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {}
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof SignupFormData
                if (field && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message
                }
            })
            setSignupErrors(fieldErrors)
            return
        }

        setSignupErrors({})
        setIsSignupSubmitting(true)
        setTimeout(() => {
            setIsSignupSubmitting(false)
            setSignupSuccess(true)
            console.log('Signup successful with:', result.data)
        }, 600)
    }

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden bg-white">
            {/* =============================================================
                SHOWCASE PANEL (Plan. Track. Deliver.)
                Slides smoothly between Left (Login) and Right (Signup)
               ============================================================= */}
            <div
                className={`hidden lg:flex lg:w-1/2 min-h-screen lg:absolute lg:top-0 lg:bottom-0 left-0 z-10 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${mode === 'login'
                    ? 'lg:translate-x-0 border-r border-slate-200/90 shadow-[6px_0_30px_-5px_rgba(37,99,235,0.06)]'
                    : 'lg:translate-x-full border-l border-slate-200/90 shadow-[-6px_0_30px_-5px_rgba(37,99,235,0.06)]'
                    } bg-gradient-to-b from-[#F8FAFD] via-[#F1F6FE] to-[#EBF3FC] p-10 xl:p-14 overflow-hidden flex-col justify-between`}
            >
                {/* Background Wave & Organic Flow Pattern */}
                <div
                    className={`absolute inset-0 overflow-hidden pointer-events-none select-none transition-transform duration-700 ease-in-out ${mode === 'signup' ? '-scale-x-100' : ''
                        }`}
                >
                    {/* Subtle dot matrix grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

                    {/* Ambient glow */}
                    <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl" />

                    {/* Layered Organic SVG Waves */}
                    <svg
                        className="absolute w-full h-full inset-0"
                        viewBox="0 0 700 1000"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="waveBlueGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#CBE2F9" stopOpacity="0.85" />
                                <stop offset="50%" stopColor="#DBEAFE" stopOpacity="0.75" />
                                <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.5" />
                            </linearGradient>
                            <linearGradient id="waveEmeraldGrad" x1="100%" y1="20%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.75" />
                                <stop offset="50%" stopColor="#D1FAE5" stopOpacity="0.65" />
                                <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0.4" />
                            </linearGradient>
                            <linearGradient id="waveAzureGrad" x1="100%" y1="50%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.7" />
                                <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>

                        {/* Upper Soft Blue Wave */}
                        <path
                            d="M 700 380 C 560 410 420 500 280 600 C 160 690 60 770 0 840 L 0 1000 L 700 1000 Z"
                            fill="url(#waveBlueGrad)"
                        />

                        {/* Middle Mint Green Wave */}
                        <path
                            d="M 700 520 C 580 550 440 640 320 730 C 200 810 90 880 0 930 L 0 1000 L 700 1000 Z"
                            fill="url(#waveEmeraldGrad)"
                        />

                        {/* Lower Azure Wave */}
                        <path
                            d="M 700 680 C 590 710 480 790 360 860 C 240 920 120 970 0 990 L 0 1000 L 700 1000 Z"
                            fill="url(#waveAzureGrad)"
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

                {/* Bottom empty spacing */}
                <div className="relative z-10 h-12" />
            </div>

            {/* =============================================================
                FORM PANEL (Login & Signup)
                Slides smoothly between Right (Login) and Left (Signup)
               ============================================================= */}
            <div
                className={`w-full lg:w-1/2 min-h-screen lg:absolute lg:top-0 lg:bottom-0 left-0 z-20 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${mode === 'login' ? 'lg:translate-x-full' : 'lg:translate-x-0'
                    } flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-8 sm:py-10 bg-white overflow-y-auto`}
            >
                {/* Top Nav: Back to Home & Mobile Logo */}
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

                {/* Form Wrapper with Smooth Crossfade */}
                <div className="max-w-md w-full mx-auto my-auto py-6">
                    {mode === 'login' ? (
                        /* ---------------------------------------------
                           LOGIN FORM VIEW
                           --------------------------------------------- */
                        <div className="transition-opacity duration-300 ease-in-out opacity-100">
                            <div className="text-center sm:text-left mb-7">
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                                    Welcome Back
                                </h1>
                                <p className="mt-2 text-sm sm:text-base text-slate-500">
                                    Enter your email and password to access your account.
                                </p>
                            </div>

                            <form onSubmit={handleLoginSubmit} noValidate className="space-y-5">
                                {loginSuccess && (
                                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="font-medium">Validation successful! Logging into your workspace...</span>
                                    </div>
                                )}

                                {/* Email Input */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={loginEmail}
                                            onChange={(e) => {
                                                setLoginEmail(e.target.value)
                                                if (loginErrors.email) {
                                                    setLoginErrors((prev) => ({ ...prev, email: undefined }))
                                                }
                                            }}
                                            placeholder="name@company.com"
                                            className={`w-full bg-transparent border-b py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${loginErrors.email
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-300 focus:border-blue-600'
                                                }`}
                                        />
                                    </div>
                                    {loginErrors.email && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                            <span>•</span> {loginErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showLoginPassword ? 'text' : 'password'}
                                            value={loginPassword}
                                            onChange={(e) => {
                                                setLoginPassword(e.target.value)
                                                if (loginErrors.password) {
                                                    setLoginErrors((prev) => ({ ...prev, password: undefined }))
                                                }
                                            }}
                                            placeholder="••••••••••••"
                                            className={`w-full bg-transparent border-b py-2 pr-10 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${loginErrors.password
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-300 focus:border-blue-600'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
                                            aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showLoginPassword ? (
                                                <FiEyeOff className="w-4 h-4" />
                                            ) : (
                                                <FiEye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    {loginErrors.password && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                            <span>•</span> {loginErrors.password}
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

                                {/* Login Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoginSubmitting}
                                    className={`w-full py-3.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${isLoginSubmitting ? 'opacity-80 cursor-wait' : ''
                                        }`}
                                >
                                    {isLoginSubmitting ? 'Signing in...' : 'Log in'}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6 flex items-center justify-center">
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

                            {/* Switch to Signup */}
                            <div className="mt-7 text-center text-sm text-slate-600">
                                <span>Don't have an account? </span>
                                <button
                                    type="button"
                                    onClick={(e) => handleSwitchMode('signup', e)}
                                    className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors underline cursor-pointer"
                                >
                                    Signup
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* ---------------------------------------------
                           SIGNUP FORM VIEW
                           --------------------------------------------- */
                        <div className="transition-opacity duration-300 ease-in-out opacity-100">
                            <div className="text-center sm:text-left mb-5">
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                                    Create Account
                                </h1>
                                <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                                    Start organizing, tracking, and delivering projects today.
                                </p>
                            </div>

                            <form onSubmit={handleSignupSubmit} noValidate className="space-y-3.5">
                                {signupSuccess && (
                                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="font-medium">
                                            {signupRole === 'company'
                                                ? 'Company workspace created! Welcome to PMS...'
                                                : signupRole === 'professor'
                                                    ? 'Academic mentor account created! Welcome...'
                                                    : 'Account created successfully! Welcome to PMS...'}
                                        </span>
                                    </div>
                                )}

                                {/* Account Type / Role Selector (Company, User, Professor) */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        I am joining as
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {roleOptions.map((option) => {
                                            const isSelected = signupRole === option.id
                                            const Icon = option.icon
                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSignupRole(option.id)
                                                        if (signupErrors.role) {
                                                            setSignupErrors((prev) => ({ ...prev, role: undefined }))
                                                        }
                                                    }}
                                                    className={`group relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer text-center ${isSelected
                                                        ? 'bg-blue-50/90 border-blue-600 text-blue-700 shadow-xs ring-1 ring-blue-500/25'
                                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50/80'
                                                        }`}
                                                >
                                                    <Icon
                                                        className={`w-4 h-4 mb-1 transition-transform duration-150 group-hover:scale-110 ${isSelected ? 'text-blue-600' : 'text-slate-400'
                                                            }`}
                                                    />
                                                    <span className="leading-tight font-medium">{option.label}</span>
                                                    <span className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5 hidden sm:inline">
                                                        {option.subtitle}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    {signupErrors.role && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                            <span>•</span> {signupErrors.role}
                                        </p>
                                    )}
                                </div>

                                {/* Full Name / Organization Input */}
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        {signupRole === 'company'
                                            ? 'Company / Representative Name'
                                            : signupRole === 'professor'
                                                ? 'Full Name & Academic Title'
                                                : 'Full Name'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={signupFullName}
                                            onChange={(e) => {
                                                setSignupFullName(e.target.value)
                                                if (signupErrors.fullName) {
                                                    setSignupErrors((prev) => ({ ...prev, fullName: undefined }))
                                                }
                                            }}
                                            placeholder={
                                                signupRole === 'company'
                                                    ? 'Acme Inc. / Alex Morgan'
                                                    : signupRole === 'professor'
                                                        ? 'Prof. Alex Morgan'
                                                        : 'Alex Morgan'
                                            }
                                            className={`w-full bg-transparent border-b py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${signupErrors.fullName
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-300 focus:border-blue-600'
                                                }`}
                                        />
                                    </div>
                                    {signupErrors.fullName && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                            <span>•</span> {signupErrors.fullName}
                                        </p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        {signupRole === 'company' ? 'Company Work Email' : signupRole === 'professor' ? 'Academic / Institutional Email' : 'Email'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={signupEmail}
                                            onChange={(e) => {
                                                setSignupEmail(e.target.value)
                                                if (signupErrors.email) {
                                                    setSignupErrors((prev) => ({ ...prev, email: undefined }))
                                                }
                                            }}
                                            placeholder={
                                                signupRole === 'company'
                                                    ? 'contact@company.com'
                                                    : signupRole === 'professor'
                                                        ? 'professor@university.edu'
                                                        : 'name@company.com'
                                            }
                                            className={`w-full bg-transparent border-b py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${signupErrors.email
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-300 focus:border-blue-600'
                                                }`}
                                        />
                                    </div>
                                    {signupErrors.email && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                            <span>•</span> {signupErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showSignupPassword ? 'text' : 'password'}
                                            value={signupPassword}
                                            onChange={(e) => {
                                                setSignupPassword(e.target.value)
                                                if (signupErrors.password) {
                                                    setSignupErrors((prev) => ({ ...prev, password: undefined }))
                                                }
                                            }}
                                            placeholder="••••••••••••"
                                            className={`w-full bg-transparent border-b py-2 pr-10 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${signupErrors.password
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-300 focus:border-blue-600'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
                                            aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showSignupPassword ? (
                                                <FiEyeOff className="w-4 h-4" />
                                            ) : (
                                                <FiEye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    {signupErrors.password && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                            <span>•</span> {signupErrors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password Input */}
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showSignupConfirmPassword ? 'text' : 'password'}
                                            value={signupConfirmPassword}
                                            onChange={(e) => {
                                                setSignupConfirmPassword(e.target.value)
                                                if (signupErrors.confirmPassword) {
                                                    setSignupErrors((prev) => ({ ...prev, confirmPassword: undefined }))
                                                }
                                            }}
                                            placeholder="••••••••••••"
                                            className={`w-full bg-transparent border-b py-2 pr-10 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${signupErrors.confirmPassword
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-300 focus:border-blue-600'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
                                            aria-label={showSignupConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                        >
                                            {showSignupConfirmPassword ? (
                                                <FiEyeOff className="w-4 h-4" />
                                            ) : (
                                                <FiEye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    {signupErrors.confirmPassword && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                                            <span>•</span> {signupErrors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Signup Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSignupSubmitting}
                                    className={`w-full mt-2 py-3 px-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${isSignupSubmitting ? 'opacity-80 cursor-wait' : ''
                                        }`}
                                >
                                    {isSignupSubmitting
                                        ? 'Creating account...'
                                        : `Join as ${signupRole === 'company' ? 'Company' : signupRole === 'professor' ? 'Professor' : 'User'}`}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-5 flex items-center justify-center">
                                <div className="w-full border-t border-slate-200"></div>
                                <span className="absolute bg-white px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Or Sign Up With
                                </span>
                            </div>

                            {/* Google Signup Button */}
                            <div>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80 rounded-xl text-sm font-medium text-slate-700 shadow-xs transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                                >
                                    <img src={googleIcon} alt="Google" className="w-5 h-5 object-contain" />
                                    <span>Continue with Google</span>
                                </button>
                            </div>

                            {/* Switch to Login */}
                            <div className="mt-6 text-center text-sm text-slate-600">
                                <span>Already have an account? </span>
                                <button
                                    type="button"
                                    onClick={(e) => handleSwitchMode('login', e)}
                                    className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors underline cursor-pointer"
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer copyright */}
                <div className="text-center lg:text-left text-xs text-slate-400">
                    © {new Date().getFullYear()} Project Management System. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default AuthContainer
