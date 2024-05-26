'use strict';
// Todo Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
const STORAGETYPES = {LOCAL:"local", SYNC:"sync"}
class Todo {

    // title:"", desc:"", storageType:STORAGETYPES subTasks:[{Todo?},], start/endDate:long, catagories: ["",]
    constructor(title, storageType, order, desc, subTasks, startDate, endDate, catagories) {
        this._title = title
        this._storageType = storageType??STORAGETYPES.SYNC
        this._order = order??0
        this._desc = desc??""
        this._subTasks = subTasks??[]
        this._startDate = startDate
        this._endDate = endDate
        this._categories = catagories??[]
    }

    
    toPreBacklogHTML() {

        return 
    }





}