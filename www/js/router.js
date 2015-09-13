// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'view/MenuView',
    'view/SettingsView'
], function($, _, Backbone, MenuView, SettingsView){

    var Router = Backbone.Router.extend({
        routes: {
            'settings': 'settings',
            'menu': 'menu',
            '': 'defaultPage'
        },

        initialize: function() {
            //_.bindAll(this);
            this.menuView = new MenuView();
            this.settingsView = new SettingsView();
        },

        settings: function() {
            $('body').html(this.settingsView.render().$el);
        },

        menu: function() {
            $('body').html(this.menuView.render().$el);
        },

        defaultPage: function() {
            //Backbone.history.navigate('course-board', {trigger: true});
            $('body').html(this.menuView.render().$el);
        }
    });

    return Router;
});

