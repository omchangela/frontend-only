import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bannersPerPage, setBannersPerPage] = useState(10); // Default number of banners per page

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/banner/v1/banners/all`);
                setBanners(response.data);
            } catch (error) {
                console.log('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    const deleteBanner = async (id) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/banner/v1/banner/${id}`);
                setBanners(banners.filter(banner => banner.id !== id)); // Update to use `id` instead of `_id`
            } catch (error) {
                console.log('Error deleting banner:', error);
            }
        }
    };

    // Filtered banners based on search term
    const filteredBanners = banners.filter(banner =>
        banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current banners for the current page
    const indexOfLastBanner = currentPage * bannersPerPage;
    const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
    const currentBanners = filteredBanners.slice(indexOfFirstBanner, indexOfLastBanner);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle previous and next buttons
    const handleNext = () => {
        if (currentPage < Math.ceil(filteredBanners.length / bannersPerPage)) {
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

        for (let i = 1; i <= Math.ceil(filteredBanners.length / bannersPerPage); i++) {
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
    const totalEntries = filteredBanners.length;
    const startEntry = indexOfFirstBanner + 1;
    const endEntry = indexOfLastBanner > totalEntries ? totalEntries : indexOfLastBanner;

    // Handle entries per page change
    const handleEntriesPerPageChange = (e) => {
        setBannersPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Banners</h2>
                <Link to="/banner/add" className="btn" style={{ backgroundColor: '#2F4CDD', color: 'white', padding: '10px 20px' }}>Add Banner</Link>
            </div>
            <div style={{ backgroundColor: 'white', padding: '30px 60px' }}>
                {/* Search Box and select entries dropdown */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                        <label className="me-2" htmlFor="entriesPerPage">Show:</label>
                        <select
                            id="entriesPerPage"
                            className="form-select me-3"
                            value={bannersPerPage}
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
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table border">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBanners.map((banner, index) => (
                                <tr key={banner.id}>
                                    <td>{index + 1 + (currentPage - 1) * bannersPerPage}</td>
                                    <td>
                                        {banner.image ? (
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${banner.image}`} // Updated image URL
                                                alt={banner.title}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{banner.title}</td>
                                    <td>{banner.description}</td>
                                    <td>{banner.status === 1 ? 'Active' : 'Inactive'}</td> {/* Display status */}
                                    <td>
                                        <Link to={`/banner/edit/${banner.id}`} className="btn btn-primary me-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                        <button
                                            onClick={() => deleteBanner(banner.id)} // Use `id` for deletion
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

export default Banner;
