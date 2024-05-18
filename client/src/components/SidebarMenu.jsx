
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/SidebarMenu.css';

const navigationItems = [
  { to: '/', icon: 'bi-house', label: 'Home' },

  { to: '/register-patient', icon: 'bi-person', label: 'Patient Register' },

  { to: '/records-list', icon: 'bi-list-ul', label: 'Records List' },

  { to: '/register-doctor', icon: 'bi-hospital', label: 'Doctor Register' },

  { to: '/doctors-list', icon: 'bi-list-ul', label: 'Doctors List' },

  { to: '/aprove-doctor', icon: 'bi-list-ul', label: 'Aprove/Revoke Doctor' },

];

const SidebarMenu = () => {
  const navigate = useNavigate();
  const userObject = JSON.parse(localStorage.getItem("currentUser"));
  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const renderNavItem = ({ to, icon, label }) => (
    <li className="one-pill" key={to}>
      <NavLink to={to} className={({ isActive }) => isActive ? "nav-link text-white fs-5 navLinkActive" : "nav-link text-white fs-5"} aria-current="page">
        <i className={`bi ${icon}`}></i>
        <span className="ms-3 d-none d-sm-inline">{label}</span>
      </NavLink>
    </li>
  );

  return (
    <div className="menu">
      <div className="column">
        <div className="a">
          <div className='b'>
            {/* <img alt="PowerUp Logo" className="img-fluid p-3" src={poweruplogo} /> */}
            {/* <hr className="text-secondary d-none d-sm-block" /> */}
            <ul className="pills">
              {navigationItems.map(renderNavItem)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;

const UserMenu = ({ userObject, onLogout }) => {
  const navigate = useNavigate();
  const username = userObject;
};