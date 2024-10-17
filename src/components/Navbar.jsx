import React, { useState, useContext } from 'react';
import './Navbar.css'; 
import chatimg from '../assets/chat.png';
import notificationImg from '../assets/notification.png';
import settingImg from '../assets/setting.png';
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext); // Use context to get auth state
    const [searchTerm, setSearchTerm] = useState('');

    console.log('Is Authenticated:', isAuthenticated); // Debug log

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLogout = () => {
        logout(); // Call logout function
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse d-flex justify-content-between align-items-center">
                    {/* Left Side: Search Box */}
                    <div className="d-flex align-items-center col-3">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="navbar-nav flex-grow-1 justify-content-center">
                        <a className="nav-link" href="/about">About</a>
                        <a className="nav-link" href="/tools">Tools</a>
                        <a className="nav-link" href="/help">Help</a>
                    </div>

                    {/* Icons Row */}
                    <div className="d-flex justify-content-end align-items-center mb-2">
                        {/* Icons */}
                        <a href="/notifications" className="me-3">
                            <img src={notificationImg} alt="Notification" style={{ width: '40px', height: '40px' }} />
                        </a>
                        <a href="/chat" className="me-3">
                            <img src={chatimg} alt="Chat" style={{ width: '40px', height: '40px' }} />
                        </a>
                        <a href="/settings" className="me-3">
                            <img src={settingImg} alt="Settings" style={{ width: '40px', height: '40px' }} />
                        </a>
                    </div>
                    
                    {/* Right Side: Logout */}
                    <div className="navbar-nav color rounded" style={{ backgroundColor: '#2F4CDD' }}>
                        {isAuthenticated && (
                            <a className="nav-link" style={{ color: '#FFFFFF' }} onClick={handleLogout}>Logout</a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
