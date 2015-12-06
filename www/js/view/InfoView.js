define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/info.html'
], function($, _, Backbone, app, InfoTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(InfoTpl),

//        initialize: function () {},

        className: 'kp-menu',

        render: function (stepId) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template(app.config));
                this._rendered = true;
            }
            this.$el.find('.step').hide();
            switch (stepId) {
                case '1':
                    this.$el.find('.step-1').show();
                    break;
                case '2':
                    this.$el.find('.step-2').show();
            }
            this.delegateEvents();
            return this;
        }
    });

    return HeaderView;
});
