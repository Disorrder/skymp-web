function randomFloat(a, b) {
    return a + Math.random() * (b - a);
}
function randomInt(a, b) {
    return Math.floor( randomFloat(a, b+1) );
}

function clamp(val, min, max) {
    return Math.min(Math.max(min, val), max)
}

function createSvgNode(name, attrs = {}) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

class Starline {
    constructor(el) {
        el.starline = this;
        this.el = el;

        this.points = [];
        for (let i = 0; i < el.clientWidth / 40; i++) {
            this.points.push({});
        }

        { // init svg nodes
            let polyline = $(this.el).find('polyline')[0];
            if (!polyline) {
                polyline = createSvgNode('polyline', {'stroke-width': 2, stroke: '#fff', fill: 'none'});
                this.el.appendChild(polyline);
            }

            var circles = $(this.el).find('circle');
            if (!circles.length) {
                circles.push( createSvgNode('circle', {fill: '#fff'}) );
                this.el.appendChild(circles[0]);
            }
            this.points.forEach((v, i) => {
                if (!circles[i]) this.el.appendChild( circles[0].cloneNode() );
            });
        }

        this.randomize();
        this.draw();
    }

    get pointsString() {
        return this.points.map((v) => `${v.cx},${v.cy}`).join(' ');
    }

    randomize() {
        var w = this.el.clientWidth;
        var h = this.el.clientHeight;
        var len = this.points.length;
        var subW = w / len;
        var spread = subW / 3;
        this.points.forEach((v, i) => {
            if (i === this.points.length-1) i++;
            v.cx = i*subW + randomFloat(-spread, spread);
            v.cx = clamp(v.cx, 3, w-3);
            v.cy = randomFloat(3, h-3);
            v.r  = randomFloat(2.5, 5);
        });
    }

    draw() {
        $(this.el).find('polyline').attr('points', this.pointsString);

        var circles = $(this.el).find('circle');
        this.points.forEach((v, i) => {
            $(circles[i]).attr(v);
        });
    }

    static initialize() {
        $('[role="starline"]').each((k, v) => {
            new Starline(v);
        });
    }
}

$(Starline.initialize);
