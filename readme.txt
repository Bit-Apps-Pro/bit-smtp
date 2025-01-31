=== SMTP - 100% Free & Open Source SMTP plugin for WordPress - Bit SMTP   ===
Contributors: bitpressadmin
Tags: smtp, wp mail smtp, gmail smtp, sendgrid smtp, phpmailer
Requires at least: 5.0
Tested up to: 6.7.1
Requires PHP: 7.4
Stable tag: 1.1.9
License: GPLv2 or later

Enable SMTP plugin to authenticate mail service of your site by configuring SMTP server of your desired mail service.

Connect any SMTP like MailGun SMTP, Google SMTP, Hotmail,Yahoo,AWS SES,ZOHO Mail,Sendgrid,Sendinblue,Outlook.


== Description ==

<strong>Easiest SMTP Plugin for WordPress. It's FREE and easy to setup.</strong>

A lot of site owners face the spam mail problem for using the WordPress default PHP mail function(). When it comes to mail service there may be some restrictions: sometimes emails are not delivered, sites cross the limit of outgoing mail.

Bit SMTP plugin allows you to authenticate the mail service of your site by configuring the SMTP server of your desired mail service. SMTP is a protocol that helps your WordPress site to make its email deliverability more easygoing & reliable. By enabling this feature you can send mail from your site to your recipients via your preferred mail server.

### How does SMTP work:
At first, you have to open an account on your desired hosting provider (e.g: MailGun, Gmail, Yahoo, Hotmail, Zoho mail). By opening an account you are authenticating your WordPress site. They will provide you with the necessary credentials (e.g.: Encryption type, SMTP port ). You have to put this information when configuring SMTP on your site. Once your site is authenticated you can send mail through your preferred SMTP server. All the email validation work will be done on your specified SMTP server.

To access all the mail services you need professional mail addresses. The mail services you can use through this plug-in:

1. MailGun SMTP [5,000 free email /per month for 3 months]
2. Gmail SMTP [10000 free email/per month]
3. Hotmail
4. Yahoo
5. AWS SES
6. ZOHO Mail
7. Sendgrid
8. Sendinblue
9. Outlook

  
= Mail Gun SMTP: =
Mailgun SMTP is a popular service provider for sending large quantities of emails, and they offer a monthly allowance of 10,000 free emails for new users.

SMTP Host : smtp.mailgun.org
Type of Encryption :TLS
SMTP Port: 587

= Gmail SMTP: =
Bloggers and small business owners frequently prefer not to utilize third-party SMTP services. However, they have the option to utilize their Gmail or G Suite accounts for SMTP emails.

SMTP Host: smtp.gmail.com
Type of Encryption: TLS
SMTP Port: 587

= Hotmail SMTP: =

SMTP Host: smtp.live.com
Type of Encryption: TLS
SMTP Port: 587

= Yahoo: =

SMTP Host: smtp.mail.yahoo.com
Type of Encryption: SSL
SMTP Port: 465

= Zoho Mail SMTP: =

Experience the convenience of sending emails securely using your personal or business Zoho Mail account, while ensuring the utmost protection for your login credentials. Stay safe and confident with Zoho Mail's reliable email delivery.

SMTP Host: smtp.zoho.com
Type of Encryption: TSL
SMTP Port: 587

= Amazon SES SMTP: =
Amazon SES is an ideal mailer for advanced users seeking to leverage the power of Amazon Web Services (AWS) SES to send high volumes of emails.
It caters to technical users and offers a robust platform for efficient email delivery.
With Amazon SES, users can maximize the benefits of AWS SES service and effectively handle large email volumes.

SMTP Host:http://email-smtp.us-west-2.amazonaws.com/
Type of Encryption: TLS
SMTP Port: 587

= Sendgrid SMTP: =
With SendGrid's free SMTP plan, you can send up to 100 emails per day. Easily integrate SendGrid SMTP with your WordPress site for reliable email delivery.

host: smtp.sendgrid.net  
port: 587  
encrypted: TLS
 
= Sendinblue SMTP: =
Unlock the benefits of Sendinblue, a highly recommended transactional email service utilized by over 80,000 growing companies worldwide. With a daily email volume of over 30 million, their dedicated experts continuously enhance the reliability and speed of their SMTP infrastructure. Enjoy the advantage of 300 free emails per day provided by Sendinblue to empower your communication needs.

host: smtp-relay.sendinblue.com  
port: 587  
encrypted: TLS

= outlook SMTP: =
Supercharge your email deliverability with our Microsoft 365 / Outlook mailer integration. Seamlessly send emails from WordPress using your current Outlook.com or Microsoft 365 account, maximizing convenience and efficiency. Elevate your business communication by harnessing the power of our integrated solution.

host: smtp-mail.outlook.com  
Type of Encryption: TLS  
port: 587

###   ⭐Features

1.  Send email using an SMTP server
    
2.  You can use Gmail, Yahoo, Hot mail's, Mail gun, Amazon SES , Sendgrid, Sendinblue, Outlook &  Zoho Mail SMTP servers if you have an account with them
    
3.  Securely deliver emails to your recipients.
    
4.  Ability to specify a Reply-to email address
    
5.  Email Log (Coming soon)

6.  Email Control (Coming soon)

  
Once you have installed the plugin, Click the BIT SMTP menu
The general section consists of the following options:

* **Enable SMTP:** Yes/No if option Yes plugin is enabled or option No plugin is disabled (This option should always be checked “Yes”).

* **From Email Address:** The email address that will be used to send emails to your recipients.

* **From Name:** The name your recipients will see as part of the “from” or “sender” value when they receive your message.

* **Reply-To Email Address:** The email address that will be used to Reply-to email address to your recipients.

* **SMTP Host:** Your outgoing mail server (example: smtp.gmail.com).

* **Type of Encryption:** SSL/TLS.

* **SMTP Port:** The port that will be used to relay outbound mail to your mail server (example: 587).

* **SMTP Authentication:** No/Yes (This option should always be checked “Yes”).

* **Username:** The username that you use to login to your mail server.

* **Password:** The password that you use to login to your mail server.

After configuring the SMTP server you are ready for Email testing.

###  📨 Bit SMTP Testing 

This testing option will help you to verify that actually, your website can relay outgoing mail to the referred recipients. SMTP testing option consists of :

* **To Field:** Type the email address to whom you want to send the mail.

* **Subject Field:** Include the subject of your message.

* **Message Field:**  Write your desired message to this text field.

📹 For Video Tutorial

https://youtu.be/1dnw6v2E2y8


### Bit SMTP COMPATIBLE WITH ALL POPULAR FORM BUILDER:

[**Bit Form:**](https://wordpress.org/plugins/bit-form/)
[**Gravity Form**](https://www.gravityforms.com/)
[**Contact Form 7**](https://wordpress.org/plugins/contact-form-7/)
[**WPForms Pro**](https://wpforms.com/)
[**Ninja Forms-Contact Form**](https://wordpress.org/plugins/ninja-forms/)
[**Forminator Forms**](https://wordpress.org/plugins/forminator/)
[**Fluent Forms**](https://wordpress.org/plugins/fluentform/)
[**Formidable Forms**](https://wordpress.org/plugins/formidable/)
[**Everest Forms**](https://wordpress.org/plugins/everest-forms/)
[**WS Forms**](https://wordpress.org/plugins/ws-form/)
[**Happy Forms - Contact Form**](https://wordpress.org/plugins/happyforms/)
[**weForms - Contact Form**](https://wordpress.org/plugins/weforms/)
[**Kali Forms**](https://wordpress.org/plugins/kali-forms/)
[**WPForm Lite**](https://wordpress.org/plugins/wpforms-lite/)
[**PlanSo Forms**](https://www.planso.net/planso-form-builder/)
[**Form Maker by 10Web**](https://wordpress.org/plugins/form-maker/)
[**Elementor Form**](https://elementor.com/)
[**FormCraft**](https://wordpress.org/plugins/formcraft-form-builder/)
[**Quform WordPress Form Builder**](https://www.quform.com/)
[**Caldera Contact Forms**](https://calderaforms.com/)

### SECURITY:

The Bit SMTP team places a high priority on security. Not only does the plugin adhere to all security best practices, but we offer various options to ensure the safety and protection of your website.

For recommended direct SMTP mailers integrations like SMTP.com, Brevo (formerly Sendinblue), Mailgun, SendGrid, Postmark, and SparkPost, we utilize official provider APIs. This means that you never have to input your username or password in the plugin settings, and these credentials are not stored in the database. Instead, we use tokens or API keys, which provide a much higher level of security.


🎉 Overview of other products we are offering :

[**Bit Form:**](https://wordpress.org/plugins/bit-form/) One of our best selling product. Bit Form is an amazing drag-and-drop form builder that allows you to create custom forms to interact with your visitors. It gives you the freedom to create any form you want, with no coding required.

[**Bit Integrations:**](https://wordpress.org/plugins/bit-integrations/) Automate 200+ platforms and Contact form 7, Elementor Form, WooCommerce, Google Sheet, WPForms, Forminator, BuddyBoss, LearnDash, Hubspot, Mail poet, MailChimp, Webhook, ACF, Zapier, Fluent, Forms, CRM, LMS, Membership & many more.

[**Bit Assist:**](https://wordpress.org/plugins/bit-assist/) Connect your all support assistant with a single button. Floating Chat Widget, Contact Chat Icons, Telegram Chat, Line Messenger, WeChat, WhatsApp, Email, SMS, Call Button & more.

[**Bit File Manager:**](https://wordpress.org/plugins/file-manager/) Best File manager and Code editor plugin for WordPress. You can edit, upload, delete, copy, move, rename, archive and extract files with the file manager plugin. You don’t need to worry about FTP anymore. It is really simple and easy to use.


[**Bit Social**](https://wordpress.org/plugins/bit-social/) Bit Social is a versatile WordPress plugin enabling effortless post creation, scheduling, and sharing across multiple social platforms, enhancing your social media management with simplicity and efficiency.

[**Bit Flows**](https://bit-flows.com/) – Advanced workflow automation alternative to Zapier in WordPress.

[**ToWP:**](https://towp.io//) ToWP is a powerful platform that lets you create temporary WordPress sites in less than 10 seconds using just your email! No passwords, no login URLs to remember — just a smooth experience.It is a completely free platform.

[**Webhook.is:**](https://webhook.is/) Test your incoming webhook response & send outgoing webhook request for free.

🔔 For more updates about our products we cordially request you to join our [**Fb Community**](https://www.facebook.com/groups/bitcommunityusers).

You can access the full source code on GitHub, and your contributions to enhancing this awesome Plugin are more than welcome.
[**View on GitHub**](https://github.com/Bit-Apps-Pro/bit-smtp)

## FAQ

= 1. Is it possible to utilize this plugin to send emails via SMTP from my WordPress site? =
Yes, you can use this plugin to send emails via SMTP from your WordPress site. You can use Gmail, Yahoo, Hot mail's, Mail Gun, Amazon SES, Sendgrid, Sendinblue, Outlook &  Zoho Mail SMTP servers if you have an account with them.

= 2. Is it possible to integrate the Amazon SES API with Bit SMTP? =
Yes, you can integrate the Amazon SES API with Bit SMTP.

= 3. Is it possible to send WordPress emails using SendGrid? =
Yes, possible to send WordPress emails using SendGrid.

= 4. Is it possible to send WordPress emails using Sendinblue? =
Yes, possible to send WordPress emails using Sendinblue.

= 5. Is it possible to send WordPress emails using Outlook? =
Yes, possible to send WordPress emails using Outlook.

= 6. Is it possible to send WordPress emails using Zoho Mail? =
Yes, possible to send WordPress emails using Zoho Mail.

= 7. Is it possible to send WordPress emails using Mailgun? =
Yes, possible to send WordPress emails using Mailgun.

= 9. Is it possible to send WordPress emails using Yahoo? =
Yes, possible to send WordPress emails using Yahoo.

= 10. Is it possible to send WordPress emails using Hotmail? =
Yes, possible to send WordPress emails using Hotmail.


== Changelog ==

= 1.1.8 (31 Jan, 2025) =
* Bit Flows promotional banner added 

= 1.1.7 (11 Dec, 2024) =
* Bit Social promotional banner removed 

= 1.1.6 (01 Dec, 2024) =
* Bit Social promotional banner updated 

= 1.1.5 (05 Nov, 2024) =
* Plugin deletion issue fixed 

= 1.1.4 (02 Nov, 2024) =
* Bit Social promotional banner updated 
* Telemetry package version updated

= 1.1.3 (03 Oct, 2024) =
* Others page updated

= 1.1.2 (29 Sep, 2024) =
* Telemetry Modal replaced with Multi Step Modal

= 1.1.1 =
* Namespace conflict issue fixed

= 1.1.0 =
* SMTP debug enable/disable option added

= 1.0.9 =
* UI modified and some issue fixed

= 1.0.7 =
* Tested with 6.3
* Reply To nullable

= 1.0.6 =
* Improves confirmation message

= 1.0.5 =
* Fix: Illegal string offset (PHP Warning)

= 1.0.4 =
* Tested with WordPress 5.9 version

= 1.0.3 =
Fix: required field issue

= 1.0.2 =
Fix: some issues

= 1.0.1 =
* SMTP Frontend changed

= 1.0.0 =
* Initial release of bit-smtp