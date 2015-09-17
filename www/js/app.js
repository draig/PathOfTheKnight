define([
    'jquery',
    'underscore',
    'backbone',
    'util/Adaptive'
], function($, _, Backbone, Adaptive){
    var App = {
        initialize: function() {
            // Pass in our Router module and call it's initialize function
            this.router.initialize();
            Adaptive.addClass(App.config.width);
        },

        importCss: function() {
            $('.app').addClass()
        }
    };

    // Global event aggregator
    App.eventAggregator = _.extend({}, Backbone.Events);

    App.config = {
        width: $('.app').width(),
        height: $('.app').height(),
        orientation: $('.app').width() > $('.app').height() ? 'horizontal' : 'vertical'
    };

    // View.close() event for garbage collection
    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    return App;
});