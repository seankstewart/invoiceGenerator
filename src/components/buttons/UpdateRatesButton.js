import React, {useCallback} from 'react';
import Button from './Button';
import { useAppContext } from '../../App';
import API from '../../api/api';

const UpdateRatesButton = ({children}) => {

    const context = useAppContext();
    const {state, setState} = context;

    const updateData = useCallback( async (data) => {

      /* updateData was called by handleClick */
      return await Promise.all(data.map(async (d) => {
          const code = d.currentcy;
          const ratesUSD = await new API(state, setState).getRatesToUSD(code);
          d.priceCypto = ratesUSD;
          d.amountUSD = d.priceCypto * d.amountCypto;
          setState({...state, mode: 'read', message: "Rates Updated Successfully"});
          return d;
      }));
    },[state, setState])

    const handleClick = useCallback((e) => {
        e.preventDefault();
        console.log('update rates');

        window.setTimeout(() => updateData(state.model).then((res) => {
          setState({mode: 'read', model: res, isPending: false, message: ""})
        }), 3000);

        setState({...state, mode: 'edit', message: "Fetching Rates..."})
    },[state, setState, updateData])

    if (state.mode === 'read' || (state.mode === 'edit' && state.message === "")) {
        return (
            <Button action={handleClick}>{children}</Button>
        )
    }
}

export default UpdateRatesButton;