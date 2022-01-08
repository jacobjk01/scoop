module.exports = [
    {
        name: 'Brittany',
        picture: require('images/brittany.png'),
        year: 'Junior',
        major: 'Mechanical Eng.',
        hometown: 'Irvine, Orange County',
        intro: 'I am a proud first-generation college student! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien velit elementum malesuada leo sociis. Leo nisi, facilisis fames dignissim euismod nec. Tempus scelerisque tempor proin diam int',
        lastMessage: 'excited to see you',
        tour: 'Westwood Tour',
        date: '10:05 AM',
        conversation: [
            {
                isYou: true,
                message: 'Hi Brittany, I am interested in booking the Westwood tour. I was wondering if you can show us the vegetarian restaurant options?',
                date: '10:05 AM'
            },
            {
                isYou: false,
                message: 'Sure, I can include that in our tour!  ',
                date: '10:11 AM'
            }
        ]
    },
    {
        name: 'Natalie',
        picture: require('images/natalie.png'),
        lastMessage: 'I have a couple resturant options I like',
        tour: 'Ktown Tour',
        date: '6:02 AM'
    },
    {
        name: 'Trevor',
        picture: require('images/trevor.png'),
        lastMessage: 'Yes, I can show you where to find ',
        tour: 'Day in the life of an UCLA student',
        date: '10:05 AM'
    }
]