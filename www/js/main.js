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
        'backbone',
        'app',
        'router',
        'storage/websql-db'
    ],
    function(Backbone, app, WebRouter, Storage) {

        app.router = new WebRouter();

        app.initialize();

        app.storage = new Storage();

        Backbone.history.start({
            root: '/'
        });

    });

