const convertPriceStringToNumber = (currentValue) => {
    const priceString = currentValue?.product?.price;
      const priceStringWithoutComma = priceString.replace(/,/g, "");
      const price = parseFloat(priceStringWithoutComma);

      return price;
}


export { convertPriceStringToNumber };
