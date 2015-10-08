define([
    'underscore',
    'backbone',
    'util/WebSqlModel',
    'util/WebSqlDb',
    'model/Cell'
], function(_, Backbone, WebSqlModel, store){
    var Level = WebSqlModel.extend({
        defaults: {
            id: 0,
            name: '',
            cssClass: '',
            img: '',
            enable: false
        },

        select: function(tx) {
            tx.executeSql(("SELECT * FROM level WHERE id=?"), [this.get('id')],
                function(tx, results) {
                    this.set(results.rows[0]);
                    console.log('SELECT success');
                    console.log(this);
                },
                function(tx, error) {
                    alert('SELECT error: ' + error.message);
                });
        }
    });

return Level;
});
