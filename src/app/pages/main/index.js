import 'app/vendor.js';
import 'app/style.styl';

import 'app/components/navbar';
import 'app/components/footer';

import '../components.styl';
import '../bootstrap.styl';
import './style.styl';

// page controller
location.route = 'main';

// Redirect to /about if first time on this site
if (!localStorage.about_seen) {
    location.href = '/about';
}
