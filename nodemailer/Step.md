# Nodemailer Guide

This guide provides step-by-step instructions for setting up and using Nodemailer in a Node.js application with OAuth2 authentication using ClientID and ClientSecret, along with generating a refresh token using the OAuth 2.0 Playground.

---

## Prerequisites

- Node.js installed on your machine.
- A Google account to generate OAuth2 credentials (ClientID and ClientSecret).
- Access to the Google API Console to create OAuth2 credentials.

---

## Getting OAuth2 Credentials

### 1. Go to the Google API Console:
- Navigate to the [Google API Console](https://console.developers.google.com/).
- Create a new project or select an existing one.

### 2. Enable Gmail API:
- Go to the **Library** section.
- Search for **Gmail API** and enable it.

### 3. Create OAuth2 Credentials:
- Go to the **Credentials** section.
- Click on **Create Credentials** and choose **OAuth 2.0 Client IDs**.
- Set the application type to **Web application**.
- Under **Authorized redirect URIs**, add:
  - `http://localhost`
  - `https://developers.google.com/oauthplayground`
- After creating, you'll get your **ClientID** and **ClientSecret**.

---

## Generating the Refresh Token Using OAuth 2.0 Playground

### 1. Access OAuth 2.0 Playground:
- Open the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).

### 2. Configure OAuth 2.0 Playground:
- Click the **gear icon** (settings) in the top-right corner.
- Under **OAuth 2.0 endpoints**, select **Use your own OAuth credentials**.
- Enter your **ClientID** and **ClientSecret**.
- Set **Access type** to *Offline* to obtain a refresh token.

### 3. Select Scopes:
For Gmail, choose:
```
https://mail.google.com/
```

### 4. Authorize APIs:
- Click **Authorize APIs** and log in with your Google account.

### 5. Exchange Authorization Code for Tokens:
- Click **Exchange authorization code for tokens**.
- Copy the **Refresh Token** displayed in Step 2.

---

## Installation

### 1. Initialize a Node.js Project
```bash
npm init -y
```

### 2. Install Nodemailer
```bash
npm install nodemailer
```

### 3. Install dotenv
```bash
npm install dotenv
```

---

## Configuration

### 1. Create a `.env` File
```
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REFRESH_TOKEN=your-refresh-token
EMAIL_USER=your-email@example.com
```

### 2. Set Up Nodemailer with OAuth2

Create a file **email.js**:

```js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

module.exports = transporter;
```

### 3. Create Function to Send Emails

Add this to **email.js**:

```js
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
```

### 4. Use in Application

In **app.js**:

```js
const sendEmail = require('./email');

sendEmail(
  'recipient@example.com',
  'Test Email Subject',
  'This is a test email sent with Nodemailer using OAuth2.',
  '<p>This is a test email sent with <b>Nodemailer</b> using OAuth2.</p>'
);
```

---

## Running the Application

```bash
node app.js
```

---

## Troubleshooting

- **Invalid Credentials:** Check ClientID, ClientSecret, and RefreshToken.
- **Email Not Sent:** Ensure Gmail API access and correct permissions.

---

## References

- [Nodemailer Documentation](https://nodemailer.com/)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)