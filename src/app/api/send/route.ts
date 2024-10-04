import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // server side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // send mail
    const data = await resend.emails.send({
      from: "Maeno Shingo Portofolio <onboarding@resend.dev>",
      to: "coloponpan@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Feiled to send email" },
      { status: 500 },
    );
  }
}
