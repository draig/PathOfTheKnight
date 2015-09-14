define([
    'underscore',
    'backbone'
], function(_, Backbone){

    var ChessTable = Backbone.Model.extend({
        defaults: {
            sizeX: 4,
            sizeY: 4,
            cells:  [
                        [1, 1, 1, 1],
                        [1, 1, 1, 1],
                        [1, 1, 1, 1],
                        [1, 1, 1, 1]
                    ]
        }
    });

    return ChessTable;
});