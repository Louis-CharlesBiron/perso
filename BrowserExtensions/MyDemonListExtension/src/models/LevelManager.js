import Level from "./Level"

class LevelManager {
    constructor(levelsState) {
        this._levelsState = levelsState
        if (!this._levelsState[0].length) this.initialize()
    }

    add(produit) {
        this.setLevels(ps=>{
            let newId = produit.id
            while (this.levels.find(p=>p.id==newId)) produit.id = ++newId

            let v = ps.concat(produit)
            this.save(v)
            return v
        })
    }

    remove(id) {
        this.setLevels(ps=>{
            let v = ps.filter(p=>p.id!==id)
            this.save(v)
            return v
        })
    }

    // update Level ({level:Level, updatedProps:{name:"test", date:123})
    //update(level, updatedProps) {
    //    this.setProduits(ps=>{
    //        let i = ps.findIndex(x=>x.id==level.id), levels = ps.filter(x=>x.id!==level.id),
    //            v = levels.slice(0, i).concat(Produit.fromObject({...level.toObject(), ...updatedProps}), levels.slice(i))
    //        this.save(v)
    //        return v
    //    })
    //}

    get(id) {
        return this.levels.find(x=>x.id==id)
    }

    // STORAGE //
    initialize() {
        this.setLevels([new Level("name", "title", "url", "attempts", "progs", "11", "2024-11-02", "enjoy", 128, "2:1", "song", "songurl", "objs", "diff", "creator", "featureLvl", "gameVer", "lazyLen", "storageType")])
    }

    save() {

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