/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import axios from 'axios'

export default async function bitsFetch(data, action, contentType = null, queryParam = null) {
  const response = await axios({
    url: typeof bit_wc_smtp === 'undefined' ? bitFormsFront.ajaxURL : bit_wc_smtp.ajaxURL,
    method: 'POST',
    headers: {
      'Content-Type': contentType === null ? 'application/x-www-form-urlencoded' : contentType,
    },
    params: {
      action,
      _ajax_nonce: typeof bit_wc_smtp === 'undefined' ? '93367f5359' : bit_wc_smtp.nonce,
      ...queryParam,
    },
    data,
    action,
  })
    .then(res => res.data)
    .catch(err => err.response)
  return response;
}
