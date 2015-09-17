require.config({
    paths: {
        jquery: 'lib/jquery',
        jqueryUI: 'lib/jquery-ui',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text'
    },

    shim: {
        jqueryUI: ['jquery']
    }

});


/**
 * Main app initialization and initial auth check
 */

require([
        'backbone',
        'app',
        'router'
    ],
    function(Backbone, app, WebRouter) {

        app.router = new WebRouter();

        app.initialize();

        Backbone.history.start({
            root: '/'
        });

    });

