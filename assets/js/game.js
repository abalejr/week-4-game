$(document).ready(function(){
    var characters = [{name:"Aragorn", HP:120, attack:8, defense:15},
                      {name:"Legolas", HP:100, attack:7, defense:5},
                      {name:"Gimli", HP:150, attack:9, defense:20},
                      {name:"Boromir", HP:180, attack:10, defense:25},]

    var characterDiv = $(".character");

    var you = $("#you");
    var playerDiv = $(".player");
    var player;
    var playerName = "";
    var playerStartAttack = 0;
    var playerStartHP = 0;
    var playerNotification = playerDiv.children("aside").children("b");

    var enemies = $("#enemies");
    var enemyDiv = $(".enemy");
    var enemyNotification = enemyDiv.children("aside").children("b");
    enemyNotification.hide();

    var defenderDiv = $(".defender");
    var defender;
    var defenderName = "";
    var defenderStartHP = 0;
    var defenderNotification = defenderDiv.children("aside").children("b");
    defenderNotification.hide();

    var attackButton = $("#attack");
    var attackCount = 0;

    var resetButton = $("#reset");
    resetButton.hide();


    function ChoosePlayer(choice) {
        choice.addClass("active");
        playerNotification.hide();
        playerDiv.children("div").not(".active").prependTo(enemyDiv);
        enemyNotification.show();
        you.prependTo("#content");
        var playerName = choice.children(".name").text();
        for (var i = characters.length - 1; i >= 0; i--) {
            if (characters[i].name == playerName) {
                player = characters[i];
                playerStartAttack = player.attack;
                playerStartHP = player.HP;
            }
        }
    };

    function ChooseDefender(choice) {
        enemyNotification.hide();
        var defenderName = choice.children(".name").text();
        defenderNotification.text(defenderName + " is ready to fight.");
        defenderNotification.show();
        choice.prependTo(defenderDiv);
        for (var i = characters.length - 1; i >= 0; i--) {
            if (characters[i].name == defenderName) {
                defender = characters[i];
                defenderStartHP = defender.HP;             
            }
        }
    }


    function CharacterClick() {
        var clicked = $(this);
        if (clicked.closest(".player").length == 1 && $("#content").text()[0] != "Y") {
            ChoosePlayer(clicked);
        } else if (clicked.closest(".enemy").length == 1 && defenderDiv.children().length == 1) {
            ChooseDefender(clicked);
        }
    };


    function Attack() {

        if (defenderDiv.children().length == 2) {
            attackCount += 1;
            if (defender.HP > 0 && player.HP > 0) {
                if (attackCount > 1) {
                player.attack += playerStartAttack;
                console.log(playerStartAttack);
                console.log(player.attack);
                }
                defender.HP -= player.attack;
                player.HP -= defender.defense;
                console.log("CLICK!");
                console.log("player HP: " + player.HP);
                console.log("defender HP: " + defender.HP);
            }
            if (player.HP <= 0) {
                defenderNotification.text(player.name + " is dead!");
                resetButton.text("Try Again");
                resetButton.show();
            } else if (defender.HP <= 0) {
                defenderNotification.text(defender.name + " is dead!");
                resetButton.text("Who's Next?");
                resetButton.show();
            }
        }
    };

    function NewPlayer () {
        characterDiv.children("div").removeClass("active");
        player.HP = playerStartHP;
        player.attack = playerStartAttack;
        defender.HP = defenderStartHP;
        resetButton.hide();
        defenderNotification.hide();
        enemies.before(you);
        characterDiv.children("div").prependTo(playerDiv);
        playerNotification.show();
    };

    function NewDefender () {
        resetButton.hide();
        defenderNotification.hide();
        enemyNotification.show();
        defenderDiv.children("div").hide();
        defenderDiv.children("div").appendTo(playerDiv);
    };

    function Reset() {
        if (player.HP <= 0) {
            NewPlayer();
        } else if (defender.HP <= 0) {
            NewDefender();
        }
    };

    characterDiv.children("div").click(CharacterClick);
    attackButton.click(Attack);
    resetButton.click(Reset);
});
