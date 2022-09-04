import React from 'react'
import { useAppContext } from '../App';

const Message = () => {

  const context = useAppContext();
  const { state } = context;

  if (state.message !== "") {
    return (
      <div className={'message'}>
        <span className={'hideMeAfter5Seconds'}>{state.message}</span>
      </div>
    )
  } else {
    return (
      null
    )
  }
}

export default Message;