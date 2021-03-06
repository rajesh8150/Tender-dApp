import React,{Component} from 'react';

const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-15 mt-15">
      <p className="navbar-brand my-auto">Auction website</p>
      <ul className="navbar-nav">
        <li className="nav-item text-white"> {account} </li>
      </ul>
    </nav>
  );
};

export default Navbar;
