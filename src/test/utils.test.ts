import { describe, it, expect } from 'vitest';

// Email validation utility (could be useful for forms)
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// URL validation utility
const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return Boolean(urlObj);
  } catch {
    return false;
  }
};

// mailto URL parser
const parseMailtoUrl = (url: string) => {
  if (!url.startsWith('mailto:')) {
    throw new Error('Invalid mailto URL');
  }

  const [emailPart, queryPart] = url.substring(7).split('?');
  const email = emailPart;

  const params: { [key: string]: string } = {};
  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    for (const [key, value] of searchParams) {
      params[key] = decodeURIComponent(value);
    }
  }

  return { email, params };
};

describe('Utility functions', () => {
  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('me+enquires@daave.co.uk')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('mailto:test@example.com')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('just-text')).toBe(false);
    });
  });

  describe('parseMailtoUrl', () => {
    it('parses simple mailto URL', () => {
      const result = parseMailtoUrl('mailto:test@example.com');

      expect(result.email).toBe('test@example.com');
      expect(result.params).toEqual({});
    });

    it('parses mailto URL with subject and body', () => {
      const url = 'mailto:me@example.com?subject=Hello&body=Test%20message';
      const result = parseMailtoUrl(url);

      expect(result.email).toBe('me@example.com');
      expect(result.params.subject).toBe('Hello');
      expect(result.params.body).toBe('Test message');
    });

    it('handles complex email addresses', () => {
      const url =
        'mailto:me+enquires@daave.co.uk?subject=Hi%20Dave%2C%20I%27d%20like%20to%20get%20in%20touch%21';
      const result = parseMailtoUrl(url);

      expect(result.email).toBe('me+enquires@daave.co.uk');
      expect(result.params.subject).toBe("Hi Dave, I'd like to get in touch!");
    });

    it('throws error for invalid mailto URL', () => {
      expect(() => parseMailtoUrl('not-mailto')).toThrow('Invalid mailto URL');
      expect(() => parseMailtoUrl('https://example.com')).toThrow(
        'Invalid mailto URL'
      );
    });
  });
});
