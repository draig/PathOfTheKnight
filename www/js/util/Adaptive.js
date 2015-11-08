define([
        'jquery',
        'underscore',
        'backbone'
        ], function($, _, Backbone){
        var Adaptive = {
                addClass: function(resolution) {
                    resolution = resolution - (resolution % 10);
                    $('.app').addClass('app-resolution-' + resolution);
                }
        };

        return Adaptive;
});
