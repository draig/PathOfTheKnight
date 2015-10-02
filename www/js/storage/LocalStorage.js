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

        this.insert = function(field, value) {
            if(window.localStorage.getItem(field) === null){
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

        // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
        // that use async data access APIs
        var callLater = function(callback, data) {
            if (callback) {
                setTimeout(function() {
                    callback(data);
                });
            }
        };

        var employees = [
            {"id": 1, "firstName": "Ryan", "lastName": "Howard", "title":"Vice President, North East", "managerId": 0, "city":"New York, NY", "cellPhone":"212-999-8888", "officePhone":"212-999-8887", "email":"ryan@dundermifflin.com"},
            {"id": 2, "firstName": "Michael", "lastName": "Scott", "title":"Regional Manager", "managerId": 1, "city":"Scranton, PA", "cellPhone":"570-865-2536", "officePhone":"570-123-4567", "email":"michael@dundermifflin.com"},
            {"id": 3, "firstName": "Dwight", "lastName": "Schrute", "title":"Assistant Regional Manager", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-865-1158", "officePhone":"570-843-8963", "email":"dwight@dundermifflin.com"},
            {"id": 4, "firstName": "Jim", "lastName": "Halpert", "title":"Assistant Regional Manager", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-865-8989", "officePhone":"570-968-5741", "email":"dwight@dundermifflin.com"},
            {"id": 5, "firstName": "Pamela", "lastName": "Beesly", "title":"Receptionist", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-999-5555", "officePhone":"570-999-7474", "email":"pam@dundermifflin.com"},
            {"id": 6, "firstName": "Angela", "lastName": "Martin", "title":"Senior Accountant", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-555-9696", "officePhone":"570-999-3232", "email":"angela@dundermifflin.com"},
            {"id": 7, "firstName": "Kevin", "lastName": "Malone", "title":"Accountant", "managerId": 6, "city":"Scranton, PA", "cellPhone":"570-777-9696", "officePhone":"570-111-2525", "email":"kmalone@dundermifflin.com"},
            {"id": 8, "firstName": "Oscar", "lastName": "Martinez", "title":"Accountant", "managerId": 6, "city":"Scranton, PA", "cellPhone":"570-321-9999", "officePhone":"570-585-3333", "email":"oscar@dundermifflin.com"},
            {"id": 9, "firstName": "Creed", "lastName": "Bratton", "title":"Quality Assurance", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-222-6666", "officePhone":"570-333-8585", "email":"creed@dundermifflin.com"},
            {"id": 10, "firstName": "Andy", "lastName": "Bernard", "title":"Sales Director", "managerId": 4, "city":"Scranton, PA", "cellPhone":"570-555-0000", "officePhone":"570-646-9999", "email":"andy@dundermifflin.com"},
            {"id": 11, "firstName": "Phyllis", "lastName": "Lapin", "title":"Sales Representative", "managerId": 10, "city":"Scranton, PA", "cellPhone":"570-241-8585", "officePhone":"570-632-1919", "email":"phyllis@dundermifflin.com"},
            {"id": 12, "firstName": "Stanley", "lastName": "Hudson", "title":"Sales Representative", "managerId": 10, "city":"Scranton, PA", "cellPhone":"570-700-6464", "officePhone":"570-787-9393", "email":"shudson@dundermifflin.com"},
            {"id": 13, "firstName": "Meredith", "lastName": "Palmer", "title":"Supplier Relations", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-588-6567", "officePhone":"570-981-6167", "email":"meredith@dundermifflin.com"},
            {"id": 14, "firstName": "Kelly", "lastName": "Kapoor", "title":"Customer Service Rep.", "managerId": 2, "city":"Scranton, PA", "cellPhone":"570-123-9654", "officePhone":"570-125-3666", "email":"kelly@dundermifflin.com"},
            {"id": 15, "firstName": "Toby", "lastName": "Flenderson", "title":"Human Resources", "managerId": 1, "city":"Scranton, PA", "cellPhone":"570-485-8554", "officePhone":"570-699-5577", "email":"toby@dundermifflin.com"}
        ];

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