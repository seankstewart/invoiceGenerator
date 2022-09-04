import useFetch from './useFetch';
import { useAppContext } from './App';

const useRateToUSD = (currencyType) => {

  const context = useAppContext();
  const { state } = context;

  let url = "";
  
  if (state.model[state.index].amountCypto !== "" && state.model[state.index].currentcy !== "") {
    url = `https://bitpay.com/api/rates/${currencyType}/USD`;
  }

  const dataRateToUSD = useFetch(url)
  return {currencyType, dataRateToUSD}
}

export default useRateToUSD;