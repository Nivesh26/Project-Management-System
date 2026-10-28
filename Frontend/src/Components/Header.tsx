import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FiMenu, FiX } from 'react-icons/fi'
import logoImg from '../assets/PMSlogobg.png'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Learnings', href: '/learnings' },
        // { name: 'Jobs', href: '/jobs' },
        { name: 'Projects', href: '/projects' },
        { name: 'Pricing', href: '/pricing' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16 sm:h-20">
                    {/* Brand / Logo (Left) */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="group flex items-center transition-transform hover:opacity-95"
                            aria-label="Project Management System Home"
                        >
                            <img
                                src={logoImg}
                                alt="Project Management System"
                                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation (Centered in the middle) */}
                    <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="group relative py-1 text-sm font-medium transition-colors duration-200 cursor-pointer"
                                >
                                    <span
                                        className={
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold'
                                                : 'text-slate-600 group-hover:text-blue-600 transition-colors'
                                        }
                                    >
                                        {link.name}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 ease-out ${
                                            isActive
                                                ? 'w-full'
                                                : 'w-0 group-hover:w-full'
                                        }`}
                                    />
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right side: Single Login Button */}
                    <div className="hidden sm:flex items-center">
                        <Link
                            to="/login"
                            className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-sm shadow-blue-500/25 hover:shadow-md hover:shadow-blue-500/35 border border-blue-400/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="sm:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-3 shadow-lg">
                    <nav className="flex flex-col space-y-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="relative flex items-center justify-between px-3 py-2 text-base font-medium transition-colors cursor-pointer"
                                >
                                    <span
                                        className={
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold'
                                                : 'text-slate-700 hover:text-blue-600'
                                        }
                                    >
                                        {link.name}
                                    </span>
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="pt-2 border-t border-slate-100 flex flex-col">
                        <Link
                            to="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full inline-flex items-center justify-center py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </header>

    )
}
export default Header