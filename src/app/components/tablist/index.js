export default class Tablist {
    constructor(el) {
        this.el = $(el); // accept DOM, selector and jQ object
        this.el[0].tablist = this;
        this.select(this.el.data('selected') || 0);

        this.el.on('click.tablist', '[role="tab"]', (e) => {
            var i = this.getTabs().index(e.currentTarget);
            this.select(i);
        });
    }

    select(i) {
        if (i === this.selected || i == null) return;
        var tabs = this.getTabs();
        var panels = this.getPanels();

        var __tabs = tabs.filter('.active');
        var __panels = panels.filter('.active');
        __tabs.removeClass('active');
        __panels.removeClass('show');

        var animationTime = parseCssTime(__panels.css('transition-duration'));
        sleep(animationTime)
        .then(() => {
            __panels.removeClass('active');
        })
        .then(() => {
            tabs[i].classList.add('active');
            panels[i].classList.add('active');
            return sleep();
        })
        .then(() => {
            panels[i].classList.add('show');
        })
        ;
    }

    getTabs() {
        return this.el.find('[role="tab"]');
    }

    getPanels() {
        return this.el.find('[role="tabpanel"]');
    }

    static initialize() {
        // Be careful of conflicts with Bootstrap scripts
        $('[role="tablist"]').each((i, v) => {
            new Tablist(v);
        });
    }
}

// Init all roles on document load
$(Tablist.initialize);

// utils
function parseCssTime(t) {
    if (!t) return 0;
    return ~t.indexOf('ms') ? parseFloat(t) : parseFloat(t) * 1000;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
