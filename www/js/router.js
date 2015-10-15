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
    'model/Stage',
    'model/ChessTable',
    'model/Cell'
], function($, _, Backbone, app, MenuView, SettingsView, GameView, InfoView, LevelView, StageView, Stage, ChessTable, Cell){

    var Router = Backbone.Router.extend({
        routes: {
            'settings': 'settings',
            'menu': 'menu',
            'game/:stageId' : 'game',
            'info': 'info',
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
        },

        settings: function() {
            $('.app').html(this.settingsView.render().$el);
        },

        menu: function() {
            $('.app').html(this.menuView.render().$el);
        },

        game: function(stageId) {
            app.localStorage.getStage(stageId, function(stageId, cells, horse) {
                this.gameView.setStage(new Stage ({
                    id: stageId,
                    chessTable: new ChessTable({
                        sizeY: cells.length,
                        sizeX: cells[0].length,
                        cells: cells
                    }),
                    horse: new Cell(horse)
                }));
                $('.app').html(this.gameView.render().$el);
            }.bind(this));
        },

        info: function() {
            $('.app').html(this.infoView.render().$el);
        },

        level: function() {
            $('.app').html(this.levelView.render(app.localStorage.getLevels()).$el);
        },

        stage: function(levelId) {
            $('.app').html(this.stageView.render(app.localStorage.getStages(levelId)).$el);
        },

        defaultPage: function() {
            //Backbone.history.navigate('course-board', {trigger: true});
            $('.app').html(this.menuView.render().$el);
        }
    });

    return Router;
});

