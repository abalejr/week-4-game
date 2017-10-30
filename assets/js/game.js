$(document).ready(function(){
    var characters = [{name:"Aragorn", HP:120, attack:8, defense:15},
                      {name:"Legolas", HP:100, attack:7, defense:5},
                      {name:"Gimli", HP:150, attack:9, defense:20},
                      {name:"Boromir", HP:180, attack:10, defense:25},]

    var characterDiv = $(".character");

    var playerDiv = $(".player");
    var player;
    var playerName = "";
    var playerNotification = playerDiv.children("aside");

    var enemyDiv = $(".enemy");
    var enemyNotification = enemyDiv.children("aside");
    enemyNotification.hide();

    var defenderDiv = $(".defender");
    var defender;
    var defenderName = "";
    var defenderNotification = defenderDiv.children("aside");
    defenderNotification.hide();

    function choosePlayer(choice) {
        choice.addClass("active");
        playerNotification.hide();
        playerDiv.children("div").not(".active").prependTo(enemyDiv);
        enemyNotification.show();
        $("#you").prependTo("#content");
        var playerName = choice.children(".name").text();
        for (var i = characters.length - 1; i >= 0; i--) {
            if (characters[i].name == playerName) {
                var player = characters[i];
            }
        }
    };

    function chooseDefender(choice) {
        enemyNotification.hide();
        var defenderName = choice.children(".name").text();
        defenderNotification.prepend(defenderName + " ");
        defenderNotification.show();
        choice.prependTo(defenderDiv);
    }


    function characterClick() {
        var clicked = $(this);
        if (clicked.closest(".player").length == 1 && playerDiv.children().length != 2) {
            choosePlayer(clicked);
        } else if (clicked.closest(".enemy").length == 1 && defenderDiv.children().length == 1) {
            chooseDefender(clicked);
        }
    };

    characterDiv.children("div").click(characterClick);
});
