/* 
 * Author:  Mike Wuestenberg
 *
*/

var sWhiteCard;  //Variabel für die Settings
   
var WhiteCard = {        
    settings: {
        fadeTime: 1000, //Zeit die ein Fade dauert
        maxPanels: 4,
        panel: "#white-card-panel-",
        text: "#white-card-text-",
        vote: "#white-card-vote-",
        
        buttonBind: "#vote .btn",
    },
    
    init: function() {
        sWhiteCard = this.settings; //this auf die variable prägen
        
        WhiteCard.cardHide();
        
        WhiteCard.bindVoteButtons();
    },
    
    //Verteckt alle Karten zu beginn
    cardHide: function () {
        for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            $(sWhiteCard.panel + i).hide();
            $(sWhiteCard.text + i).html("");
        }
    },
    
    //Blendet alle karten ein
    cardShow: function () {
        for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            $(sWhiteCard.panel + i).fadeIn(sWhiteCard.fadeTime);
        }
    },
    
    //Ändert denn Text auf einer Karte
    cardUpdate: function(card) {
        voteCard = card; //Speichern zum Voten
        
		for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            //Durch das aufrufen der Funktion wird Sichergestellt das der Inhalt duchgeführt wird bevor das fadeIn passiert
			$(sWhiteCard.panel + i).fadeOut(sWhiteCard.fadeTime, WhiteCard.cardUpdateHelper(card, i)).fadeIn(sWhiteCard.fadeTime);
        }
    },
    
    //Hilfs Methode zum verändern des Textes der Weißen Karten
    cardUpdateHelper: function (card, i) {
        //console.log(sWhiteCard.text + i);
        //console.log(card[i]);
        $(sWhiteCard.text + i).html(card[i]); //Verändert denn Text der Karte
    },
    
    //Bindet Vote Buttons 
    bindVoteButtons: function () { //bind funktion für die Buttons
        $(sWhiteCard.buttonBind).on("click", function() {
            var buttonID = $(this).attr("data-ID"); //Erkennt welcher Button gedrückt wurde
            //console.log("WhiteCard: " + buttonID);
            WhiteCard.vote(buttonID);   
        });
    },
    
    //Helper Funktion um von Gedrückten Button auf die gewählte karte zu schließen
    vote: function (buttonID) {
        var card;
        
        switch(buttonID) {
        case "b0":
            card = voteCard[0];
        break;
        case "b1":
            card = voteCard[1];
        break;
        case "b2":
            card = voteCard[2];
        break;
        case "b3":
            card = voteCard[3];
        break;
        default:
            console.log("ERROR: Button to Vote convert");
        }
        
        WhiteCard.cardHide();
        
        Socket.emitVote(card); //Sendet die wahl an Server
    },
};