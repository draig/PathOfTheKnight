define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/menu.html'
], function($, _, Backbone, app, MenuTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(MenuTpl),

//        initialize: function () {},

        className: 'kp-menu',

        events: {
            "click #to-settings": "toSettings"
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({}));
            return this;
        },

        toSettings: function() {
            Backbone.history.navigate('settings', {trigger: true});
        }

    });

    return HeaderView;
});
