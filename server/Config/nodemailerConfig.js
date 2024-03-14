import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "binitme449@gmail.com",
    pass: "tpsf uonf jrcv tfln ",
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "your_email@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export { transporter, sendEmail };
