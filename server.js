import express from 'express';
import { createServer } from 'node:http';
import contactHandler from './api/contact.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb', strict: true }));
app.post('/api/contact', (req, res) => contactHandler(req, res));
app.get('/api/health', (_req, res) => res.status(200).json({ ok: true }));
app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

const server = createServer(app);
const port = Number(process.env.PORT) || 3000;
server.listen(port, () => console.log(`API server listening on port ${port}`));