import bitAssistLogo from '@resource/img/bitAssist.svg'
import bitFileManagerLogo from '@resource/img/bitFileManager.svg'
import bitFormLogo from '@resource/img/bitForm.svg'
import bitIntegrationsLogo from '@resource/img/bitIntegrations.svg'

export interface PluginInfo {
  logo: string
  title: string
  description: string
  activeInstalls: string
  pluginUrl: string
}

export const pluginsData: PluginInfo[] = [
  {
    logo: bitFormLogo,
    title:
      'Contact Form Builder Plugin: Multi Step Contact Form, Payment Form, Custom Contact Form Plugin by Bit Form',
    description:
      "Bit Form ensures optimal web and server performance with its highly optimized size, varying based on the fields and settings used. It maintains your website's page speed, crucial for SEO, marketing, and conversions, making it one of the fastest WordPress contact form builder plugins.",
    activeInstalls: '7000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-form/'
  },
  {
    logo: bitIntegrationsLogo,
    title: 'Best no-code Automator & Integration tool to Automate 200+ Platforms - Bit Integrations',
    description:
      'Automate your WordPress workflow with Bit Integration: the all-in-one plugin for WooCommerce, form builders, CRM, LMS, bookings, spreadsheets, webhooks, social media, email marketing and automation platforms like Zapier and others. No technical knowledge needed. Automate tasks across 230+ platforms effortlessly.',
    activeInstalls: '10,000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-integrations/'
  },
  {
    logo: bitAssistLogo,
    title:
      'Chat Widget: Customer Support Button with floating Chat, SMS, Call Button, Live Chat Support Chat Button - Bit Assist',
    description:
      'Bit Assist – WordPress chat plugin offers a variety of chat channels to help you connect with your visitors including Whatsapp button, Facebook Messenger button, Telegram button, Line Messenger button, Call button, WeChat button, SMS button, TikTok button, Instagram Button, Google Map button, Viber button, Discord button, ' +
      'Tawk Button and more.',
    activeInstalls: '7000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-assist/'
  },
  {
    logo: bitFileManagerLogo,
    title: 'File Manager – 100% Free & Open Source File Manager Plugin for WordPress | Bit File Manager',
    description:
      "Best File manager and Code editor plugin for WordPress. You can edit, upload, delete, copy, move, rename, archive and extract files with the file manager plugin. You don't need to worry about FTP anymore. It is really simple and easy to use.",
    activeInstalls: '20,000+',
    pluginUrl: 'https://wordpress.org/plugins/file-manager/'
  }
]
