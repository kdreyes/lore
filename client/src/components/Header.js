import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lore Mentor-Mentee Platform</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/register" className="hover:underline">Register</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/profile-setup" className="hover:underline">Profile Setup</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
