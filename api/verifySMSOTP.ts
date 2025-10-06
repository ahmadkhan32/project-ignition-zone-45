import { VercelRequest, VercelResponse } from '@vercel/node';

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
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: 'OTP must be a 6-digit number' });
    }

    // For development/testing purposes, accept any 6-digit OTP
    // In production, you would verify against a stored OTP in your database
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        phoneNumber: phoneNumber
      });
    } else {
      return res.status(400).json({
        error: 'Invalid OTP',
        message: 'Please enter a valid 6-digit code'
      });
    }

  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({
      error: 'Failed to verify OTP',
      details: error.message || 'An unexpected error occurred'
    });
  }
}
