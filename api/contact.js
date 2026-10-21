import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional().default('')
});

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, error: 'Method not allowed.' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return send(res, 415, { ok: false, error: 'Send a JSON request.' });
  }

  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) return send(res, 403, { ok: false, error: 'Origin not allowed.' });
    } catch {
      return send(res, 403, { ok: false, error: 'Invalid origin.' });
    }
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return send(res, 400, { ok: false, error: 'Please check your name, email, and message (10–3000 characters).' });
  if (parsed.data.website) return send(res, 200, { ok: true, message: 'Thanks for reaching out.' });

  const { name, email, message } = parsed.data;
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    return send(res, 503, { ok: false, error: 'The contact form is not configured yet. Please email me directly instead.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      }),
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) {
      const details = await response.text();
      console.error('Email provider returned an error:', response.status, details.slice(0, 300));
      return send(res, 502, { ok: false, error: 'Message could not be sent right now. Please email me directly.' });
    }
    return send(res, 200, { ok: true, message: 'Message sent successfully. Thank you!' });
  } catch (error) {
    console.error('Contact endpoint failed:', error?.name || 'unknown error');
    return send(res, 502, { ok: false, error: 'Message could not be sent right now. Please email me directly.' });
  }
}