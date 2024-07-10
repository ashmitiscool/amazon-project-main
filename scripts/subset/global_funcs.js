export function centsToDollars(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export function hardCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
