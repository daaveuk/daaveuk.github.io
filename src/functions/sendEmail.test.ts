import { describe, it, expect } from 'vitest';
import { sendEmail } from '../functions/sendEmail';

describe('sendEmail', () => {
  it('should return a proper mailto URL', () => {
    const result = sendEmail();

    expect(result).toContain('mailto:me+enquires@daave.co.uk');
    expect(result).toContain('subject=');
    expect(result).toContain('body=');
  });

  it('should include encoded subject line', () => {
    const result = sendEmail();
    const expectedSubject = encodeURIComponent(
      "Hi Dave, I'd like to get in touch!"
    );

    expect(result).toContain(`subject=${expectedSubject}`);
  });

  it('should include encoded body text', () => {
    const result = sendEmail();
    const expectedBody = encodeURIComponent(`
Hi Dave,

I'm writing to get in touch in regards to...

All the best,

My Name

  `);

    expect(result).toContain(`body=${expectedBody}`);
  });

  it('should return a string', () => {
    const result = sendEmail();

    expect(typeof result).toBe('string');
  });

  it('should contain valid email address format', () => {
    const result = sendEmail();

    expect(result).toMatch(
      /mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );
  });
});
