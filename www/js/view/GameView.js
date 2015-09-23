define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'jqueryUI',
    'service/GameEngine',
    'widget/ScoreDialog',
    'widget/Timer',
    'text!../../template/game.html'
], function($, _, Backbone, app, jqueryUI, GameEngine, ScoreDialog, Timer, GameTpl){

    var GameView = Backbone.View.extend({

        template: _.template(GameTpl),

        chessTable: [],

        events: {
            'click .reset': 'reset'
        },


        initialize: function() {
            //_.bindAll(this);
            this.gameEngine = new GameEngine({});
            this.scoreDialog = new ScoreDialog({});
            this.timer = new Timer({});

            this.gameEngine.on('change:score', function(score) {
                this.$el.find('.score').text(score);
            }, this);

            this.gameEngine.on('gameOver', function(score, isComplete) {
                this.scoreDialog.render({
                    score: score,
                    complete: isComplete
                }).show();
            }, this);
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));
                this.timer.setElement(this.$el.find('.game-time'));
                this.gameEngine.set({
                    width: app.config.width,
                    height: app.config.width
                });
                setTimeout(function() {
                    this.gameEngine.set('height', app.config.height - this.$el.find('.game-btn-bar').height());
                    this.scoreDialog.setSize({
                        bottom: this.$el.find('.game-btn-bar').height()
                    })
                }.bind(this), 0);

                this.gameEngine.$el.appendTo(this.$el.find('.chess-table-wrapper'));
                this._rendered = true;
            }
            this.gameEngine.render();

            this.scoreDialog.hide();
            this.delegateEvents();
            this.timer.start();
            return this;
        },
        
        setLevel: function(level) {
            this.gameEngine.set('level', level);
        },

        reset: function() {
            this.gameEngine.reset();
            this.scoreDialog.hide();
        }

    });

    return GameView;
});
