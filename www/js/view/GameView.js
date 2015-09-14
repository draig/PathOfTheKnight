define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/game.html'
], function($, _, Backbone, app, MenuTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(MenuTpl),

        chessTable: [],

//        initialize: function () {},

        className: 'kp-game',

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
            }
        },

        _createTable: function(table) {
            this.chessTable = [];
            for(var i = 0; i < table.get('sizeX'); ++i){
                this.chessTable.push([]);
                for(var j = 0; j < table.get('sizeY'); ++j){
                    var $td = $('<td>' + (table.get('cells')[i][j] == 1 ? '' :
                        table.get('cells')[i][j]) + '</td>');
                    $td.addClass((i + j) % 2 === 0 ? 'white-cell' : 'black-cell');
                    this.chessTable[i][j]= $td;
                }
            }
        },

        _renderTable: function() {
            var $table = this.$el.find('.chess-table').empty();
            if(this.chessTable){
                for(var i = 0; i < this.chessTable.length; ++i){
                    var $tr = $('<tr></tr>');
                    for(var j = 0; j < this.chessTable[0].length; ++j){
                        $tr.append(this.chessTable[i][j]);
                    }
                    $table.append($tr);
                }
            }
            var tableSize = app.config.width > app.config.height ? app.config.height : app.config.width;
            $table.height(tableSize).width(tableSize);

            //var $knight = $('<div class="knight"></div>');
            //this.$el.append($knight);
            //$knight.draggable();

        }

    });

    return HeaderView;
});
