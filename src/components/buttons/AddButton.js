import React, {useCallback} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';
import API from '../../api/api';

const AddButton = ({children}) => {

    const state = useAppContext().state;
    const setState = useAppContext().setState;

    const handleAdd = useCallback((e) => {
        e.preventDefault();

        console.log('add item');
        
        state.model.splice(state.model.length, 1, new API().emptyModel);
        setState({...state, mode: 'edit', index: state.model.length - 1})
        
    },[state, setState])

    if (state.mode === 'read') {
        return (
            <div className={`button-add`}>
                <Button action={handleAdd}>{children}</Button>
            </div>
        )
    }
}

export default AddButton;