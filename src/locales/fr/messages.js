/* eslint-disable */ module.exports = {
  languageData: {
    plurals: function(n, ord) {
      if (ord) return n == 1 ? 'one' : 'other';
      return n >= 0 && n < 2 ? 'one' : 'other';
    },
  },
  messages: {
    '404 - Not Found': '404 - Page non trouv\xE9e',
    '<0>Come back to home page</0>': '<0>Retour \xE0 l\u2019accueil</0>',
  },
};
