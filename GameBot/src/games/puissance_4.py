
import base64
import numpy as np

from io import BytesIO
from enum import Enum
from PIL import Image as im

from services.whiteboard_service import WhiteboardService
from models.game_state import GameState
from models.game import Game

class CouleurCase(Enum):
    Vide = 0
    Joueur1 = 1
    Joueur2 = 2

# grille 7 colonnes 6 lignes
class Grille:
    col = 7
    row = 6

    # on init la grille avec des cases vides
    def __init__(
        self,
        whiteboard_service: WhiteboardService,
        players_ids: list[str],
        state: GameState,
    ):
        self.state = state
        self.whiteboard_service = whiteboard_service
        # player ids to number
        self.players_number = {
            players_ids[0]: 1,
            players_ids[1]: 2,
        }
        #param jeu fini
        self.finie = False
        # dernière couleur placée, used to check victory
        self.derniereCouleur = CouleurCase.Vide
        # array pour générer image
        self.array = np.zeros((720,1024,3), dtype=np.uint8)
        self.array[0:720, 0:1024] = [0,0,255]
        for colonne in range(Grille.col):
            for ligne in range(Grille.row):
                for j in range(146 * colonne + 20, 146 * colonne + 100):
                    for i in range(-120 * ligne -100, -120 * ligne - 20):
                        self.array[i, j] = [255, 255, 255]
        self.generate_image()
        #init grille
        self.grille = []
        for i in range(Grille.col):
            self.grille.append([])
            for j in range(Grille.row):
                self.grille[i].append(CouleurCase.Vide)

    # vérification que la colonne est non pleine
    def choixPossible(self, choix):
        return (self.grille[int(choix)][-1] == CouleurCase.Vide) and (int(choix) in [0,1,2,3,4,5,6])
    
    # ajout tuile colonne
    def ajouter(self, player_id: str, colonne: int) -> tuple:
        joueur = self.players_number.get(player_id, -1)
        # check
        if joueur == -1:
            raise Exception("Puissance_4 : Wrong player number")
        if self.finie:
            raise Exception("Puissance_4 : Game is already finished")
        if CouleurCase(joueur) == self.derniereCouleur:
            raise Exception("Puissance_4 : Same player can't play twice in a row")
        if colonne not in range(Grille.col):
            raise Exception("Puissance_4 : Column ", colonne, "out of range")
        if self.grille[colonne][Grille.row-1] != CouleurCase.Vide:
            raise Exception("Puissance_4 : Column is full")

        # self.whiteboard_service.clear()
        # self.whiteboard_service.chat(f"Au tour de {self.state.players[(player_id + 1) % 2].nickname} !")

        for ligne in range(Grille.row - 1, -1, -1):
            if self.grille[colonne][ligne - 1] != CouleurCase.Vide or ligne == 0:
                self.grille[colonne][ligne] = CouleurCase(joueur)
                self.derniereCouleur = CouleurCase(joueur)
                self.checkFini(colonne, ligne)
                self.colorer(colonne, ligne)
                return (colonne, ligne)

    # arg : colonne = colonne du dernier placement;; ligne = ligne du dernier placement
    def checkFini (self, colonne: int, ligne:int) -> None:
        alignementVert = self.parcourir(1, 0, colonne, ligne) + self.parcourir(-1, 0, colonne, ligne)
        alignementHoriz = self.parcourir(0, 1, colonne, ligne) + self.parcourir(0, -1, colonne, ligne)
        # diagonale : bas à gauche vers haut à droite 
        alignementDiagX = self.parcourir(1, 1, colonne, ligne) + self.parcourir(-1, -1, colonne, ligne)
        # diagonale : descendant
        alignementDiag_X = self.parcourir(-1, 1, colonne, ligne) + self.parcourir(1, -1, colonne, ligne)
        if alignementVert >= 3 or alignementHoriz >= 3 or alignementDiagX >= 3 or alignementDiag_X >= 3:
             self.finie = True

    # dligne = dx et dcolonne = dy
    def parcourir(self, dcolonne:int, dligne:int, colonne:int, ligne:int) -> int:
        # check still in grid
        if (colonne + dcolonne in range(Grille.col)) & (ligne + dligne in range(Grille.row)):
            if self.grille[colonne + dcolonne][ligne + dligne] == self.derniereCouleur :
                return 1 + self.parcourir(dcolonne, dligne, colonne + dcolonne, ligne + dligne)
        return 0

    # getter
    def isFinished(self) -> bool:
        return self.finie
    
    def reset(self) -> None:
        self.finie = False
        # dernière couleur placée, used to check victory
        self.derniereCouleur = CouleurCase.Vide
        # array pour générer image
        self.array = np.zeros((720,1024,3), dtype=np.uint8)
        self.array[0:720, 0:1024] = [0,0,255]
        for colonne in range(Grille.col):
            for ligne in range(Grille.row):
                for j in range(146 * colonne + 20, 146 * colonne + 100):
                    for i in range(-120 * ligne -100, -120 * ligne - 20):
                        self.array[i, j] = [255, 255, 255]
        self.generate_image()
        #init grille
        for i in range(Grille.col):
            for j in range(Grille.row):
                self.grille[i] = CouleurCase.Vide

    # affiche la grille en commande
    def afficher(self) -> None:
        for i in reversed(range(6)):
            for j in range(7):
                print(end='|| ')
                print(self.grille[j][i].value, end=' ')
                if j==6:
                    print("||")

    def colorer(self, colonne, ligne):
        print( self.derniereCouleur)
        if CouleurCase(1) == self.derniereCouleur:
            couleur = [0,255,0]
        else:
            couleur = [255,0,0]
        for j in range(146 * colonne + 20, 146 * colonne + 100):
            for i in range(-120 * ligne -100, -120 * ligne - 20):
                self.array[i, j] = couleur
        self.generate_image()

    # appelé tout seul quand changement
    def generate_image(self):
        image_file = BytesIO()
        image = im.fromarray(self.array, 'RGB')
        image.save(image_file, format="PNG")
        image_data = image_file.getvalue()
        image_b64 = base64.b64encode(image_data).decode("utf-8")

        self.whiteboard_service.add_image(image_b64, 200.0, 50.0, 450.0, 350.0)


class GamePuissance4(Game):
    grille: Grille

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def start(self):
        super().start()
        players_ids = list(self.state.players.keys())
        self.grille = Grille(self.whiteboard_service, players_ids, self.state)

    # formats commandes : {"colonne":int (0 - 6)}
    def command(self, command):
        player_id = command.player_id
        colonne = command.command.get("colonne", -1)
        if colonne == -1:
            raise Exception("Puissance_4 : missing value in command :", command)
        self.grille.ajouter(player_id, colonne)

    def finished(self):
        if self.grille.isFinished():
            if self.grille.derniereCouleur.value == 1:
                self.state.player_winner = self.state.players[0]
            else:
                self.state.player_winner = self.state.players[1]
                
            self.state.game_running = False

            return super().finished()
        return False

    def reset(self):
        super().reset()
        self.grille.reset()

