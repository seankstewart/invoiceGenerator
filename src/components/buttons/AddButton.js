import React, {useCallback, useContext} from 'react';
import Button from './Button';
import { AppContext } from '../../App';
import './AddButton.scss';
import API from '../../api/api';

const AddButton = ({children}) => {

    const context = useContext(AppContext);

    const handleAdd = useCallback((e) => {
        e.preventDefault();

        console.log('add item');
        
        context.state.model.splice(context.state.model.length, 1, new API().emptyModel);
        context.setState({...context.state, mode: 'edit', index: context.state.model.length - 1})
        
    },[context])

    if (context.state.mode === 'read') {
        return (
            <div className={`button-add`}>
                <Button action={handleAdd}>{children}</Button>
            </div>
        )
    }
}

export default AddButton;