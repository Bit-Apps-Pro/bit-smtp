/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
export default function SingleToggle2(props) {
  return (
    <div className={`${props.className}`}>
      <span>{props.title}</span>
      <label className="btcd-label">
        <div className="btcd-toggle">
          <input onChange={props.action} className="btcd-toggle-state" type="checkbox" name="check" value="check" checked={props.checked} />
          <div className="btcd-toggle-inner">
            <div className="btcd-indicator" />
          </div>
          <div className="btcd-active-bg" />
        </div>
        <div className="btcd-label-text" />
      </label>
    </div>
  )
}
