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
    'model/Level',
    'model/ChessTable',
    'model/Cell'
], function($, _, Backbone, app, MenuView, SettingsView, GameView, InfoView, LevelView, StageView, Level, ChessTable, Cell){

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
            //_.bindAll(this);
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

            var stage = app.localStorage.get('stages', {id: Number(stageId)})[0],
                cells = app.localStorage.get('chessTables', {id: Number(stage.chessTableId)})[0].cells;
                chessTable = new ChessTable({
                    sizeY: cells.length,
                    sizeX: cells[0].length,
                    cells: cells
                }),
                horse = new Cell(app.localStorage.get('horses', {id: Number(stage.horseId)})[0]);

            this.gameView.setLevel( new Level ({
                chessTable: chessTable,
                horse: horse
            }));
            $('.app').html(this.gameView.render().$el);
        },

        info: function() {
            $('.app').html(this.infoView.render().$el);
        },

        level: function() {
            $('.app').html(this.levelView.render().$el);
        },

        stage: function(levelId) {
            $('.app').html(this.stageView.render(app.localStorage.get('stages', {levelId: Number(levelId)})).$el);
        },

        defaultPage: function() {
            //Backbone.history.navigate('course-board', {trigger: true});
            $('.app').html(this.menuView.render().$el);
        }
    });

    return Router;
});

