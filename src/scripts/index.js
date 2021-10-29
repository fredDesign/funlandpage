/*
 * Main frontend Javascript entrypoint.
 *
 * Note than jQuery is not required by Bootstrap and just loaded for convenience for
 * developers which can't or don't want to develop in vanilla Javascript.
*/

//
// Make jQuery object usable inside modules
//

//import $ from "jquery";

//
// Make jQuery object usable from templates
//

//window.jQuery = $;
//window.$ = $;

//** WebSite Application //

import App from './modules/App';

App();

