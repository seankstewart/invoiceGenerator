import React, {useCallback, useContext} from 'react';
import Button from './Button';
import { AppContext } from '../../App';
import API from '../../api/api';

const EditButton = ({children}) => {

    const context = useContext(AppContext);

    const handleEdit = useCallback((e) => {
        e.preventDefault();
        // clearInterval(interval);
        console.log('edit item');

        
        if (context.state.mode === 'edit') {
  
            let rateToUSD = async () => await new API().getRatesToUSD(context.state.model[context.state.index].currentcy).then((res) => {
                context.state.model[context.state.index].priceCypto = res;
                context.state.model[context.state.index].amountUSD = res * parseFloat(context.state.model[context.state.index].amountCypto)
                context.setState({...context.state, mode: 'read'})
            });
          
            rateToUSD();
          
        }

        context.setState({...context.state, mode: 'read'})
        
    },[context])

    if (context.state.mode === 'edit') {
        return (
            <Button action={handleEdit}>{children}</Button>
        )
    }
}

export default EditButton;