/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import axios from 'axios'

export default async function bitsFetch(data, action, contentType = null, queryParam = null) {
  const response = await axios({
    url: typeof bitsmtp === 'undefined' ? bitFormsFront.ajaxURL : bitsmtp.ajaxURL,
    method: 'POST',
    headers: {
      'Content-Type': contentType === null ? 'application/x-www-form-urlencoded' : contentType,
    },
    params: {
      action,
      _ajax_nonce: typeof bitsmtp === 'undefined' ? '93367f5359' : bitsmtp.nonce,
      ...queryParam,
    },
    data,
    action,
  })
    .then(res => res.data)
    .catch(err => err.response)
  return response;
}
