import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const body = await readBody(event);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.sender_email,
        pass: process.env.sender_email_password,
      },
    });

    // Send the email
    try {
      const mailOptions = {
        from: process.env.sender_email,
        to: process.env.sender_email,
        subject: "Форма обратной связи",
        html: `<b>ФИО:</b> ${body.name}<br><b>Контактные данные:</b> ${body.contact}<br><b>Текст:</b> ${body.text}`,
      };
      
      await transporter.sendMail(mailOptions);

      return true;
    } catch (error) {
      return false;
    }
  }
});