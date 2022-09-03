class API {
  constructor(state) {
      this.state = state;
  }

  emptyModel = {
      merchant: '',
      item: '',
      amountCypto: '',
      currentcy: '',
      priceCypto: NaN,
      amountUSD: NaN
  }

  defaultData = [
    {
      merchant: 'ShirtTown',
      item: 'T-shirts',
      amountCypto: 1.43219876,
      currentcy: 'BTC',
      priceCypto: 9285.93,
      amountUSD: 13299.30
    },
    {
      merchant: 'CrazyCups',
      item: 'Cups',
      amountCypto: 2.76236751,
      currentcy: 'BCH',
      priceCypto: 6483.69,
      amountUSD: 17910.33
    },
    {
      merchant: 'GimmeGold',
      item: 'Gold bullion',
      amountCypto: 10.78654328,
      currentcy: 'ETH',
      priceCypto: 442.08,
      amountUSD: 4768.52
    }
  ]
      
  getRatesToUSD = async (currencyType) => {

    if (currencyType === "") {
      return
    }

    let rate = 0;
    await fetch(`https://bitpay.com/api/rates/${currencyType}/USD`)
      .then(response => response.json())
      .then(json => {
          console.log(json);
          rate = json.rate;
      })
      .catch(e => {
          console.log(e);
          alert("Error fetching the rate to USD for the choosen currency.")
      });
  
    return rate;
  }
}

export default API;