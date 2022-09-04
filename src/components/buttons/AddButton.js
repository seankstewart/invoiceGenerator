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
        

        function updateScroll(){
            console.log('scrollTo bottom of tableRef')
            console.log('state.tableRef.current.offsetHeight',state.tableRef.current.offsetHeight)
            console.log('state.tableRef.current.scrollHeight - state.tableRef.current.clientHeight', state.tableRef.current.scrollHeight, state.tableRef.current.clientHeight)
            state.tableRef.current.scrollTop = state.tableRef.current.scrollHeight;
            setTimeout(clearInterval(interval),1000);
        }

        // if ('tableRef' in state && state.tableRef !== null) {
            
            console.log('TABLEREF')
            console.log('scrollToHeight====',state.tableRef.current.clientHeight)
            //state.tableRef.current.addEventListener('scroll', () => {
                if (state.tableRef.current.clientHeight >= (state.tableRef.current.offsetHeight - 20)) {
                    // state.tableRef.current.scrollTo({
                    //     bottom: state.tableRef.current.clientHeight,
                    //     behavior: 'smooth',
                    // });
                    // state.tableRef.current.scrollTop = state.tableRef.current.scrollHeight - state.tableRef.current.clientHeight;
                    // state.tableRef.current.scrollTop = state.tableRef.current.scrollHeight
                    interval = setInterval(updateScroll, 10)
                } else {
                    console.log('DO NOT scrollTo bottom of tableRef')
                }
                
            // });
        // }
        
        state.model.splice(state.model.length, 1, new API().emptyModel);
        setState({...state, mode: 'edit', index: state.model.length - 1})
        
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