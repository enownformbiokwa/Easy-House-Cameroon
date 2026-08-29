export type CurrencyCode = 'XAF' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateAgainstUSD: number; // 1 USD = rate
  rateAgainstXAF: number; // 1 XAF = rate
  symbolPosition: 'prefix' | 'suffix';
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  XAF: {
    code: 'XAF',
    name: 'FCFA (Central African CFA)',
    symbol: 'FCFA',
    rateAgainstUSD: 600,
    rateAgainstXAF: 1,
    symbolPosition: 'suffix',
    flag: '🇨🇲',
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rateAgainstUSD: 1,
    rateAgainstXAF: 1 / 600,
    symbolPosition: 'prefix',
    flag: '🇺🇸',
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    rateAgainstUSD: 0.92,
    rateAgainstXAF: 1 / 655.957,
    symbolPosition: 'prefix',
    flag: '🇪🇺',
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    rateAgainstUSD: 0.78,
    rateAgainstXAF: 1 / 770,
    symbolPosition: 'prefix',
    flag: '🇬🇧',
  },
};

/**
 * Converts a base price (stored in USD or converted from XAF) to target currency.
 * Base price in data is normalized to USD base = 1 unit.
 * 1 USD = 600 XAF.
 */
export function convertPrice(basePriceUSD: number, targetCurrency: CurrencyCode | string): number {
  const target = (targetCurrency as CurrencyCode) || 'XAF';
  const config = CURRENCIES[target] || CURRENCIES.XAF;
  return Math.round(basePriceUSD * config.rateAgainstUSD);
}

/**
 * Converts from XAF amount to USD base price.
 */
export function xafToUSDBase(amountXAF: number): number {
  return Math.round(amountXAF / 600);
}

/**
 * Formats a monetary amount into a clean localized currency string.
 * e.g. 150,000,000 FCFA or $1,650,000
 */
export function formatCurrency(
  basePriceUSD: number,
  targetCurrency: CurrencyCode | string = 'XAF',
  options?: { compact?: boolean }
): string {
  const target = (targetCurrency as CurrencyCode) || 'XAF';
  const config = CURRENCIES[target] || CURRENCIES.XAF;
  const converted = convertPrice(basePriceUSD, target);

  if (options?.compact) {
    if (target === 'XAF') {
      if (converted >= 1_000_000_000) {
        return `${(converted / 1_000_000_000).toFixed(1)}B ${config.symbol}`;
      }
      if (converted >= 1_000_000) {
        return `${(converted / 1_000_000).toFixed(0)}M ${config.symbol}`;
      }
      if (converted >= 1_000) {
        return `${(converted / 1_000).toFixed(0)}k ${config.symbol}`;
      }
      return `${converted.toLocaleString()} ${config.symbol}`;
    } else {
      if (converted >= 1_000_000) {
        return `${config.symbol}${(converted / 1_000_000).toFixed(2)}M`;
      }
      if (converted >= 1_000) {
        return `${config.symbol}${(converted / 1_000).toFixed(0)}k`;
      }
      return `${config.symbol}${converted.toLocaleString()}`;
    }
  }

  const formattedNum = converted.toLocaleString();
  if (config.symbolPosition === 'prefix') {
    return `${config.symbol}${formattedNum}`;
  }
  return `${formattedNum} ${config.symbol}`;
}

/**
 * Formats raw amount (already in the target currency).
 */
export function formatRawAmount(
  amount: number,
  targetCurrency: CurrencyCode | string = 'XAF',
  options?: { compact?: boolean }
): string {
  const target = (targetCurrency as CurrencyCode) || 'XAF';
  const config = CURRENCIES[target] || CURRENCIES.XAF;

  if (options?.compact) {
    if (target === 'XAF') {
      if (amount >= 1_000_000_000) {
        return `${(amount / 1_000_000_000).toFixed(1)}B ${config.symbol}`;
      }
      if (amount >= 1_000_000) {
        return `${(amount / 1_000_000).toFixed(0)}M ${config.symbol}`;
      }
      if (amount >= 1_000) {
        return `${(amount / 1_000).toFixed(0)}k ${config.symbol}`;
      }
      return `${amount.toLocaleString()} ${config.symbol}`;
    } else {
      if (amount >= 1_000_000) {
        return `${config.symbol}${(amount / 1_000_000).toFixed(2)}M`;
      }
      if (amount >= 1_000) {
        return `${config.symbol}${(amount / 1_000).toFixed(0)}k`;
      }
      return `${config.symbol}${amount.toLocaleString()}`;
    }
  }

  const formattedNum = Math.round(amount).toLocaleString();
  if (config.symbolPosition === 'prefix') {
    return `${config.symbol}${formattedNum}`;
  }
  return `${formattedNum} ${config.symbol}`;
}
