import React from 'react';
import fbIcon from './../Assests/facebook.svg';
import lidnIcon from './../Assests/linkedin.svg';
import twtIcon from './../Assests/twitter-x .svg';
import wtsIcon from './../Assests/whatsapp .svg';
import logo from './../Assests/logo_trial.png';
import './Footer.css';

export default function Footer() {
	return (
		<div className="footer col-12 p-4">
			<div className="D-flex flex-column col-12 col-lg-12 col-sm-12">
				<div className="logo_wrapper mb-3 col-lg-12">
					<div className="col-lg-2">
						<img
                            src={logo}
                            alt="Logo"
                            className="d-inline-block align-text-top position-relative"
                            style={{ width: '90px', height: '50px' }} // Adjust the width and height as needed
                        />
					</div>
				</div>
				<div className="information_wrapper d-flex flex-row gap-5 col-lg-12">
					<div className="d-flex flex-row col-lg-6  gap-5">
						<div className="d-flex flex-column justify-content-between">
							<span className="Header_text mb-2">Address</span>
							<span className="phargrap" style={{ lineHeight: '21px' }}>
								132/4, <br />
								Recidences place, <br />
								Barn Place, <br />
								Colombo 07
							</span>
						</div>

						<div className="d-flex flex-column">
							<span className="Header_text mb-2">Hotline</span>
							<span className="phargrap" style={{ lineHeight: '21px' }}>
								011-23423234 <br />
								011-23422344 <br />
							</span>
						</div>
						<div className="col-lg-6">
                        {/* Fill the space with relevant content */}
                        <div className="d-flex flex-column">
                            <span className="Header_text mb-2">Latest News</span>
                            <span className="phargrap">Stay updated with our latest news and announcements.</span>
                        </div>
                    </div>

					<div className="col-lg-4">
    				<h5>Upcoming Events</h5>
    				<ul>
        				<li>May 10: Product Launch Event</li>
        				<li>May 15: Webinar on Industry Trends</li>
        				<li>May 20: Networking Meetup</li>
    				</ul>
    				
					</div>
					</div>
					
					<div
						className="d-flex me-auto col-lg-6 flex-row justyfy-content-end gap-5"
						//style={{ marginLeft: '20rem' }}
					>
						<div className="d-flex flex-column " style={{ marginLeft: '20rem' }}>
							<span className="Header_text mb-2">Rate Us</span>
							<span className="phargrap" style={{ lineHeight: '21px' }}>
								Feedback
							</span>
						</div>

						<div className="d-flex flex-column">
							<span className="Header_text mb-2">Information</span>
							<span className="phargrap" style={{ lineHeight: '21px' }}>
								My Account
							</span>
							<span className="phargrap" style={{ lineHeight: '21px' }}>
								About Us
							</span>
						</div>

						<div className="d-flex flex-column">
							<span className="Header_text mb-2">Keep In Touch</span>
							<div className="d-flex flex-column gap-3">
								<div className="d-flex justify-content-center flex-row gap-3">
									<img
										src={fbIcon}
										alt="fblogo"
										style={{ width: '25px', height: '25px' }}
									/>
									<img
										src={wtsIcon}
										alt="wtslogo"
										style={{ width: '25px', height: '25px' }}
									/>
								</div>
								<div className="d-flex justify-content-center flex-row gap-3">
									<img
										src={twtIcon}
										alt="twtlogo"
										style={{ width: '25px', height: '25px' }}
									/>
									<img
										src={lidnIcon}
										alt="lidnlogo"
										style={{ width: '25px', height: '25px' }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<div className="col-lg-12">
                    <hr className="solid"></hr>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <span className="phargrap">© 2024 Shopping Eye. All Rights Reserved.</span>
                    
                </div>
		</div>
	);
}
