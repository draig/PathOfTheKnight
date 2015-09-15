define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'jqueryUI',
    'text!../../template/game.html'
], function($, _, Backbone, app, jqueryUI, MenuTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(MenuTpl),

        chessTable: [],

//        initialize: function () {},

        className: 'kp-game',

        level: null,
        horse: null,
        table: null,
        chessTable: null,

        events: {
            "click #to-settings": "toSettings"
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));
                this._rendered = true;
            }
            this._renderTable();
            this.delegateEvents();
            return this;
        },

        toSettings: function() {
            Backbone.history.navigate('settings', {trigger: true});
        },
        
        setLevel: function(level) {
            if(level && level.get('chessTable')){
                this._createTable(level.get('chessTable'));
                this.horse = level.get('horse');
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

            var $knight = $('<img src="img/knight.png" class="knight">');
            $knight.height(tableSize/this.chessTable.length).width(tableSize/this.chessTable[0].length).appendTo(this.$el);
            setTimeout(function() {
                $knight.offset(this.chessTable[this.horse.get('y')][this.horse.get('x')].offset());
            }.bind(this), 0);


            var scope = this;
            this.$table.find('td').click(function() {
                if($(this).hasClass('active')){

                    var prev = scope.chessTable[scope.horse.get('y')][scope.horse.get('x')];
                    prev.data('steps', prev.data('steps') - 1);

                    if(prev.data('steps') === 0){
                        prev.addClass('disable');
                    }

                    scope.horse.set('x', $(this).data('x')).set('y', $(this).data('y'));
                    $knight.offset($(this).offset());
                    scope.setActiveCells(scope.horse)
                }
            });

            this.setActiveCells(this.horse);

        },
        
        setActiveCells: function(cell) {
            this.$table.find('td.active').removeClass('active');
            if(cell.get('x') - 2 >= 0){
                if(cell.get('y') - 1 >= 0) {
                    !this.chessTable[cell.get('y') - 1][cell.get('x') - 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 1][cell.get('x') - 2].addClass('active');
                }
                if(cell.get('y') + 1 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 1 ][cell.get('x') - 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 1 ][cell.get('x') - 2].addClass('active');
                }
            }

            if (cell.get('x') - 1 >= 0) {
                if(cell.get('y') - 2 >= 0) {
                    !this.chessTable[cell.get('y') - 2][cell.get('x') - 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 2][cell.get('x') - 1].addClass('active');
                }
                if(cell.get('y') + 2 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 2][cell.get('x') - 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 2][cell.get('x') - 1].addClass('active');
                }
            }

            if(cell.get('x') + 2 < this.table.get('sizeX')){
                if(cell.get('y') - 1 >= 0) {
                    !this.chessTable[cell.get('y') - 1][cell.get('x') + 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 1][cell.get('x') + 2].addClass('active');
                }

                if(cell.get('y') + 1 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 1][cell.get('x') + 2].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 1][cell.get('x') + 2].addClass('active');
                }
            }

            if (cell.get('x') + 1 < this.table.get('sizeX')) {
                if(cell.get('y') - 2 >= 0) {
                    !this.chessTable[cell.get('y') - 2][cell.get('x') + 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') - 2][cell.get('x') + 1].addClass('active');
                }
                if(cell.get('y') + 2 < this.table.get('sizeY')) {
                    !this.chessTable[cell.get('y') + 2][cell.get('x') + 1].hasClass('disable') &&
                    this.chessTable[cell.get('y') + 2][cell.get('x') + 1].addClass('active');
                }
            }
        }

    });

    return HeaderView;
});
