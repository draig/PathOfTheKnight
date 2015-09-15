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

        /*
        * @complete
        * @score
        * @level
         */
        render: function (config) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));

                $('body').append(this.$el);
                this._rendered = true;
            }
            this.$body = this.$el.find('.dialog').html(this.bodyTemplate(config || {}));
            this.delegateEvents();
            return this;
        }
    });

    return ScoreDialog;
});
