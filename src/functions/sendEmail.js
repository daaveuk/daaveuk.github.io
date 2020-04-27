const sendEmail = () => {
  const to = 'me+enquires@daave.co.uk';
  const subject = encodeURIComponent("Hi Dave, I'd like to get in touch!");
  const body = encodeURIComponent(`
Hi Dave,

I'm writing to get in touch in regards to...

All the best,

My Name

  `);

  const url = `mailto:${to}?subject=${subject}&body=${body}`;

  return url;
};

export default sendEmail;
