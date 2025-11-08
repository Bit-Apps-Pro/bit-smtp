/* eslint-disable max-len */
import bitAssistLogo from '@resource/img/bitAssist.svg'
import bitFileManagerLogo from '@resource/img/bitFileManager.svg'
import bitFlowsLogo from '@resource/img/bitFlows.svg'
import bitFormLogo from '@resource/img/bitForm.svg'
import bitIntegrationsLogo from '@resource/img/bitIntegrations.svg'
import bitSocialLogo from '@resource/img/bitSocial.svg'

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
    title: 'Bit Form',
    description:
      'Create dynamic, responsive forms easily with Bit Form Builder. With Bit Form, you can build any type of form, ranging from simple to advanced, including contact forms, multi-step forms, conversational forms, order forms, calculator forms, and more. You can easily take payment by using PayPal, Stripe, Mollie, and other payment gateways. The best part is, you can send Bit Form data to the 51+ platform without any extra cost!',
    activeInstalls: '10,000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-form/'
  },
  {
    logo: bitFlowsLogo,
    title: 'Bit Flows',
    description:
      'Bit Flows is your all-in-one workflow automation tool designed to save time and simplify work. With just a few clicks, you can connect WordPress, SaaS apps, and even AI tools to automate tasks that normally take hours. From emails and forms to eCommerce and CRM updates, Bit Flows keeps everything running smoothly in the background. It’s fast, flexible, and built to help your business grow without limits.',
    activeInstalls: '1000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-pi/'
  },
  {
    logo: bitIntegrationsLogo,
    title: 'Bit Integrations',
    description:
      'Bit Integrations connects your WordPress site to 305+ other services, all without code. You can link forms, WooCommerce, CRMs, and many more platforms. It syncs your data between tools automatically, so you don’t have to copy and paste. It’s popular with site owners who want to save time and avoid human mistakes.',
    activeInstalls: '20,000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-integrations/'
  },
  {
    logo: bitSocialLogo,
    title: 'Bit Social',
    description:
      'Bit Social is a plugin that posts your WordPress content straight to social media. You can schedule or instantly share content to Facebook and LinkedIn for free. It also shares old posts, so your feed doesn’t go quiet. Bit Social is for bloggers, shop owners, and anyone who wants to keep social media working all the time.',
    activeInstalls: '4,000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-social/'
  },
  {
    logo: bitAssistLogo,
    title: 'Bit Assist',
    description:
      'Bit Assist puts all your chat, support, and social channels into a single button for your website. With this tool, you can reply through WhatsApp, Facebook, Telegram, and other apps, all from one place. Bit Assist is easy to set up, even if you’ve never made a support channel before. It is good for shop owners, bloggers, or anyone who wants to support customers easily.',
    activeInstalls: '10,000+',
    pluginUrl: 'https://wordpress.org/plugins/bit-assist/'
  },
  {
    logo: bitFileManagerLogo,
    title: 'Bit File Manager',
    description:
      "Bit File Manager is a powerful WordPress plugin for easy file management. It works directly from your dashboard, so you don't need FTP or cPanel. Upload, edit, delete, rename, and organize files with a simple drag-and-drop interface. The built-in code editor makes it easy to manage theme and plugin files. With features like user role permissions and media syncing, Bit File Manager is a secure and efficient solution for WordPress file management.",
    activeInstalls: '20,000+',
    pluginUrl: 'https://wordpress.org/plugins/file-manager/'
  }
]
