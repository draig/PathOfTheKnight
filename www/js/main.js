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


require([
        'backbone',
        'model/Level'
    ],
    function(Backbone, Level) {
        var level = new Level();
        level.select()
    });

/*
require([
        'backbone'
    ],
    function(Backbone) {
        Backbone. sync = function(method, model, options) {
            function success(result) {
                // Handle successful results from MyAPI
                if (options. success) {
                    options. success(result);
                }
            }
            function error(result) {
                // Handle error results from MyAPI
                if (options. error) {
                    options. error(result);
                }
            }
            options || (options = {});
            switch (method) {
                case 'create' :
                    return MyAPI. create(model, success, error);
                case 'update' :
                    return MyAPI. update(model, success, error);
                case 'patch' :
                    return MyAPI. patch(model, success, error);
                case 'delete' :
                    return MyAPI. destroy(model, success, error);
                case 'read' :
                    if (model. attributes[model. idAttribute]) {
                        return MyAPI. find(model, success, error);
                    } else {
                        return MyAPI. findAll(model, success, error);
                    }
            }
        };
    });
*/

/**
 * Main app initialization and initial auth check
 */

require([
        'backbone',
        'app',
        'router',
        'model/Level'
    ],
    function(Backbone, app, WebRouter) {

        app.router = new WebRouter();

        app.initialize();

        Backbone.history.start({
            root: '/'
        });

    });

