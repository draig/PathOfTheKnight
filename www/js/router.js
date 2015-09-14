// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'view/MenuView',
    'view/SettingsView',
    'view/GameView',
    'model/Level',
    'model/ChessTable'
], function($, _, Backbone, MenuView, SettingsView, GameView, Level, ChessTable){

    var Router = Backbone.Router.extend({
        routes: {
            'settings': 'settings',
            'menu': 'menu',
            'game': 'game',
            '': 'defaultPage'
        },

        initialize: function() {
            //_.bindAll(this);
            this.menuView = new MenuView();
            this.settingsView = new SettingsView();
            this.gameView = new GameView();
        },

        settings: function() {
            $('body').html(this.settingsView.render().$el);
        },

        menu: function() {
            $('body').html(this.menuView.render().$el);
        },

        game: function() {
            this.gameView.setLevel( new Level ({
                chessTable: new ChessTable()
            }));
            $('body').html(this.gameView.render().$el);
        },

        defaultPage: function() {
            //Backbone.history.navigate('course-board', {trigger: true});
            $('body').html(this.menuView.render().$el);
        }
    });

    return Router;
});

