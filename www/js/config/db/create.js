define([],
    function() {
        var create = {
            levels: "CREATE TABLE IF NOT EXISTS level ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(50) UNIQUE , " +
                "cssClass VARCHAR(50), " +
                "img VARCHAR(50), " +
                "enable INTEGER DEFAULT 0)"
        };
        return create;
    });