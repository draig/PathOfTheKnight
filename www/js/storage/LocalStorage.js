define([], function(){
    var LocalStorageStore = function(successCallback, errorCallback) {

        this.findByName = function(searchKey, callback) {
            var employees = JSON.parse(window.localStorage.getItem("employees"));
            var results = employees.filter(function(element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            callLater(callback, results);
        };

        this.get = function(field, where) {
            var entity = JSON.parse(window.localStorage.getItem(field));
            if(where) {
                entity = entity.filter(function(element) {
                    var able = true;
                    $.each(where, function(condition) {
                        able = element[condition] === where[condition];
                    });
                    return able;
                });
            }
            return entity;
        };

        this.update = function(field, value, where) {
            var entity = JSON.parse(window.localStorage.getItem(field));
            var forUpdate = entity;
            if(where) {
                forUpdate = entity.filter(function(element) {
                    var able = true;
                    $.each(where, function(condition) {
                        able = element[condition] === where[condition];
                    });
                    return able;
                });
            }
            if(value) {
                forUpdate.forEach(function(element) {
                    $.each(value, function(condition) {
                        element[condition] = value[condition];
                    });
                }.bind(this));
            }
            this.save(field, entity);
        };

        this.insert = function(field, value) {
            if(window.localStorage.getItem(field) === null){
                this.save(field, value);
            }
        };

        this.save = function(field, value) {
            if(Array.isArray(value)) {
                var stringifyArray = [];
                value.forEach(function(item) {
                    stringifyArray.push(JSON.stringify(item));
                });
                window.localStorage.setItem(field, JSON.stringify(stringifyArray));
            } else {
                window.localStorage.setItem(field, JSON.stringify(value));
            }
        };

        this.getStagesByLevelId = function(levelId) {
            var employees = JSON.parse(window.localStorage.getItem("employees"));
        },

        this.findById = function(id, callback) {
            var employees = JSON.parse(window.localStorage.getItem("employees"));
            var employee = null;
            var l = employees.length;
            for (var i=0; i < l; i++) {
                if (employees[i].id === id) {
                    employee = employees[i];
                    break;
                }
            }
            callLater(callback, employee);
        };

        this.getLevels = function() {
            var levels = JSON.parse(window.localStorage.getItem('levels'));

            for(var i = 0; i < levels.length; ++i) {
                levels[i] = JSON.parse(levels[i]);
            }

            return levels.sort(function(a, b) {
                return a.pos - b.pos;
            });
        };

        this.getStages = function(levelId) {
            var stages = JSON.parse(window.localStorage.getItem('stages')),
                levelStages = [];

            for(var i = 0; i < stages.length; ++i) {
                if(stages[i].indexOf('"levelId":' + levelId) > -1){
                    levelStages.push(JSON.parse(stages[i]))
                }
            }

            return levelStages.sort(function(a, b) {
                return a.number - b.number;
            });
        };

        this.getStage = function(stageId, callback) {
            var stage = JSON.parse(JSON.parse(window.localStorage.getItem('stages'))[stageId]),
                horse = JSON.parse(JSON.parse(window.localStorage.getItem('horses'))[stage.horseId]),
                cells = JSON.parse(JSON.parse(window.localStorage.getItem('chessTables'))[stage.chessTableId]).cells;

            callback(stage.id, cells, horse);
        };

        // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
        // that use async data access APIs
        var callLater = function(callback, data) {
            if (callback) {
                setTimeout(function() {
                    callback(data);
                });
            }
        };

        var settings = {
            music: true
        };

        var levels = [
            {id: 0, name: 'classic', pos: 10, img: 'classic.png', enable: true},
            {id: 1, name: 'beginner', pos: 1, img: 'beginner.png', enable: true}
        ];

        var stages = [
            {id: 0, levelId: 0, number: 1, horseId: 0, chessTableId: 0, enable: true},
            {id: 1, levelId: 0, number: 2, horseId: 1, chessTableId: 1, enable: false},
            {id: 2, levelId: 0, number: 3, horseId: 2, chessTableId: 2, enable: false},
            {id: 3, levelId: 0, number: 4, horseId: 3, chessTableId: 3, enable: false},
            {id: 4, levelId: 0, number: 5, horseId: 4, chessTableId: 4, enable: false}
        ];

        var chessTables = [
            {
                id: 0,
                cells:  [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ]
            },
            {
                id: 1,
                cells:  [
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1]
                ]
            },
            {
                id: 2,
                cells:  [
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1]
                ]
            },
            {
                id: 3,
                cells:  [
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1]
                ]
            },
            {
                id: 4,
                cells:  [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1]
                ]
            }
        ];

        var horses = [
            { id: 0, x: 0, y: 0},
            { id: 1, x: 0, y: 0},
            { id: 2, x: 0, y: 0},
            { id: 3, x: 0, y: 0},
            { id: 4, x: 0, y: 0}
        ];

        this.insert('settings', settings);
        this.insert('chessTables', chessTables);
        this.insert('horses', horses);
        this.insert('stages', stages);
        this.insert('levels', levels);

        callLater(successCallback);

    };

    return LocalStorageStore;
});