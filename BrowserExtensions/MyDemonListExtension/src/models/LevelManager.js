import Level from "./Level"

let fakechrome = {storage:{
    syncv:{
        // settings
        $u:"LCB79",
        $s:"local",
        $l:[123012309, 333, 128, 111, 129, 222],
        // levels
        128:{a:128, b:"this._name128", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
        129:{a:129, b:"this._name129", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
        123012309:{a:123012309, b:"this._name123012309", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
    },
    localv:{
        // levels
        111:{a:111, b:"this._name111", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
        222:{a:222, b:"this._name222", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
        333:{a:333, b:"this._name333", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
    },
    sync:{
        get:(cb)=>{
            setTimeout(()=>cb(fakechrome.storage.syncv), 100)
        },
        set:(obj)=>{
            setTimeout(()=>fakechrome.storage.syncv[Object.keys(obj)[0]] = Object.values(obj)[0], 100)
        },
        remove:(key)=>{
            setTimeout(()=>delete fakechrome.storage.syncv[key], 100)
        }
    },
    local:{
        get:(cb)=>{
            setTimeout(()=>cb(fakechrome.storage.localv), 100)
        },
        set:(obj)=>{
            setTimeout(()=>fakechrome.storage.localv[Object.keys(obj)[0]] = Object.values(obj)[0], 100)
        },
        remove:(key)=>{
            setTimeout(()=>delete fakechrome.storage.localv[key], 100)
        }
    }
}}

class LevelManager {
    constructor(levelsState) {
        this._levelsState = levelsState
        this._lastDeleted = null
        this._initialized = false
        if (!this._levelsState[0].length && !this._initialized) this.load()
    }

    // Add level to the list and saves
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
        //console.log("UPDATED LEVEL:", updatedLevel, updatedLevel.rank, level.toObject().rank, updatedProps.rank, level.rank, rankDif)

        // Update list
        this.setLevels(levels=>{
            let i = levels.findIndex(x=>x.id==level.id), ls = levels.filter(x=>x.id!==level.id),
                v = (ls.slice(0, i-rankDif).concat(updatedLevel, ls.slice(i-rankDif))).map((l,i)=>(l.rank=i+1,l))

                console.log(rankDif, v.map(l=>l.id), v)
            

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

    saveAll() {
        console.log("SAVEALL? TODO")


    }

    load() {
        console.log(fakechrome)
        fakechrome.storage.sync.get(synced=>{
            //set global settings

            fakechrome.storage.local.get(local=>{
                let all = {...synced, ...local},
                    levels = synced.$l.map((id, rank)=>Level.toInstance(all[id], rank+1))

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
}

export default LevelManager