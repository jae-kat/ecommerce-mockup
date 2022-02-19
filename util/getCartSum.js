export const getCartSum = (cart) => {
  let itemTotals = [];
  for (const item of cart) {
    const itemTotal = item.price * item.amount;
    itemTotals = [...itemTotals, itemTotal];
  }
  const sum = itemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);
  return sum;
};
