define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/menu.html'
], function($, _, Backbone, app, MenuTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(MenuTpl),

//        initialize: function () {},

        className: 'kp-menu',

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

    return HeaderView;
});
