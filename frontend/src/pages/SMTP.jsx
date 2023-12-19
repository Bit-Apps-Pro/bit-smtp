/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect,useState } from 'react';
import toast from 'react-hot-toast';
import bitsFetch from '../components/Childs/bitsFetch'
import ConfigForm from '../components/Smtp/ConfigForm'
import { __ } from '../Utils/i18nwrap';

export default function SMTP({ setsnack }) {
  const [mail, setMail] = useState({})
  const [status, setsmtpStatus] = useState('')
  useEffect(() => {
   const fetchConfig = bitsFetch({ }, 'bit_get_mail_config').then((res) => {
      if (res !== undefined && res.success) {
        if (!res.data.errors) {
          setMail(res.data)
          setsmtpStatus(Number(res.data.status))
          return 'SMTP config fetch successfully !'
        }
        return 'Error Occured'
      }
    })
   
    toast.promise(fetchConfig, {
      success: data => data,
      failed: data => data,
      loading: 'Loading...',
    })
  }, [])

  return (
    <div className="btcd-s-wrp">
        <h2>{__('Mail Configuration')}</h2>
      <br />
      <div className="pos-rel">
        <ConfigForm mail={mail} setMail={setMail}  status={status} setsmtpStatus={setsmtpStatus}  setsnack={setsnack} />
        <br />
        <br />
      </div>
    </div>
  )
}
