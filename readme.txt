=== Bit SMTP - Best SMTP plugin for WordPress ===
Contributors: bitpressadmin
Tags: smtp, wp mail smtp, wordpress smtp, gmail smtp, sendgrid smtp, mailgun smtp, mail, mailer, phpmailer, wp_mail, email, mailgun, sengrid,sendinblue, wp smtp,mandrill,outlook
Requires at least: 4.9.0
Tested up to: 5.6
Requires PHP: 5.6
Stable tag: 1.0.3
License: GPLv2 or later

== Description ==
A lot of site owners face the spam mail problem for using the WordPress default PHP mail function(). When it comes to mail service there may be some restrictions: sometimes emails are not delivered, sites cross the limit of outgoing mail.

Bit SMTP plugin allows you to authenticate the mail service of your site by configuring the SMTP server of your desired mail service. SMTP is a protocol that helps your WordPress site to make its email deliverability more easygoing & reliable. By enabling this feature you can send mail from your site to your recipients via your preferred mail server.

https://youtu.be/1dnw6v2E2y8

== How does SMTP works : ==

At first, you have to open an account on your desired hosting provider (e.g: MailGun, Gmail, Yahoo, Hotmail, Zoho mail). By opening an account you are authenticating your WordPress site. They will provide you the necessary credentials (e.g.: Encryption type, SMTP port ). You have to put this information when configuring SMTP on your site. Once your site is authenticated you can send mail through your preferred SMTP server. All the email validation work will be done on your specified SMTP server.

To access all the mail services you need professional mail addresses. The mail services you can use through this plug-in:

1. MailGun SMTP [5,000 free email /per month for 3 months]
2. Gmail SMTP [6,000 free email/per month]
3. Hotmail
4. Yahoo
5. AWS SES
6. ZOHO Mail

= Mail Gun: =
    SMTP Host : smtp.mailgun.org
    Type of Encryption :TLS
    SMTP Port: 587

= Gmail: =
    SMTP Host: smtp.gmail.com
    Type of Encryption: TLS
    SMTP Port: 587

= Hotmail: =
    SMTP Host: smtp.live.com
    Type of Encryption: TLS
    SMTP Port: 587

= Yahoo: =
    SMTP Host: smtp.mail.yahoo.com
    Type of Encryption: SSL
    SMTP Port: 465

= Zoho Mail: =
    SMTP Host: smtp.zoho.com
    Type of Encryption: TSL
    SMTP Port: 587

= Amazon SES: =
    SMTP Host:http://email-smtp.us-west-2.amazonaws.com/
    Type of Encryption: TLS
    SMTP Port: 587

= Sendgrid: =
    host : smtp.sendgrid.net
    port : 587
    encrypted :  TLS

= Sendinblue: =
    host : smtp-relay.sendinblue.com
    port: 587
    encrypted : TLS

= outlook: =
    host : smtp-mail.outlook.com
    Type of Encryption : TLS
    port: 587

== Features: ==

1. Send email using an SMTP server
2. You can use Gmail, Yahoo, Hot mail's, Mail gun, Amazon SES,  Zoho Mail SMTP server if you have an account with them
3. Securely deliver emails to your recipients.
4. Ability to specify a Reply-to email address
5. Email Log (Coming soon)
5. Email Control (Coming soon)

Once you have installed the plugin, Click the BIT SMTP menu

The general section consists of the following options:

* Enable SMTP: Yes/No if option Yes plugin is enabled or option is No plugin is disabled (This option should always be checked “Yes”).
* From Email Address: The email address that will be used to send emails to your recipients.
* From Name: The name your recipients will see as part of the “from” or “sender” value when they receive your message.
* Reply-To Email Address: The email address that will be used to Reply-to email address to your recipients.
* SMTP Host: Your outgoing mail server (example: smtp.gmail.com).
* Type of Encryption: SSL/TLS.
* SMTP Port: The port that will be used to relay outbound mail to your mail server (example: 587).
* SMTP Authentication: No/Yes (This option should always be checked “Yes”).
* Username: The username that you use to login to your mail server.
* Password: The password that you use to login to your mail server.

After configuring the SMTP server you are ready for Email testing.

= Bit SMTP Testing : =
This testing option will help you to verify that actually, your website can relay outgoing mail to the referred recipients. SMTP testing option consists of :

* To Field: Type the email address to whom you want to send the mail.
* Subject Field: Include the subject of your message.
* Message Field: Write your desired message to this text field.


== Changelog ==

= 1.0.0 =
* Initial release of bit_smtp

= 1.0.1 =
* SMTP Frontend changed

= 1.0.2 =
Fix: some issues

= 1.0.3 =
Fix: required field issue