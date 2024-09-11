type CountryCode = "USD" | "UG" | "KE" | "TZ" | "CD"

const currencyMapping: Record<CountryCode, string> = {
  USD: "USD",
  UG: "UGX",
  KE: "KES",
  TZ: "TZS",
  CD: "CDF",
}

const localeMapping: Record<CountryCode, string> = {
  USD: "en-US",
  UG: "en-UG",
  KE: "en-KE",
  TZ: "sw-TZ",
  CD: "fr-CD",
}

export default function formatPrice(amount: number) {
  const currencyCode = "UGX"
  const locale = "en-UG"

  if (!currencyCode || !locale) {
    return
  }

  return new Intl.NumberFormat(locale, {
    currency: currencyCode,
    style: "currency",
  }).format(amount)
}
export function formatPriceOriginal(amount: number) {
  const currencyCode = "USD"
  const locale = "en-US"

  if (!currencyCode || !locale) {
    return
  }

  return new Intl.NumberFormat(locale, {
    currency: currencyCode,
    style: "currency",
  }).format(amount)
}
export function formatPrice2(amount: number, countryCode: CountryCode) {
  const currencyCode = currencyMapping[countryCode]
  const locale = localeMapping[countryCode]

  if (!currencyCode || !locale) {
    return
  }

  return new Intl.NumberFormat(locale, {
    currency: currencyCode,
    style: "currency",
  }).format(amount)
}

// Step 2: Implement the function to fetch exchange rates
// Replace this mock function with an actual API call to fetch live exchange rates. Here, I'll use a mock function for demonstration:

async function getExchangeRate(toCurrency: string): Promise<number> {
  // Mock exchange rates from USD
  const exchangeRates: Record<string, number> = {
    UGX: 3750,
    KES: 110,
    TZS: 2300,
    CDF: 2000,
  }
  return exchangeRates[toCurrency]
}

async function getExchangeRate3(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  // Mock exchange rates
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { UGX: 3750, KES: 110, TZS: 2300, CDF: 2000 },
    UGX: { USD: 0.00027, KES: 0.03, TZS: 0.63, CDF: 0.54 },
    KES: { USD: 0.0092, UGX: 33.33, TZS: 21.0, CDF: 18.0 },
    TZS: { USD: 0.00043, UGX: 1.59, KES: 0.048, CDF: 0.86 },
    CDF: { USD: 0.00047, UGX: 1.85, KES: 0.056, TZS: 1.16 },
  }
  return exchangeRates[fromCurrency][toCurrency]
}

export async function formatAndConvertPrice1(
  amount: number,
  toCountryCode: CountryCode
): Promise<string | undefined> {
  const toCurrency = currencyMapping[toCountryCode]
  const locale = localeMapping[toCountryCode]

  if (!toCurrency || !locale) {
    return
  }

  // Fetch exchange rate
  const exchangeRate =
    toCountryCode === "USD" ? 1 : await getExchangeRate(toCurrency)
  if (!exchangeRate) {
    throw new Error("Exchange rate not available")
  }

  // Convert the amount
  const convertedAmount = amount * exchangeRate

  // Format the converted amount
  return new Intl.NumberFormat(locale, {
    currency: toCurrency,
    style: "currency",
  }).format(convertedAmount)
}

export async function formatAndConvertPrice(
  amount: number,
  fromCountryCode: CountryCode,
  toCountryCode: CountryCode
): Promise<string | undefined> {
  const fromCurrency = currencyMapping[fromCountryCode]
  const toCurrency = currencyMapping[toCountryCode]
  const locale = localeMapping[toCountryCode]

  if (!fromCurrency || !toCurrency || !locale) {
    return
  }

  // Fetch exchange rate
  const exchangeRate = await getExchangeRate3(fromCurrency, toCurrency)
  if (!exchangeRate) {
    throw new Error("Exchange rate not available")
  }

  // Convert the amount
  const convertedAmount = amount * exchangeRate

  // Format the converted amount
  return new Intl.NumberFormat(locale, {
    currency: toCurrency,
    style: "currency",
  }).format(convertedAmount)
}
