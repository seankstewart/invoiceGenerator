import React from 'react'
import { useAppContext } from '../../App'

const EditButton = ({index}) => {

  const state = useAppContext().state;
  const setState = useAppContext().setState;

  const handleCheckbox = (e, index) => {
    if (e.target.checked === true) {
      setState({...state, mode: 'edit', index: index})
    } else {
      setState({...state, mode: 'read'})
    }
  };

  return (
    <input
      type="checkbox"
      checked={(state.mode === 'read' || state.index !== index) ? false : true}
      onChange={(event) => handleCheckbox(event, index)}
    />
  )
}

export default EditButton;