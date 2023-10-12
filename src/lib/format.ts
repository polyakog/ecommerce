export function formatPrice(price: number) {
    return (price / 100).toLocaleString("ru", {
      style: "currency",
      currency: "RUB",
      currencyDisplay: "symbol" /* code или symbol (по дефолту) */ 
    });
  }