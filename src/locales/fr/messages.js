/* eslint-disable */ module.exports = {
  languageData: {
    plurals: function(n, ord) {
      if (ord) return n == 1 ? 'one' : 'other';
      return n >= 0 && n < 2 ? 'one' : 'other';
    },
  },
  messages: {
    'Create a transaction': 'Cr\xE9er un mouvement',
    Daily: 'Tous les X jours',
    Every: 'Tou(te)s les',
    Fri: 'Ven',
    'Last day': 'Dernier jour',
    Mon: 'Lun',
    'Monthly (by day of month)': 'Tous les mois (par jour du mois)',
    'Monthly (by day of week)': 'Tous les mois (par jour de la semaine)',
    'No recurrence': 'Pas de r\xE9currence',
    Sat: 'Sam',
    Sun: 'Dim',
    Thu: 'Jeu',
    Tue: 'Mar',
    Wed: 'Mer',
    Weekly: 'Toutes les X semaines',
    Yearly: 'Tous les X ans',
    days: 'jours',
    'days on:': 'jours le :',
    'months on:': 'mois le :',
  },
};
