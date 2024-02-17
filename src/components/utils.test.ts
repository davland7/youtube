import { formatCurrency } from '../utils';

describe('formatCurrency', () => {
  it('should format number to currency string', () => {
    const result = formatCurrency(1234.56, 'fr-FR', 'USD');
    expect(result).toBe('1\u202F234,56\u00A0$');
  });

  it('should handle zero', () => {
    const result = formatCurrency(0, 'en-US', 'USD');
    expect(result).toBe('$0.00');
  });

  it('should handle maximumDigits', () => {
    const result = formatCurrency(100000.5555, 'en-US', 'USD', 3);
    expect(result).toBe('$100,000.556');
  });

  it('should handle negative numbers', () => {
    const result = formatCurrency(-1234.56, 'fr-CA', 'CAD');
    expect(result).toBe('-1\u00A0234,56\u00A0$');
  });
});
