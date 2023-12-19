// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import bitsFetch from '../components/Childs/bitsFetch'
import LoaderSm from '../components/Childs/LoaderSm'
import { __ } from '../Utils/i18nwrap';

export default function MailSendTest({ setsnack }) {
    const [isTestLoading, setisTestLoading] = useState(false)
    const [mail, setMail] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault()
        setisTestLoading(true)
        bitsFetch(mail,
          'bit_send_test_email').then(res => {
            const {data, success} = res
            setisTestLoading(false)
            if (data !== undefined && success) {
              return toast.success('Email sent successfully.')

            } 
              return toast.error(data.data.error)
          })
      }

      const handleInput = (typ, val, isNumber) => {
        const setMailData = { ...mail }
        if (isNumber) {
          setMailData[typ] = Number(val)
        } else {
          setMailData[typ] = val
        }
        setMail(setMailData)
      }
    return (
      <div className="btcd-s-wrp">
        <form
      method="POST"
      id="mailtest_form"
      onSubmit={handleSubmit}
      onKeyDown={e => {
        e.key === 'Enter'
          && e.target.tagName !== 'TEXTAREA'
          && e.preventDefault()
      }}
    >
        <h2>
          {__('Email Test')}
          {' '}
        </h2>
        <b className="wdt-150 d-in-b">{__('To')} :</b>
        <input id="to" name="to" value={mail.to} onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-3 mr-4" placeholder="" type="email" required/>
        <br />
         <br />
        <b className="wdt-150 d-in-b">{__('Subject')} :</b>
        <input id="subject" name="subject" value={mail.subject} onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-3 mr-4" placeholder="" type="text" required/>
        <br />
        <br />
        <b className="wdt-150 d-in-b mt-2">{__('Message')} :</b>
        <textarea id="message" name="message" cols={5} rows={5}  onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-3 mr-4" placeholder="" required>{mail.message}</textarea>
        <br />
         <br />
        <button type="submit" className="btn f-left btcd-btn-lg blue sh-sm flx" disabled={isTestLoading}>
          {__('Send Test')}
          {isTestLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
        </button>
        </form>
      </div>
    )
}
