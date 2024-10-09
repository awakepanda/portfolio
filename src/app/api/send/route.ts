import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message, category } = await request.json();

    // サーバーサイドのバリデーション
    if (!name || !email || !message || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // メール送信
    const data = await resend.emails.send({
      from: "Maeno Shingo Portfolio <onboarding@resend.dev>",
      to: "coloponpan@gmail.com",
      subject: `New Contact Form Submission - ${category}`,
      text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
