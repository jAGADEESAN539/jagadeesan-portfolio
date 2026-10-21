# Jagadeesan P — Portfolio

A responsive React + Vite portfolio with a Node.js contact API, designed around the supplied resume. The site includes experience, skills, projects, contact links, SEO metadata, and a downloadable copy of the resume.

## Stack
- React 18 + Vite
- Node.js / Express standalone API (`server.js`)
- Vercel serverless contact endpoint (`api/contact.js`)
- Zod request validation
- Resend email API for contact form delivery (optional)

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

The portfolio opens at the Vite URL. The contact form endpoint runs on Vercel, or through the standalone Express API using `npm start`. For a full local end-to-end test, use Vercel CLI (`npx vercel dev`) after configuring environment variables.

## Deploy to Vercel

1. Create a GitHub repository and push this project.
2. In Vercel, choose **Add New → Project**, import the repository.
3. Keep the detected Vite framework settings: build command `npm run build`, output directory `dist`.
4. Add environment variables in **Project → Settings → Environment Variables**:
   - `RESEND_API_KEY` — API key from your Resend account.
   - `CONTACT_TO_EMAIL` — inbox that should receive portfolio enquiries.
   - `CONTACT_FROM_EMAIL` — a sender address verified with Resend. For production, verify your own domain in Resend; do not rely on the onboarding sender.
5. Deploy. Test `/api/contact` with a valid message and check the receiving inbox.
6. Add your custom domain in Vercel if you have one.

The website itself works without email credentials, but the contact form will show a clear fallback message until the email provider is configured. Visitors can always use the direct email link.

## Resume
The supplied DOCX is copied to `public/Jagadeesan-Resume.docx` for the Resume download link. Replace it with a PDF if you prefer a more convenient public-facing format.

## Production checklist
- [ ] Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and a verified `CONTACT_FROM_EMAIL`.
- [ ] Test mobile navigation, resume download, and the contact form after deployment.
- [ ] Add a custom domain and verify HTTPS.
- [ ] Check all resume claims, contact details, and public project descriptions before publishing.
- [ ] If the site gets significant traffic, add a persistent rate limiter / bot protection (e.g. an edge/WAF rule); in-memory limits are not reliable across serverless instances.
- [ ] Add a real project repository/demo link only for work you can publicly share.

## Notes
- No database or secret key is exposed in the browser.
- Contact form uses server-side validation, request size constraints at the standalone server, same-host origin checking, and a honeypot field.
- The performance metrics displayed in the experience and projects are sourced from the provided resume. They should be published only if you can substantiate them in interviews.
