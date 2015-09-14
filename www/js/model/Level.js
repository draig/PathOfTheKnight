define([
    'underscore',
    'backbone',
    'model/Cell'
], function(_, Backbone, Cell){

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