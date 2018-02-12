import './style.styl';
import '../starline';

function randomFloat(a, b) {
    return a + Math.random() * (b - a);
}
function randomInt(a, b) {
    return Math.floor( randomFloat(a, b+1) );
}

function createSvgNode(name, attrs = {}) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

class NavbarController {
    constructor() {
        this.links = [];
        $('#navbar .nav-link').each((k, v) => {
            this.links.push({el: v});
        });

        this.updateActive();
    }

    updateActive() {
        this.links.forEach((v) => {
            var $v = $(v);
            if ($v.data('routeName') === location.route) {
                $v.addClass('active');
            } else {
                $v.removeClass('active');
            }
        });
    }
}

$(() => {
    new NavbarController();
});
