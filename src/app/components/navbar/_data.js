module.exports = {
    menu: [
        {name: 'main', route: true, url: '/', title: 'Новости'},
        {name: 'forum', url: 'http://forum.skymp.ru/', title: 'Форум'},
        {name: 'about', route: true, url: '/about', title: 'Особенности'},
        {name: 'support', url: '#support', title: 'Поддержка', enabled: false},
        {name: 'shop', url: '#shop', title: 'Магазин', enabled: false},
        {name: 'profile', url: '#profile', title: 'Профиль', enabled: false}
    ]
};
