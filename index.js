const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
app.use(express.json());
app.use(cors());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("Lead API Running");
});

app.post("/send-lead", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    await resend.emails.send({
      from: "Website Lead <onboarding@resend.dev>",
      to: "yourgmail@gmail.com",   // <-- put your receiving email
      subject: "New Website Lead 🚀",
      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message || "No message"}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
