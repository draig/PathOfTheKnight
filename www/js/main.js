require.config({
    paths: {
        jquery: 'lib/jquery',
        jqueryUI: 'lib/jquery-ui',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text',
        i18n: 'lib/i18n'
    },

    shim: {
        jqueryUI: ['jquery']
    }

});

/*require([
        'backbone'
    ],
    function(Backbone) {
    });*/

/**
 * Main app initialization and initial auth check
 */

require([
        'i18n',
        'backbone',
        'app',
        'router'
    ],
    function(i18n, Backbone, app, WebRouter) {

        app.router = new WebRouter();

        app.initialize();

        Backbone.history.start({
            root: '/'
        });

    });

