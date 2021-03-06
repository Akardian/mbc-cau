/* 
 * Author:  Mike Wuestenberg
 *
*/

var sScoreName;  //Variabel für die Settings
var playerName; //Spiechert Spieler Namen
   
var ScoreName = {
    settings: {
        panel: "#player-names",
    },
    
    init: function() {
        sScoreName = this.settings; //this auf die variable prägen
    },
    
    //Bindet Namens wahl Buttons 
    bindVoteButtons: function () { //bind funktion für die Buttons
        console.log("ScoreName: Button Bind");
        $(sScoreName.panel + " .btn").on("click", function() {
            var buttonID = $(this).attr("data-ID"); //Erkennt welcher Button gedrückt wurde
            
            playerName = buttonID;
            ScoreName.showScoreName(buttonID);
        });
    },
    
    //Fügt Buttons zur Namens Auswahl hinzu
    saveScoreNames: function (msg) {
        console.log("ScoreNames: " + msg);
        
        $(sScoreName.panel).empty();
        for(var i = 0; i < msg.length; i++) {
            $(sScoreName.panel).append('<button type="button" class="btn btn-default" id=vote-button data-ID="' + msg[i] + '">' + msg[i] + '</button>');
        }
        
        ScoreName.bindVoteButtons(); 
    },
    
    //Verteckt alle Karten zu beginn
    showScoreName: function (playerName) {
        $(sScoreName.panel).empty();
        
        $(sScoreName.panel).append("<h3>" + playerName +"</h3>");
    },
};