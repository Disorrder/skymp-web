var root = '/';
var useIndex = false;

function getUrl(route) {
    var url = root + route;
    if (useIndex) url += '/index.html';
    return url;
}

module.exports = {
    menu: [
        {name: 'main', url: root, title: 'Новости'},
        {name: 'forum', url: 'http://skymp.ru/forum/', title: 'Форум'},
        {name: 'about', url: getUrl('about.html'), title: 'Особенности'},
        {name: 'support', url: '#support', title: 'Поддержка', enabled: false},
        {name: 'shop', url: '#shop', title: 'Магазин', enabled: false},
        {name: 'profile', url: '#profile', title: 'Профиль', enabled: false}
    ]
};
