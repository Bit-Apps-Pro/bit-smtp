import { Button, Card } from 'antd'
import cls from './Others.module.css'

export default function Others() {


  return (
    <div className={cls.others}>
      <Card size="small">
        <div className={cls.productLogo}>
          <h2>Bit Form</h2>
        </div>
        <div className={cls.productDetails}>
          <div className={cls.title}>
            <h3>
              Contact Form Builder Plugin: Multi Step Contact Form, Payment Form, Custom Contact Form Plugin by Bit Form
            </h3>
          </div>
          <div className={cls.installed}>
            <span>Active Installs : 5000+</span>
          </div>
          <Button type='link' href='https://wordpress.org/plugins/bit-form/' style={{ border: "1px solid " }} >Go to Plugin</Button>
        </div>
      </Card >

      <Card size="small">
        <div className={cls.productLogo}>
          <h2>Bit Integrations</h2>
        </div>
        <div className={cls.productDetails}>
          <div className={cls.title}>
            <h3>
              Best no-code Automator & Integration tool to Automate 200+ Platforms - Bit Integration
            </h3>
          </div>
          <div className={cls.installed}>
            <span>Active Installs : 6,000+</span>
          </div>
          <Button type='link' href='https://wordpress.org/plugins/bit-integrations/' style={{ border: "1px solid " }} >Go to Plugin</Button>
        </div>
      </Card>

      <Card size="small">
        <div className={cls.productLogo}>
          <h2>Bit Assist</h2>
        </div>
        <div className={cls.productDetails}>
          <div className={cls.title}>
            <h3>
              Chat Widget: Customer Support Button with floating Chat, SMS, Call Button, Live Chat Support Chat Button - Bit Assist
            </h3>
          </div>
          <div className={cls.installed}>
            <span>Active Installs : 3000+</span>
          </div>
          <Button type='link' href='https://wordpress.org/plugins/bit-assist/' style={{ border: "1px solid " }} >Go to Plugin</Button>
        </div>
      </Card>

      <Card size="small">
        <div className={cls.productLogo}>
          <h2>Bit Social</h2>
        </div>
        <div className={cls.productDetails}>
          <div className={cls.title}>
            <h3>
              Auto Post Scheduler & Poster for Blog to Social Media Share - Bit Social (Beta)
            </h3>
          </div>
          <div className={cls.installed}>
            <span>Active Installs : 10+</span>
          </div>
          <Button type='link' href='https://wordpress.org/plugins/bit-social/' style={{ border: "1px solid " }} >Go to Plugin</Button>
        </div>
      </Card>

      <Card size="small">
        <div className={cls.productLogo}>
          <h2>Bit File Manager</h2>
        </div>
        <div className={cls.productDetails}>
          <div className={cls.title}>
            <h3>
              File Manager – 100% Free & Open Source File Manager Plugin for WordPress | Bit File Manager
            </h3>
          </div>
          <div className={cls.installed}>
            <span>Active Installs : 20,000+</span>
          </div>
          <Button type='link' href='https://wordpress.org/plugins/file-manager/' style={{ border: "1px solid " }} >Go to Plugin</Button>
        </div>
      </Card>

    </div >
  )
}
