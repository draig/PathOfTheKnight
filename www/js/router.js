// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'view/MenuView',
    'view/SettingsView',
    'view/GameView',
    'view/InfoView',
    'model/Level',
    'model/ChessTable',
    'model/Cell'
], function($, _, Backbone, MenuView, SettingsView, GameView, InfoView, Level, ChessTable, Cell){

    var Router = Backbone.Router.extend({
        routes: {
            'settings': 'settings',
            'menu': 'menu',
            'game': 'game',
            'info': 'info',
            '': 'defaultPage'
        },

        initialize: function() {
            //_.bindAll(this);
            this.menuView = new MenuView();
            this.settingsView = new SettingsView();
            this.gameView = new GameView();
            this.infoView = new InfoView();
        },

        settings: function() {
            $('.app').html(this.settingsView.render().$el);
        },

        menu: function() {
            $('.app').html(this.menuView.render().$el);
        },

        game: function() {
            this.gameView.setLevel( new Level ({
                chessTable: new ChessTable(),
                horse: new Cell()
            }));
            $('.app').html(this.gameView.render().$el);
        },

        info: function() {
            $('.app').html(this.infoView.render().$el);
        },

        defaultPage: function() {
            //Backbone.history.navigate('course-board', {trigger: true});
            $('.app').html(this.menuView.render().$el);
        }
    });

    return Router;
});

