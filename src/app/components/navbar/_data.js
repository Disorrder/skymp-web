var root = '/';
var useIndex = false;

module.exports = {
    menu: [
        {name: 'main', url: root, title: 'Новости'},
        {name: 'forum', url: 'http://forum.skymp.ru/', title: 'Форум'},
        {name: 'about', url: '/about.html', title: 'Особенности'},
        {name: 'support', url: '#support', title: 'Поддержка', enabled: false},
        {name: 'shop', url: '#shop', title: 'Магазин', enabled: false},
        {name: 'profile', url: '#profile', title: 'Профиль', enabled: false}
    ]
};
