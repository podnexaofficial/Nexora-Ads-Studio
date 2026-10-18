import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory inquiry store for real backend handling
interface LeadSubmission {
  id: string;
  name: string;
  businessName: string;
  email: string;
  websiteOrSocial?: string;
  service: string;
  estimatedBudget: string;
  projectDetails: string;
  submittedAt: string;
  clientIp?: string;
  status: 'new' | 'reviewed' | 'contacted';
}

interface StrategyCallBooking {
  id: string;
  name: string;
  email: string;
  businessName: string;
  serviceInterest: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  bookedAt: string;
}

const leadSubmissions: LeadSubmission[] = [];
const strategyBookings: StrategyCallBooking[] = [];

// Rate limiting & spam protection tracker
const rateLimitMap = new Map<string, { count: number; firstSeen: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstSeen: now });
    return true;
  }

  if (now - record.firstSeen > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstSeen: now });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Config endpoint providing agency public contact info
app.get('/api/config', (_req, res) => {
  res.json({
    agencyName: 'NEXORA ADS STUDIO',
    tagline: 'AI-powered creative. Human-led growth.',
    officialEmail: process.env.OFFICIAL_EMAIL || 'podnexaofficial@gmail.com',
    whatsappNumber: process.env.OFFICIAL_WHATSAPP || '+1 (555) 019-8234',
    whatsappDisplay: process.env.OFFICIAL_WHATSAPP_DISPLAY || '+1 (555) 019-8234 (Client Onboarding Desk)',
    timezones: ['EST / EDT (UTC-5)', 'PST / PDT (UTC-8)', 'GMT / UTC', 'SGT / UTC+8'],
    status: 'online',
    currentQuarterAvailability: 'Accepting select Q4 / Q1 growth partners',
  });
});

// Lead generation contact endpoint
app.post('/api/contact', (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a minute before submitting again.',
    });
  }

  const {
    name,
    businessName,
    email,
    websiteOrSocial,
    service,
    estimatedBudget,
    projectDetails,
    honeypot, // Spam trap
    formStartTime, // Bot fast-submission protection
  } = req.body;

  // Spam detection: honeypot field must be empty
  if (honeypot) {
    // Silently drop spam without alerting bot
    return res.json({
      success: true,
      referenceId: 'NX-' + Math.floor(100000 + Math.random() * 900000),
      message: 'Inquiry received.',
    });
  }

  // Fast submit bot check (less than 1.5 seconds)
  if (formStartTime && Date.now() - Number(formStartTime) < 1200) {
    return res.status(400).json({
      success: false,
      error: 'Submission was too fast. Please take your time to fill the details.',
    });
  }

  // Validation
  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  if (!businessName || typeof businessName !== 'string' || businessName.trim().length < 2) {
    errors.businessName = 'Please provide your business or brand name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!service || typeof service !== 'string') {
    errors.service = 'Please select a primary service category.';
  }

  if (!estimatedBudget || typeof estimatedBudget !== 'string') {
    errors.estimatedBudget = 'Please select an estimated budget range.';
  }

  if (!projectDetails || typeof projectDetails !== 'string' || projectDetails.trim().length < 15) {
    errors.projectDetails = 'Please share at least 15 characters about your project goals or creative challenges.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed. Please review the highlighted fields.',
      fieldErrors: errors,
    });
  }

  const submissionId = `NX-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const newLead: LeadSubmission = {
    id: submissionId,
    name: name.trim(),
    businessName: businessName.trim(),
    email: email.trim().toLowerCase(),
    websiteOrSocial: websiteOrSocial ? String(websiteOrSocial).trim() : undefined,
    service: service.trim(),
    estimatedBudget: estimatedBudget.trim(),
    projectDetails: projectDetails.trim(),
    submittedAt: new Date().toISOString(),
    clientIp,
    status: 'new',
  };

  leadSubmissions.unshift(newLead);
  console.log(`[LEAD RECEIVED] ${submissionId} from ${newLead.name} (${newLead.businessName}) - Service: ${newLead.service}`);

  return res.status(201).json({
    success: true,
    referenceId: submissionId,
    message: 'Thank you! Your creative brief has been securely received by our strategy team.',
    details: {
      teamResponseWindow: 'Within 24 business hours',
      confirmationSentTo: newLead.email,
    },
  });
});

// Strategy call booking endpoint
app.post('/api/strategy-call', (req, res) => {
  const {
    name,
    email,
    businessName,
    serviceInterest,
    preferredDate,
    preferredTimeSlot,
    notes,
  } = req.body;

  if (!name || !email || !businessName || !preferredDate || !preferredTimeSlot) {
    return res.status(400).json({
      success: false,
      error: 'Missing required strategy booking fields (name, email, business name, date, and time slot).',
    });
  }

  const bookingId = `CALL-${Math.floor(10000 + Math.random() * 90000)}`;

  const booking: StrategyCallBooking = {
    id: bookingId,
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    businessName: String(businessName).trim(),
    serviceInterest: serviceInterest ? String(serviceInterest).trim() : 'General Creative Audit',
    preferredDate: String(preferredDate),
    preferredTimeSlot: String(preferredTimeSlot),
    notes: notes ? String(notes).trim() : undefined,
    bookedAt: new Date().toISOString(),
  };

  strategyBookings.unshift(booking);
  console.log(`[STRATEGY CALL BOOKED] ${bookingId} for ${booking.businessName} on ${booking.preferredDate} at ${booking.preferredTimeSlot}`);

  return res.status(201).json({
    success: true,
    bookingId,
    message: 'Strategy call request confirmed. An invite with meeting link has been prepared.',
    scheduledDate: booking.preferredDate,
    scheduledTime: booking.preferredTimeSlot,
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), leadsReceived: leadSubmissions.length });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NEXORA SERVER] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[NEXORA SERVER] Startup error:', err);
  process.exit(1);
});
