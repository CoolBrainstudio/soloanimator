import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, instagram, portfolio, skills, experience, price_range, bio } = body;

    console.log('=== API Called ===');
    console.log('Body:', body);

    if (!name || !email || !portfolio || !skills || !experience || !bio) {
      console.log('Missing fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('URL:', supabaseUrl ? 'Present' : 'Missing');
    console.log('Key:', serviceRoleKey ? 'Present' : 'Missing');

    if (!supabaseUrl || !serviceRoleKey) {
      console.log('No credentials');
      return NextResponse.json(
        { error: 'Server config error - no credentials' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const skillsArray = Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map((s: string) => s.trim()) : [skills]);

    const insertData = {
      name,
      email,
      instagram: instagram || '',
      portfolio,
      skills: skillsArray,
      experience,
      price_range: price_range || '',
      bio,
      status: 'pending',
      featured: false,
    };

    console.log('Inserting:', insertData);

    const { data, error } = await supabase
      .from('animators')
      .insert([insertData]);

    console.log('Error:', error);
    console.log('Data:', data);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message, fullError: JSON.stringify(error) },
        { status: 500 }
      );
    }

    console.log('Success!');
    return NextResponse.json(
      { message: 'Success', data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Catch error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
