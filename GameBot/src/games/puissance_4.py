
from models.game import Game
from enum import Enum

class CouleurCase(Enum):
    Vide = 0
    Joueur1 = 1
    Joueur2 = 2

# grille 7 colonnes 6 lignes
class Grille:
    col = 7
    row = 6

    # on init la grille avec des cases vides
    def __init__(self) -> None:
        #param jeu fini
        self.finie = False
        # dernière couleur placée, used to check victory
        self.derniereCouleur = CouleurCase.Vide
        #init grille
        self.grille = []
        for i in range(Grille.col):
            self.grille.append([])
            for j in range(Grille.row):
                self.grille[i].append(CouleurCase.Vide)

    # vérification que la colonne est non pleine
    def choixPossible(self, choix):
        return (self.grille[int(choix)][-1] == CouleurCase.Vide) & (int(choix) in [0,1,2,3,4,5,6])
    
    # ajout tuile colonne
    def ajouter(self, joueur, colonne):
        for ligne in range(Grille.row - 1, -1, -1):
            if self.grille[colonne][ligne - 1] != CouleurCase.Vide:
                self.grille[colonne][ligne] = CouleurCase(joueur)
                self.derniereCouleur = CouleurCase(joueur)
                self.checkFini(colonne,ligne)


    # arg : colonne = colonne du dernier placement;; ligne = ligne du dernier placement
    def checkFinie (self, colonne, ligne):
        alignementVert = self.parcourir(1, 0, colonne, ligne) + self.parcourir(-1, 0, colonne, ligne)
        alignementHoriz = self.parcourir(0, 1, colonne, ligne) + self.parcourir(0, -1, colonne, ligne)
        # diagonale : bas à gauche vers haut à droite 
        alignementDiagX = self.parcourir(1, 1, colonne, ligne) + self.parcourir(-1, -1, colonne, ligne)
        # diagonale
        alignementDiag_X = self.parcourir(-1, 1, colonne, ligne) + self.parcourir(1, -1, colonne, ligne)
        if alignementVert >= 3 or alignementHoriz >= 3 or alignementDiagX >= 3 or alignementDiag_X >= 3:
             self.finie = True


    # dligne = dx et dcolonne = dy
    def parcourir(self, dcolonne, dligne, colonne, ligne):
        # check still in grid
        if (colonne + dcolonne in range(Grille.col)) & (ligne + dligne in range(Grille.row)):
            if self.grille[colonne + dcolonne][ligne + dligne] == self.derniereCouleur :
                return 1 + self.parcourir(dcolonne, dligne, colonne + dcolonne, ligne + dligne)
        return 0


    # getter
    def isFinished(self, dernierPlacement):
        return self.finie
    
    def reset(self):
        for i in range(Grille.col):
            for j in range(Grille.row):
                self.grille[i] = CouleurCase.Vide

    # affiche la grille
    def afficher(self):
        for i in reversed(range(6)):
            for j in range(7):
                print(end='|| ')
                print(self.grille[j][i].value, end=' ')
                if j==6:
                    print("||")


class GamePuissance4(Game):

    def __init__(self):
        self.grille = Grille()

    def command(self, command: str) -> None:
        
        raise Exception("Game method command() is not implemented !")
    
    def finished(self) -> bool:
        self.grille.isFinished()

    def reset(self) -> None:
        self.grille.reset()

