define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/level.html'
], function($, _, Backbone, app, LevelTpl){

    var LevelView = Backbone.View.extend({

        template: _.template(LevelTpl),

        className: 'kp-level',

        events: {
            'click .kp-back': 'back'
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));
                this._rendered = true;
            }
            this.delegateEvents();
            return this;
        }

    });

    return LevelView;
});
