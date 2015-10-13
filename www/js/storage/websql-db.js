define([
    'config/db/create',
    'config/db/init',
    'i18n!nls/knightPath'
], function(create, init, local){
    var WebStore = function() {

        this.config = {
            name: 'pk',
            v: '1.0',
            description: 'Path of the Knight',
            size: 2 * 1024 * 1024
        };

        db = openDatabase(this.config.name, this.config.v, this.config.description, this.config.size);

        function dropTable(tx) {
            tx.executeSql('DROP TABLE level', null, function() {
                console.log('DROP success');
            });
        }

        function createTable(tx) {
            var table;
            for(table in create) {
                tx.executeSql(create[table], null, function() {
                    console.log('CREATE success');
                });
            }
            /*tx.executeSql(create.levels, null, function() {
                console.log('CREATE success');
            });
            tx.executeSql(create.stages, null, function() {
                console.log('CREATE success');
            });*/
            console.log('createTable finish');
        };

        function initialize(tx) {
            var entity;
            for(entity in init) {
                init[entity].forEach(function(sql) {
                    tx.executeSql(sql, null,
                        function() {
                            console.log('init success');
                        },
                        function(tx, error) {
                            console.log('init error: ' + error.message);
                        });
                });
            }
            /*init.levels.forEach(function(sql) {
                tx.executeSql(sql, null,
                    function() {
                        console.log('init success');
                    },
                    function(tx, error) {
                        console.log('init error: ' + error.message);
                    });
            });
            init.stages.forEach(function(sql) {
                tx.executeSql(sql, null,
                    function() {
                        console.log('init success');
                    },
                    function(tx, error) {
                        console.log('init error: ' + error.message);
                    });
            });*/
            console.log('initialize finish');
        };

        function clearTables (tx) {
            tx.executeSql("DELETE FROM level", null,
                function() {
                    console.log('clear success');
                },
                function(tx, error) {
                    console.log('clear error: ' + error.message);
                });
            /*tx.executeSql("DELETE FROM stage", null,
                function() {
                    console.log('clear success');
                },
                function(tx, error) {
                    console.log('clear error: ' + error.message);
                });*/
        };

        db.transaction(
            function(tx) {
                dropTable(tx);
                createTable(tx);
                clearTables(tx);
                initialize(tx);
            },
            function(error) {
                console.log('Transaction error: ' + error);
                //if (errorCallback) errorCallback();
            },
            function() {
                console.log('Transaction success');
                //if (successCallback) successCallback();
            }
        );

        this.getLevels = function(callback) {
            db.transaction(
                function(tx) {

                    var sql = "SELECT * FROM level ORDER BY pos";

                    tx.executeSql(sql, null, function(tx, results) {
                        var len = results.rows.length,
                            levels = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            levels[i] = results.rows.item(i);
                            //levels[i].name = local[levels[i].name] || levels[i].name; don't work
                        }
                        callback(levels);
                    });
                },
                function(error) {
                    alert("Transaction Error: " + error.message);
                }
            );
        };

        this.getStages = function(levelName, callback) {
            db.transaction(
                function(tx) {

                    var sql = "SELECT * FROM stage WHERE level_name = ?";

                    tx.executeSql(sql, [levelName], function(tx, results) {
                        var len = results.rows.length,
                            stages = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            stages[i] = results.rows.item(i);
                        }
                        callback(stages);
                    });
                },
                function(error) {
                    alert("Transaction Error: " + error.message);
                }
            );
        };

        this.getStage = function(stageId, callback) {
            db.transaction(
                function(tx) {

                    var sql = "SELECT ct.cells AS cells, h.x AS x, h.y AS y FROM stage s, chess_table ct, horse h " +
                        "WHERE s.id = ? AND s.chessTableId = ct.id AND  s.horseId = h.id";

                    tx.executeSql(sql, [stageId], function(tx, results) {
                        if(results.rows.length !== 1){
                            alert("Transaction Error: stage don't found");
                            return false;
                        }

                        callback(stageId, JSON.parse(results.rows[0].cells), {
                            x: Number(results.rows[0].x),
                            y: Number(results.rows[0].y)
                        });
                    },
                    function(error) {
                        alert("Transaction Error: " + error.message);
                    });
                });
        };

    };

    return WebStore;
});