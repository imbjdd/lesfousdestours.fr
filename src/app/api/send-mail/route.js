import axios from 'axios';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_PRIVATE_KEY // Clé privée
);
const API_KEY = process.env.MAILGUN_API;
const DOMAIN = 'mg.lesfousdestours.fr';
const url = `https://api.eu.mailgun.net/v3/${DOMAIN}/messages`;

import { verify } from 'hcaptcha';

const secretKey = process.env.HCAPTCHA_SECRET;

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('Received data:', body);

    const { name, email, phone_number, tournament_id, token } = body;

    const { success } = await verify(secretKey, token);

    if (!success) {
      return { message: 'Invalid captcha', success: false };
    }

    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          name: name,
          email: email,
          tournament_id: tournament_id,
          phone_number: phone_number,
        },
      ])
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Envoie l'email
    const response = await axios.post(
      url,
      new URLSearchParams({
        from: 'Les Fous des Tours <postmaster@mg.lesfousdestours.fr>',
        to: 'Salim Boujaddi <boujaddi.salim@protonmail.com>',
        subject: 'Inscription au tournoi confirmée',
        template: 'yes',
        'h:X-Mailgun-Variables': JSON.stringify({ id: data[0].id}),
      }),
      {
        auth: {
          username: 'api',
          password: API_KEY,
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
