const express = require('express');
const dns = require('dns').promises;
const https = require('https');
const whois = require('whois');
const ScanResult = require('../models/ScanResult');

const router = express.Router();

// ─── Helper: DNS Validation ───────────────────────────────────────────────────
// Tries to resolve the hostname via DNS. If it fails, the domain likely doesn't
// exist or is using suspicious infrastructure.
async function checkDns(hostname) {
  try {
    await dns.lookup(hostname);
    return {
      name: 'DNS Validation',
      passed: true,
      icon: 'FaServer',
      detail: 'Valid DNS records found'
    };
  } catch {
    return {
      name: 'DNS Validation',
      passed: false,
      icon: 'FaServer',
      detail: 'No valid DNS records — domain may not exist'
    };
  }
}

// ─── Helper: SSL Certificate ──────────────────────────────────────────────────
// Attempts an HTTPS connection. A valid SSL cert is required for a trusted site.
// HTTP-only URLs automatically fail this check.
function checkSsl(fullUrl) {
  return new Promise((resolve) => {
    if (!fullUrl.startsWith('https://')) {
      return resolve({
        name: 'SSL Certificate',
        passed: false,
        icon: 'FaLock',
        detail: 'No HTTPS — connection is not encrypted'
      });
    }
    const req = https.get(fullUrl, { timeout: 5000 }, (res) => {
      resolve({
        name: 'SSL Certificate',
        passed: true,
        icon: 'FaLock',
        detail: 'Valid SSL certificate detected'
      });
      res.destroy();
    });
    req.on('error', () => {
      resolve({
        name: 'SSL Certificate',
        passed: false,
        icon: 'FaLock',
        detail: 'SSL certificate invalid or missing'
      });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: 'SSL Certificate',
        passed: false,
        icon: 'FaLock',
        detail: 'SSL check timed out'
      });
    });
  });
}

// ─── Helper: WHOIS Lookup ─────────────────────────────────────────────────────
// Checks if registrant information is publicly available. Hidden WHOIS records
// are a common indicator of malicious or disposable domains.
function checkWhois(hostname) {
  return new Promise((resolve) => {
    whois.lookup(hostname, { timeout: 6000 }, (err, data) => {
      if (err || !data) {
        return resolve({
          name: 'WHOIS Lookup',
          passed: false,
          icon: 'FaUserCheck',
          detail: 'WHOIS lookup failed or no data returned'
        });
      }
      const lower = data.toLowerCase();
      const isHidden =
        lower.includes('privacy') ||
        lower.includes('redacted') ||
        lower.includes('protected') ||
        lower.includes('withheld');

      resolve({
        name: 'WHOIS Lookup',
        passed: !isHidden,
        icon: 'FaUserCheck',
        detail: isHidden
          ? 'Registrant info is hidden or redacted'
          : 'Registrant information is publicly available'
      });
    });
  });
}

// ─── Helper: URL Pattern Analysis ────────────────────────────────────────────
// Purely string-based. Looks for patterns commonly found in phishing URLs:
// suspicious keywords, excessive subdomains, IP addresses used as hostnames,
// and unusually long URLs.
function checkUrlPattern(fullUrl, hostname) {
  const suspiciousKeywords = [
    'login', 'verify', 'secure', 'update', 'account',
    'banking', 'paypal', 'password', 'signin', 'confirm',
    'support', 'billing', 'validate', 'authenticate'
  ];

  const lowerUrl = fullUrl.toLowerCase();
  const lowerHost = hostname.toLowerCase();

  const hasKeyword = suspiciousKeywords.some(k => lowerUrl.includes(k));
  const subdomainCount = lowerHost.split('.').length - 2;
  const isIpAddress = /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
  const isTooLong = fullUrl.length > 100;
  const hasMixedBrand =
    (lowerHost.includes('paypal') && !lowerHost.endsWith('paypal.com')) ||
    (lowerHost.includes('google') && !lowerHost.endsWith('google.com')) ||
    (lowerHost.includes('apple')  && !lowerHost.endsWith('apple.com'));

  const flagCount = [hasKeyword, subdomainCount > 2, isIpAddress, isTooLong, hasMixedBrand]
    .filter(Boolean).length;

  const passed = flagCount === 0;
  let detail = passed
    ? 'URL structure looks normal'
    : [];

  if (!passed) {
    if (isIpAddress)      detail.push('IP address used instead of domain name');
    if (hasMixedBrand)    detail.push('Brand name used in suspicious domain');
    if (hasKeyword)       detail.push('Suspicious keywords in URL');
    if (subdomainCount > 2) detail.push('Excessive subdomains detected');
    if (isTooLong)        detail.push('Unusually long URL');
    detail = detail.join('; ');
  }

  return {
    name: 'URL Pattern',
    passed,
    icon: 'FaFileAlt',
    detail
  };
}

// ─── Helper: Redirect Tracking ───────────────────────────────────────────────
// Follows HTTP redirects manually and counts how many hops occur. More than
// 3 redirects is suspicious — phishing pages often chain through multiple
// redirects to obscure the final destination.
function checkRedirects(fullUrl) {
  return new Promise((resolve) => {
    let redirectCount = 0;
    const maxRedirects = 6;

    function follow(url) {
      if (redirectCount > maxRedirects) {
        return resolve({
          name: 'Redirect Tracking',
          passed: false,
          icon: 'FaRandom',
          detail: `Excessive redirect chain detected (${redirectCount}+ hops)`
        });
      }

      const lib = url.startsWith('https://') ? require('https') : require('http');
      const req = lib.get(url, { timeout: 5000 }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          redirectCount++;
          const next = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          res.destroy();
          follow(next);
        } else {
          res.destroy();
          resolve({
            name: 'Redirect Tracking',
            passed: redirectCount <= 2,
            icon: 'FaRandom',
            detail: redirectCount <= 2
              ? `Clean redirect chain (${redirectCount} redirect${redirectCount !== 1 ? 's' : ''})`
              : `Suspicious redirect chain (${redirectCount} hops)`
          });
        }
      });

      req.on('error', () => {
        resolve({
          name: 'Redirect Tracking',
          passed: true,
          icon: 'FaRandom',
          detail: 'Could not follow redirects — URL may be offline'
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          name: 'Redirect Tracking',
          passed: true,
          icon: 'FaRandom',
          detail: 'Redirect check timed out'
        });
      });
    }

    follow(fullUrl);
  });
}

// ─── Helper: Risk Score Calculator ───────────────────────────────────────────
// Each failed check contributes a weighted score. Pattern and DNS failures
// are weighted higher because they are the most reliable signals.
function calculateRiskScore(checks) {
  const weights = {
    'DNS Validation':    25,
    'SSL Certificate':   20,
    'WHOIS Lookup':      15,
    'URL Pattern':       25,
    'Redirect Tracking': 15
  };

  let score = 0;
  for (const check of checks) {
    if (!check.passed) {
      score += weights[check.name] || 15;
    }
  }
  return Math.min(score, 100);
}

// ─── Helper: Verdict from score ──────────────────────────────────────────────
function getVerdict(score) {
  if (score >= 70) return 'Danger';
  if (score >= 35) return 'Suspicious';
  return 'Safe';
}

function getSummary(verdict, checks) {
  const failed = checks.filter(c => !c.passed).map(c => c.name);
  if (verdict === 'Safe')       return 'No significant threats detected';
  if (verdict === 'Suspicious') return `Potential issues: ${failed.join(', ')}`;
  return `Multiple threat indicators: ${failed.join(', ')}`;
}

// ─── POST /api/analyze ────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'A valid URL is required' });
    }

    // Normalise — add https if missing
    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl;
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(fullUrl);
    } catch {
      return res.status(400).json({ error: 'Could not parse the URL. Please check the format.' });
    }

    const hostname = parsedUrl.hostname;

    // Run all 5 checks in parallel for speed
    const [dnsCheck, sslCheck, whoisCheck, redirectCheck] = await Promise.all([
      checkDns(hostname),
      checkSsl(fullUrl),
      checkWhois(hostname),
      checkRedirects(fullUrl)
    ]);

    // URL pattern check is synchronous
    const patternCheck = checkUrlPattern(fullUrl, hostname);

    const checks = [dnsCheck, sslCheck, whoisCheck, patternCheck, redirectCheck];
    const riskScore = calculateRiskScore(checks);
    const verdict   = getVerdict(riskScore);
    const summary   = getSummary(verdict, checks);

    const result = {
      url: fullUrl,
      riskScore,
      verdict,
      summary,
      checks,
      timestamp: new Date().toISOString()
    };

    // Save to MongoDB
    await ScanResult.create(result);

    res.json(result);

  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: 'Analysis failed. Please try again.' });
  }
});

module.exports = router;
