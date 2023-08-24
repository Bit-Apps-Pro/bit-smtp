import React, { useEffect } from 'react'
function SnackMsg({ snack, setSnackbar }) {
  const { show, msg } = snack

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setSnackbar({ show: false, msg })
      }, 2000)
    }
  }, [show])

  return (
    <>
      {show &&
        <div className="snack-msg">
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: msg }}
          />
          <button onClick={() => setSnackbar({ show: false, msg })} className="btcd-snack-cls" type="button">&times;</button>
        </div>
      }
    </>
  )
}

export default SnackMsg
