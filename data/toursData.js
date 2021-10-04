module.exports = {
  tours: [
    {
      name: 'Santa Monica',
      src: require('../images/SantaMonica.png'),
      duration: 60,
      maxPeople: 6,
      transportation: 'walk',
      description: 'Get to know the neighborhood: where to grocery shop, where the best hangout...',
    },
    {
      name: 'Westwood Tour',
      src: require('../images/Westwood_village.png'),
      duration: 45,
      maxPeople: 3,
      transportation: 'car',
      description: 'Get to know Westwood: where to grocery shop, where the best hangout...',
    },
  ],
  guides: [
    {
      name: 'Natalie',
      year: 'Junior',
      major: 'Psychobiology',
      src: require('../images/natalie.png'),
    },
    {
      name: 'Trevor',
      year: 'Senior',
      major: 'Marketing',
      src: require('../images/trevor.png'),
    },
    {
      name: 'Brittany',
      year: 'Junior',
      major: 'Mechanical Eng.',
      src: require('../images/brittany.png'),
    },
  ]
}
