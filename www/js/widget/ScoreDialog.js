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

//        className: 'overlay',
        className: 'scoreDialog',

//        dlgClass: 'scoreDialog',

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
        }

        /*setSize: function(cnfg) {
            if(cnfg.bottom){
                this.$el.css('bottom', cnfg.bottom);
            }
        }*/
    });

    return ScoreDialog;
});
