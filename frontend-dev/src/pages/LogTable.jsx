import React, { useEffect } from 'react'
import bitsFetch from './../components/Childs/bitsFetch'

export default function LogTable() {
  

    useEffect(() => {
    bitsFetch({ formID: 0 }, 'bit_email_log').then((res) => {
      if (res !== undefined && res.success) {
       console.log('ajax calling')
      }
    })
  }, [])

  return (
    <div className="btcd-s-wrp">
      {/* <SnackMsg snack={snack} setSnackbar={setSnackbar} /> */}
      {/* <table border="1" className="w-9 f-table">
        <thead className="thead">
          <tr className="tr">
            <th className="th">To</th>
            <th className="th">Timestamp</th>
            <th className="th">Subject</th>
          </tr>
        </thead>
        <tbody className="tbody">
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tbody>
      </table> */}
      <h1 style={{ textAlign:'center' }}>Coming soon</h1>
      
    </div>
  )
}