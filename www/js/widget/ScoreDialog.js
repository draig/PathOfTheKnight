define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/widget/dialog.html',
    'text!../../template/dialog/scoreDialog.html',
    'i18n!nls/scoreDialog'
], function($, _, Backbone, app, DialogTpl, ScoreDialogTpl, locale){

    var ScoreDialog = Backbone.View.extend({

        template: _.template(DialogTpl),

        bodyTemplate: _.template(ScoreDialogTpl),

        className: 'scoreDialog',

        events: {
            'click .reset': 'reset'
        },

        /*
        * @complete
        * @score
        * @level
         */
        render: function (config) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));
                this.$el.addClass('dialog');
                this._rendered = true;
            }
            $('.app').append(this.$el);
            var config = config || {};
            config.nls = locale;
            this.$body = this.$el.html(this.bodyTemplate(config));
            this.$el.find('.game-btn-bar').css('bottom', app.addMode.bannerHeight());
            this.$el.find('.to-stages').prop('href', '#level/' + config.stage.get('levelId') + '/stage');
            this.delegateEvents();
            return this;
        },

        show: function() {
            //this.$el.addClass('transparent');
            this.$el.fadeIn(1000);
            this.$el.find('.dialog').slideDown(1000, function() {
                //this.$el.removeClass('transparent');
            }.bind(this));
        },

        hide: function() {
            this.$el.hide();
            this.$el.find('.dialog').hide();
        },

        reset: function() {
            this.hide();
            app.eventAggregator.trigger('resetGame');
        }
    });

    return ScoreDialog;
});
