define(['app'], function(app){
    var LocalStorageStore = function(successCallback, errorCallback) {

        this.unlockStage = function(stageId) {

        };

        this.nextStage = function(stageId) {
            var stage = app.localStorage.get('stages', {id: Number(stageId)})[0];
            
        };

    };

    return LocalStorageStore;
});