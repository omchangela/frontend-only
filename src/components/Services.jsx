import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [servicesPerPage, setServicesPerPage] = useState(10); // Default number of services per page

    useEffect(() => {
        const fetchServices = async () => {
            try {
                                
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/service/v1/services/all`);
                setServices(response.data);
            } catch (error) {
                console.log('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const deleteService = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/service/v1/service/${id}`);
                setServices(services.filter(service => service._id !== id));
            } catch (error) {
                console.log('Error deleting service:', error);
            }
        }
    };

    // Filtered services based on search term
    const filteredServices = services.filter(service =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current services for the current page
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle previous and next buttons
    const handleNext = () => {
        if (currentPage < Math.ceil(filteredServices.length / servicesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Render pagination buttons
    const renderPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(filteredServices.length / servicesPerPage); i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <a onClick={() => paginate(i)} className="page-link" href="javascript:void(0);">{i}</a>
                </li>
            );
        }

        return (
            <ul className="pagination justify-content-end">
                <li className="page-item">
                    <a className="page-link" href="javascript:void(0);" onClick={handlePrevious}>Previous</a>
                </li>
                {pageNumbers}
                <li className="page-item">
                    <a className="page-link" href="javascript:void(0);" onClick={handleNext}>Next</a>
                </li>
            </ul>
        );
    };

    // Calculate entry range
    const totalEntries = filteredServices.length;
    const startEntry = indexOfFirstService + 1;
    const endEntry = indexOfLastService > totalEntries ? totalEntries : indexOfLastService;

    // Handle entries per page change
    const handleEntriesPerPageChange = (e) => {
        setServicesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Services</h2>
                <Link to="/services/add" className="btn" style={{ backgroundColor: '#2F4CDD', color: 'white', padding: '10px 20px' }}>Add Service</Link>
            </div>
            <div style={{backgroundColor:'white', padding: '30px 60px'}}>
                {/* Search Box and select entrie's dropdown*/}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                        <label className="me-2" htmlFor="entriesPerPage">Show:</label>
                        <select
                            id="entriesPerPage"
                            className="form-select me-3"
                            value={servicesPerPage}
                            onChange={handleEntriesPerPageChange}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>

                    </div>
                    <div className="mb-3 col-3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div></div>



                <div className="table-responsive">
                    <table className="table border">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Image</th>
                                <th>Service Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentServices.map((service, index) => (
                                <tr key={service._id}>
                                    <td>{index + 1 + (currentPage - 1) * servicesPerPage}</td>
                                    <td>
                                        {service.imageUrl ? (
                                            <img
                                                src={`http://localhost:5000${service.imageUrl}`}
                                                alt={service.serviceName}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.serviceAmount}</td>
                                    <td>{service.description}</td>
                                    <td>
                                        <Link to={`/services/edit/${service._id}`} className="btn btn-primary me-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                        <button
                                            onClick={() => deleteService(service._id)}
                                            className="btn btn-danger"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Entry Count and Pagination in One Line */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            Showing {startEntry} to {endEntry} of {totalEntries} entries
                        </div>
                        <div>
                            {renderPagination()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
