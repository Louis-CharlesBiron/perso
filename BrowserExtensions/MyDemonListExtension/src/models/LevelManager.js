// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { chrome } from "../App"
import Level from "./Level"

// Level management
class LevelManager {
    constructor(levelsState) {
        this._levelsState = levelsState
        this._initialized = false
        

        if (!this._levelsState[0] && !this._initialized) this.load()
    }

    // Adds level to the list and saves
    add(level) {
        let ir = isNaN(level.rank-1) ? this.levels.length : level.rank-1
        if (!level.name) level.name = "Unnamed "+(this.levels.length+1)

        this.setLevels(levels=>{
            let v = (levels.slice(0, ir).concat(level, levels.slice(ir))).map((l,i)=>(l.rank=i+1,l))

            chrome.storage[level.storageType].set({[level.id]: level.toStorageFormat()})
            chrome.storage.sync.set({$l: v.map(l=>l.id)})
            
            return v
        })
    }

    // Deletes level from the list and saves
    remove(level) {
        this.setLevels(levels=>{
            let v = levels.filter(l=>l.id!==level.id).map((l,i)=>(l.rank=i+1,l))

            chrome.storage[level.storageType].remove(level.id)
            chrome.storage.sync.set({$l: v.map(l=>l.id)})

            return v
        })
    }

    /**
     * Updates Level and saves
     * @param {Level} level: the Level to be modified
     * @param {Object} updatedProps: an object containing the new props ex: {name:"test", date:123}
     */
    update(level, updatedProps) {
        let updatedLevel = Level.fromObject({...level.toObject(), ...updatedProps}),
            rankDif = (level.rank-updatedProps.rank)||0

        // Update list
        this.setLevels(levels=>{
            let i = levels.findIndex(x=>x.id==level.id), ls = levels.filter(x=>x.id!==level.id),
                v = (ls.slice(0, i-rankDif).concat(updatedLevel, ls.slice(i-rankDif))).map((l,i)=>(l.rank=i+1,l))

                // Update storage type
                if (updatedProps.storageType) chrome.storage[level.storageType].remove(level.id)
                // Update storage id
                if (updatedProps.id) chrome.storage[updatedLevel.storageType].remove(level.id)
                // Update storage ranks
                if (rankDif || updatedProps.id) chrome.storage.sync.set({$l: v.map(l=>l.id)})
                // Update storage Level
                chrome.storage[updatedLevel.storageType].set({[updatedLevel.id]: updatedLevel.toStorageFormat()})
                
                return v
        })
    }

    get(id) {
        return this.levels.find(x=>x.id==id)
    }

    // STORAGE //
    load(data) {
        console.log(chrome, "WHY SO MANY")
        // manual load
        if (data) this.setLevels(data.$l.map((id, rank)=>Level.toInstance(data.l.find(l=>l.a==id), rank+1)))
        // Auto storage load
        else chrome.storage.sync.get(synced=>chrome.storage.local.get(local=>{
                let all = {...synced, ...local}, levels = synced.$l?.map((id, rank)=>Level.toInstance(all[id], rank+1))

                // If older version, need to convert storage
                if (synced.$l && synced.$l.some(x=>isNaN(+x))) {
                    console.log("BACKUP", all)
                    let newRankList = synced.$l.map(name=>synced[name].id).filter(x=>x),
                        newLevelsList = synced.$l.reduce((a,b)=>(synced[b].id?a[synced[b].id]=new Level(synced[b]).toStorageFormat():(void 1),a),{}),
                        displayLevelsList = newRankList.map((id, rank)=>Level.toInstance(newLevelsList[id], rank+1))
                    
                    chrome.storage.sync.clear()
                    chrome.storage.sync.set({$l: newRankList, $u:synced.$u})
                    chrome.storage.local.set(newLevelsList)

                    this.setLevels(displayLevelsList)
                    this._initialized = true
                } else {
                    //normal load
                    this.setLevels(levels)
                    this._initialized = true
                }
        }))
    }

    get levels() {
        return this._levelsState[0]
    }

    get setLevels() {
        return this._levelsState[1]
    }

    get initialized() {
        return this._initialized
    }
}

export default LevelManager