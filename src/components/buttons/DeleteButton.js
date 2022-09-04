import React, {useCallback} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';

const DeleteButton = ({children}) => {

    const state = useAppContext().state;
    const setState = useAppContext().setState;

    const handleDelete = useCallback((e) => {
        e.preventDefault();
        
        console.log(`delete item at index ${state.index}`);

        state.model.splice(state.index, 1);

        setState({...state, mode: 'read', message: "Item Deleted Successfully", index: null})
        
    },[state, setState])

    if (state.mode === 'edit' && 'index' in state && state.index !== null) {
        return (
            <Button action={handleDelete}>{children}</Button>
        )
    }
}

export default DeleteButton;