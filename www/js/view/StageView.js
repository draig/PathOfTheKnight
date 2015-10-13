define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/stage.html'
], function($, _, Backbone, app, LevelTpl){

    var StageView = Backbone.View.extend({

        template: _.template(LevelTpl),

        className: 'kp-stage',

        events: {
            'click .kp-back': 'back'
        },

        render: function (stages) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({stages: stages}));
            this.delegateEvents();
            return this;
        }

    });

    return StageView;
});
