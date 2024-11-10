import { chrome } from "../App"

// Manages user settings
class UserManager {

    constructor(usernameState, playerColorsState) {
        this._usernameState = usernameState
        this._playerColorsState = playerColorsState

        this._initialized = false
        if (!this.username && !this.playerColors && !this._initialized) this.load()
    }

    saveUsername(username) {
        chrome.storage.sync.set({$u:this.username})
    }

    // STORAGE //
    load() {
        this._initialized = true
        chrome.storage.sync.get(sync=>{
            this.setUsername(sync.$u)
        })
    }

    get username() {return this._usernameState[0]}
    get setUsername() {return this._usernameState[1]}

    get playerColors() {return this._playerColorsState[0]}
    get setPlayerColors() {return this._playerColorsState[1]}
}

export default UserManager