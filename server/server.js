const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const axios = require("axios");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const response = await axios.post(
      "https://josephrep-jvhms.vercel.app/api/upload",
      req.body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (
      response.data &&
      response.data.message === "File uploaded successfully"
    ) {
      const {
        selectedOption,
        fullName,
        email,
        phoneNumber,
        details,
        selectedJob,
        how,
      } = req.body;

      const fileData = req.file;

      sendEmail({
        selectedOption,
        fullName,
        email,
        phoneNumber,
        details,
        selectedJob,
        fileData,
        how,
      })
        .then(() => {
          res.send({ message: "Email Sent Successfully" });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .send({ message: "An error occurred while sending email" });
        });
    } else {
      res.status(500).send({ message: "File upload failed" });
    }
  } catch (error) {
    console.error("Proxy request failed:", error);
    res.status(500).send("Proxy request failed");
  }
});

function sendEmail({
  selectedOption,
  fullName,
  email,
  phoneNumber,
  details,
  selectedJob,
  fileData,
  how,
}) {
  if (selectedOption === "Career") {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "zolziggy@gmail.com",
          pass: "hpnr xxyy fxcw rirh",
        },
      });

      const mail_configs = {
        from: email,
        to: "zolziggy@gmail.com",
        subject: selectedOption,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
          <style>
            /* Styles for the email template */
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #000; /* Set background color to black */
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo {
              max-width: 200px;
            }
            .footer {
              background-color: #f9f9f9;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
              text-align: center;
            }
            .footer p {
              margin: 5px 0;
            }
            h1 {
              color: #333;
            }
            p {
              margin-bottom: 15px;
            }
            .info-section {
              background-color: #f9f9f9;
              padding: 10px 20px;
              border-radius: 5px;
            }
            .info-section p {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://i.postimg.cc/mkVZmhfJ/jlogo.png" alt="Company Logo" class="logo">
            </div>
            <h1>Contact Form Submission</h1>
            <div class="info-section">
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Inquiry Type:</strong> ${selectedOption}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>Job Selected: ${selectedJob}</p>
            </div>
            <div class="footer">
              <p>Thank you for contacting us.</p>
              <p>This email is auto-generated. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
        `,
        attachments: [
          {
            filename: fileData.originalname,
            content: fileData.buffer,
          },
        ],
      };

      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: "An error occurred" });
        }

        return resolve({ message: "Email Sent Successfully" });
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "zolziggy@gmail.com",
          pass: "hpnr xxyy fxcw rirh",
        },
      });

      const mail_configs = {
        from: email,
        to: "zolziggy@gmail.com",
        subject: selectedOption,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
          <style>
            /* Styles for the email template */
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #000; /* Set background color to black */
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo {
              max-width: 200px;
            }
            .footer {
              background-color: #f9f9f9;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
              text-align: center;
            }
            .footer p {
              margin: 5px 0;
            }
            h1 {
              color: #333;
            }
            p {
              margin-bottom: 15px;
            }
            .info-section {
              background-color: #f9f9f9;
              padding: 10px 20px;
              border-radius: 5px;
            }
            .info-section p {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://i.postimg.cc/mkVZmhfJ/jlogo.png" alt="Company Logo" class="logo">
            </div>
            <h1>Contact Form Submission</h1>
            <div class="info-section">
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Inquiry Type:</strong> ${selectedOption}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>How did you hear about us:</strong> ${how}</p>
              <p><strong>Details: ${details}</p>
            </div>
            <div class="footer">
              <p>Thank you for contacting us.</p>
              <p>This email is auto-generated. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
        
      `,
      };

      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: "An error occured" });
        }

        return resolve({ message: "Email Sent Successfully" });
      });
    });
  }
}

app.get("/", upload.single("file"), (req, res) => {
  sendEmail(req.query)
    .then((response) => response.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(PORT, () => {
  console.log(`nodemailer is listening at ${PORT}`);
});
