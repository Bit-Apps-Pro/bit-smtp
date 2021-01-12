// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import bitsFetch from '../components/Childs/bitsFetch'
import LoaderSm from '../components/Childs/LoaderSm'

export default function MailSendTest({ setsnack }) {
     const [isTestLoading, setisTestLoading] = useState(false)
    const [toEmail, setToEmail] = useState('')
    const [toSubject, setToSubject] = useState('')
    const [toMessage, setToMessage] = useState('')
    const testEmailHandle = (e) => {
        e.preventDefault()
        setisTestLoading(true)
        bitsFetch({ to: toEmail, subject: toSubject, message: toMessage },
          'bit_send_test_email').then((res) => {
            if (res !== undefined && res.success) {
              setisTestLoading(false)
              if(res.data){
                setsnack({ show: true, msg: 'mail send successfully' })
              }else{
                setsnack({ show: true, msg: 'wrong smtp configuration,please try again' })
              }
            } else {
              setisTestLoading(false)
              setsnack({ show: true, msg: 'mail test fail,please try again' })
            }
          })
      }

      const emailHandle = (e) => {
        setToEmail(e.target.value)
      }
      const subjectHandle = (e) => {
        setToSubject(e.target.value)
      }
      const messageHandle = (e) => {
        setToMessage(e.target.value)
      }
    return (
      <div className="btcd-s-wrp">
        <h2>
          Email Test
          {' '}
        </h2>
        <b className="wdt-150 d-in-b">To :</b>
        <input id="to" name="to" value={toEmail} onChange={(e) => emailHandle(e)} className="btcd-paper-inp w-3 mr-4" placeholder="" type="text"/>
        <br />
         <br />
        <b className="wdt-150 d-in-b">Subject :</b>
        <input id="subject" name="subject" value={toSubject} onChange={(e) => subjectHandle(e)} className="btcd-paper-inp w-3 mr-4" placeholder="" type="text" />
        <br />
        <br />
        <b className="wdt-150 d-in-b mt-2">Message :</b>
        <textarea id="message" cols={5} rows={5} name="message" onChange={(e) => messageHandle(e)} className="btcd-paper-inp w-3 mr-4" placeholder="">{toMessage}</textarea>
        <br />
         <br />
        <button onClick={(e) => testEmailHandle(e)} type="submit" className="btn f-left btcd-btn-lg blue sh-sm flx" disabled={isTestLoading}>
          Send Test
          {isTestLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
        </button>
      </div>
    )
}
