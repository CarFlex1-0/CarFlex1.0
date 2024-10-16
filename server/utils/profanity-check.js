// List of prohibited words
const prohibitedWords = [
  'abuse', 'anal', 'anus', 'ass', 'asshole', 'bastard', 'bitch',
  'bloody', 'bollocks', 'bullshit', 'butt', 'crap', 'cunt',
  'damn', 'dick', 'douche', 'dumb', 'fag', 'faggot', 'fuck',
  'fucker', 'fucking', 'goddamn', 'hell', 'homo', 'idiot',
  'jerk', 'knob', 'motherfucker', 'nigger', 'piss', 'prick',
  'puto', 'pussy', 'retard', 'shit', 'slut', 'twat',
  'wanker', 'whore', 'wuss', 'bimbo', 'cocksucker', 'dumbass',
  'mc', 'bc', 'bsdk','motherfucker','chutiya','bosdk'
];

// Function to check for profanity
const checkProfanity = (text) => {
  // Convert the text to lowercase for case-insensitive comparison
  const lowerCaseText = text.toLowerCase();

  // Check if any of the prohibited words are present in the text
  for (const word of prohibitedWords) {
    if (lowerCaseText.includes(word.toLowerCase())) {
      return true; // Profanity detected
    }
  }

  return false; // No profanity found
};

// Export the checkProfanity function
module.exports = checkProfanity;
