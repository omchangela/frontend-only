import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheckCircle, faHourglassHalf, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Filterimg from '../assets/filter1.png'
const Dashboard = () => {
    const [showFilters, setShowFilters] = useState(false); 
    const [showOrderStatus, setShowOrderStatus] = useState(false);
    const [showUserType, setShowUserType] = useState(false);

    // Toggle the entire filter section
    const toggleFilterSection = () => {
        setShowFilters(!showFilters);
    };

    // Toggle individual dropdowns
    const toggleOrderStatusDropdown = () => {
        setShowOrderStatus(!showOrderStatus);
    };

    const toggleUserTypeDropdown = () => {
        setShowUserType(!showUserType);
    };

    return (
        <div className="container mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
                <div>
                    <h1>Dashboard</h1>
                    <p style={{ color: '#969BA0', marginBottom: 0 }}>Welcome to Admin!</p>
                </div>

                {/* Filter Button */}
                <div style={{ backgroundColor: '#F4F5F9' }}>
                    <img src={Filterimg} alt="" />
                    <button className="btn" onClick={toggleFilterSection}>
                        {showFilters ? "Hide Filters" : "Filters"}
                    </button>
                </div>
            </div>

            {/* Filter Section - Show/Hide based on the state */}
            {showFilters && (
                <div className="row mb-4">
                    <div className="col-md-3">
                        <label htmlFor="dateRange" className="form-label">Date Range</label>
                        <input type="date" className="form-control" id="dateRangeStart" placeholder="Start Date" />
                        <input type="date" className="form-control mt-2" id="dateRangeEnd" placeholder="End Date" />
                    </div>

                    {/* Order Status Filter Dropdown */}
                    <div className="col-md-3 position-relative">
                        <label htmlFor="orderStatus" className="form-label">Order Status</label>
                        <div className="form-control" onClick={toggleOrderStatusDropdown}>
                            Select Status
                        </div>
                        {showOrderStatus && (
                            <ul className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: '0', width: '100%' }}>
                                <li className="dropdown-item" onClick={() => setShowOrderStatus(false)}>All</li>
                                <li className="dropdown-item" onClick={() => setShowOrderStatus(false)}>Completed</li>
                                <li className="dropdown-item" onClick={() => setShowOrderStatus(false)}>Pending</li>
                                <li className="dropdown-item" onClick={() => setShowOrderStatus(false)}>Cancelled</li>
                            </ul>
                        )}
                    </div>

                    {/* User Type Filter Dropdown */}
                    <div className="col-md-3 position-relative">
                        <label htmlFor="userType" className="form-label">User Type</label>
                        <div className="form-control" onClick={toggleUserTypeDropdown}>
                            Select User Type
                        </div>
                        {showUserType && (
                            <ul className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: '0', width: '100%' }}>
                                <li className="dropdown-item" onClick={() => setShowUserType(false)}>All</li>
                                <li className="dropdown-item" onClick={() => setShowUserType(false)}>Admin</li>
                                <li className="dropdown-item" onClick={() => setShowUserType(false)}>Regular User</li>
                            </ul>
                        )}
                    </div>

                    <div className="col-md-3 d-flex align-items-end">
                        <button className="btn btn-primary w-100">Apply Filters</button>
                    </div>
                </div>
            )}

            {/* Dashboard Statistics Section */}
            <div className="row mt-4 rounded">
                {/* Total Users Box */}
                <div className="col-md-3 mb-4 d-flex justify-content-center">
                    <div className="card text-center" style={{ width: '339px', height: '168px', borderRadius: '20px 0px 0px 0px' }}>
                        <div className="card-body d-flex flex-row align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faUsers} size="2x" className="me-3" />
                            <div className="d-flex flex-column align-items-start">
                                <h2 className="mb-0">25</h2>
                                <p className="mb-0">Total Users</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Completed Orders Box */}
                <div className="col-md-3 mb-4 d-flex justify-content-center">
                    <div className="card text-center" style={{ width: '339px', height: '168px', borderRadius: '20px 0px 0px 0px' }}>
                        <div className="card-body d-flex flex-row align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faCheckCircle} size="2x" className="me-3" />
                            <div className="d-flex flex-column align-items-start">
                                <h2 className="mb-0">29</h2>
                                <p className="mb-0">Completed Orders</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Orders Box */}
                <div className="col-md-3 mb-4 d-flex justify-content-center">
                    <div className="card text-center" style={{ width: '339px', height: '168px', borderRadius: '20px 0px 0px 0px' }}>
                        <div className="card-body d-flex flex-row align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faHourglassHalf} size="2x" className="me-3" />
                            <div className="d-flex flex-column align-items-start">
                                <h2 className="mb-0">10</h2>
                                <p className="mb-0">Pending Orders</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cancelled Orders Box */}
                <div className="col-md-3 mb-4 d-flex justify-content-center">
                    <div className="card text-center" style={{ width: '339px', height: '168px', borderRadius: '20px 0px 0px 0px' }}>
                        <div className="card-body d-flex flex-row align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faTimesCircle} size="2x" className="me-3" />
                            <div className="d-flex flex-column align-items-start">
                                <h2 className="mb-0">5</h2>
                                <p className="mb-0">Cancelled Orders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
