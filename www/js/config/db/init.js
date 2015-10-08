define([],
    function() {
        var init = {
            levels: ["INSERT OR IGNORE INTO level (name, cssClass, img, enable) VALUES ('_classic', 'classic', 'level-c-big.png', 1);",
                    "INSERT OR IGNORE INTO level (name, cssClass, img, enable) VALUES ('_easy', 'easy', 'level-easy.png', 1);"]
        };
        return init;
    });