import React, {useCallback, useContext} from 'react';
import Button from './Button';
import { AppContext } from '../../App';

const DeleteButton = ({children}) => {

    const context = useContext(AppContext);

    const handleDelete = useCallback((e) => {
        e.preventDefault();
        // clearInterval(interval);
        console.log(`delete item at index ${context.state.index}`);

        context.state.model.splice(context.state.index, 1);

        context.setState({...context.state, mode: 'read'})
        // renderForm({});
        // setUpdated(u => !u);
    },[context])

    if (context.state.mode === 'edit') {
        return (
            <Button action={handleDelete}>{children}</Button>
        )
    }
}

export default DeleteButton;