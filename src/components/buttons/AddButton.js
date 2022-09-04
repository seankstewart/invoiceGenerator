import React, {useCallback, useEffect} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';
import API from '../../api/api';

const AddButton = ({children}) => {

    const context = useAppContext();
    const {state, setState} = context;

    console.log('tableRef in state', state)

    useEffect(() => {
        if ('tableRef' in state) {
            console.log('state.tableRef::::::::::::::::::::::::', state.tableRef);
        }
    }, []);

    const handleAdd = useCallback((e) => {
        e.preventDefault();
        
        console.log('add item');

        let interval = null;
        

        const updateScroll = () => {
            state.tableRef.current.scrollTop = state.tableRef.current.scrollHeight;
            setTimeout(clearInterval(interval),1000);
        }

        // force scrollbar to bottom of tbody once it has reached it's max height
        if (state.tableRef.current.clientHeight >= (state.tableRef.current.offsetHeight - 20)) {
            interval = setInterval(updateScroll, 10)
        }
        
        state.model.splice(state.model.length, 1, new API().emptyModel);
        setState({...state, mode: 'edit', index: state.model.length - 1, message: ""})
        
    },[state, setState])

    if (state.mode === 'read' || (state.mode !== 'edit' && state.message === "")) {
        return (
            <div className={`button-add`}>
                <Button action={handleAdd}>{children}</Button>
            </div>
        )
    }
}

export default AddButton;