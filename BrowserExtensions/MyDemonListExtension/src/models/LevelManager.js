import { fakechrome } from "../App"
import Level from "./Level"

// Level management
class LevelManager {
    constructor(levelsState) {
        this._levelsState = levelsState
        this._lastDeleted = null
        this._initialized = false
        if (!this._levelsState[0].length && !this._initialized) this.load()
    }

    // Adds level to the list and saves
    add(level) {
        let ir = isNaN(level.rank-1) ? this.levels.length : level.rank-1
        if (!level.name) level.name = "Unnamed "+(this.levels.length+1)

        this.setLevels(levels=>{
            let v = (levels.slice(0, ir).concat(level, levels.slice(ir))).map((l,i)=>(l.rank=i+1,l))

            fakechrome.storage[level.storageType].set({[level.id]: level.toStorageFormat()})
            fakechrome.storage.sync.set({$l: v.map(l=>l.id)})
            
            return v
        })
    }

    // Deletes level from the list and saves
    remove(level) {
        this.setLevels(levels=>{
            let v = levels.filter(l=>l.id!==level.id).map((l,i)=>(l.rank=i+1,l))

            fakechrome.storage[level.storageType].remove(level.id)
            fakechrome.storage.sync.set({$l: v.map(l=>l.id)})

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
                if (updatedProps.storageType) fakechrome.storage[level.storageType].remove(level.id)
                // Update storage id
                if (updatedProps.id) fakechrome.storage[updatedLevel.storageType].remove(level.id)
                // Update storage ranks
                if (rankDif || updatedProps.id) fakechrome.storage.sync.set({$l: v.map(l=>l.id)})
                // Update storage Level
                fakechrome.storage[updatedLevel.storageType].set({[updatedLevel.id]: updatedLevel.toStorageFormat()})
                
                return v
        })
    }

    get(id) {
        return this.levels.find(x=>x.id==id)
    }


    // STORAGE //
    load() {
        console.log(fakechrome)
        fakechrome.storage.sync.get(synced=>{
            //set global settings

            fakechrome.storage.local.get(local=>{
                let all = {...synced, ...local}, levels = synced.$l.map((id, rank)=>Level.toInstance(all[id], rank+1))
                this.setLevels(levels)
                this._initialized = true
            })
        })
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