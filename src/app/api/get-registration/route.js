import axios from 'axios';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_PRIVATE_KEY // Clé privée
);

const secretKey = process.env.HCAPTCHA_SECRET;

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('Received data:', body);

    const { id} = body;

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', id)

    if (error) {
      return new Response(JSON.stringify({ message: 'Nous avons eu une erreur en récupérant vos données.', 'error':error  }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(
      { message: 'Erreur', details: error.response?.data || error.message }),
      { status: 500 }
    );
  }
}
