// components/Header.js
import { useContext, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    ParkingCircle,
    Menu,
    X,
    Moon,
    Sun
} from 'lucide-react';
import { Theme } from './Theme';

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useContext(Theme)

    function handleActive({ isActive }) {
        return `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors 
        ${theme === 'dark' ? ' text-white ' : ' text-black'}
        ${isActive ? theme == 'dark' ? 'text-gray-900 bg-blue-600 hover:bg-blue-600'
                : 'bg-blue-600 text-white hover:text-white hover:bg-blue-600' : 'hover:bg-blue-600 hover:text-white'
            }`
    }

    return (
        <>
            <header className={`shadow-sm border-b border-gray-200 h-fit py-2 ${theme === 'dark' ? 'bg-gray-900 text-white ' : 'bg-gray-100 text-black'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className={`flex items - center ${theme === 'dark' ? ' text-white ' : ' text-black'} `}>
                            <ParkingCircle className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-bold ">Smart Parking System</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-6">
                            <ul className={`flex space-x-4 ${theme === 'dark' ? ' text-white ' : ' text-black'} `}>
                                <li >
                                    <NavLink className={(isActive) => handleActive(isActive)} to='/'>DashBoard</NavLink>
                                </li>

                                <li >
                                    <NavLink className={(isActive) => handleActive(isActive)} to='/slots'>Slots</NavLink>
                                </li>

                                <li >
                                    <NavLink className={(isActive) => handleActive(isActive)} to='/vehicles'>Vehicles</NavLink>
                                </li>
                            </ul>

                            <div className='flex items-center' onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                                {theme == 'light' ? <button className='cursor-pointer mb-0'> <Moon size={22} /></button> : <button className='cursor-pointer mb-0'> <Sun size={22} /></button>}
                            </div>
                        </nav>


                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                            <ul className='flex space-x-4'>
                                <li >
                                    <NavLink className={(isActive) => handleActive(isActive)} to='/'>DashBoard</NavLink>
                                </li>

                                <li >
                                    <NavLink className={(isActive) => handleActive(isActive)} to='/slots'>Slots</NavLink>
                                </li>

                                <li >
                                    <NavLink className={(isActive) => handleActive(isActive)} to='/vehicles'>Vehicles</NavLink>
                                </li>

                                <li >
                                    <NavLink className={(isActive) => handleActive(isActive)} to='/alerts'>Alerts</NavLink>
                                </li>
                            </ul>



                        </div>
                    </div>
                )}
            </header>

            <Outlet />
        </>
    );
};

export default Layout;
