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
        // {url: '#', img: require("assets/images/carousel/DutIHtklYcU.jpg")},
        // {url: '#', img: require("assets/images/carousel/ETS22p7alP0.jpg")},
        // {url: '#', img: require("assets/images/carousel/gE8-nn3THAM.jpg")},
        // {url: '#', img: require("assets/images/carousel/hITL_GtkeUo.jpg")},
        // {url: '#', img: require("assets/images/carousel/L3m766qk3f8.jpg")},
        // {url: '#', img: require("assets/images/carousel/trVfZx2rMV8.jpg")}
    ],

    articles: [
        {
            date: '30.11.2017.',
            title: 'Дневник разработчика SkyMP v.0.9: Синхронизация',
            media: { source: 'youtube', id: '1hfcw74tV8U' },
        },
        {
            date: '17.12.2017',
            title: 'Дневник разработчика SkyMP v. 0.11: Крафт',
            media: { source: 'youtube', id: 'e9Ipv-9NS9M' },
        },
        {
            date: '31.12.2017',
            title: 'Дневник разработчика SkyMP v. 0.14: NPC',
            media: { source: 'youtube', id: 'lMM3AV3mX40' },
        },
        {
            date: '23.02.2018',
            title: 'Дневник разработчика SkyMP v. 1.0',
            media: { source: 'youtube', id: 'F9CHiCXR5NU' },
        },
    ]
};

module.exports.articles.forEach((v, i) => {
    v.id = i+1;
});
