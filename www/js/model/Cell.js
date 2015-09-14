define([
    'underscore',
    'backbone'
], function(_, Backbone){

    var Cell = Backbone.Model.extend({
        defaults: {
            x: 1,
            y: 1
        }
    });

    return Cell;
});