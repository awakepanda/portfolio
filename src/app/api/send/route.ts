import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const { topics, name, email, message } = await request.json();

    // サーバーサイドのバリデーション
    if (!topics || !name || !email || !message) {
      console.log("バリデーションエラー:", { topics, name, email, message });
      return NextResponse.json(
        { error: "すべてのフィールドが必要です" },
        { status: 400 },
      );
    }

    console.log("メール送信を試みます:", { topics, name, email });

    // Promise.allを使用して両方のメール送信を同時に行う
    const [adminEmailData, autoReplyData] = await Promise.all([
      // 管理者向けメール送信
      resend.emails.send({
        from: "Maeno Shingo Portfolio <onboarding@resend.dev>",
        to: "coloponpan@gmail.com",
        subject: `新しい問い合わせ - ${topics}`,
        text: `名前: ${name}\nメールアドレス: ${email}\nトピック: ${topics}\nメッセージ: ${message}`,
        html: `
          <h2>新しい問い合わせ</h2>
          <p><strong>トピック:</strong> ${topics}</p>
          <p><strong>名前:</strong> ${name}</p>
          <p><strong>メールアドレス:</strong> ${email}</p>
          <p><strong>メッセージ:</strong></p>
          <p>${message}</p>
        `,
      }),

      // ユーザー向け自動返信メール送信
      resend.emails.send({
        from: "Maeno Shingo Portfolio <onboarding@resend.dev>",
        to: email,
        subject: "お問い合わせありがとうございます",
        text: `
          ${name} 様、

          ${topics} に関するお問い合わせありがとうございます。メッセージを受け取りました。できるだけ早くご返信いたします。

          敬具
          Maeno Shingo
        `,
        html: `
          <h2>お問い合わせありがとうございます</h2>
          <p>${name} 様、</p>
          <p>${topics} に関するお問い合わせありがとうございます。メッセージを受け取りました。できるだけ早くご返信いたします。</p>
          <p>敬具<br>Maeno Shingo</p>
        `,
      }),
    ]);

    console.log("メール送信成功:", { adminEmailData, autoReplyData });

    return NextResponse.json({
      success: true,
      adminEmail: adminEmailData,
      autoReply: autoReplyData,
    });
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json(
      {
        error: "メール送信に失敗しました",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
