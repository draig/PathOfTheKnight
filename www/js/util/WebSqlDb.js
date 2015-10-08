define([
    'config/db/create',
    'config/db/init'
    ], function(create, init){
        var WebSqlDb = function() {

            this.config = {
                name: 'pk',
                v: '1.0',
                description: 'Path of the Knight',
                size: 2 * 1024 * 1024
            };

            this.db = openDatabase(this.config.name, this.config.v, this.config.description, this.config.size);

            this._createTable = function() {
                this.db.transaction(
                    function(tx) {
                        tx.executeSql(create.levels, null, function() {
                            console.log('CREATE success');
                        });
                    },
                    function(error) {
                        alert("Transaction Error: " + error.message);
                    }
                );
                console.log('_createTable finish');
                return this;
            };

            this._initialize = function() {
                this.db.transaction(
                    function(tx) {
                        init.levels.forEach(function(levelSql) {
                            tx.executeSql(levelSql, null,
                                function() {
                                    console.log('INSERT success');
                                },
                                function(tx, error) {
                                    alert('INSERT error: ' + error.message);
                                });
                        });
                    },
                    function(error) {
                        alert("Transaction Error: " + error.message);
                    }
                );
                console.log('_initialize finish');
                return this;

            };

            this._createTable();
            this._initialize();
        };

        return new WebSqlDb();
    });