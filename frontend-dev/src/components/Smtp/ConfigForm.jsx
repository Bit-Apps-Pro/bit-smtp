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
    bitsFetch(formmail,
      'bit_save_email_config').then((res) => {
        if (res !== undefined && res.success) {
          setIsLoading(false)
           setsnack({ show: true, msg: 'smtp config save successfully' })
        }else{
          console.log('success false')
        }
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
          <b className="wdt-250 d-in-b">Enable SMTP :</b> 
          <CheckBox className="btcd-label-cbx" radio name="status" onChange={e => handleStatus(e)} checked={status === 1} title={<small className="txt-dp">Yes</small>} value="1" />
          <CheckBox className="btcd-label-cbx ml-2" radio name="status" onChange={e => handleStatus(e)} checked={status === 0} title={<small className="txt-dp">No</small>} value="0" />
          <br />
         <br />
      
        {isShowing && (
             <div className="mt-2">

            <b className="wdt-250 d-in-b">Mailer :</b> 
                      <div className="d-in-b">
                      <div className="mailer">
                          <div>
                          <img className="mailer-img" src={sendinblue} alt="BitPress" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox   className="btcd-label-cbx ml-2" onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'sendinblue'}  radio name="mailer" title={<small className="txt-dp">Sendinblue</small>} value="sendinblue" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img className="mailer-img" src={gmail} alt="BitPress" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'gmail'}   radio name="mailer" title={<small className="txt-dp">Gmail</small>} value="gmail" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img className="mailer-img" src={aws} alt="BitPress" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox onChange={(e)=>handleInput(e.target.name, e.target.value)} checked={mail.mailer === 'aws'}   radio name="mailer" title={<small className="txt-dp">Amazon SES</small>} value="aws" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img className="mailer-img" src={sendgrid} alt="BitPress" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" checked={mail.mailer === 'sendgrid'}  onChange={(e)=>handleInput(e.target.name, e.target.value)}  radio name="mailer" title={<small className="txt-dp">SendGrid</small>} value="sendgrid" />
                          </div>
                        </div>
                        <div className="mailer">
                          <div>
                          <img  className="mailer-img" src={smtp} alt="BitPress" />
                          </div>
                          <div className="mailer-option">
                          <CheckBox  className="btcd-label-cbx ml-2" checked={mail.mailer === 'smtp'}  onChange={(e)=>handleInput(e.target.name, e.target.value)}  radio name="mailer" title={<small className="txt-dp">Other SMTP</small>} value="smtp" />
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />

                <b className="wdt-250 d-in-b">From Email Address :</b> 
                <input id="form_email_address" onChange={(e) => handleInput(e.target.name, e.target.value)} name="form_email_address" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" value={mail.form_email_address} placeholder="From Email Address" type="text" required />
            
                <br />
              <br />
              <b className="wdt-250 d-in-b" >From Name</b>
                <input id="form_name" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.form_name} name="form_name" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" placeholder="From Name" type="text" required />
                <br />
              <br />
          
              <b className="wdt-250 d-in-b" >Reply-To Email Address</b>
                <input id="re_email_address" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.re_email_address} name="re_email_address" className="btcd-paper-inp w-3 mr-4btcd-paper-inp w-3 mr-4" placeholder="Reply-To Email Address" type="text" required />
                <br />
              <br />
          
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
            )}
      <button type="submit" className="btn f-left btcd-btn-lg blue sh-sm flx" disabled={isLoading}>
        Save Changes
        {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
      </button>
    </form>
  )
}
