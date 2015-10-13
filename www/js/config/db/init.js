define([],
function() {

    var init = {

    levels: ["INSERT OR IGNORE INTO level (name, pos, img, enable) VALUES ('classic', 10, 'classic.png', 0);",
            "INSERT OR IGNORE INTO level (name, pos, img, enable) VALUES ('beginner', 1, 'beginner.png', 0);"],

    stages: ["INSERT OR IGNORE INTO stage (id, level_name, number, horseId, chessTableId, enable) " +
                "VALUES (1, 'classic', 1, 1, 1, 1);",
            "INSERT OR IGNORE INTO stage (id, level_name, number, horseId, chessTableId, enable) " +
                "VALUES (2, 'classic', 2, 2, 2, 0);"],

    horses: ["INSERT OR IGNORE INTO horse (id, x, y) VALUES (1, 0, 0);",
            "INSERT OR IGNORE INTO horse (id, x, y) VALUES (2, 0, 0);",
            "INSERT OR IGNORE INTO horse (id, x, y) VALUES (3, 0, 0);",
            "INSERT OR IGNORE INTO horse (id, x, y) VALUES (4, 0, 0);",
            "INSERT OR IGNORE INTO horse (id, x, y) VALUES (5, 0, 0);"],

    chessTables: [  "INSERT OR IGNORE INTO chess_table (id, cells) " +
                        "VALUES (1, '[[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]');",
                    "INSERT OR IGNORE INTO chess_table (id, cells) " +
                        "VALUES (2, '[[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1]]');",
                    "INSERT OR IGNORE INTO chess_table (id, cells) " +
                        "VALUES (3, '[[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]]');",
                    "INSERT OR IGNORE INTO chess_table (id, cells) " +
                        "VALUES (4, '[[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1]]');",
                    "INSERT OR IGNORE INTO chess_table (id, cells) " +
                        "VALUES (5, '[[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1]]');"]

    };

    return init;
});