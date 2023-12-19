// eslint-disable-next-line import/no-extraneous-dependencies
import React, {  useState ,useRef,useEffect} from 'react';
 import bitsFetch from '../Childs/bitsFetch'
 import LoaderSm from '../Childs/LoaderSm'
import CheckBox from '../ElmSettings/Childs/CheckBox'
import aws from '../../resources/img/aws.png'
import sendinblue from '../../resources/img/sendinblue.png'
import gmail from '../../resources/img/google.png'
import smtp from '../../resources/img/smtp.png'
import sendgrid from '../../resources/img/sendgrid.png'
import zoho from '../../resources/img/zoho.png'
import mailgun from '../../resources/img/mailgun.png'
import defaultMail from '../../resources/img/default.png'
import other from '../../resources/img/other.png'
import outlook from '../../resources/img/outlook.png'
import toast from 'react-hot-toast'
import { __ } from '../../Utils/i18nwrap';


export default function ConfigForm({ mail, setMail, setsnack, status, setsmtpStatus }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthentic, setIsAuthentic] = useState(true)
  const [isShowing, setIsShowing] = useState(true)

   useEffect(() => {
   setIsShowing(Number(status)===1?true:false)
   setIsAuthentic(Number(mail.smtp_auth)===1?true:false)
  }, [status,mail.smtp_auth])

  const formRef = useRef(null)
  const handleSubmit = (e) => {
    const formmail = new FormData(formRef.current)
    e.preventDefault()
    setIsLoading(true)
   const configSaveProm = bitsFetch(formmail,
      'bit_save_email_config').then((res) => {
        if (res !== undefined && res.success) {
          setIsLoading(false)
          return 'SMTP config saved successfully'
        }
        return 'Error Occured'
      })
     toast.promise(configSaveProm, {
        success: data => data,
        failed: data => data,
        loading: 'Saving...',
      })
  }
  const handleInput = (typ, val, isNumber) => {
    const tmpMail = { ...mail }
    if (isNumber) {
      tmpMail[typ] = Number(val)
    } else {
      tmpMail[typ] = val
    }
    if(typ==='smtp_auth' && val==='1'){
      setIsAuthentic(true)
    }else if(typ==='smtp_auth' && val==='0'){
      setIsAuthentic(false)
    }
    setMail(tmpMail)
    console.log(tmpMail)
  }

  const handleStatus = (e) => {
    setsmtpStatus(Number(e.target.value))
    if (e.target.value == 1) {
      setIsShowing(true)
    } else {
      setIsShowing(false)
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      method="POST"
      onSubmit={handleSubmit}
      ref={formRef}
      onKeyDown={e => {
        e.key === 'Enter'
          && e.target.tagName !== 'TEXTAREA'
          && e.preventDefault()
      }}
    >
          <b className="wdt-250 d-in-b">{__('Enable MAIL')} :</b> 
          <CheckBox className="btcd-label-cbx" radio name="status" onChange={e => handleStatus(e)} checked={status === 1} title={<small className="txt-dp">Yes</small>} value="1" />
          <CheckBox className="btcd-label-cbx ml-2" radio name="status" onChange={e => handleStatus(e)} checked={status === 0} title={<small className="txt-dp">No</small>} value="0" />
          <br />
         <br />
      
        {isShowing && (
             <div className="mt-2">
                  <b className="wdt-250 d-in-b">{__('From Email Address')} :</b> 
                <input id="form_email_address" onChange={(e) => handleInput(e.target.name, e.target.value)} name="form_email_address" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" value={mail.form_email_address} placeholder="From Email Address" type="text" required />
            
                <br />
              <br />
              <b className="wdt-250 d-in-b" >{__('From Name')}</b>
                <input id="form_name" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.form_name} name="form_name" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" placeholder="From Name" type="text" required />
                <br />
              <br />
          
              <b className="wdt-250 d-in-b" >{__('Reply-To Email Address')}</b>
                <input id="re_email_address" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.re_email_address} name="re_email_address" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" placeholder="Reply-To Email Address" type="text"/>
                <br />
              <br />

            <b className="wdt-250 d-in-b">{__('Mailer')} :</b> 
                      <div className="d-in-b">
                      <div className="mailer">
                          <div>
                          <img className={`mailer-img ${mail.mailer === 'default' ? 'mailer-img-selected' : ''}`} src={defaultMail} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox className="btcd-label-cbx ml-2" onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'default'}  radio name="mailer" title={<small className="txt-dp">Default</small>} value="default" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img className={`mailer-img ${mail.mailer === 'smtp' ? 'mailer-img-selected' : ''}`} src={smtp} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox   className="btcd-label-cbx ml-2" onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'smtp'}  radio name="mailer" title={<small className="txt-dp">SMTP</small>} value="smtp" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img className={`mailer-img ${mail.mailer === 'other' ? 'mailer-img-selected' : ''}`} src={other} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'other'}  radio name="mailer" title={<small className="txt-dp">Other SMTP</small>} value="other" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img className={`mailer-img ${mail.mailer === 'aws' ? 'mailer-img-selected' : ''}`} src={aws} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'aws'}   radio name="mailer" title={<small className="txt-dp">Amazon SES</small>} value="aws" />
                          </div>
                        </div>
                      <div className="mailer">
                          <div>
                          <img className={`mailer-img ${mail.mailer === 'mailgun' ? 'mailer-img-selected' : ''}`} src={mailgun} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox   className="btcd-label-cbx ml-2" onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'mailgun'}  radio name="mailer" title={<small className="txt-dp">Mailgun</small>} value="mailgun" />
                          </div>
                        </div>
                      </div>
                      <br />
                      <b className="wdt-250 d-in-b"></b> 
                      <div className="d-in-b">
                      <div>
                        <div className="mailer">
                          <div>
                          <img  className={`mailer-img ${mail.mailer === 'gmail' ? 'mailer-img-selected' : ''}`} src={gmail} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" checked={mail.mailer === 'gmail'}  onChange={(e)=>handleInput(e.target.name, e.target.value)}  radio name="mailer" title={<small className="txt-dp">Gmail</small>} value="gmail" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img  className={`mailer-img ${mail.mailer === 'zoho' ? 'mailer-img-selected' : ''}`} src={zoho} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" checked={mail.mailer === 'zoho'}  onChange={(e)=>handleInput(e.target.name, e.target.value)}  radio name="mailer" title={<small className="txt-dp">zoho</small>} value="zoho" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img  className={`mailer-img ${mail.mailer === 'outlook' ? 'mailer-img-selected' : ''}`} src={outlook} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" checked={mail.mailer === 'outlook'}  onChange={(e)=>handleInput(e.target.name, e.target.value)}  radio name="mailer" title={<small className="txt-dp">Outlook</small>} value="outlook" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img  className={`mailer-img ${mail.mailer === 'sendgrid' ? 'mailer-img-selected' : ''}`} src={sendgrid} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" checked={mail.mailer === 'sendgrid'}  onChange={(e)=>handleInput(e.target.name, e.target.value)}  radio name="mailer" title={<small className="txt-dp">Sendgrid</small>} value="sendgrid" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img  className={`mailer-img ${mail.mailer === 'sendinblue' ? 'mailer-img-selected' : ''}`} src={sendinblue} alt="BitApps" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" checked={mail.mailer === 'sendinblue'}  onChange={(e)=>handleInput(e.target.name, e.target.value)}  radio name="mailer" title={<small className="txt-dp">Sendinblue</small>} value="sendinblue" />
                          </div>
                        </div>
                      </div>
                      </div>
                      <br />
                      <br />

                {/* <b className="wdt-250 d-in-b" >Mail Option</b> */}
                {/* <CheckBox className="btcd-label-cbx" radio name="option" id="option" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.option === 'smtp'} title={<small className="txt-dp">SMTP</small>} value="smtp" /> */}
                {/* <CheckBox className="btcd-label-cbx ml-2" radio name="option" id="option" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.option === 'api'} title={<small className="txt-dp">Api</small>} value="api" /> */}
                <br />
              <br />
      
                <div>
                <b className="wdt-250 d-in-b" >SMTP Host</b>
                  <input id="smtp_host" value={mail.smtp_host} onChange={(e) => handleInput(e.target.name, e.target.value)} name="smtp_host" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" placeholder="SMTP Host" type="text" required />
                  <br />
                <br />
                <b className="wdt-250 d-in-b" >Type of Encryption</b>
                  <CheckBox className="btcd-label-cbx" radio name="encryption" id="encryption" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.encryption === 'tls'} title={<small className="txt-dp">TLS</small>} value="tls" />
                  <CheckBox className="btcd-label-cbx ml-2" radio name="encryption" id="encryption" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.encryption === 'ssl'} title={<small className="txt-dp">SSL</small>} value="ssl" />
                  <br />
                <br />
                <b className="wdt-250 d-in-b" >SMTP Port</b>
                  <CheckBox className="btcd-label-cbx" radio name="port" onChange={(e) => handleInput(e.target.name, e.target.value)} checked={mail.port === '587'} title={<small className="txt-dp">587</small>} value="587" />
                  <CheckBox className="btcd-label-cbx ml-2" radio name="port" onChange={(e) => handleInput(e.target.name, e.target.value)} checked={mail.port === '465'} title={<small className="txt-dp">465</small>} value="465" />
                  <br />
                <br />
              
                <b className="wdt-250 d-in-b" >SMTP Authentication</b>
                  <CheckBox radio name="smtp_auth" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.smtp_auth === '1'} title={<small className="txt-dp">Yes</small>} value="1" />
                  <CheckBox className="btcd-label-cbx ml-2" radio name="smtp_auth" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.smtp_auth === '0'} title={<small className="txt-dp">No</small>} value="0" />
                  <br />
                <br />
                {isAuthentic && (
                <div>
                  <b className="wdt-250 d-in-b" > SMTP Username</b>
                   <input id="smtp_user_name" value={mail.smtp_user_name} onChange={(e) => handleInput(e.target.name, e.target.value)} name="smtp_user_name" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" placeholder=" SMTP Username" type="text" required />
                   <br />
                  <br />
                 <b className="wdt-250 d-in-b" > SMTP Password</b>
                   <input id="smtp_password" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.smtp_password} name="smtp_password" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" placeholder="SMTP Password" type="password" required />
                   <br />
                 <br />
                </div>
                )}
                </div>
     
              
             </div>
            )}
      <button type="submit" className="btn f-left btcd-btn-lg blue sh-sm flx" disabled={isLoading}>
        {__('Save Changes')}
        {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
      </button>
    </form>
  )
}
