define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var GameEngine = Backbone.Model.extend({

        defaults: {
            chessTable: [],
            level: null,
            horse: null,
            score: 1,
            lock: false,
            height: 100,
            width: 100,
            cellSize: null
        },

        $el: $('<div><table class="chess-table"></table></div>'),

        $knight: $('<img src="img/knight.png" class="knight" style="position: absolute">'),

        initialize: function() {
            this.$table = this.$el.find('table');
            this.on('change:level', this._refreshOptions, this);
            this.on('change:horse', function() {
                this.setActiveCells(this.get('horse'))
            }, this);
            this.on('change:lock', this.lock, this);
//            this.on('change:cellSize', this._renderKnight, this);
            this.on('change:height', this._resizeTable, this);
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this._renderTable();
            this.setActiveCells(this.get('horse'))
            this._clearScore();
            return this;
        },

        _refreshOptions: function() {
            var level = this.get('level');
            this._createTable(level.get('chessTable'));
            this.set('horse', level.get('horse').clone());
        },

        _createTable: function(table) {
            chessTable = [];
            for(var i = 0; i < table.get('sizeY'); ++i){
                chessTable.push([]);
                for(var j = 0; j < table.get('sizeX'); ++j){
                    var $td = $('<td></td>');
                    $td.data('steps', table.get('cells')[i][j]);
                    $td.data('x', j).data('y', i);
                    $td.addClass((i + j) % 2 === 0 ? 'white-cell' : 'black-cell');
                    chessTable[i][j]= $td;
                }
            }
            this.set('chessTable', chessTable);
        },

        reset: function() {
            this._refreshOptions();
            this.render();
        },

        _renderTable: function() {
            var chessTable = this.get('chessTable');
            this.$table.empty();
            for(var i = 0; i < chessTable.length; ++i){
                var $tr = $('<tr></tr>');
                for(var j = 0; j < chessTable[0].length; ++j){
                    $tr.append(chessTable[i][j]);
                }
                this.$table.append($tr);
            }

            this._resizeTable();

            this._hookTableEvents();

        },

        _resizeTable: function() {
            var levelTable = this.get('level').get('chessTable'),
                sizeX = Math.floor(this.get('width') / levelTable.get('sizeX')),
                sizeY = Math.floor(this.get('height') / levelTable.get('sizeY')),
                size = sizeX > sizeY ? sizeY : sizeX;
            this.set('cellSize', size);
            this.$table.height(size * levelTable.get('sizeY')).width(size * levelTable.get('sizeX'));

            if(size !== sizeY){
                var padding = (Math.floor(this.get('height')) - size * levelTable.get('sizeY')) / 2;
                this.$el.css({
                    paddingTop: padding,
                    paddingBottom: padding
                });
            }

            this._renderKnight()
        },

        _renderKnight: function() {
            this.$knight.height(this.get('cellSize')).width(this.get('cellSize'));
            if(!this.$knight.parent().length) {
                this.$knight.appendTo(this.$el);
            }
            var chessTable = this.get('chessTable');
            var horse = this.get('horse');
            setTimeout(function() {
                this.$knight.offset(chessTable[horse.get('y')][horse.get('x')].offset());
            }.bind(this), 0);
        },

        _hookTableEvents: function() {
            var scope = this;
            this.$table.find('td').click(function() {
                if($(this).hasClass('active') && !scope.get('lock')){
                    var horse = scope.get('horse'),
                        chessTable = scope.get('chessTable');
                    scope._incrementScore();
                    var prev = chessTable[horse.get('y')][horse.get('x')];
                    prev.data('steps', prev.data('steps') - 1);

                    if(prev.data('steps') === 0){
                        prev.addClass('disable');
                    }

                    horse.set('x', $(this).data('x')).set('y', $(this).data('y'));
                    scope.$knight.offset($(this).offset());
                    scope.setActiveCells(scope.get('horse'));
                }
            });
        },

        setActiveCells: function(cell) {
            var levelTable = this.get('level').get('chessTable'),
                chessTable = this.get('chessTable');
            this.$table.find('td.active').removeClass('active');
            var availableCells = 0;
            if(cell.get('x') - 2 >= 0){
                if(cell.get('y') - 1 >= 0) {
                    !chessTable[cell.get('y') - 1][cell.get('x') - 2].hasClass('disable') &&
                    chessTable[cell.get('y') - 1][cell.get('x') - 2].addClass('active') && ++availableCells;
                }
                if(cell.get('y') + 1 < levelTable.get('sizeY')) {
                    !chessTable[cell.get('y') + 1 ][cell.get('x') - 2].hasClass('disable') &&
                    chessTable[cell.get('y') + 1 ][cell.get('x') - 2].addClass('active') && ++availableCells;
                }
            }

            if (cell.get('x') - 1 >= 0) {
                if(cell.get('y') - 2 >= 0) {
                    !chessTable[cell.get('y') - 2][cell.get('x') - 1].hasClass('disable') &&
                    chessTable[cell.get('y') - 2][cell.get('x') - 1].addClass('active') && ++availableCells;
                }
                if(cell.get('y') + 2 < levelTable.get('sizeY')) {
                    !chessTable[cell.get('y') + 2][cell.get('x') - 1].hasClass('disable') &&
                    chessTable[cell.get('y') + 2][cell.get('x') - 1].addClass('active') && ++availableCells;
                }
            }

            if(cell.get('x') + 2 < levelTable.get('sizeX')){
                if(cell.get('y') - 1 >= 0) {
                    !chessTable[cell.get('y') - 1][cell.get('x') + 2].hasClass('disable') &&
                    chessTable[cell.get('y') - 1][cell.get('x') + 2].addClass('active') && ++availableCells;
                }

                if(cell.get('y') + 1 < levelTable.get('sizeY')) {
                    !chessTable[cell.get('y') + 1][cell.get('x') + 2].hasClass('disable') &&
                    chessTable[cell.get('y') + 1][cell.get('x') + 2].addClass('active') && ++availableCells;
                }
            }

            if (cell.get('x') + 1 < levelTable.get('sizeX')) {
                if(cell.get('y') - 2 >= 0) {
                    !chessTable[cell.get('y') - 2][cell.get('x') + 1].hasClass('disable') &&
                    chessTable[cell.get('y') - 2][cell.get('x') + 1].addClass('active') && ++availableCells;
                }
                if(cell.get('y') + 2 < levelTable.get('sizeY')) {
                    !chessTable[cell.get('y') + 2][cell.get('x') + 1].hasClass('disable') &&
                    chessTable[cell.get('y') + 2][cell.get('x') + 1].addClass('active') && ++availableCells;
                }
            }

            this._checkGameOver(availableCells);
        },

        _checkGameOver: function(availableCells) {
            if(availableCells === 0){
                var complete = this.$table.find('td').not('.disable').length === 1;
                this.trigger('gameOver', this.get('score'), complete);
            }
        },

        _incrementScore: function() {
            this.score++;
            this.$el.find('.score').text(this.score);
        },

        _clearScore: function() {
            this.set('score', 1);
        }

    });

    return GameEngine;
});