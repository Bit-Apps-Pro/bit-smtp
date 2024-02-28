<?php

namespace BitApps\SMTP\HTTP\Services;

class App
{
    public static function triggers($slug = null, $customTriggers = null)
    {
        $data = [
            'affiliatewp'                         => 'AffiliateWP',
            'amelia'                              => 'Amelia',
            'arforms'                             => 'ARForms',
            'beaver-builder'                      => 'Beaver Builder',
            'bit-assist'                          => 'Bit Assist',
            'breakdance'                          => 'Breakdance',
            'bricks'                              => 'Bricks',
            'brizy'                               => 'Brizy',
            'buddyboss'                           => 'BuddyBoss',
            'cartflows'                           => 'CartFlows',
            'contact-form-7'                      => 'Contact Form 7',
            'divi'                                => 'Divi',
            'easy-digital-downloads'              => 'Easy Digital Downloads',
            'eform'                               => 'eForm',
            'elementor-form'                      => 'Elementor Form',
            'everest-forms'                       => 'Everest Forms',
            'fluent-forms'                        => 'Fluent Forms',
            'fluent-support'                      => 'Fluent Support',
            'fluentcrm'                           => 'FluentCRM',
            'formcraft'                           => 'FormCraft',
            'formidable-forms'                    => 'Formidable Forms',
            'forminator-forms'                    => 'Forminator Forms',
            'gamipress'                           => 'GamiPress',
            'givewp'                              => 'GiveWP',
            'gravity-forms'                       => 'Gravity Forms',
            'groundhogg'                          => 'Groundhogg',
            'happyforms'                          => 'Happyforms',
            'jetformbuilder'                      => 'JetFormBuilder',
            'kadence-blocks-form'                 => 'Kadence Blocks Form',
            'kali-forms'                          => 'Kali Forms',
            'learndash-lms'                       => 'LearnDash LMS',
            'lifterlms'                           => 'LifterLMS',
            'mb-frontend-submission'              => 'MB Frontend Submission',
            'memberpress'                         => 'MemberPress',
            'metform'                             => 'MetForm',
            'ninja-forms'                         => 'Ninja Forms',
            'paid-memberships-pro'                => 'Paid Memberships Pro',
            'piotnet-addons-for-elementor'        => 'Piotnet Addons For Elementor',
            'piotnet-forms'                       => 'Piotnet Forms',
            'rafflepress'                         => 'RafflePress',
            'restrict-content'                    => 'Restrict Content',
            'slicewp'                             => 'SliceWP',
            'solid-affiliate'                     => 'Solid Affiliate',
            'studiocart'                          => 'Studiocart',
            'surecart'                            => 'SureCart',
            'tripetto'                            => 'Tripetto',
            'tutor-lms'                           => 'Tutor LMS',
            'user-registration'                   => 'User Registration',
            'webhook'                             => 'Webhook',
            'weforms'                             => 'weForms',
            'woocommerce'                         => 'WooCommerce',
            'wp-courseware'                       => 'WP Courseware',
            'wp-post'                             => 'WP Post',
            'wpforms'                             => 'WPForms',
            'wpfunnels'                           => 'WPFunnels',
            'ws-form'                             => 'WS Form'
        ];

        if ($customTriggers) {
            $data = array_merge($data, $customTriggers);
        }

        if ($slug) {
            return $data[$slug];
        }

        return $data;
    }

    public static function actions($slug = null, $customActions = null)
    {
        $data = [
            'activecampaign'                       => 'ActiveCampaign',
            'acumbamail'                           => 'Acumbamail',
            'agiled-crm'                           => 'Agiled CRM',
            'airtable'                             => 'Airtable',
            'albato'                               => 'Albato',
            'asana'                                => 'Asana',
            'benchmark-email'                      => 'Benchmark Email',
            'bit-form'                             => 'Bit Form',
            'brevo'                                => 'Brevo',
            'buddyboss'                            => 'BuddyBoss',
            'capsule-crm'                          => 'Capsule CRM',
            'clickup'                              => 'ClickUp',
            'companyhub'                           => 'CompanyHub',
            'constant-contact'                     => 'Constant Contact',
            'convertkit'                           => 'ConvertKit',
            'copper-crm'                           => 'Copper CRM',
            'custom-action'                        => 'Custom Action',
            'directiq'                             => 'DirectIQ',
            'dropbox'                              => 'Dropbox',
            'elastic-email'                        => 'Elastic Email',
            'email'                                => 'Email',
            'emailoctopus'                         => 'EmailOctopus',
            'encharge'                             => 'Encharge',
            'fluent-support'                       => 'Fluent Support',
            'fluentcrm'                            => 'FluentCRM',
            'freshdesk'                            => 'Freshdesk',
            'freshsales'                           => 'Freshsales',
            'funnelkit'                            => 'FunnelKit',
            'gamipress'                            => 'GamiPress',
            'getresponse'                          => 'GetResponse',
            'getgist'                              => 'Getgist',
            'givewp'                               => 'GiveWp',
            'google-calendar'                      => 'Google Calendar',
            'google-contacts'                      => 'Google Contacts',
            'google-drive'                         => 'Google Drive',
            'google-sheets'                        => 'Google Sheets',
            'groundhogg'                           => 'Groundhogg',
            'hubspot'                              => 'HubSpot',
            'keap'                                 => 'Keap',
            'kirim-email'                          => 'Kirim Email',
            'klaviyo'                              => 'Klaviyo',
            'konnectzit'                           => 'KonnectzIT',
            'learndash'                            => 'LearnDash',
            'mail-mint'                            => 'Mail Mint',
            'mailbluster'                          => 'MailBluster',
            'mailchimp'                            => 'Mailchimp',
            'mailercloud'                          => 'Mailercloud',
            'mailerlite'                           => 'MailerLite',
            'mailjet'                              => 'Mailjet',
            'mailpoet'                             => 'MailPoet',
            'mailrelay'                            => 'Mailrelay',
            'mailup'                               => 'MailUp',
            'mautic'                               => 'Mautic',
            'memberpress'                          => 'MemberPress',
            'moosend'                              => 'Moosend',
            'omnisend'                             => 'Omnisend',
            'onedrive'                             => 'OneDrive',
            'paid-memberships-pro'                 => 'Paid Memberships Pro',
            'pcloud'                               => 'pCloud',
            'perfex-crm'                           => 'Perfex CRM',
            'pipedrive'                            => 'Pipedrive',
            'pods'                                 => 'PODS',
            'post-creation'                        => 'Post Creation',
            'rapidmail'                            => 'rapidmail',
            'registration'                         => 'Registration',
            'restrict-content'                     => 'Restrict Content',
            'salesforce'                           => 'Salesforce',
            'selzy'                                => 'Selzy',
            'sendfox'                              => 'SendFox',
            'sendgrid'                             => 'SendGrid',
            'sendy'                                => 'Sendy',
            'slack'                                => 'Slack',
            'slicewp'                              => 'SliceWP',
            'surecart'                             => 'SureCart',
            'telegram'                             => 'Telegram',
            'trello'                               => 'Trello',
            'tutor-lms'                            => 'Tutor LMS',
            'twilio'                               => 'Twilio',
            'vbout'                                => 'VBOUT',
            'web-hooks'                            => 'Web Hooks',
            'whatsapp'                             => 'WhatsApp',
            'wishlist'                             => 'WishList',
            'woocommerce'                          => 'WooCommerce',
            'wp-courseware'                        => 'WP Courseware',
            'zoho-bigin'                           => 'Zoho Bigin',
            'zoho-campaigns'                       => 'Zoho Campaigns',
            'zoho-crm'                             => 'Zoho CRM',
            'zoho-desk'                            => 'Zoho Desk',
            'zoho-flow'                            => 'Zoho Flow',
            'zoho-marketing-automation'            => 'Zoho Marketing Automation',
            'zoho-recruit'                         => 'Zoho Recruit',
            'zoom-meeting'                         => 'Zoom Meeting',
            'zoom-webinar'                         => 'Zoom Webinar'
        ];

        if ($customActions) {
            $data = array_merge($data, $customActions);
        }

        if ($slug) {
            return $data[$slug];
        }

        return $data;
    }
}
