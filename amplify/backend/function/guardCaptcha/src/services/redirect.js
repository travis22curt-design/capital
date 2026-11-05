/**
 * Server-side redirect destination.
 *
 * Edit `config.json` (next to package.json) and set "redirectUrl". It is read
 * only on the server, never sent to the browser or placed in /public, and is
 * only used for the 302 issued after a valid CAPTCHA pass token.
 *
 * Leave "redirectUrl" empty ("") to show the in-page success card instead.
 * The REDIRECT_URL environment variable, if set, overrides the file.
 *
 * Returns null when unset or not a valid http(s) URL.
 */
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = process.env.GUARD_CONFIG_PATH || path.join(__dirname, '..', 'config.json');

function readConfigValue() {
  try {
    const cfg = JSON.parse(fs.readFileSync(process.env.GUARD_CONFIG_PATH || CONFIG_PATH, 'utf8'));
    return cfg.redirectUrl;
  } catch (_) {
    return '';
  }
}

function getRedirectUrl() {
  const raw = String(process.env.REDIRECT_URL || readConfigValue() || '').trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.toString();
  } catch (_) {
    return null;
  }
}

module.exports = { getRedirectUrl };
