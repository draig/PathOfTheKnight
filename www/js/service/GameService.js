define(['app'], function(app){
    var GameService = {

        unlockNextStage: function(stageId) {
            var nextStage = this.nextStage(stageId);
            if(nextStage){
                app.localStorage.enableStage(nextStage.id);
            }
        },

        nextStage: function(stageId) {
            return app.localStorage.getNextStage(stageId);
        }

    };

    return GameService;
});