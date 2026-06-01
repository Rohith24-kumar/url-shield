import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ─── Real API calls ───────────────────────────────────────────────────────────

export const analyzeUrl = async (url) => {
  const response = await axios.post(`${API_BASE_URL}/analyze`, { url });
  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(`${API_BASE_URL}/history`);
  return response.data;
};
export const getStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/history/stats`);
  return response.data;
};
export const deleteHistory = async () => {
  const response = await axios.delete(`${API_BASE_URL}/history`);
  return response.data;
};

// ─── Mock (kept for offline testing — swap analyzeUrl for analyzeUrlMock) ─────

export const analyzeUrlMock = async (url) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const domain = new URL(url).hostname.replace('www.', '');
  const mockResults = {
    'google.com':           { riskScore: 5,  verdict: 'Safe',       summary: 'No issues detected' },
    'paypal-security.xyz':  { riskScore: 85, verdict: 'Danger',     summary: 'Multiple threat indicators' },
    'secure-login.verify':  { riskScore: 45, verdict: 'Suspicious', summary: 'Unusual patterns detected' },
  };

  const mock = mockResults[domain] || mockResults['google.com'];

  const checks = [
    { name: 'DNS Validation',    passed: mock.riskScore < 30, icon: 'FaServer',    detail: mock.riskScore < 30 ? 'Valid DNS records' : 'Suspicious DNS pattern' },
    { name: 'SSL Certificate',   passed: mock.riskScore < 40, icon: 'FaLock',      detail: mock.riskScore < 40 ? 'Valid SSL certificate' : 'SSL issues detected' },
    { name: 'WHOIS Lookup',      passed: mock.riskScore < 50, icon: 'FaUserCheck', detail: mock.riskScore < 50 ? 'Clean WHOIS records' : 'Hidden registration info' },
    { name: 'URL Pattern',       passed: mock.riskScore < 35, icon: 'FaFileAlt',   detail: mock.riskScore < 35 ? 'Normal URL structure' : 'Suspicious keywords found' },
    { name: 'Redirect Tracking', passed: mock.riskScore < 45, icon: 'FaRandom',    detail: mock.riskScore < 45 ? 'Clean redirect chain' : 'Multiple redirects detected' }
  ];

  return { url, riskScore: mock.riskScore, verdict: mock.verdict, timestamp: new Date().toISOString(), checks, summary: mock.summary };
};
