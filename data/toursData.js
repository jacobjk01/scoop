module.exports = {
  tours: [
    {
      id: '1',
      name: 'Santa Monica',
      src: require('images/Santa_Monica.png'),
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmomsla.com%2Fsanta-monica-pier%2F&psig=AOvVaw3FC1rw00QeyKX7iR4nqItj&ust=1633753930373000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjlze_9ufMCFQAAAAAdAAAAABAD',
      attractions: ['Diddy Riese', 'Regency Theater', 'Copymat', 'CVS'],
      cost: 10,
      duration: 60,
      maxPeople: 6,
      transportation: 'walk',
      description:
        'Get to know the neighborhood: where to grocery shop, where the best hangout...',
      introduction:
        'Get to know the neighborhood: where to grocery shop, where the best hangout places are, and where to grab a bite with your fellow hungry bruins.',
      meetPoint: 'Bruin Bear',
      startTime: '12:00 PM',
      /* Eventually combine tourMonth and tourDay into timestamp...
      for now this bc easier for following screen mock ups */
      tourMonth: 'JUL',
      tourDay: '14',
      category: 'sightseeing',
      visitors: 2,
    },
    {
      id: '2',
      name: 'Westwood Tour',
      src: require('images/Westwood_village.png'),
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmomsla.com%2Fsanta-monica-pier%2F&psig=AOvVaw3FC1rw00QeyKX7iR4nqItj&ust=1633753930373000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjlze_9ufMCFQAAAAAdAAAAABAD',
      attractions: ['Diddy Riese', 'Regency Theater', 'Copymat', 'CVS'],
      duration: 45,
      maxPeople: 3,
      transportation: 'car',
      description:
        'Get to know Westwood: where to grocery shop, where the best hangout...',
      introduction:
        'Get to know Westwood: where to grocery shop, where the best hangout places are, and where to grab a bite with your fellow hungry bruins.',
      meetPoint: 'Bruin Bear',
      startTime: '9:00 AM',
      /* Eventually combine tourMonth and tourDay into timestamp...
      for now this bc easier for following screen mock ups */
      tourMonth: 'JUL',
      tourDay: '15',
      category: 'sightseeing',
      visitors: 3,
    },
    {
      id: '3',
      name: 'Happy Tour',
      src: require('images/Westwood_village.png'),
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmomsla.com%2Fsanta-monica-pier%2F&psig=AOvVaw3FC1rw00QeyKX7iR4nqItj&ust=1633753930373000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjlze_9ufMCFQAAAAAdAAAAABAD',
      attractions: ['Diddy Riese', 'Regency Theater', 'Copymat', 'CVS'],
      duration: 45,
      maxPeople: 3,
      transportation: 'car',
      description:
        'Get to know Westwood: where to grocery shop, where the best hangout...',
      introduction:
        'Get to know Westwood: where to grocery shop, where the best hangout places are, and where to grab a bite with your fellow hungry bruins.',
      meetPoint: 'Bruin Bear',
      startTime: '1:00 PM',
      /* Eventually combine tourMonth and tourDay into timestamp...
      for now this bc easier for following screen mock ups */
      tourMonth: 'JUN',
      tourDay: '1',
      visitors: 1,
    },
    {
      id: '4',
      name: 'Santa Monica',
      src: require('images/Santa_Monica.png'),
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmomsla.com%2Fsanta-monica-pier%2F&psig=AOvVaw3FC1rw00QeyKX7iR4nqItj&ust=1633753930373000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjlze_9ufMCFQAAAAAdAAAAABAD',
      attractions: ['Diddy Riese', 'Regency Theater', 'Copymat', 'CVS'],
      duration: 60,
      maxPeople: 6,
      transportation: 'walk',
      description:
        'Get to know the neighborhood: where to grocery shop, where the best hangout...',
      introduction:
        'Get to know the neighborhood: where to grocery shop, where the best hangout places are, and where to grab a bite with your fellow hungry bruins.',
      meetPoint: 'Bruin Bear',
      startTime: '7:00 AM',
      /* Eventually combine tourMonth and tourDay into timestamp...
      for now this bc easier for following screen mock ups */
      tourMonth: 'JUN',
      tourDay: '12',
      visitors: 5,
    },
    {
      id: '5',
      name: 'Day in Life of an Engineering Student',
      src: require('images/Santa_Monica.png'),
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmomsla.com%2Fsanta-monica-pier%2F&psig=AOvVaw3FC1rw00QeyKX7iR4nqItj&ust=1633753930373000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjlze_9ufMCFQAAAAAdAAAAABAD',
      attractions: ['Diddy Riese', 'Regency Theater', 'Copymat', 'CVS'],
      duration: 60,
      maxPeople: 6,
      transportation: 'walk',
      description:
        'Get to know the neighborhood: where to grocery shop, where the best hangout...',
      introduction:
        'Get to know the neighborhood: where to grocery shop, where the best hangout places are, and where to grab a bite with your fellow hungry bruins.',
      meetPoint: 'Bruin Bear',
      startTime: '7:00 AM',
      /* Eventually combine tourMonth and tourDay into timestamp...
      for now this bc easier for following screen mock ups */
      tourMonth: 'JUN',
      tourDay: '14',
      visitors: 4,
    },
  ],
  guides: [
    {
      id: '1',
      name: 'Natalie',
      year: 'Junior',
      major: 'Psychobiology',
      src: require('images/natalie.png'),
    },
    {
      id: '2',
      name: 'Trevor',
      year: 'Senior',
      major: 'Marketing',
      src: require('images/trevor.png'),
    },
    {
      id: '3',
      name: 'Brittany',
      year: 'Junior',
      major: 'Mechanical Eng.',
      src: require('images/brittany.png'),
    },
  ],
};
