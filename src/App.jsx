import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Services from './components/Services';
import Dashboard from './components/Dashboard';
import Banner from './components/Banner';
import Orders from './components/Orders';
import ServiceForm from './components/ServiceForm';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import './App.css';
import BannerForm from './components/BannerForm';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Redirect root to /dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Protected Routes */}
                    <Route
                        path="/*"
                        element={
                            <div className="app-container">
                                <Sidebar />
                                <div className="content-container">
                                    <Navbar />
                                    <div className="main-content">
                                        <Routes>
                                            <Route
                                                path="/dashboard"
                                                element={
                                                    <PrivateRoute>
                                                        <Dashboard />
                                                    </PrivateRoute>
                                                }
                                            />
                                            <Route
                                                path="/services"
                                                element={
                                                    <PrivateRoute>
                                                        <Services />
                                                    </PrivateRoute>
                                                }
                                            />
                                            <Route
                                                path="/services/add"
                                                element={
                                                    <PrivateRoute>
                                                        <ServiceForm />
                                                    </PrivateRoute>
                                                }
                                            />
                                            <Route
                                                path="/services/edit/:id"
                                                element={
                                                    <PrivateRoute>
                                                        <ServiceForm />
                                                    </PrivateRoute>
                                                }
                                            />
                                            <Route
                                                path="/banner"
                                                element={
                                                    <PrivateRoute>
                                                        <Banner />
                                                    </PrivateRoute>
                                                }
                                            />
                                            <Route
                                                path="/banner/add"
                                                element={
                                                    <PrivateRoute>
                                                        <BannerForm />
                                                    </PrivateRoute>
                                                }
                                            />
                                            <Route
                                                path="/order"
                                                element={
                                                    <PrivateRoute>
                                                        <Orders />
                                                    </PrivateRoute>
                                                }
                                            />
                                        </Routes>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
