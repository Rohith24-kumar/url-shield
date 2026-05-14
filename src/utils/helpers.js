// Mock data for demonstration (replace with API calls later)
export const mockResults = {
  'google.com': { riskScore: 5, verdict: 'Safe', summary: 'No issues detected' },
  'paypal-security.xyz': { riskScore: 85, verdict: 'Danger', summary: 'Multiple threat indicators' },
  'secure-login.verify': { riskScore: 45, verdict: 'Suspicious', summary: 'Unusual patterns detected' },
};

export const getVerdictStyle = (verdict) => {
  if (verdict === 'Safe') return { color: '#10b981', bg: '#10b981', icon: 'FaCheckCircle' };
  if (verdict === 'Suspicious') return { color: '#f59e0b', bg: '#f59e0b', icon: 'FaExclamationTriangle' };
  return { color: '#ef4444', bg: '#ef4444', icon: 'FaSkull' };
};

export const validateUrl = (url) => {
  if (!url.trim()) return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};