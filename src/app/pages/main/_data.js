module.exports = {
    ENV: process.env.NODE_ENV,
    WEBPACK: process.env.WEBPACK,
    sidebarLinks: [
        {url: '#', img: require("assets/images/links/right1.png")},
        {url: '#', img: require("assets/images/links/right2.png")},
        {url: '#', img: require("assets/images/links/right3.png")},
        {url: '#', img: require("assets/images/links/right4.png")}
    ],

    carouselItems: [
        {url: '#', img: require("assets/images/carousel/carousel-1.png")},
        {url: '#', img: require("assets/images/carousel/carousel-1.png")},
        {url: '#', img: require("assets/images/carousel/carousel-1.png")}
    ],

    articles: [
        {
            id: 1,
            date: '01.01.2018',
            title: 'Дневник разработчика SkyMP v.0.9: Синхронизация.',
            video_yt: '1hfcw74tV8U'
        }
    ]
};

// for (let i=1; i <5; i++) {
//     module.exports.articles.push({
//         id: i,
//         title: 'Title '+i,
//         lead: 'Lead '+i,
//         fullText: 'Full text '+i
//     });
// }
