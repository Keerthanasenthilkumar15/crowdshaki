import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send OTP email using Resend
 * @param email - Recipient email address
 * @param otp - OTP code to send
 * @returns Promise<void>
 */
export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Crowdshaki <onboarding@resend.dev>', // Use Resend's test domain
      to: [email],
      subject: 'Your OTP Code - Crowdshaki',
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your OTP Code</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Crowdshaki</h1>
                        <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Reliable means to help people needing fund</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Your Verification Code</h2>
                        <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                          Hello,
                        </p>
                        <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                          You have requested to login to your Crowdshaki account. Please use the following verification code:
                        </p>
                        
                        <!-- OTP Box -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 30px 0;">
                          <tr>
                            <td align="center" style="padding: 30px; background-color: #f8f9fa; border-radius: 8px; border: 2px dashed #667eea;">
                              <div style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                ${otp}
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                          <strong style="color: #e53e3e;">⏰ This code will expire in 5 minutes.</strong>
                        </p>
                        <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                          If you did not request this code, please ignore this email or contact our support team if you have concerns.
                        </p>
                        
                        <!-- Tips Box -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 20px 0;">
                          <tr>
                            <td style="padding: 20px; background-color: #fff5f5; border-left: 4px solid #e53e3e; border-radius: 4px;">
                              <p style="margin: 0; color: #c53030; font-size: 14px; line-height: 1.5;">
                                <strong>🔒 Security Tip:</strong> Never share this code with anyone. Crowdshaki will never ask you for this code.
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.5;">
                          Best regards,<br>
                          <strong style="color: #667eea;">The Crowdshaki Team</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                          This is an automated email. Please do not reply to this message.
                        </p>
                        <p style="margin: 0; color: #999999; font-size: 12px;">
                          © 2024 Crowdshaki. All rights reserved.
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      // Plain text fallback
      text: `Your OTP code is: ${otp}

This code is valid for 5 minutes.

If you did not request this code, please ignore this email.

Best regards,
Crowdshaki Team

---
This is an automated email. Please do not reply.`,
    });

    if (error) {
      console.error('❌ Resend API Error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('✅ Email sent successfully via Resend!');
    console.log('📧 Message ID:', data?.id);
    
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw new Error('Failed to send OTP email. Please try again.');
  }
}

/**
 * Send welcome email to new users
 * @param email - Recipient email address
 * @param name - User's name
 */
export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Crowdshaki <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Crowdshaki! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 32px;">Welcome to Crowdshaki! 🎉</h1>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #667eea;">Hello ${name}!</h2>
                <p>Thank you for joining Crowdshaki - your reliable platform for crowdfunding and helping those in need.</p>
                
                <p>With Crowdshaki, you can:</p>
                <ul style="line-height: 2;">
                  <li>Create fundraising campaigns</li>
                  <li>Support meaningful causes</li>
                  <li>Track your contributions</li>
                  <li>Make a real difference in people's lives</li>
                </ul>
                
                <p>Get started by exploring active campaigns and creating your first fundraiser!</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://crowdshaki.vercel.app" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Explore Campaigns
                  </a>
                </div>
                
                <p>If you have any questions, feel free to reach out to our support team.</p>
                
                <p>Best regards,<br><strong>The Crowdshaki Team</strong></p>
              </div>
              
              <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                <p>© 2024 Crowdshaki. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Welcome to Crowdshaki, ${name}!

Thank you for joining our platform. Start making a difference today!

Visit: https://crowdshaki.vercel.app

Best regards,
Crowdshaki Team`,
    });

    if (error) {
      console.error('❌ Error sending welcome email:', error);
      return; // Don't throw error for welcome email
    }

    console.log('✅ Welcome email sent successfully!');
    
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    // Don't throw - welcome email is not critical
  }
}

export default resend;