import useFetch from './useFetch';

const useRateToUSD = (currencyType) => {
  const dataRateToUSD = useFetch(`https://bitpay.com/api/rates/${currencyType}/USD`)
  return {currencyType, dataRateToUSD}
}

export default useRateToUSD;