define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'jqueryUI',
    'widget/ScoreDialog',
    'text!../../template/game.html'
], function($, _, Backbone, app, jqueryUI, ScoreDialog, MenuTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(MenuTpl),

        chessTable: [],

        className: 'kp-game',

        level: null,
        horse: null,
        table: null,
        chessTable: null,
        score: 1,

        events: {
            'click .reset': 'reset'
        },

        //        initialize: function () {},


        initialize: function() {
            //_.bindAll(this);
            this.scoreDialog = new ScoreDialog();
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));
                this._rendered = true;
            }
            this._renderTable();
            this.clearScore();
            this.scoreDialog.hide();
            this.delegateEvents();
            return this;
        },
        
        setLevel: function(level) {
            if(level && level.get('chessTable')){
                this._createTable(level.get('chessTable'));
                this.horse = jQuery.extend(true, {}, level.get('horse'));
                this.level = level;
                this.table = level.get('chessTable');
            }
        },

        _createTable: function(table) {
            this.chessTable = [];
            for(var i = 0; i < table.get('sizeX'); ++i){
                this.chessTable.push([]);
                for(var j = 0; j < table.get('sizeY'); ++j){
                    var $td = $('<td></td>');
                    $td.data('steps', table.get('cells')[i][j]);
                    $td.data('x', j).data('y', i);
                    $td.addClass((i + j) % 2 === 0 ? 'white-cell' : 'black-cell');
                    this.chessTable[i][j]= $td;
                }
            }
        },

        reset: function() {
            this.setLevel(this.level);
            this.render();
        },

        _renderTable: function() {
            this.$table = this.$el.find('.chess-table').empty();
            if(this.chessTable){
                for(var i = 0; i < this.chessTable.length; ++i){
                    var $tr = $('<tr></tr>');
                    for(var j = 0; j < this.chessTable[0].length; ++j){
                        $tr.append(this.chessTable[i][j]);
                    }
                    this.$table.append($tr);
                }
            }

            var tableSize = app.config.width > app.config.height ? app.config.height : app.config.width;
            this.$table.height(tableSize).width(tableSize);

            var $knight = this.$el.find('.knight');
            $knight.height(tableSize/this.chessTable.length).width(tableSize/this.chessTable[0].length).appendTo(this.$el);
            setTimeout(function() {
                $knight.offset(this.chessTable[this.horse.get('y')][this.horse.get('x')].offset());
            }.bind(this), 0);


            var scope = this;
            this.$table.find('td').click(function() {
                if($(this).hasClass('active')){

                    scope.incrementScore();

                    var prev = scope.chessTable[scope.horse.get('y')][scope.horse.get('x')];
                    prev.data('steps', prev.data('steps') - 1);

                    if(prev.data('steps') === 0){
                        prev.addClass('disable');
                    }

                    scope.horse.set('x', $(this).data('x')).set('y', $(this).data('y'));
                    $knight.offset($(this).offset());
                    if(scope.setActiveCells(scope.horse) === 0){
                        scope.scoreDialog.render({
                            score: scope.score,
                            level: scope.level,
                            complete: scope.$table.find('td').not('.disable').length === 1
                        }).show();
                    }
                }
            });

            if(this.setActiveCells(this.horse) === 0){
                ScoreDialog.render().show();
            }

        },
        
        setActiveCells: function(cell) {
            this.$table.find('td.active').removeClass('active');
            var availabelCells = 0;
            if(cell.get('x') - 2 >= 0){
                if(cell.get('y') - 1 >= 0) {
                    !this.chessTable[cell.get('y') - 1][cell.get('x') - 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 1][cell.get('x') - 2].addClass('active') && ++availabelCells;
                }
                if(cell.get('y') + 1 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 1 ][cell.get('x') - 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 1 ][cell.get('x') - 2].addClass('active') && ++availabelCells;
                }
            }

            if (cell.get('x') - 1 >= 0) {
                if(cell.get('y') - 2 >= 0) {
                    !this.chessTable[cell.get('y') - 2][cell.get('x') - 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 2][cell.get('x') - 1].addClass('active');
                }
                if(cell.get('y') + 2 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 2][cell.get('x') - 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 2][cell.get('x') - 1].addClass('active') && ++availabelCells;
                }
            }

            if(cell.get('x') + 2 < this.table.get('sizeX')){
                if(cell.get('y') - 1 >= 0) {
                    !this.chessTable[cell.get('y') - 1][cell.get('x') + 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 1][cell.get('x') + 2].addClass('active') && ++availabelCells;
                }

                if(cell.get('y') + 1 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 1][cell.get('x') + 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 1][cell.get('x') + 2].addClass('active') && ++availabelCells;
                }
            }

            if (cell.get('x') + 1 < this.table.get('sizeX')) {
                if(cell.get('y') - 2 >= 0) {
                    !this.chessTable[cell.get('y') - 2][cell.get('x') + 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 2][cell.get('x') + 1].addClass('active') && ++availabelCells;
                }
                if(cell.get('y') + 2 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 2][cell.get('x') + 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 2][cell.get('x') + 1].addClass('active') && ++availabelCells;
                }
            }

            return  availabelCells;
        },

        incrementScore: function() {
            this.score++;
            this.$el.find('.score').text(this.score);
        },

        clearScore: function() {
            this.score = 1;
            this.$el.find('.score').text(this.score);
        }

    });

    return HeaderView;
});
