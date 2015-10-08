define([
    'underscore',
    'backbone',
    'util/WebSqlDb'
], function(_, Backbone, webSqlDb){
    var WebSqlModel = Backbone.Model.extend({
        update: function() {
            console.log("Method don't implement");
        },

        insert: function() {
            console.log("Method don't implement");
        },

        delete: function() {
            console.log("Method don't implement");
        },

        select: function() {
            console.log("Method don't implement");
        }
    });

    return WebSqlModel;
});
