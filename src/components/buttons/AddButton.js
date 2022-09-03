import React, {useCallback} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';
import API from '../../api/api';

const AddButton = ({children}) => {

    const context = useAppContext();
    const {state, setState} = context;

    const handleAdd = useCallback((e) => {
        e.preventDefault();
        
        console.log('add item');
        
        state.model.splice(state.model.length, 1, new API().emptyModel);
        setState({...state, mode: 'edit', index: state.model.length - 1})
        
    },[state, setState])

    if (state.mode === 'read' || (state.mode === 'edit' && state.message === "")) {
        return (
            <div className={`button-add`}>
                <Button action={handleAdd}>{children}</Button>
            </div>
        )
    }
}

export default AddButton;