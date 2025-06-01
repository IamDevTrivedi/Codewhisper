// ./lib/templates.lib.js

const generateWelcomeEmail = ({ name, year }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Our Platform</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #f0fdf4;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    color: #ffffff;
                    text-align: center;
                    padding: 30px 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 600;
                }
                .content {
                    padding: 30px;
                    text-align: center;
                    line-height: 1.6;
                }
                .content h2 {
                    color: #15803d;
                    margin-bottom: 20px;
                }
                .content p {
                    font-size: 16px;
                    color: #4a5568;
                    margin-bottom: 20px;
                }
                .button {
                    display: inline-block;
                    background-color: #22c55e;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 5px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer {
                    background: #f0fdf4;
                    color: #6c757d;
                    text-align: center;
                    padding: 15px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to Our Platform</h1>
                </div>
                <div class="content">
                    <h2>Hello, ${name}!</h2>
                    <p>
                        We're thrilled to have you join our community. Your account has been successfully created, and we can't wait for you to explore all the amazing features our platform has to offer.
                    </p>
                    <a href="https://codewhisper.vercel.app/" class="button">Get Started</a>
                    <p style="font-size: 14px; color: #718096;">
                        If you have any questions or need assistance, don't hesitate to reach out to our support team.
                    </p>
                </div>
                <div class="footer">
                    <p>&copy; ${year} Our Company | All Rights Reserved</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const generateOtpEmail = ({ otp, validity, year }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #f0fdf4;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    color: #ffffff;
                    text-align: center;
                    padding: 30px 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 600;
                }
                .content {
                    padding: 30px;
                    text-align: center;
                    line-height: 1.6;
                }
                .content p {
                    font-size: 16px;
                    color: #4a5568;
                    margin-bottom: 20px;
                }
                .otp-code {
                    font-size: 36px;
                    font-weight: bold;
                    color: #15803d;
                    letter-spacing: 5px;
                    margin: 30px 0;
                    padding: 10px;
                    border: 2px dashed #22c55e;
                    display: inline-block;
                }
                .footer {
                    background: #f0fdf4;
                    color: #6c757d;
                    text-align: center;
                    padding: 15px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                <div class="content">
                    <p>
                        Please use the verification code below to complete your email verification process:
                    </p>
                    <div class="otp-code">${otp}</div>
                    <p style="font-size: 14px; color: #718096;">
                        This code is valid for <strong>${validity} minutes</strong>. For security reasons, please do not share this code with anyone.
                    </p>
                </div>
                <div class="footer">
                    <p>&copy; ${year} Our Company | All Rights Reserved</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const generateResetOtpEmail = ({ otp, validity, year }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset OTP</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #f0fdf4;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    color: #ffffff;
                    text-align: center;
                    padding: 30px 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 600;
                }
                .content {
                    padding: 30px;
                    text-align: center;
                    line-height: 1.6;
                }
                .content p {
                    font-size: 16px;
                    color: #4a5568;
                    margin-bottom: 20px;
                }
                .otp-code {
                    font-size: 36px;
                    font-weight: bold;
                    color: #15803d;
                    letter-spacing: 5px;
                    margin: 30px 0;
                    padding: 10px;
                    border: 2px dashed #22c55e;
                    display: inline-block;
                }
                .footer {
                    background: #f0fdf4;
                    color: #6c757d;
                    text-align: center;
                    padding: 15px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Verification</h1>
                </div>
                <div class="content">
                    <p>
                        You've requested to reset your password. Use the verification code below to proceed:
                    </p>
                    <div class="otp-code">${otp}</div>
                    <p style="font-size: 14px; color: #718096;">
                        This code is valid for <strong>${validity} minutes</strong>. If you didn't request a password reset, please ignore this email or contact our support team immediately.
                    </p>
                </div>
                <div class="footer">
                    <p>&copy; ${year} Our Company | All Rights Reserved</p>
                </div>
            </div>
        </body>
        </html>
    `;
};


const generateForgotUsernameEmail = ({ name, date, email, username, year }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Username Reminder</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Arial', sans-serif;
                background-color: #f0fdf4;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                color: #ffffff;
                text-align: center;
                padding: 30px 20px;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
                text-align: center;
                line-height: 1.6;
            }
            .content h2 {
                color: #15803d;
                margin-bottom: 20px;
            }
            .content p {
                font-size: 16px;
                color: #4a5568;
                margin-bottom: 20px;
            }
            .username {
                font-size: 24px;
                font-weight: bold;
                color: #15803d;
                padding: 10px;
                border: 2px dashed #22c55e;
                display: inline-block;
                margin: 20px 0;
            }
            .button {
                display: inline-block;
                background-color: #22c55e;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 5px;
                font-weight: bold;
                margin: 20px 0;
            }
            .footer {
                background: #f0fdf4;
                color: #6c757d;
                text-align: center;
                padding: 15px;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Username Reminder</h1>
            </div>
            <div class="content">
                <h2>Hello, ${name}!</h2>
                <p>
                    You recently requested to recover your username. Here are the details of your account:
                </p>
                <p>
                    <strong>Email:</strong> ${email}<br>
                    <strong>Username:</strong>
                </p>
                <div class="username">${username}</div>
                <p>
                    This request was made on ${date}. If you did not make this request, please contact our support team immediately.
                </p>
                <a href="https://codewhisper.vercel.app/login" class="button">Log In Now</a>
                <p style="font-size: 14px; color: #718096;">
                    If you have any questions or concerns, please don't hesitate to reach out to our support team.
                </p>
            </div>
            <div class="footer">
                <p>&copy; ${year} Our Company | All Rights Reserved</p>
            </div>
        </div>
    </body>
    </html>
  `;
};


module.exports = {
    generateWelcomeEmail,
    generateOtpEmail,
    generateResetOtpEmail,
    generateForgotUsernameEmail
};