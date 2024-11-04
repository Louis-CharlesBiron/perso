import Level from "./Level"

class LevelManager {
    constructor(levelsState) {
        this._levelsState = levelsState
        this._lastDeleted = null
        this._initialized = false
        if (!this._levelsState[0].length && !this._initialized) this.initialize()
    }

    // Add level to the list and saves
    add(level) {
        this.setLevels(levels=>{
            let v = levels.concat(level)
            this.save(v)
            return v
        })
    }

    // Deletes level from the list and saves
    remove(uid) {
        this.setLevels(levels=>{
            let v = levels.filter(l=>l.uid!==uid)
            this.save(v)
            return v
        })
    }

    // update Level ({level:Level, updatedProps:{name:"test", date:123})
    //update(level, updatedProps) {
    //    this.setProduits(ps=>{
    //        let i = ps.findIndex(x=>x.uid==level.uid), levels = ps.filter(x=>x.uid!==level.uid),
    //            v = levels.slice(0, i).concat(Produit.fromObject({...level.toObject(), ...updatedProps}), levels.slice(i))
    //        this.save(v)
    //        return v
    //    })
    //}

    get(uid) {
        return this.levels.find(x=>x.uid==uid)
    }

    // STORAGE //
    initialize() {
        if (!this._initialized) {
            setTimeout(()=>{// simulate chrome.storage callback
                this.setLevels([
                    new Level("name1", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                    new Level("name2", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "insane", "creator", "featureLvl", "gameVer", "lazyLen", "storageType"),
                ])
            },100)
        }
        this._initialized = true
    }

    save() {
        console.log("SAVE TODO")
    }

    load() {

    }


    get levels() {
        return this._levelsState[0]
    }

    get setLevels() {
        return this._levelsState[1]
    }
}

export default LevelManager