define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var App = {
        initialize: function() {
            // Pass in our Router module and call it's initialize function
            this.router.initialize();
        }
    };

    // Global event aggregator
    App.eventAggregator = _.extend({}, Backbone.Events);

    App.config = {
        width: $('body').width(),
        height: $('body').height(),
        orientation: $('body').width() > $('body').height() ? 'horizontal' : 'vertical'
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