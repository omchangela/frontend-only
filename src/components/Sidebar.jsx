import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faConciergeBell, faImage, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FontAwesomeIcon icon={faTachometerAlt} className="me-2" /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FontAwesomeIcon icon={faConciergeBell} className="me-2" /> Services
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/banner" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FontAwesomeIcon icon={faImage} className="me-2" /> Banner
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/order" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> Orders
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
