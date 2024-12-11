import bitAssistLogo from '@resource/img/bitAssist.svg'
import bitFileManagerLogo from '@resource/img/bitFileManager.svg'
import bitFormLogo from '@resource/img/bitForm.svg'
import bitIntegrationsLogo from '@resource/img/bitIntegrations.svg'
import { Button, Card } from 'antd'
import cls from './Others.module.css'

export default function Others() {
  return (
    <div className={cls.others}>
      {/* <div className={`${cls.bitSocialRelease} bit-social-release`}>
        <Card size="small" style={{ backgroundColor: '#EDE4FD' }}>
          <div className={cls.productBanner}>
            <a
              href="https://bit-social.com/?utm_source=bit-smtp&utm_medium=inside-plugin&utm_campaign=early-bird-offer"
              target="_blanlk"
            >
              <img src={exclusiveEarlyBirdOffer} alt="Bit Social early bird offer banner" />
            </a>
          </div>
          <div className={cls.productDesc}>
            <div className={cls.title}>
              <h2>Auto Post Scheduler & Poster for Blog to Social Media Share</h2>
            </div>
            <span>
              Bit Social is a versatile WordPress plugin enabling effortless post creation, scheduling,
              and sharing across multiple social platforms, enhancing your social media management with
              simplicity and efficiency.
            </span>
            <h3 style={{ marginTop: '20px', fontSize: '16px' }}>Key Features</h3>
            <span>
              <b>
                Create schedule, Share post on Facebook, Field Mapping & Custom value, Sleep time, Wp
                post filter, Create Platform group, Show Specific Log, WooCommerce product post.
              </b>
            </span>

            <h3 style={{ marginTop: '20px', fontSize: '16px' }}>Pricing</h3>
            <span style={{ fontSize: '25px', fontWeight: 'bold' }}>
              Bit Social Exclusive Early Bird Deal – Just $149!
            </span>

            <br />
            <span>
              This exclusive Early Bird offer is available from <b>November 1st to November 30st</b>{' '}
              (Yes, for one month only).{' '}
            </span>
            <br />

            <div className={cls.demoBtn}>
              <Button
                type="link"
                href="https://bit-social.com/?utm_source=bit-smtp&utm_medium=inside-plugin&utm_campaign=early-bird-offer"
                style={{ border: '1px solid', color: '#5700fa', marginTop: '20px' }}
                target="_blank"
              >
                {`Grab It Before It's Gone!`}
              </Button>
            </div>
          </div>
        </Card>
      </div> */}

      <div className={cls.othersPlugin}>
        <Card size="small">
          <div className={cls.productLogo}>
            <img src={bitFormLogo} alt="Bit Form logo" />
          </div>
          <div className={cls.productDetails}>
            <div className={cls.title}>
              <h3>
                Contact Form Builder Plugin: Multi Step Contact Form, Payment Form, Custom Contact Form
                Plugin by Bit Form
              </h3>
            </div>
            <span>
              Bit Form ensures optimal web and server performance with its highly optimized size, varying
              based on the fields and settings used. It maintains your website’s page speed, crucial for
              SEO, marketing, and conversions, making it one of the fastest WordPress contact form
              builder plugins.
            </span>
            <div className={cls.installed}>
              <span>Active Installs : 7000+</span>
            </div>
            <Button
              type="link"
              href="https://wordpress.org/plugins/bit-form/"
              style={{ border: '1px solid ' }}
            >
              Go to Plugin
            </Button>
          </div>
        </Card>

        <Card size="small">
          <div className={cls.productLogo}>
            <img src={bitIntegrationsLogo} alt="Bit Integrations logo" />
          </div>
          <div className={cls.productDetails}>
            <div className={cls.title}>
              <h3>
                Best no-code Automator & Integration tool to Automate 200+ Platforms - Bit Integrations
              </h3>
            </div>
            <span>
              Automate your WordPress workflow with Bit Integration: the all-in-one plugin for
              WooCommerce, form builders, CRM, LMS, bookings, spreadsheets, webhooks, social media, email
              marketing and automation platforms like Zapier and others. No technical knowledge needed.
              Automate tasks across 230+ platforms effortlessly.
            </span>
            <div className={cls.installed}>
              <span>Active Installs : 10,000+</span>
            </div>
            <Button
              type="link"
              href="https://wordpress.org/plugins/bit-integrations/"
              style={{ border: '1px solid ' }}
            >
              Go to Plugin
            </Button>
          </div>
        </Card>

        <Card size="small">
          <div className={cls.productLogo}>
            <img src={bitAssistLogo} alt="Bit Assist logo" />
          </div>
          <div className={cls.productDetails}>
            <div className={cls.title}>
              <h3>
                Chat Widget: Customer Support Button with floating Chat, SMS, Call Button, Live Chat
                Support Chat Button - Bit Assist
              </h3>
            </div>
            <span>
              Bit Assist – WordPress chat plugin offers a variety of chat channels to help you connect
              with your visitors including Whatsapp button, Facebook Messenger button, Telegram button,
              Line Messenger button, Call button, WeChat button, SMS button, TikTok button, Instagram
              Button, Google Map button, Viber button, Discord button, Tawk Button and more.{' '}
            </span>
            <div className={cls.installed}>
              <span>Active Installs : 7000+</span>
            </div>
            <Button
              type="link"
              href="https://wordpress.org/plugins/bit-assist/"
              style={{ border: '1px solid ' }}
            >
              Go to Plugin
            </Button>
          </div>
        </Card>

        <Card size="small">
          <div className={cls.productLogo}>
            <img src={bitFileManagerLogo} alt="Bit File Manager logo" />
          </div>
          <div className={cls.productDetails}>
            <div className={cls.title}>
              <h3>
                File Manager – 100% Free & Open Source File Manager Plugin for WordPress | Bit File
                Manager
              </h3>
            </div>
            <span>
              Best File manager and Code editor plugin for WordPress. You can edit, upload, delete, copy,
              move, rename, archive and extract files with the file manager plugin. You don’t need to
              worry about FTP anymore. It is really simple and easy to use.
            </span>
            <div className={cls.installed}>
              <span>Active Installs : 20,000+</span>
            </div>
            <Button
              type="link"
              href="https://wordpress.org/plugins/file-manager/"
              style={{ border: '1px solid ' }}
            >
              Go to Plugin
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
