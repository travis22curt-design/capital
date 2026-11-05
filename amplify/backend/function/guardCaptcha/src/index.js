/**
 * AWS Amplify Serverless Function Entry Point: guardCaptcha
 */
const { createChallenge, verifyChallenge, validatePassToken } = require('./services/captchaService');

const REDIRECT_URL = process.env.REDIRECT_URL || 'https://gbdiconsulting.com';

function readCookie(event, name) {
  const list = event.cookies || (event.headers?.cookie || event.headers?.Cookie || '').split(';');
  for (const c of list) {
    const i = c.indexOf('=');
    if (i > -1 && c.slice(0, i).trim() === name) return c.slice(i + 1).trim();
  }
  return null;
}

exports.handler = async (event) => {
  const path = event.path || event.rawPath || '';
  const httpMethod = (event.httpMethod || event.requestContext?.http?.method || 'GET').toUpperCase();

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Captcha-Token,Authorization',
    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
  };

  if (httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    // 1. GET /api/captcha/create
    if (httpMethod === 'GET' && (path.endsWith('/create') || path.endsWith('/create/'))) {
      const challenge = createChallenge();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, ...challenge })
      };
    }

    // 2. POST /api/captcha/verify
    if (httpMethod === 'POST' && (path.endsWith('/verify') || path.endsWith('/verify/'))) {
      let body = {};
      if (event.body) {
        body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      }

      const { challengeToken, userX, trail } = body;
      const result = verifyChallenge({ challengeToken, userX, trail });

      const responseHeaders = { ...headers };
      if (result.success && result.passToken) {
        responseHeaders['Set-Cookie'] = `captcha_token=${result.passToken}; Path=/; Max-Age=${result.expiresIn}; SameSite=Lax; Secure; HttpOnly`;
      }

      const payload = result.success && REDIRECT_URL
        ? { ...result, redirect: '/api/captcha/redirect' }
        : result;

      return {
        statusCode: result.success ? 200 : 400,
        headers: responseHeaders,
        body: JSON.stringify(payload)
      };
    }

    // 3. GET /api/captcha/redirect
    if (httpMethod === 'GET' && (path.endsWith('/redirect') || path.endsWith('/redirect/'))) {
      const token = event.headers?.['x-captcha-token'] || event.headers?.['X-Captcha-Token'] || readCookie(event, 'captcha_token');
      if (!token || !validatePassToken(token)) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'CAPTCHA_REQUIRED', message: 'Access restricted. Please solve the puzzle challenge.' })
        };
      }
      if (!REDIRECT_URL) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: 'NOT_CONFIGURED' }) };
      }
      return {
        statusCode: 302,
        headers: { Location: REDIRECT_URL, 'Cache-Control': 'no-store' },
        body: ''
      };
    }

    // 4. GET /api/protected/content
    if (httpMethod === 'GET' && path.endsWith('/content')) {
      const passToken = event.headers?.['x-captcha-token'] ||
                        event.headers?.['X-Captcha-Token'] ||
                        readCookie(event, 'captcha_token');

      if (!passToken || !validatePassToken(passToken)) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'CAPTCHA_REQUIRED', message: 'Access restricted. Please solve the puzzle challenge.' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          authorized: true,
          message: 'Welcome to the protected resource on AWS Amplify!',
          timestamp: new Date().toISOString()
        })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'NOT_FOUND', message: `Route ${path} not found` })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'INTERNAL_ERROR', message: error.message })
    };
  }
};