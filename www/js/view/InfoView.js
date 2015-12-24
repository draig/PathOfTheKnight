define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/info.html',
    'i18n!nls/info'
], function($, _, Backbone, app, InfoTpl, locale){

    var HeaderView = Backbone.View.extend({

        template: _.template(InfoTpl),

        className: 'kp-menu',

        render: function (stepId) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template(locale));
                this._rendered = true;
            }
            this.$el.find('.step').hide();
            switch (stepId) {
                case '1':
                    this.renderFirstStep();
                    break;
                case '2':
                    this.renderSecondStep();
            }
            this.delegateEvents();
            return this;
        },

        renderFirstStep: function () {
            app.showLoading();
            this.$el.find('.step-1').show();
            setTimeout(function() {
                this.$el.find('.knight-turn').height(app.config.height - 175 - this.$el.find('.step-1 p').outerHeight(true));
                app.hideLoading();
            }.bind(this), 0);

        },
        
        renderSecondStep: function () {
            app.showLoading();
            this.$el.find('.step-2').show();
            setTimeout(function() {
                this.$el.find('.game-process').height(app.config.height - 175 - this.$el.find('.step-2 p').outerHeight(true));
                app.hideLoading();
            }.bind(this), 0);
        }
    });

    return HeaderView;
});
