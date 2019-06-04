const Main = require('./models/main');


const test = '/test/3/some';
const temp = '/test/:id/some';


const buildRegex = (input) => {
  if (!input) return null;
  const parts = input.split('/');
  let comp = '^';
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith(':')) comp += '.*/';
    else if (parts[i] === '*') comp += '.*/';
    else comp += `${parts[i]}/`;
  }
  comp += '$';
  return comp;
};

const reg = buildRegex(temp);
