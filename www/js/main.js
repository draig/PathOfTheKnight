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
        'backbone'
    ],
    function(Backbone) {
        Backbone.sync = function(method, model, options) {
            function success(result) {
                // Handle successful results from MyAPI
                if (options.success) {
                    options.success(result);
                }
            }

            function error(result) {
                // Handle error results from MyAPI
                if (options.error) {
                    options.error(result);
                }
            }

            options || (options = {});
            switch (method) {
                case 'create' :
                    return MyAPI.create(model, success, error);
                case 'update' :
                    return MyAPI.update(model, success, error);
                case 'patch' :
                    return MyAPI.patch(model, success, error);
                case 'delete' :
                    return MyAPI.destroy(model, success, error);
                case 'read' :
                    if (model.attributes[model.idAttribute]) {
                        return model.select(model.get('id'), success, error);
                    }
            }
        };
    });

require([
        'backbone',
        'model/Level',
        'util/WebSqlDb'
    ],
    function(Backbone, Level, store) {
        var level1 = new Level({id: 1});
        level1.fetch();
        store.db.transaction(
            level1.select.bind(level1),
            function(error) {
                alert("Transaction Error: " + error.message);
            });

        /*var level = new Level();
        level.select()*/
    });

require([
        'backbone',
        'model/Level',
        'util/WebSqlDb'
    ],
    function(Backbone, Level, store) {
        /*var level = new Level();
         level.select()*/;
    });



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

