const sanitizeInput = require('./sanitizeInput');

const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) return;
  
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  for (const key in obj) {
    if (dangerousKeys.includes(key)) {
      delete obj[key];
      continue;
    }

    if (typeof obj[key] === 'string') {
      obj[key] = sanitizeInput(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
  return obj;
};

module.exports = sanitizeObject;