define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../template/widget/dialog.html',
    'text!../../template/dialog/scoreDialog.html'
], function($, _, Backbone, DialogTpl, ScoreDialogTpl){

    var ScoreDialog = Backbone.View.extend({

        template: _.template(DialogTpl),

        bodyTemplate: _.template(ScoreDialogTpl),

        className: 'overlay',

        dlgClass: 'scoreDialog',

        /*
        * @complete
        * @score
        * @level
         */
        render: function (config) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));
                this.$el.find('.dialog').addClass(this.dlgClass || '');
                $('.app').append(this.$el);
                this._rendered = true;
            }
            this.$body = this.$el.find('.dialog').html(this.bodyTemplate(config || {}));
            this.delegateEvents();
            return this;
        },

        show: function() {
            this.$el.addClass('transparent');
            this.$el.show();
            this.$el.find('.dialog').slideDown(1000, function() {
                this.$el.removeClass('transparent');
            }.bind(this));
        },

        hide: function() {
            this.$el.hide();
            this.$el.find('.dialog').hide();
        }
    });

    return ScoreDialog;
});
