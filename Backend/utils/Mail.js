const nodemailer = require("nodemailer");

exports.generateOTP = () => {
    let OTP = "";
    for(let i=0; i<6; i++){
        let RandomNumber = Math.floor(Math.random() * 9);
        OTP += RandomNumber;
    }
    return OTP;
}

exports.mailTransport = () => nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        // port: 2525,
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
});

exports.generateOTPTemplate = (OTP) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify your login</title>
<!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
<table role="presentation"
style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
<tbody>
<tr>
<td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
  <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
    <tbody>
      <tr>
        <td style="padding: 40px 0px 0px;">
          <div style="padding: 20px; background-color: rgb(255, 255, 255);">
            <div style="color: rgb(0, 0, 0); text-align: left;">
              <h1 style="margin: 1rem 0">Verification code</h1>
              <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
              <p style="padding-bottom: 16px"><strong style="font-size: 130%">${OTP}</strong></p>
              <p style="padding-bottom: 16px">This OTP is only Valid for 60 Minutes !!</p>
              <p style="padding-bottom: 16px">Thanks,<br>The AI Blog App team</p>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</td>
</tr>
</tbody>
</table>
</body>
</html>`
}

exports.plainEmailTemplate = (title) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">${title}</h1>
                      <p style="padding-bottom: 16px">Click Below Button to Log In !!</p>
                      <p style="padding-bottom: 16px"><a href="#" target="_blank"
                          style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #3F8EE9;display: inline-block;margin: 0.5rem 0;">Confirm
                          now</a></p>
                      <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>AI Blog Team</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
  </html>`
}

exports.forgotPasswordEmailTemplate = (url) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">Trouble signing in?</h1>
                      <p style="padding-bottom: 16px">We've received a request to reset the password for this user account.</p>
                      <p style="padding-bottom: 16px"><a href=${url} target="_blank"
                          style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #3F8EE9;display: inline-block;margin: 0.5rem 0;">Reset
                          your password</a></p>
                      <p style="padding-bottom: 16px">If you didn’t ask to reset your password, you can ignore this email.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>AI Blog App team</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
  </html>`
}