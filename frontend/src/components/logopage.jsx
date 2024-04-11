import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './logopage.css';
import logo from '../assets/logo.png';

function LogoPage() {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/task-indicator');
    };

    return (
        <div className="logo-page-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <div className="button-container">
                <button onClick={handleAdminClick} className="admin-button">Admin</button>
                <Link to="/login" className="student-button">Student</Link>
            </div>
        </div>
    );
}

export default LogoPage;
