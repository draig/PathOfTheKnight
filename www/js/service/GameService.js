define(['app'], function(app){
    var GameService = {

        unlockNextStage: function(stageId) {
            var nextStage = this.nextStage(stageId);
            if(nextStage){
                app.localStorage.update('stages', {
                    enable: true
                }, {
                    id: nextStage.id
                });
            }
        },

        nextStage: function(stageId) {
            var stage = app.localStorage.get('stages', {id: Number(stageId)})[0];
            return app.localStorage.get('stages', {
                levelId: stage.levelId,
                number: stage.number
            })[0];
        }

    };

    return GameService;
});