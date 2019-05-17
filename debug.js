const a = '^/places/$';

const op = new RegExp(a);

const result = op.test('/laces/');
console.log(result);
