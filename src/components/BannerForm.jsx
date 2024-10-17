import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BannerForm = ({ existingBanner }) => {
    const [title, setTitle] = useState(existingBanner ? existingBanner.title : '');
    const [description, setDescription] = useState(existingBanner ? existingBanner.description : '');
    const [status, setStatus] = useState(existingBanner ? existingBanner.status : 1);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('status', status);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = existingBanner
                ? await axios.put(`${process.env.REACT_APP_API_URL}/banner/v1/banner/${existingBanner.id}`, formData)
                : await axios.post(`${process.env.REACT_APP_API_URL}/banner/v1/banner`, formData);

            console.log('Banner saved successfully:', response.data);
            navigate('/banner');
        } catch (error) {
            console.error('Error saving banner:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="text-center">{existingBanner ? 'Edit Banner' : 'Add Banner'}</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Banner Title *</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Banner Description *</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Banner Image *</label>
                    <input
                        type="file"
                        id="image"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Banner Status *</label>
                    <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(Number(e.target.value))}
                        required
                    >
                        <option value={0}>Inactive</option>
                        <option value={1}>Active</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">{existingBanner ? 'Update Banner' : 'Add Banner'}</button>
            </form>
        </div>
    );
};

export default BannerForm;
