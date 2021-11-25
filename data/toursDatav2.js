module.exports = {
    generalTours: [
        {
          id: 0,
          name: 'Santa Monica',
          src: require('../images/Santa_Monica.png'),
          image:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmomsla.com%2Fsanta-monica-pier%2F&psig=AOvVaw3FC1rw00QeyKX7iR4nqItj&ust=1633753930373000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjlze_9ufMCFQAAAAAdAAAAABAD',
          tours: [
            {
                id: 0,
                guide: 0,
                cost: 8,
                duration: 70,
                maxPeople: 5,
                transportation: 'walk',
                meetPoint: 'Los Positas',
                startTime: '3:00 AM',
                tourMonth: 'DEC',
                tourDay: '15',
                category: ['sightseeing','food'],
            },
            {
                id: 1,
                guide: 1,
                cost: 8,
                duration: 80,
                maxPeople: 9,
                transportation: 'Plane',
                meetPoint: 'Alamo',
                startTime: '5:00 PM',
                tourMonth: 'FEB',
                tourDay: '24',
                category: ['Fighting','food'],
            },
          ]
        },
        {
          id: 1,
          name: 'Westwood Tour',
          src: require('../images/Westwood_village.png'),
          image:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmomsla.com%2Fsanta-monica-pier%2F&psig=AOvVaw3FC1rw00QeyKX7iR4nqItj&ust=1633753930373000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjlze_9ufMCFQAAAAAdAAAAABAD',
          introduction:
            'Get to know Westwood: where to grocery shop, where the best hangout places are, and where to grab a bite with your fellow hungry bruins.',
            tours: [
                {
                id: 0,
                guide: 2,
                cost: 10,
                duration: 60,
                maxPeople: 6,
                transportation: 'walk',
                meetPoint: 'Bruin Bear',
                startTime: '12:00 PM',
                tourMonth: 'JUL',
                tourDay: '14',
                category: ['sightseeing','festival'],
                },
                {
                id: 1,
                guide: 1,
                cost: 15,
                duration: 90,
                maxPeople: 10,
                transportation: 'car',
                meetPoint: 'Westwood Village',
                startTime: '10:00 PM',
                tourMonth: 'April',
                tourDay: '10',
                category: ['sightseeing','hiking']
                
                }
            ]
        },
        
    ],
    guides: [
        {
          id: '0',
          name: 'Natalie',
          year: 'Junior',
          major: 'Psychobiology',
          src: require('../images/natalie.png'),
        },
        {
          id: '1',
          name: 'Trevor',
          year: 'Senior',
          major: 'Marketing',
          src: require('../images/trevor.png'),
        },
        {
          id: '2',
          name: 'Brittany',
          year: 'Junior',
          major: 'Mechanical Eng.',
          src: require('../images/brittany.png'),
        },
      ],
}