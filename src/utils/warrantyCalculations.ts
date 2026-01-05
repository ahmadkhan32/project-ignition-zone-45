/**
 * Warranty Calculation Utilities
 * Functions for calculating warranty expiration dates and remaining time
 */

export interface RemainingTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalMilliseconds: number;
}

/**
 * Calculate warranty expiration date based on purchase date and duration
 */
export function calculateExpirationDate(
  purchaseDate: Date | string,
  durationValue: number,
  durationUnit: 'Years' | 'Months' | 'Days'
): Date {
  const purchase = typeof purchaseDate === 'string' ? new Date(purchaseDate) : purchaseDate;
  const expiration = new Date(purchase);

  switch (durationUnit) {
    case 'Years':
      expiration.setFullYear(expiration.getFullYear() + durationValue);
      break;
    case 'Months':
      expiration.setMonth(expiration.getMonth() + durationValue);
      break;
    case 'Days':
      expiration.setDate(expiration.getDate() + durationValue);
      break;
  }

  return expiration;
}

/**
 * Check if warranty is still active
 */
export function isWarrantyActive(expirationDate: Date | string): boolean {
  const expiration = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate;
  const now = new Date();
  return now < expiration;
}

/**
 * Calculate remaining time until warranty expiration
 * Returns detailed breakdown of years, months, days, hours, minutes
 */
export function calculateRemainingTime(expirationDate: Date | string): RemainingTime {
  const expiration = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate;
  const now = new Date();

  const totalMilliseconds = expiration.getTime() - now.getTime();

  // If already expired, return zeros
  if (totalMilliseconds <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      totalMilliseconds: 0,
    };
  }

  // Calculate time components
  let remaining = totalMilliseconds;

  const msPerMinute = 1000 * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30.44; // Average month length
  const msPerYear = msPerDay * 365.25; // Account for leap years

  const years = Math.floor(remaining / msPerYear);
  remaining -= years * msPerYear;

  const months = Math.floor(remaining / msPerMonth);
  remaining -= months * msPerMonth;

  const days = Math.floor(remaining / msPerDay);
  remaining -= days * msPerDay;

  const hours = Math.floor(remaining / msPerHour);
  remaining -= hours * msPerHour;

  const minutes = Math.floor(remaining / msPerMinute);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    totalMilliseconds,
  };
}

/**
 * Format remaining time as a human-readable countdown string
 * Example: "1 Year, 2 Months, 4 Days, 3 Hours remaining"
 */
export function formatCountdown(remainingTime: RemainingTime): string {
  const parts: string[] = [];

  if (remainingTime.years > 0) {
    parts.push(`${remainingTime.years} Year${remainingTime.years !== 1 ? 's' : ''}`);
  }
  if (remainingTime.months > 0) {
    parts.push(`${remainingTime.months} Month${remainingTime.months !== 1 ? 's' : ''}`);
  }
  if (remainingTime.days > 0) {
    parts.push(`${remainingTime.days} Day${remainingTime.days !== 1 ? 's' : ''}`);
  }
  if (remainingTime.hours > 0) {
    parts.push(`${remainingTime.hours} Hour${remainingTime.hours !== 1 ? 's' : ''}`);
  }

  // If less than 1 hour remaining, show minutes
  if (parts.length === 0 && remainingTime.minutes > 0) {
    parts.push(`${remainingTime.minutes} Minute${remainingTime.minutes !== 1 ? 's' : ''}`);
  }

  // If completely expired
  if (parts.length === 0) {
    return 'Expired';
  }

  return parts.join(', ') + ' remaining';
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
