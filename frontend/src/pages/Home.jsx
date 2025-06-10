// write the 
// Home page component
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import BlogHomePage from '../components/BlogHomePage';

const Home = () => {
    return (
        <div className="home-container">
            {/* <h1>Welcome to the Home Page</h1>
            <p>This is a simple React application.</p> */}
            <BlogHomePage/>
        </div>
    )
}

export default Home;