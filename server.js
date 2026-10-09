import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import {  getOffersV2 } from './utils/offers.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: '*', // Allow all origins for testing; adjust in production
}));

// Basic route

app.get('/health', (req, res) => {
    res.send('OK');
});



// Helper function to detect device type from User-Agent
const detectDeviceType = (userAgent) => {
    if (!userAgent) {
        return 'desktop'; // default to desktop if no user-agent
    }

    const ua = userAgent.toLowerCase();

    // Tablet/Pad detection
    if (/ipad|android(?:.*?)tablet|kindle|playbook|silk|nexus 7|nexus 10|xoom|motorola|trident.*tablet|windows.*touch/i.test(ua)) {
        return 'pad';
    }

    // Mobile detection
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini|windows phone|webos|palm|symbian|j2me|midp|cldc|netfront|midp-2|plucker|teleca|u11|uberSoldier|uplink|vodafone|wap|windows ce|xda|zte|zune/i.test(ua)) {
        return 'mobile';
    }

    // Default to desktop
    return 'desktop';
};


app.post('/api/v2/offer', async (req, res) => {
    try {

        const deviceType = detectDeviceType(req.headers['user-agent']);
        const offers = await getOffersV2();
        const offerProducts = offers;

        res.send(JSON.stringify({ offers: offerProducts, deviceType }));
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to fetch offers' });
    }
});


app.post('/api/sign-changeset', (req, res) => {
    const { changes, referenceId } = req.body;

    const payload = {
        iss: process.env.SHOPIFY_API_KEY,
        jti: uuidv4(),
        iat: Date.now(),
        sub: referenceId,
        changes: changes,
    };

    const token = jwt.sign(payload, process.env.SHOPIFY_API_SECRET);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ token }));
})


// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
