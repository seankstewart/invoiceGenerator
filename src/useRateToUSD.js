import { useEffect, useState } from 'react';
import useFetch from './useFetch';

const useRateToUSD = (currencyType) => {
  const [rate, setRate] = useState(null);
  const dataRateToUSD = useFetch(`https://bitpay.com/api/rates/${currencyType}/USD`);

  useEffect(() => {
    if (dataRateToUSD.data !== null) {
      setRate(dataRateToUSD.data.rate);
    }
  }, [dataRateToUSD]);

  return {currencyType, dataRateToUSD, rate}
}

export default useRateToUSD;