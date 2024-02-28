import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import request from '@common/helpers/request'
import Button from '@components/Button/Index'
import Toaster from '@components/Toaster/Toaster'
import { Radio } from 'antd'
import cls from './SMTP.module.css'
import Input from 'antd/es/input/Input'

export default function SMTP() {
  interface values {
    [key: string]: any
    status: string
    form_email_address: string
    form_name: string
    re_email_address?: string
    smtp_host: string
    encryption: string
    port: string
    smtp_auth: string
    smtp_user_name: string
    smtp_password: string
  }

  const [values, setValues] = useState<values>({
    status: '1',
    form_email_address: '',
    form_name: '',
    re_email_address: '',
    smtp_host: '',
    encryption: 'ssl',
    port: '465',
    smtp_auth: '0',
    smtp_user_name: '',
    smtp_password: ''
  })
  const [isLoading, setIsLoading] = useState(false)


  const handleChange = (e: any) => {
    const { name, value } = e.target
    const tmpValues = { ...values }
    tmpValues[name] = value
    setValues(tmpValues)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = new FormData()
    for (let key in values) {
      data.append(key, values[key])
    }

    request('save_mail_config', data)
      .then(res => {
        console.log(res)
        if (res?.status !== 'error') {
          toast.success(res.data)
        } else {
          Object.entries(res.data).forEach((item: any) => {
            item[1].forEach((rule: string) => {
              toast.error(rule)
            })
          })
        }
      })
      .catch(() => {
        toast.error('SMTP config saving failed')
      })
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchConfig = request('get_mail_config', null, null, 'GET')
      .then(res => {
        setIsLoading(false)
        if (res?.status === 'success') {
          setValues(res?.data?.mailConfig)
          return 'SMTP config fetched successfully!'
        }
        return 'Error Occured'
      })

    toast.promise(fetchConfig, {
      success: data => data,
      failed: (data: string) => data,
      loading: 'Loading...',
    })
  }, [])


  return (
    <div className={cls.smtp}>
      <h2>Configuration Your Mail:</h2>
      <form className={cls.form} onSubmit={handleSubmit}>
        <div className={cls.inputSection}>
          <label className={cls.label}>Enable Mail:</label>
          <div className={cls.inputField}>
            <Radio.Group onChange={handleChange} value={values.status} name="status">
              <>
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </>
            </Radio.Group>
          </div>
        </div>
        {(!isLoading && values?.status == '1') &&
          <>
            <div className={cls.inputSection}>
              <label className={cls.label}>From Email Address:</label>
              <div className={cls.inputField}>

                <Input
                  name="form_email_address"
                  value={values.form_email_address}
                  placeholder="From Email Address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={cls.inputSection}>
              <label className={cls.label}>From Name:</label>

              <div className={cls.inputField}>

                <Input
                  name="form_name"
                  value={values.form_name}
                  placeholder="From Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={cls.inputSection}>
              <label className={cls.label}>Reply-To Email Address:</label>
              <div className={cls.inputField}>

                <Input
                  name="re_email_address"
                  value={values.re_email_address}
                  placeholder="Reply-To Email Address"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={cls.inputSection}>
              <label className={cls.label}>SMTP Host:</label>
              <div className={cls.inputField}>

                <Input
                  name="smtp_host"
                  value={values.smtp_host}
                  placeholder="SMTP Host"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={cls.inputSection}>
              <label className={cls.label}>Type of Encryption:</label>
              <div className={cls.inputField}>

                <Radio.Group onChange={handleChange} value={values.encryption} name="encryption">
                  <>
                    <Radio value="tls">TLS</Radio>
                    <Radio value="ssl">SSL</Radio>
                  </>
                </Radio.Group>
              </div>
            </div>
            <div className={cls.inputSection}>
              <label className={cls.label}>SMTP Port:</label>
              <div className={cls.inputField}>

                <Radio.Group onChange={handleChange} value={values.port} name="port">
                  <>
                    <Radio value="587">587</Radio>
                    <Radio value="465">465</Radio>
                  </>
                </Radio.Group>
              </div>
            </div>
            <div className={cls.inputSection}>

              <label className={cls.label}>SMTP Authentication:</label>
              <div className={cls.inputField}>

                <Radio.Group onChange={handleChange} value={values.smtp_auth} name="smtp_auth">
                  <>
                    <Radio value="1">Yes</Radio>
                    <Radio value="0">No</Radio>
                  </>
                </Radio.Group>
              </div>
            </div>
            <div className={cls.inputSection}>
              <label className={cls.label}>SMTP Username:</label>
              <div className={cls.inputField}>

                <Input
                  name="smtp_user_name"
                  value={values.smtp_user_name}
                  placeholder="SMTP Username"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={cls.inputSection}>
              <label className={cls.label}>SMTP Password:</label>
              <div className={cls.inputField}>

                <Input
                  type='password'
                  name="smtp_password"
                  value={values.smtp_password}
                  placeholder="SMTP Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button type="submit">Save Changes</Button>
          </>
        }
        <Toaster />
      </form>
    </div>
  )
}
