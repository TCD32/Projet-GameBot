# GameBot
Python Ingescape agent.

## Agent API
### Inputs
| input | type | decription |
|-|-|-|
| `command` | string | The GameCommand to execute, as a JSON string |

### Outputs
| output | type | decription |
|-|-|-|
| `game_title` | string | The title of the running Game |

### Services
| service | parameters | return | decription |
|---|---|---|---|
| `ready` | - `gameId` (string): id of the target Game<br>- `playerJSON` (string): the target Player as a JSON string |  | Sets the player `playerJSON` to ready or not ready for game `gameId` |

## Credits

Théo DESPRATS, Sylvain CROUZET, Nicolas CORMARY  
Projet IHM - ENSEEIHT 2022/2023