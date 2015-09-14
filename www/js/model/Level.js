define([
    'underscore',
    'backbone'
], function(_, Backbone){

    var Level = Backbone.Model.extend({
        defaults: {
            name: '',
            bestTime: null,
            horse: null,
            chessTable: null
        }
    });

    return Level;
});