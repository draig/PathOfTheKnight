define([],
    function() {
        var create = {
            levels: "CREATE TABLE IF NOT EXISTS level ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(50) UNIQUE , " +
                "pos INTEGER, " +
                "img VARCHAR(50), " +
                "enable INTEGER DEFAULT 0)",

            stages: "CREATE TABLE IF NOT EXISTS stage ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "level_name VARCHAR(50), " +
                "number INTEGER, " +
                "horseId INTEGER, " +
                "chessTableId INTEGER, " +
                "enable INTEGER DEFAULT 0)",

            chessTable: "CREATE TABLE IF NOT EXISTS chess_table ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "cells TEXT)",

            horse: "CREATE TABLE IF NOT EXISTS horse ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "x INTEGER, " +
                "y INTEGER)"
        };

        return create;
    });