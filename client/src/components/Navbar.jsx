import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar-container">

            {/* 1. Logo Section */}
            <div className="logo-container">
                <img src="/airbnb-com-brandmark.jpg" alt="Airbnb" className="navbar-logo" />
            </div>

            {/* 2. Search Bar Section */}
            <div className="search-bar">
                <div className="search-item">
                    <img src="/home.avif" alt="home" className="search-item-icon" /> Anywhere
                </div>
                <div className="divider"></div>
                <div className="search-item">Anytime</div>
                <div className="divider"></div>
                <div className="search-item light">Add guests</div>

                {/* Search Icon */}
                <div className="search-btn">
                    <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="14" cy="14" r="10"></circle>
                        <path d="M21 21L29 29"></path>
                    </svg>
                </div>
            </div>

            {/* 3. Right Section */}
            <div className="right-section">
                <div className="host-text">Become a host</div>

                {/* Globe Icon */}
                <div className="icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        <path d="M2 12h20"></path>
                    </svg>
                </div>

                {/* Menu/Hamburger Icon */}
                <div className="icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="7" x2="20" y2="7"></line>
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <line x1="4" y1="17" x2="20" y2="17"></line>
                    </svg>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;