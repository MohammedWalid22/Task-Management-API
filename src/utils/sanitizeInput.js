const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;

  // Escape HTML entities
  str = str.replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;')
           .replace(/"/g, '&quot;')
           .replace(/'/g, '&#x27;');

  // Remove control characters
  str = str.replace(/[\x00-\x1F\x7F]/g, ''); 

  return str.trim();
};

module.exports = sanitizeInput;