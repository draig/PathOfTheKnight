define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/settings.html'
], function($, _, Backbone, app, SettingsTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(SettingsTpl),

//        initialize: function () {},

        className: 'kp-menu',

        events: {
            "click .kp-back": 'back'
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({}));
            return this;
        },

        back: function() {
            Backbone.history.navigate('menu', {trigger: true});
        }

    });

    return HeaderView;
});
