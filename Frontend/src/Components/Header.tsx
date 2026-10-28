import { useState } from 'react'
import { Link } from 'react-router'
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi'
import logoImg from '../assets/PMSLOGOBG.png'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Solutions', href: '#solutions' },
        { name: 'Workflow', href: '#workflow' },
        { name: 'Pricing', href: '#pricing' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Brand / Logo */}
                    <div className="flex items-center gap-8">
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

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Right side: Login & CTA */}
                    <div className="hidden sm:flex items-center gap-3">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors rounded-lg hover:bg-slate-100/70"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs hover:shadow transition-all duration-150 active:scale-[0.98]"
                        >
                            <span>Get Started</span>
                            <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 sm:hidden">
                        <Link
                            to="/login"
                            className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-950"
                        >
                            Log in
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                        <Link
                            to="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-center py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
                        >
                            <span>Get Started</span>
                            <FiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            )}
        </header>

    )
}
export default Header