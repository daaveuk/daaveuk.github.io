export const sendEmail = (): string => {
  const to: string = 'me+enquires@daave.co.uk';
  const subject: string = encodeURIComponent(
    "Hi Dave, I'd like to get in touch!"
  );
  const body: string = encodeURIComponent(`
Hi Dave,

I'm writing to get in touch in regards to...

All the best,

My Name

  `);

  const url: string = `mailto:${to}?subject=${subject}&body=${body}`;

  return url;
};
