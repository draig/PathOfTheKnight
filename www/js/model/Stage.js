define([
    'underscore',
    'backbone',
    'model/Cell'
], function(_, Backbone, Cell){

    var Stage = Backbone.Model.extend({
        defaults: {
            id: 0,
            levelId: 0,
            number: 0,
            horseId: 0,
            chessTableId: 0,
            enable: false
        }
    });

    return Stage;
});