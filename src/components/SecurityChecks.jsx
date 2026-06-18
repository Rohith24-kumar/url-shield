import React from 'react';
import { FaShieldAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaServer, FaLock, FaUserCheck, FaFileAlt, FaRandom } from 'react-icons/fa';

const iconMap = {
  'FaServer': <FaServer />,
  'FaLock': <FaLock />,
  'FaUserCheck': <FaUserCheck />,
  'FaFileAlt': <FaFileAlt />,
  'FaRandom': <FaRandom />
};

const SecurityChecks = ({ checks }) => {
  return (
    <div className="checks">
      <h3><FaShieldAlt /> Security Checks</h3>
      <div className="checks-grid">
        {checks.map((check, i) => (
          <div key={i} className={`check-item ${check.passed ? 'pass' : 'fail'}`}>
            <div className="check-icon">{iconMap[check.icon] || <FaServer />}</div>
            <div className="check-detail">
              <h4>{check.name}</h4>
              <p>{check.detail}</p>
            </div>
            {check.passed ? <FaCheckCircle /> : <FaTimesCircle />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityChecks;