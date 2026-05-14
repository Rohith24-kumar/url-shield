import React from 'react';
import { GiCyberEye } from 'react-icons/gi';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer-pro">
      <div className="footer-container-pro">
        <div className="footer-main-pro">
          <div className="footer-brand-pro">
            <div className="footer-logo-icon">
              <GiCyberEye />
            </div>
          </div>
        </div>
        
        <div className="footer-bottom-pro">
          <p>Ramaiah Institute of Technology, Department of MCA</p>
          <p className="footer-copyright">© 2024 SecureScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;