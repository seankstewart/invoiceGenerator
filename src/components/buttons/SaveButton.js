import React, {useCallback} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';

const SaveButton = ({children}) => {

    const context = useAppContext();
    const {state, setState} = context;

    const handleEdit = useCallback((e) => {
        e.preventDefault();
        console.log('save item');

        setState({...state, mode: 'read', message: "Item(s) Saved Successfully"})
    },[state, setState])

    if (state.mode === 'edit') {
        return (
            <Button action={handleEdit}>{children}</Button>
        )
    }
}

export default SaveButton;