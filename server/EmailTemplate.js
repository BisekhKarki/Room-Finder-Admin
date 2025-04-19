const template = (name) => {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Room Approval Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #007BFF;
      margin: 0;
      padding: 20px;
    }

    .email-container {
      max-width: 600px;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin: auto;
    }

    .header {
      background: #0056b3;
      color: #ffffff;
      text-align: center;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }

    p {
      font-size: 16px;
      color: #333;
      line-height: 1.6;
    }

    .highlight {
      background: #e9f5ff;
      padding: 15px;
      border-left: 4px solid #28a745;
      border-radius: 5px;
      font-weight: bold;
      color: #333;
      margin: 20px 0;
    }

    .button {
      display: inline-block;
      padding: 12px 25px;
      margin-top: 20px;
      background: #28a745;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }

    .button:hover {
      background: #218838;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #666;
      padding-top: 10px;
      border-top: 1px solid #ddd;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <div class="header">Room Finder</div>

    <p><strong>Dear ${name},</strong></p>

    <p>🎉 Congratulations! Your room listing has been <strong>successfully approved</strong>.</p>

    <div class="highlight">
      Your room is now visible to users searching for rentals.
    </div>

    <p>You can now view or edit your listing from your dashboard at any time.</p>

    

    <div class="footer">
      <p>Thank you for using Room Finder Nepal.</p>
      <p>Need help? Contact us at <a href="mailto:support@roomfinder.com">support@roomfinder.com</a></p>
    </div>
  </div>

</body>
</html>

    `;
};

module.exports = template;

{
  /* <a href="${roomLink}" class="button">View Your Room</a> */
}
