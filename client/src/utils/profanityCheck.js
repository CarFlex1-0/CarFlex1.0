// Use CommonJS syntax to import 'bad-words'
const Filter = require("bad-words");

// Create a new Filter instance
const filter = new Filter();

// Export the checkProfanity function
export const checkProfanity = (text) => {
  return filter.isProfane(text);
};
