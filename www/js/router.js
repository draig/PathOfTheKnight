define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'view/MenuView',
    'view/SettingsView',
    'view/GameView',
    'view/InfoView',
    'view/LevelView',
    'view/StageView',
    'view/TestView',
    'model/Stage',
    'model/ChessTable',
    'model/Cell'
], function($, _, Backbone, app, MenuView, SettingsView, GameView, InfoView, LevelView, StageView, TestView, Stage, ChessTable, Cell){

    var Router = Backbone.Router.extend({
        routes: {
            'settings': 'settings',
            'menu': 'menu',
            'game/:stageId' : 'game',
            'info': 'info',
            'info/:stepId': 'info',
            'level/:levelId/stage': 'stage',
            'level': 'level',
            '': 'defaultPage'
        },

        initialize: function() {
            this.menuView = new MenuView();
            this.settingsView = new SettingsView();
            this.gameView = new GameView();
            this.infoView = new InfoView();
            this.levelView = new LevelView();
            this.stageView = new StageView();
            this.testView = new TestView();
        },

        settings: function() {
            $('.app').empty().html(this.settingsView.render().$el);
        },

        menu: function() {
            $('.app').empty().html(this.menuView.render().$el);
        },

        game: function(stageId) {
            app.localStorage.getStage(stageId, function(stageId, cells, horse, levelId) {
                $('.app').empty().html(this.gameView.render(new Stage ({
                    id: stageId,
                    levelId: levelId,
                    chessTable: new ChessTable({
                        sizeY: cells.length,
                        sizeX: cells[0].length,
                        cells: cells
                    }),
                    horse: new Cell(horse)
                })).$el);
            }.bind(this));
        },

        info: function(stepId) {
            stepId = stepId || '1',
            $('.app').empty().html(this.infoView.render(stepId).$el);
        },

        level: function() {
            $('.app').empty().html(this.levelView.render(app.localStorage.getLevels()).$el);
        },

        stage: function(levelId) {
            $('.app').empty().html(this.stageView.render(app.localStorage.getStages(levelId)).$el);
        },

        defaultPage: function() {
            //Backbone.history.navigate('course-board', {trigger: true});
            $('.app').empty().html(this.menuView.render().$el);
        }
    });

    return Router;
});

