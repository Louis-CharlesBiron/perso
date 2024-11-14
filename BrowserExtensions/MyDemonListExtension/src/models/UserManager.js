// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
// import { chrome } from '../App'

// Manages user settings
class UserManager {

    constructor(usernameState, playerColorsState, hasUnsavedChangesState, defaultStorageTypeState) {
        this._usernameState = usernameState
        this._playerColorsState = playerColorsState
        this._hasUnsavedChangesState = hasUnsavedChangesState
        this._defaultStorageTypeState = defaultStorageTypeState

        this._initialized = false
        if (!this.username && !this.playerColors && !this._initialized) this.load()
    }

    saveUsername(username=this.username) {
        chrome.storage.sync.set({$u:username})
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

    get hasUnsavedChanges() {return this._hasUnsavedChangesState[0]}
    get setHasUnsavedChanges() {return this._hasUnsavedChangesState[1]}

    get defaultStorageType() {return this._defaultStorageTypeState[0]}
    get setDefaultStorageType() {return this._defaultStorageTypeState[1]}
}

export default UserManager