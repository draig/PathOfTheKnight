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

            app.eventAggregator.on('resetGame', this.reset, this);

            this.gameEngine.on('change:score', function(score) {
                this.$el.find('.score').text(score);
            }, this);

            this.gameEngine.on('gameOver', function(score, isComplete, stage) {
                this.scoreDialog.render({
                    score: score,
                    complete: isComplete,
                    stage: stage
                }).show();
            }, this);
            this.gameEngine.on('gameOver', function() {
                this.timer.pause();
            }, this);
        },

        render: function (stage) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.gameEngine.set('stage', stage);
            app.addMode.showAd();
            if(!this._rendered){
                this.$el.html(this.template({}));
                this.timer.setElement(this.$el.find('.game-time'));
                this.gameEngine.set({
                    width: app.config.width,
                    height: app.config.width
                });
                setTimeout(function() {
                    this.gameEngine.set('height', app.config.height - this.$el.find('.game-btn-bar').height());
                }.bind(this), 0);

                this.gameEngine.$el.appendTo(this.$el.find('.chess-table-wrapper'));
                this._rendered = true;
            }
            this.setLevel(stage.get('levelId'));
            this.gameEngine.render();
            this.scoreDialog.hide();
            this.delegateEvents();
            this.timer.start();
            return this;
        },

        reset: function() {
            this.gameEngine.reset();
            this.scoreDialog.hide();
            this.timer.startOver();
        },

        setLevel: function(levelId) {
            this.$el.find('.to-stages').prop('href', '#level/' + levelId + '/stage');
        }

    });

    return GameView;
});
