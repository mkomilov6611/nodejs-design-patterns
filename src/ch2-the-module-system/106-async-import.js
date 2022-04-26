// strings-uz.js
export const HELLO = 'Salom'

// strings-en.js
export const HELLO = 'Hello'


// strings-ru.js
export const HELLO = 'Privet'

// main.js
const SUPPORTED_LANGUAGES = ['uz', 'en', 'ru']
const selectedLanguage = process.argv[2]

if(!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  console.error('The specified language is not supported')
  process.exit(1)
}

const translationModule = `./strings-${selectedLanguage}.js`;

import(translationModule).then((strings) => {
  console.log(strings.HELLO);
});
