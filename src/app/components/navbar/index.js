import './style.styl';

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

        this.icons = [];
        $('#navbar svg').each((k, v) => {
            this.icons.push(v);
            v.starsNum = Math.round(v.clientWidth / 40);
            for(let i=0; i<v.starsNum; i++) {
                v.appendChild( createSvgNode('circle', {r: randomFloat(2.5, 5), fill: '#fff'}) );
            }
        });

        this.updateActive();
        this.updateIcons();
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

    getRandomPoints(num, width=1, height=1) {
        var points = [];
        for (let i=0; i < num; i++) {
            let point = {};
            if (i === 0) point.x = 3
            else if (i === num-1) point.x = width-3
            else {
                let subWidth = width / num;
                let spread = subWidth / 3;
                point.x = i*subWidth + randomFloat(-spread, spread);
            }
            point.y = randomInt(0, height);
            points.push(point);
        }
        return points;
    }

    updateIcons() {
        this.icons.forEach((icon) => {
            var points = this.getRandomPoints(icon.starsNum, icon.clientWidth, icon.clientHeight);

            var pointsStr = points.map((v) => `${v.x},${v.y}`).join(' ');
            $(icon).find('polyline').attr({points: pointsStr});

            var circles = $(icon).find('circle');
            circles.each((i, v) => {
                $(v).attr({cx: points[i].x, cy: points[i].y});
            });
        });
    }
}

class Stars {
    // TODO refactor
}


$(() => {
    new NavbarController();
});
