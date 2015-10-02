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
                window.localStorage.setItem(field, JSON.stringify(value));
            }
        };

        this.save = function(field, value) {
            window.localStorage.setItem(field, JSON.stringify(value));
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
            {
                id: 1,
                name: '_Classic',
                cssClass: 'classic',
                img: 'level-c-big.png'
            }
        ];

        var stages = [
            {id: 1, levelId: 1, number: 1, horseId: 1, chessTableId: 1, enable: true},
            {id: 2, levelId: 1, number: 2, horseId: 2, chessTableId: 2, enable: false},
            {id: 3, levelId: 1, number: 3, horseId: 3, chessTableId: 3, enable: false},
            {id: 4, levelId: 1, number: 4, horseId: 4, chessTableId: 4, enable: false},
            {id: 5, levelId: 1, number: 5, horseId: 5, chessTableId: 5, enable: false}
        ];

        var chessTables = [
            {
                id: 1,
                cells:  [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ]
            },
            {
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
            {
                id: 1,
                x: 0,
                y: 0
            },
            {
                id: 2,
                x: 0,
                y: 0
            },
            {
                id: 3,
                x: 0,
                y: 0
            },
            {
                id: 4,
                x: 0,
                y: 0
            },
            {
                id: 5,
                x: 0,
                y: 0
            }
        ];

        this.insert('employees', employees);
        this.insert('settings', settings);
        this.insert('chessTables', chessTables);
        this.insert('horses', horses);
        this.insert('stages', stages);
        this.insert('levels', levels);

        callLater(successCallback);

    };

    return LocalStorageStore;
});