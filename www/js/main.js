require.config({
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text'
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

        Backbone.history.start({
            root: '/'
        });

    });

