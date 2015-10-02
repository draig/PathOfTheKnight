define([
    'underscore',
    'backbone',
    'model/Cell'
], function(_, Backbone, Cell){

    var Level = Backbone.Model.extend({
        defaults: {
            bestTime: null,
            horse: null,
            chessTable: null,
            stageId: null
        }
    });

    return Level;
});