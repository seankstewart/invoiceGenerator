class NumbersFormat {

  /* format a number value to a USD format (i.e $10.00) */
  formatUSD = (value) => {
    if (isNaN(parseFloat(value))) {
        value = 0;
    }
    return `$${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  
  /*
  format a number value to a crypto format 
  (i.e parse decimal to 8 places)
  */
  formatCrypto = (value) => {
    if (isNaN(parseFloat(value))) {
        return
    }
    return parseFloat(value).toFixed(8);
  }
  

  countDecimals = (value) => {
    if (Math.floor(value) === value) {
      return 0
    };
    return value.toString().split(".")[1].length || 0; 
  }
}

export default NumbersFormat;