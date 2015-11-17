define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/widget/dialog.html',
    'text!../../template/dialog/scoreDialog.html'
], function($, _, Backbone, app, DialogTpl, ScoreDialogTpl){

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
            this.$body = this.$el.html(this.bodyTemplate(config || {}));
            this.$el.find('.to-stages').prop('href', '#level/' + config.stage.get('levelId') + '/stage');
            this.$el.find('.next').prop('href', '#level/' + config.nextStageId + '/stage' );
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
