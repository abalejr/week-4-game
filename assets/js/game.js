$(document).ready(function(){
    var characters = [{name:"Aragorn", HP:120, attack:8, defense:15},
                      {name:"Legolas", HP:100, attack:7, defense:5},
                      {name:"Gimli", HP:150, attack:9, defense:20},
                      {name:"Boromir", HP:180, attack:10, defense:25},]

    var characterDiv = $(".character");

    var playerDiv = $(".player");
    var player;
    var playerName = "";
    var playerStartAttack = 0;
    var playerNotification = playerDiv.children("aside");

    var enemyDiv = $(".enemy");
    var enemyNotification = enemyDiv.children("aside");
    enemyNotification.hide();

    var defenderDiv = $(".defender");
    var defender;
    var defenderName = "";
    var defenderNotification = defenderDiv.children("aside");
    defenderNotification.hide();

    var attackButton = $("#attack");
    var attackCount = 0;

    function ChoosePlayer(choice) {
        choice.addClass("active");
        playerNotification.hide();
        playerDiv.children("div").not(".active").prependTo(enemyDiv);
        enemyNotification.show();
        $("#you").prependTo("#content");
        var playerName = choice.children(".name").text();
        for (var i = characters.length - 1; i >= 0; i--) {
            if (characters[i].name == playerName) {
                player = characters[i];
                playerStartAttack = player.attack;
            }
        }
    };

    function ChooseDefender(choice) {
        enemyNotification.hide();
        var defenderName = choice.children(".name").text();
        defenderNotification.prepend(defenderName + " is ready to fight.");
        defenderNotification.show();
        choice.prependTo(defenderDiv);
        for (var i = characters.length - 1; i >= 0; i--) {
            if (characters[i].name == defenderName) {
                defender = characters[i];              
            }
        }
    }


    function CharacterClick() {
        var clicked = $(this);
        if (clicked.closest(".player").length == 1 && playerDiv.children().length != 2) {
            ChoosePlayer(clicked);
        } else if (clicked.closest(".enemy").length == 1 && defenderDiv.children().length == 1) {
            ChooseDefender(clicked);
        }
    };

    function Attack() {

        if (defenderDiv.children().length == 2) {
            attackCount += 1;
            if (attackCount > 1) {
                player.attack += playerStartAttack;
                console.log(playerStartAttack);
                console.log(player.attack);
            }
            if (defender.HP > 0 && player.HP > 0) {
                defender.HP -= player.attack;
                player.HP -= defender.defense;
                console.log("CLICK!");
                console.log("player HP: " + player.HP);
                console.log("defender HP: " + defender.HP);
            }
        }
    };

    characterDiv.children("div").click(CharacterClick);
    attackButton.click(Attack);
});
