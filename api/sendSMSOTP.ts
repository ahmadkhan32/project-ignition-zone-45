import { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Validate phone number format
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Check if Twilio is configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.log('Twilio not configured, generating OTP for development');
      
      // Generate a 6-digit OTP for development
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      console.log(`🔐 Development OTP for ${phoneNumber}: ${otp}`);
      
      return res.status(200).json({
        success: true,
        message: 'OTP generated for development - check console for code',
        otp: otp,
        phoneNumber: phoneNumber,
        note: 'Twilio is not configured. Use this OTP for testing.',
        development: true
      });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send SMS via Twilio
    const message = await client.messages.create({
      body: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log('SMS sent successfully:', message.sid);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      messageId: message.sid,
      phoneNumber: phoneNumber
    });

  } catch (error: any) {
    console.error('Error sending SMS:', error);
    
    // If Twilio error, provide fallback
    if (error.code && error.code === 21211) {
      return res.status(400).json({
        error: 'Invalid phone number',
        details: 'Please check the phone number format and try again.'
      });
    }

    res.status(500).json({
      error: 'Failed to send SMS',
      details: error.message || 'An unexpected error occurred'
    });
  }
}
