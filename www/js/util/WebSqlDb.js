define([], function(){
    var WebSqlDb = function() {

        this.config = {
            name: 'pk',
            v: '1.0',
            description: 'Path of the Knight',
            size: 2 * 1024 * 1024
        };

        this.db = openDatabase(this.config.name, this.config.v, this.config.description, this.config.size);

        this.createTable = function(tx, callback) {
            var levelTable = "CREATE TABLE IF NOT EXISTS level ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(50), " +
                "cssClass VARCHAR(50), " +
                "img VARCHAR(50), " +
                "managerId INTEGER, " +
                "enable VARCHAR(50))";
            tx.executeSql(levelTable, null, callback)
        };

        this.initialize = function() {
            db.transaction();
        }
    };

    return WebSqlDb.db;
});