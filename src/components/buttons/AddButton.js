import React, {useCallback, useEffect, useState} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';
import API from '../../api/api';

const AddButton = ({tableRef, children}) => {

    const context = useAppContext();
    const {state, setState} = context;

    const [ref, setRef] = useState(null);
    useEffect(() => {
        console.log('AddButton props', tableRef);
        // setRef(tableRef);
    });

    const handleAdd = useCallback((e) => {
        e.preventDefault();

        if (tableRef === null) {
            setRef(tableRef);
        } else {
            console.log('add item');
            debugger;

            let interval = null;
            
            const updateScroll = () => {
                tableRef.current.childNodes[1].scrollTop = tableRef.current.childNodes[1].scrollHeight;
                setTimeout(clearInterval(interval),1000);
            }

            // force scrollbar to bottom of tbody once it has reached it's max height
            // if (tableRef !== undefined || tableRef !== null) {

                console.log('AddButton ONClick', tableRef);


                if (tableRef.current.childNodes[1].clientHeight >= (tableRef.current.childNodes[1].offsetHeight - 20)) {
                    interval = setInterval(updateScroll, 10)
                }
            // }
            
            state.model.splice(state.model.length, 1, new API().emptyModel);
            setState({...state, mode: 'edit', index: state.model.length - 1, message: ""})
        }
        
    },[state, setState])

    if (state.mode === 'read' || (state.mode !== 'edit')) {
        return (
            <div className={`button-add`}>
                <Button action={handleAdd}>{children}</Button>
            </div>
        )
    }
}

export default AddButton;