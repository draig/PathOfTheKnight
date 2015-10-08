define([
    'underscore',
    'backbone',
    'util/WebSqlModel',
    'util/WebSqlDb',
    'model/Cell'
], function(_, Backbone, WebSqlModel, webSqlDb){
    var Level = WebSqlModel.extend({
        defaults: {
            id: 0,
            name: '',
            cssClass: '',
            img: '',
            enable: false
        },

        select: function(data, callback) {
            webSqlDb.transaction(function(transaction){
                transaction.executeSql(("SELECT * FROM level WHERE id=?"), [this.get('id')],
                    function(transaction, results){
                        callback(results);
                    });
            });
        }
    });

return Level;
});
