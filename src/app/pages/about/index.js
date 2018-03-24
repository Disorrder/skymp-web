import 'app/vendor.js';
import 'app/style.styl';

import 'app/components/navbar';
import 'app/components/footer';
import 'app/components/tablist';

import '../components.styl';
import '../bootstrap.styl';
import './style.styl';

// page controller
location.route = 'about';

// Set seen flag
if (!localStorage.about_seen) {
    localStorage.about_seen = true;
}
