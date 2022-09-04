import React, {useCallback} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';

const SaveButton = ({children}) => {

    const context = useAppContext();
    const {state, setState} = context;

    const handleEdit = useCallback((e) => {
        e.preventDefault();
        console.log('save item');

        setState({...state, mode: 'read', message: "Item(s) Saved Successfully", index: null})
    },[state, setState])

    if (state.mode === 'edit' && 'index' in state && state.index !== null) {
        return (
            <Button action={handleEdit}>{children}</Button>
        )
    }
}

export default SaveButton;