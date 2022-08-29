import React, {useCallback, useContext} from 'react';
import Button from './Button';
import { AppContext } from '../../App';
import './AddButton.scss';

const AddButton = ({children}) => {

    const context = useContext(AppContext);

    const handleAdd = useCallback((e) => {
        e.preventDefault();
        // clearInterval(interval);
        console.log('add item');
        console.log(context);
        context.state.model.splice(context.state.model.length, 1, {...context.state});
        context.setState({...context.state, mode: 'edit', index: context.state.model.length - 1})
        // renderForm({});
        // setUpdated(u => !u);
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