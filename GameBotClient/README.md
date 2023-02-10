# GameBotClient
JavaScript Ingescape agent built with the AngularJS framework.

## Agent API
### Inputs
None

### Outputs
| output| type | decription |
|-|-|-|
| `command` | string | The last `GameCommand` sent, as a JSON string |

### Services
| service | parameters | return | decription |
|---|---|---|---|
| `displayGame` | - `playerId` (string): id of the target Player<br>- `gameId` (string): id of the Game to show |  | Displays game `gameId` interface on client if the passed `playerId` matches the internal one |
| `displayHome` | - `playerId` (string): id of the target Player<br>- `message` (string?): message to show |  | Display game selection menu and a snackbar with `message` on client if the passed `playerId` matches the internal one |


## Credits

Théo DESPRATS, Sylvain CROUZET, Nicolas CORMARY  
Projet IHM - ENSEEIHT 2022/2023