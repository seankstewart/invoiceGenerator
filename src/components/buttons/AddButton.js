import React, {useCallback, useState} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';
import API from '../../api/api';

const AddButton = ({tableRef, children}) => {

    const context = useAppContext();
    const {state, setState} = context;

    const [ref, setRef] = useState(null);
    
    const handleAdd = useCallback((e) => {
        e.preventDefault();

        if (tableRef === null) {
            setRef(tableRef);
        } else {
            console.log('add item');

            // force scrollbar to bottom of tbody once it has reached it's max height
            let interval = null;
            const updateScroll = () => {
                tableRef.current.childNodes[1].scrollTop = tableRef.current.childNodes[1].scrollHeight;
                setTimeout(clearInterval(interval),1000);
            }

            if (tableRef.current.childNodes[1].clientHeight >= (tableRef.current.childNodes[1].offsetHeight - 20)) {
                interval = setInterval(updateScroll, 10)
            }
            
            state.model.splice(state.model.length, 1, new API().emptyModel);
            setState({...state, mode: 'edit', index: state.model.length - 1})
        }
        
    },[state, setState, tableRef])

    if (state.mode === 'read' || (state.mode !== 'edit')) {
        return (
            <div className={`button-add`}>
                <Button action={handleAdd}>{children}</Button>
            </div>
        )
    }
}

export default AddButton;