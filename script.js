// On va tout d'abord définir que le jeu est un tout à tour. 
// La var nb_tour fait référence au nombre de tours. Si elle atteint 9, alors il y a égalité.
// La var coup est un tableau qui fait référence à chacune des 9 cases. Leur état évolue au clic pour indiquer
// qui du joueur 1 ou du joueur 2 a joué.

var tour = 0;
var nb_tour = 0;
var coup = [0, 0, 0, 0, 0, 0, 0, 0, 0];


// On va définir l'ordre des tours et l'affichage du signe selon le tour. Le nombre de tour va augmenter à chaque clic.
function image(x) {
    // Ce if sert à définir que si une case a été cliquée, elle ne puisse plus l'être à nouveau.
    // En effet, il est dit qu'il est possible de lancer la fonction affichant le signe correspondant au joueur que si la valeur
    // De la case dans le tableau est égale à 0. Or, dès que l'on clique, on donne une valeur selon le tour durant lequel on a 
    // cliqué.
    if (coup[x - 1] == 0) {
        nb_tour++;
        if (tour == 0) {
            circle(x);
            tour++;
        }
        else {
            cross(x);
            tour = 0;
        }
    }

}

// On va définir les fonctions qui vont afficher les cercles et les croix:
function circle(x) {
    document.getElementById('case' + x).style = "background-image:url(circle.png); background-size:100%;background-repeat:no-repeat";
    document.getElementById('case' + x).name = "circle";
    document.getElementById("message").innerHTML = "Joueur 2, c'est à vous:";
    document.getElementById("message").style.color="rgb(81, 123, 212)";
}
function cross(x) {
    document.getElementById('case' + x).style = "background-image:url(cross.png); background-size:100%;background-repeat:no-repeat";
    document.getElementById('case' + x).name = "cross";
    document.getElementById("message").innerHTML = "Joueur 1, c'est à vous:";
    document.getElementById("message").style.color="rgb(202, 69, 69)";
}


// Il faut maintenant définir les règles du tic tac toe.
// Il y a huit combinaisons possibles de victoire. Un alignement de trois signes similaires en horizontal (3 possibilités)
// Un alignement de trois signes en vertical (trois possibilités) ou un alignement de trois signes en diagonale (2 possibilités)
// Si aucun alignement n'est possible, alors il n'y a pas de défaite mais une égalité. 
// Il faut définir qu'une case cliquée ne puisse plus l'être jusqu'à la fin de la partie.



// La fonction play est la fonction onclick qui va donner une valeur à la case du tableau équivalente à la case du tic-tac-toe.
// On va utiliser ces valeurs pour définir les victoires ou égalités. 
function play(casex) {
    image(casex);
    if (tour == 0) {
        // Ici, il y a un -1 car le premier chiffre du tableau est le 0. Celui dans le HTML est le 1 (voir index.html).
        coup[casex - 1] = 1;
    }
    else {
        coup[casex - 1] = 2;
    }
    test_victoire();

}


function test_victoire() {
    // Ici, on va définir les conditions de victoires par rapport aux valeurs du tableau équivalent à la case.
    // Si trois cases alignées ont une valeur similaire, alors le joueur qui est parvenu à les aligner gagne.
    if (
        // Horizontal:
        ((coup[0] == coup[1] && coup[1] == coup[2]) && coup[0] > 0) ||
        ((coup[3] == coup[4] && coup[4] == coup[5]) && coup[3] > 0) ||
        ((coup[6] == coup[7] && coup[7] == coup[8]) && coup[6] > 0) ||
        // Vertical:
        ((coup[0] == coup[3] && coup[3] == coup[6]) && coup[0] > 0) ||
        ((coup[1] == coup[4] && coup[4] == coup[7]) && coup[1] > 0) ||
        ((coup[2] == coup[5] && coup[5] == coup[8]) && coup[2] > 0) ||
        // Diagonales:
        ((coup[0] == coup[4] && coup[4] == coup[8]) && coup[0] > 0) ||
        ((coup[2] == coup[4] && coup[4] == coup[6]) && coup[2] > 0)
    ) {

        if (tour == 0) {
            document.getElementById("message").innerHTML = "Joueur 2, vous êtes le champion!";

        }
        else if (tour == 1) {
            document.getElementById("message").innerHTML = "Joueur 1, vous êtes le champion!";

        }

    }
    else {
        // Enfin, le cas de l'égalité. Si au tour 9 rien n'est sur la même ligne, alors nous avons affaire à une égalité.
        if (nb_tour == 9) {
            document.getElementById("message").innerHTML = "Egalité";
            document.getElementById("message").style.color="gold";
        }

    }


}


// Enfin, on va créer la fonction qui permet de reload la page pour recommencer une partie en cliquant sur recommencer:

function reload() {
    location.reload();
}