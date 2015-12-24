define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/stage.html',
    'i18n!nls/level'
], function($, _, Backbone, app, LevelTpl, locale){

    var StageView = Backbone.View.extend({

        template: _.template(LevelTpl),

        className: 'kp-stage',

        events: {
            'click .kp-back': 'back'
        },

        render: function (level, stages) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({stages: stages, nls: {
                _stageTitle: locale[level.name]
            }}));
            this.delegateEvents();
            return this;
        }

    });

    return StageView;
});
