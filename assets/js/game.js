$(document).ready(function(){
    var characters = [{name:"Aragorn", HP:120, attack:8, defense:15},
                      {name:"Legolas", HP:100, attack:7, defense:5},
                      {name:"Gimli", HP:150, attack:9, defense:20},
                      {name:"Boromir", HP:180, attack:10, defense:25},]

    var characterDiv = $(".character");
    var $character = characterDiv.children("div");

    var you = $("#you");
    var playerDiv = $(".player");
    var player;
    var playerName = "";
    var playerAttack = 0;
    var playerStartAttack = 0;
    var playerHP = 0;
    var playerStartHP = 0;
    var playerNotification = playerDiv.children("aside").children("b");

    var enemies = $("#enemies");
    var enemyDiv = $(".enemy");
    var enemyNotification = enemyDiv.children("aside").children("b");
    enemyNotification.hide();

    var defenderDiv = $(".defender");
    var defender;
    var defenderName = "";
    var defenderDefense = 0;
    var defenderHP = 0;
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
        playerName = choice.children(".name").text();
        for (var i = characters.length - 1; i >= 0; i--) {
            if (characters[i].name == playerName) {
                player = characters[i];
                playerAttack = player.attack;
                playerStartAttack = playerAttack;
                playerHP = player.HP;
                playerStartHP = playerHP;
                console.log(playerHP);
            }
        }
    };

    function ChooseDefender(choice) {
        enemyNotification.hide();
        defenderName = choice.children(".name").text();
        defenderNotification.text(defenderName + " is ready to fight.");
        defenderNotification.show();
        choice.prependTo(defenderDiv);
        for (var i = characters.length - 1; i >= 0; i--) {
            if (characters[i].name == defenderName) {
                defender = characters[i];
                defenderDefense = defender.defense;
                defenderHP = defender.HP;
                defenderStartHP = defenderHP;             
            }
        }
    }


    function CharacterClick() {
        var clicked = $(this);
        if (clicked.closest(".player").length == 1 && $("#content").text()[0] != "Y") {
            ChoosePlayer(clicked);
        } else if (clicked.closest(".enemy").length == 1 && defenderDiv.children().length <= 1) {
            ChooseDefender(clicked);
        }
    };


    function Attack() {

        if (defenderDiv.children().length == 2) {
            attackCount += 1;
            if (defenderHP > 0 && playerHP > 0) {
                if (attackCount > 1) {
                playerAttack += playerStartAttack;
                console.log(playerStartAttack);
                console.log(playerAttack);
                }
                defenderHP -= playerAttack;
                playerHP -= defenderDefense;
                defenderNotification.html("You attack " + defenderName + " for " + playerAttack + " damage.<br />" + defenderName + " attacked you back for " + defenderDefense + " damage.");
            }
            if (playerHP <= 0) {
                defenderNotification.text(playerName + " is dead!");
                resetButton.text("Try Again");
                resetButton.show();
            } else if (defenderHP <= 0 && enemyDiv.children().length <= 1) {
                defenderNotification.html(defenderName + " is dead!<br /><br />THE RING IS YOURS!");
                resetButton.text("Play Again?");
                resetButton.show();
            } else if (defenderHP <= 0) {
                defenderDiv.children("div").hide();
                defenderNotification.text(defenderName + " is dead!");
                resetButton.text("Who's Next?");
                resetButton.show();
            }
        }
    };

    function NewPlayer () {
        $character.removeClass("active");
        playerHP = playerStartHP;
        playerAttack = playerStartAttack;
        defenderHP = defenderStartHP;
        attackCount = 0;
        resetButton.hide();
        defenderNotification.hide();
        enemies.before(you);
        $character.prependTo(playerDiv);
        $character.show();
        playerNotification.show();
    };

    function NewDefender () {
        resetButton.hide();
        defenderNotification.hide();
        enemyNotification.show();
        defenderHP = defenderStartHP;
        defenderDiv.children("div").appendTo(playerDiv);
    };

    function Reset() {
        if (playerHP <= 0) {
            NewPlayer();
        } else if (defenderHP <= 0 && enemyDiv.children().length <= 1) {
            NewPlayer(); 
        } else if (defenderHP <= 0) {
            NewDefender();
        }
    };

    $character.click(CharacterClick);
    attackButton.click(Attack);
    resetButton.click(Reset);
});
