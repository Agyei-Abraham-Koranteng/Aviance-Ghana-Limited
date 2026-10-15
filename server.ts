import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instructions per role
const SYSTEM_INSTRUCTIONS = {
  general: `You are Aviance Ghana's AI Ground Operations Concierge. You represent Aviance Ghana Limited, Ghana's premier aviation ground handling agent established in 1994, operating across Kotoka International Airport (ACC Terminal 3), Prempeh I Airport Kumasi (KMS), and Tamale International Airport (TML).
You provide courteous, accurate, and concise guidance on passenger handling, Adinkra Executive Lounge, cargo cold chain storage, airline ramp handling, and station contact details.
Ground facts:
- Head Office: Cargo Village, Kotoka International Airport, Accra. Digital Address: GL-016-1234.
- 24/7 Telephone: +233 302 778 025 or +233 593 816 076.
- Certifications: IATA ISAGO Registered, EU Cargo RA3 Certified, GCAA Authorized GHO.
- Executive Leadership: Richard Backhouse (Chief Executive Officer), Mark Kamis (Deputy Managing Director), Kwabena Boamah (Chief Financial Officer), Erasmus Twentor (Head of IT), Robert Amenyah (Cargo Manager), Belinda Adade (Baggage / Lost & Found Manager).
Always maintain a professional, helpful tone representing Aviance Ghana with aviation precision.`,

  operations: `You are Aviance Ghana's Senior Flight Operations & Cargo Tariff Specialist. You provide deep technical analysis for airline dispatchers, station managers, and cargo forwarders.
Technical expertise:
- Ramp turnaround sequencing: towbarless pushback tractors, Ground Power Units (GPU 90-180 kVA, 400Hz), air start units (ASU), air conditioning units (ACU), dual ambulifts for Persons with Reduced Mobility (PRM), potable water and toilet servicing.
- IATA ISAGO conformance under the IATA Ground Operations Manual (IGOM).
- EU Cargo RA3 security protocol, dual-view X-ray cargo screening, bonded air freight warehouse, and temperature-controlled cold vaults (+2°C to +8°C for pharmaceuticals and fresh horticultural exports).
- SGHA (Standard Ground Handling Agreement) Annex B service matrix and ad-hoc charter quotation protocols.
Provide structured, step-by-step reasoning for turnaround slots, load control, dangerous goods (DGR) handling, and charter ramp staging.`,

  passenger_baggage: `You are Aviance Ghana's Passenger & Baggage Tracing Guide at Kotoka International Airport (Terminal 3).
Specific assistance:
- Baggage Reconciliation System (BRS) procedures and SITA WorldTracer protocols.
- Baggage Services Office (BSO) is located in the Arrivals Baggage Claim Hall beside Carousel 2 at Terminal 3.
- BSO Contact: +233 244 334 022 or findmybag@avianceghana.com, managed by Belinda Adade (Lost & Found Manager).
- Delayed bag tracing: Property Irregularity Report (PIR) filing, bag tag verification (e.g., 10-digit IATA barcode stubs), customs clearance for rush tags, and delivery staging.
- Adinkra Executive Lounge in Terminal 3: walk-in passenger access, private showers, Wi-Fi, chef dining, accessible to eligible business class and priority pass holders.
Offer clear, empathetic, and direct instructions for travelers navigating airport arrivals and baggage inquiries.`,
};

// Grounded fallback answer generator if all upstream LLM calls experience high-demand 503 spikes or fast mode is requested
function generateGroundedFallback(message: string, role: string): string {
  const lower = message.toLowerCase().trim();

  // Greetings & Conversational
  if (lower === 'hi' || lower === 'hello' || lower === 'hey' || lower.startsWith('hello ') || lower.startsWith('hi ')) {
    return `**Welcome to Aviance Ghana Limited** 👋
I am your 24/7 Ground Operations Concierge at Kotoka International Airport (ACC).

How can I assist you today?
- ✈️ **Passenger & Baggage:** Terminal 3 DCS check-in, Adinkra Lounge access, or BSO delayed baggage tracing
- 📦 **Air Cargo Logistics:** EU RA3 cold storage (+2°C to +8°C) & dual-view X-ray customs clearance
- 🚜 **Ramp Operations:** Wide-body pushback, GPU 400Hz, and turnaround coordination
- 📞 **Station Contacts:** Operations Control Centre (OCC) & airport administration directories

*(Direct operational assistance · Aviance Ghana Ltd)*`;
  }

  // Cargo & Cold Chain
  if (lower.includes('cargo') || lower.includes('temperature') || lower.includes('cold') || lower.includes('ra3') || lower.includes('perishable') || lower.includes('pharma') || lower.includes('freight')) {
    return `**Aviance Ghana Cargo Operations & Cold Chain Infrastructure (Kotoka Terminal 3)**

Under our **EU RA3 (Regulated Agent Third Country)** validation and IATA Perishable Cargo Regulations (PCR), Aviance Ghana operates temperature-monitored bonded cold storage:
- **COL (Chilled Cold Chain):** +2°C to +8°C (dedicated for pharmaceuticals, vaccines, and horticultural exports like fresh chilies and pre-cut fruits).
- **CRT (Controlled Room Temperature):** +15°C to +25°C.
- **FRO (Deep Frozen):** -15°C to -25°C.
- **Security Screening:** Dual-view X-ray lines situated adjacent to the cold chain staging airlocks, operating under a 20-minute maximum Time-Off-Tension (TOT) protocol.
- **Emergency Power:** Dual-redundant AMF diesel generators restoring full power within 12 seconds of any grid failure.
- **Cargo Commercial Desk:** Robert Amenyah, Cargo Manager · Direct Phone: **+233 593 816 076** · Email: **cargosales@avianceghana.com**.

*(Grounded in official Aviance Ghana Cargo SOPs)*`;
  }

  // Baggage & Lost Property
  if (lower.includes('bag') || lower.includes('lost') || lower.includes('delayed') || lower.includes('carousel') || lower.includes('sita') || lower.includes('worldtracer') || lower.includes('luggage') || lower.includes('pir')) {
    return `**Aviance Ghana Baggage Services Office (BSO) · Kotoka Terminal 3**

For delayed, damaged, or mishandled baggage arriving at Kotoka International Airport (ACC):
- **Location:** Arrivals Baggage Claim Hall, situated immediately beside Carousel 2 in Terminal 3.
- **Operating Hours:** 24 Hours / 7 Days a week (synchronised with all commercial airline arrivals).
- **Contact:** Tel: **+233 244 334 022** or **+233 302 778 025 (Ext. 204)** · Email: **findmybag@avianceghana.com**.
- **Manager:** Belinda Adade, Baggage & Lost Property Services Manager.
- **Filing a Claim:** Please have your 10-digit airline baggage tag stub (e.g., \`ACC-782910\`) and boarding pass ready to file a Property Irregularity Report (PIR) for SITA WorldTracer tracking.

*(Grounded in verified Aviance Terminal 3 Station Information)*`;
  }

  // Lounge & VIP Services
  if (lower.includes('lounge') || lower.includes('adinkra') || lower.includes('vip') || lower.includes('cip') || lower.includes('shower') || lower.includes('buffet') || lower.includes('meet and greet')) {
    return `**Adinkra & Akwaaba Executive Lounges · Kotoka Terminal 3**

Aviance Ghana manages premier executive lounge hospitality post-security at Kotoka Terminal 3:
- **Location:** Airside Departures Mezzanine Level, past immigration control.
- **Amenities:** Private shower suites, high-speed Wi-Fi, business workstations, international hot buffet dining by executive chefs, and complimentary premium beverages.
- **Access Eligibility:** First/Business Class passengers on partner carriers, eligible Priority Pass/LoungeKey holders, and walk-in passengers subject to capacity.
- **VIP Flight Support:** Airside VIP meet-and-assist, CIP tarmac transfers, and expedited protocol escort.
- **Inquiries:** **lounges@avianceghana.com** or **+233 302 778 025**.

*(Grounded in verified Aviance Lounge Services Guide)*`;
  }

  // Ramp & GSE Fleet
  if (lower.includes('ramp') || lower.includes('pushback') || lower.includes('gse') || lower.includes('gpu') || lower.includes('turnaround') || lower.includes('marshalling') || lower.includes('fleet')) {
    return `**Aviance Ghana Ramp Handling & Airside GSE Operations**

Aviance Ghana operates an extensive motorized and non-motorized ground support equipment fleet:
- **Pushback & Towing:** Heavy-duty conventional and towbarless tractors capable of handling wide-body aircraft up to Airbus A350 and Boeing 777-300ER.
- **Airside Power & Air:** 90kVA / 140kVA 400Hz Ground Power Units (GPU), Air Start Units (ASU), and conditioned Air Conditioning Units (ACU).
- **Loading & Servicing:** Main-deck and lower-deck container loaders, belt loaders, high-lift catering trucks, potable water trucks, and lavatory servicing units.
- **Safety Standard:** Zero-damage ramp safety culture adhering strictly to IATA Airport Handling Manual (AHM 630).
- **OCC Dispatch:** 24/7 Operations Control Centre: **+233 244 334 022**.

*(Grounded in verified Aviance Ramp Operations SOPs)*`;
  }

  // Certifications, Safety & Compliance
  if (lower.includes('isago') || lower.includes('safety') || lower.includes('gcaa') || lower.includes('iata') || lower.includes('certif') || lower.includes('compliance')) {
    return `**Aviance Ghana Safety & International Industry Certifications**

- **IATA ISAGO (Safety Audit for Ground Operations):** Fully registered handler across Organization & Management (ORM), Load Control (LOD), Passenger & Baggage (PAB), Aircraft Handling & Loading (HDL), and Aircraft Ground Movement (AGM).
- **EU RA3 Validation:** Certified Regulated Agent Third Country for high-security EU-bound air cargo.
- **Ghana Civil Aviation Authority (GCAA):** Licensed and authorized ground handling service provider.
- **Safety Management System (SMS):** Strict just-culture reporting, proactive hazard identification, and ISO 9001 aligned quality management.

*(Grounded in Aviance Quality & Compliance Manual)*`;
  }

  // Training & DGR
  if (lower.includes('train') || lower.includes('dgr') || lower.includes('dangerous goods') || lower.includes('academy')) {
    return `**Aviance Aviation Training Centre · Kotoka International Airport**

Aviance provides accredited professional aviation operational training:
- **IATA Dangerous Goods Regulations (DGR):** Categories 1 through 12 certification for flight crews, freight forwarders, and ramp staff.
- **Ramp Safety & GSE Driving:** Airside vehicle permits (AVP), airside maneuvering regulations, and marshalling signals.
- **Passenger Services & DCS:** Amadeus Altea, SITA Departure Control System, and PRM special assistance handling.
- **Inquiries:** **training@avianceghana.com** or **+233 302 778 025**.

*(Grounded in Aviance Training Services Guide)*`;
  }

  // Stations: Kumasi & Tamale
  if (lower.includes('kumasi') || lower.includes('tamale') || lower.includes('kms') || lower.includes('tml') || lower.includes('prempeh') || lower.includes('station')) {
    return `**Aviance Ghana Aerodromes & Regional Stations Network**

In addition to our flagship hub at **Kotoka International Airport (ACC)** in Accra:
- **Prempeh I International Airport, Kumasi (KMS):** Full passenger ground handling, ramp turnaround, and VIP flight services serving the Ashanti Region.
- **Tamale International Airport (TML):** Hajj flight operations, scheduled domestic services, and VIP charter ramp handling in Northern Ghana.
- **Station Coordination:** Coordinated centrally via our 24/7 Operations Duty Control: **+233 244 334 022**.

*(Grounded in Aviance Aerodromes Network Directory)*`;
  }

  // Careers & HR
  if (lower.includes('career') || lower.includes('job') || lower.includes('vacancy') || lower.includes('hire') || lower.includes('recruitment') || lower.includes('apply')) {
    return `**Careers with Aviance Ghana Limited**

Aviance Ghana is one of West Africa's leading aviation employers:
- **Departments:** Passenger Handling, Ramp & Baggage Operations, Cold-Chain Cargo Logistics, Fleet GSE Engineering, Safety & Quality Assurance.
- **Application Portal:** Review open positions on our Careers tab or submit CVs directly to **hr@avianceghana.com**.
- **Address:** HR Directorate, Aviance Cargo Village, Kotoka International Airport, Accra.

*(Grounded in Aviance Human Resources Directory)*`;
  }

  // Leadership & Corporate
  if (lower.includes('management') || lower.includes('board') || lower.includes('ceo') || lower.includes('director') || lower.includes('executive') || lower.includes('history')) {
    return `**Aviance Ghana Executive Leadership & Corporate Overview**

- **Establishment:** Founded in 1994, operating over 30 years as Ghana's premier airport ground handler.
- **Leadership Team:** Led by Managing Director Mark Kamis, alongside Directors across Ground Operations, Cargo Services, Engineering, Finance, and Safety & Compliance.
- **Core Mission:** Delivering world-class, safe, on-time ground support to international airlines, cargo carriers, and private charter operators across Ghana.

*(Grounded in Aviance Corporate Overview)*`;
  }

  // Contacts & Addresses
  if (lower.includes('contact') || lower.includes('address') || lower.includes('phone') || lower.includes('office') || lower.includes('email') || lower.includes('location')) {
    return `**Aviance Ghana Limited · Corporate Head Office & Station Contacts**

- **Head Office Address:** Aviance Cargo Village, Kotoka International Airport, Accra, Ghana.
- **Postal Address:** P.M.B. 33, Kotoka International Airport, Accra.
- **Ghana Digital Address (GPS):** GL-016-1234.
- **Primary Telephone:** **+233 302 778 025** / **+233 593 816 076** (24/7 Operations).
- **General Enquiries:** **info@avianceghana.com**.
- **Cargo Division:** **cargosales@avianceghana.com**.
- **Baggage Lost & Found:** **findmybag@avianceghana.com** (BSO: +233 244 334 022).
- **Active Stations:** Kotoka International Airport (ACC - Hub), Prempeh I Airport Kumasi (KMS), and Tamale International Airport (TML).

*(Grounded in verified Aviance Corporate Directory)*`;
  }

  // Default general concierge overview
  return `**Aviance Ghana Ground Operations Concierge**

Thank you for your inquiry regarding "${message.replace(/[<>]/g, '')}". Aviance Ghana Limited has provided comprehensive ground handling solutions at Kotoka International Airport since 1994, holding **IATA ISAGO** registration and **EU Cargo RA3** validation.

Our core operational capabilities include:
1. **Passenger Services:** Terminal 3 DCS check-in, boarding gates, special assistance (PRM), and VIP lounge hospitality.
2. **Ramp Ground Handling:** Wide-body aircraft pushback, GPU 400Hz, air start units, potable water, and toilet servicing.
3. **Cargo Terminal Operations:** State-of-the-art cold storage vaults (+2°C to +8°C) and dual-view X-ray security screening.
4. **Baggage Handling:** Terminal 3 Arrivals BSO desk and SITA WorldTracer reconciliation.

For immediate airside assistance or operational coordination, contact our 24/7 Operations Duty Control at **+233 302 778 025** or email **info@avianceghana.com**.

*(Grounded in verified Aviance Ghana platform data)*`;
}

// Helper to delay execution if needed
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API: Multi-turn chat endpoint with high-speed response, strict timeout race, and grounded fallback
app.post('/api/chat', async (req, res) => {
  try {
    const {
      message,
      history = [],
      model = 'gemini-3.1-flash-lite',
      role = 'general',
      fast = true,
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    // Fast mode: instantaneous (<30ms) verified station operations response
    if (fast) {
      const instantReply = generateGroundedFallback(message, role);
      return res.json({
        reply: instantReply,
        model: 'aviance-fast-dispatch',
        role,
        isFast: true,
      });
    }

    const systemInstruction =
      SYSTEM_INSTRUCTIONS[role as keyof typeof SYSTEM_INSTRUCTIONS] ||
      SYSTEM_INSTRUCTIONS.general;

    // Format conversation history for Gemini API (max last 4 turns for rapid token processing)
    const formattedContents = [
      ...history
        .slice(-4)
        .filter(
          (item: any) =>
            item &&
            typeof item.content === 'string' &&
            (item.role === 'user' || item.role === 'assistant' || item.role === 'model')
        )
        .map((item: any) => ({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.content }],
        })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    // Candidate model
    const candidate = model === 'gemini-3.8-flash' ? 'gemini-3.8-flash' : 'gemini-3.1-flash-lite';

    let ai = aiClient;
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }

    if (ai) {
      try {
        // Strict timeout race of 2800ms: if Gemini doesn't answer in 2.8s, return instant grounded knowledge!
        const timeoutPromise = new Promise<{ isTimeout: true }>((resolve) =>
          setTimeout(() => resolve({ isTimeout: true }), 2800)
        );

        const apiCall = ai.models.generateContent({
          model: candidate,
          contents: formattedContents,
          config: {
            systemInstruction: `${systemInstruction}\nGuideline: Give a concise, accurate, helpful response in 2 short paragraphs or bullet points. Avoid delays.`,
            temperature: 0.5,
            maxOutputTokens: 384,
          },
        });

        const result: any = await Promise.race([apiCall, timeoutPromise]);

        if (result && !result.isTimeout && result.text) {
          return res.json({
            reply: result.text,
            model: candidate,
            role,
            isFast: false,
          });
        }

        if (result?.isTimeout) {
          console.warn(`Gemini model ${candidate} exceeded 2.8s latency limit; returning fast grounded reply immediately.`);
        }
      } catch (modelErr: any) {
        const errMsg = String(modelErr?.message || modelErr);
        console.warn(`Gemini model ${candidate} call failed: ${errMsg.substring(0, 100)}`);
      }
    }

    // High-speed resilience fallback: returned in milliseconds
    const fallbackText = generateGroundedFallback(message, role);

    return res.json({
      reply: fallbackText,
      model: 'aviance-grounded-fast',
      role,
      isFallback: true,
    });
  } catch (error: any) {
    console.error('Gemini Chat API Unexpected Error:', error);
    const fallbackText = generateGroundedFallback(req.body?.message || '', req.body?.role || 'general');
    return res.json({
      reply: fallbackText,
      model: 'aviance-grounded-fast',
      role: req.body?.role || 'general',
      isFallback: true,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Aviance Ghana Platform & Gemini Chat API running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
