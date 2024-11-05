import Level from "./Level"

class LevelManager {
    constructor(levelsState) {
        this._levelsState = levelsState
        this._lastDeleted = null
        this._initialized = false
        if (!this._levelsState[0].length && !this._initialized) this.load()
    }

    // Add level to the list and saves
    add(level) {
        this.setLevels(levels=>{
            let v = levels.concat(level)
            // add to storage
        })
    }

    // Deletes level from the list and saves
    remove(id) {
        this.setLevels(levels=>{
            let v = levels.filter(l=>l.id!==id)
            // remove from storage
        })
    }

    // update Level ({level:Level, updatedProps:{name:"test", date:123})
    update(level, updatedProps) {
        let updatedLevel//TODO
        this.setLevels(levels=>{
            let i = levels.findIndex(x=>x.id==level.id), ls = levels.filter(x=>x.id!==level.id),
                v = ls.slice(0, i).concat(/*Produit.fromObject({...level.toObject(), ...updatedProps})*/["temp"], ls.slice(i))
                return v
        })
    }

    get(id) {
        return this.levels.find(x=>x.id==id)
    }


    // STORAGE //

    saveAll() {
        console.log("SAVEALL? TODO")


    }

    load() {
        // chrome.storage.sync.get(synced=>{
            // set global settings
            // chrome.storage.local.get(local=>{
                // this.setLevels
                //this._initialized = true
            // })
        // })
        setTimeout(()=>{// simulate chrome.storage callback

            let r = {
                // settings
                $u:"LCB79",
                $s:"local",
                $l:[123012309, 128, 129],
                // levels
                128:{a:128, b:"this._name", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"this._storageType"},
                129:{a:129, b:"this._name1", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"this._storageType"},
                123012309:{a:123012309, b:"this._name2", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"this._storageType"},
            }


            this.setLevels(r.$l.map((id, rank)=>Level.toInstance(r[id], rank)))
            this._initialized = true
        },100)
    }

    get levels() {
        return this._levelsState[0]
    }

    get setLevels() {
        return this._levelsState[1]
    }
}

export default LevelManager