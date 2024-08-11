//Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../Assests/logo_trial.png';
import homeIcon from './../Assests/icons8-home-48.png';
import './Header.css';

export default function Header() {

	return (
		<nav className="navbar sticky-lg-top navbar-expand-lg  bg-body-tertiary bg-body-tertiary nabard">
			<div className="container-fluid nav_wrapper">
				<Link to="/">
				<img
    				src={logo}
    				alt="Logo"
    				className="d-inline-block align-text-top position-relative nav_logo"
    				width="140" // Set the desired width
    				height="80" // Set the desired height
				/>

				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse  navbar-collapse nav_link-wrapper"
					id="navbarNav"
				>
					<ul className="navbar-nav col-8 gap-4 mx-auto nav nav justify-content-center align-items-center">
						<Link to="/">
							<img src={homeIcon} alt="Home" width="30" height="30" />
						</Link>
						<li className="nav-item navbar-items">
							<Link
								to="/"
								className="nav-link"
								role="button"
								aria-expanded="false"
							>
								<span className="nav_items">STORES</span>
							</Link>
						</li>
						<li className="nav-item navbar-items">
							<Link
								to="/itemfinder"
								className="nav-link"
								//onClick={handleItemClick}
								role="button"
								aria-expanded="false"
							>
								<span className="nav_items">ITEM FINDER</span>
							</Link>
						</li>
						<li className="nav-item navbar-items">
							<Link
								to="/feedback"
								className="nav-link"
								role="button"
								aria-expanded="false"
							>
								<span className="nav_items">FEEDBACK</span>
							</Link>
						</li>
						<li className="nav-item navbar-items">
							<Link
								to="/aboutus"
								className="nav-link"
								role="button"
								aria-expanded="true"
							>
								<span className="nav_items">ABOUT US</span>
							</Link>
						</li>
					</ul>
					<div className=" d-flex align-items-center gap-3 justify-content-center">
						<Link to="/login" className="btn btn-outline-dark">
							Log In
						</Link>
						<Link to="/register" className="btn btn-outline-dark">
							Sing Up
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}