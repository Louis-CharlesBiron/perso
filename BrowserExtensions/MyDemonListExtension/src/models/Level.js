// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
let oLevelCount=0

class Level {
    constructor(idOrLevel, rank, name, title, url, attempts, progs, time, date, enjoy, length, song, songURL, objects, diff, creator, featureLevel, gameVersion, lazyLength, storageType) {
        if (typeof idOrLevel == "object") {
            name = idOrLevel.name ?? idOrLevel[1]
            title = idOrLevel.title ?? idOrLevel[2]
            url = idOrLevel.url ?? idOrLevel[3]
            attempts = idOrLevel.attempts ?? idOrLevel[4]
            progs = idOrLevel.progs ?? idOrLevel[5]
            time = idOrLevel.time ?? idOrLevel[6]
            date = idOrLevel.date ?? idOrLevel[7]
            enjoy = idOrLevel.enjoy ?? idOrLevel[8]
            length = idOrLevel instanceof Array ? idOrLevel[9] : idOrLevel.length
            song = idOrLevel.song ?? idOrLevel[10]
            songURL = idOrLevel.songURL ?? idOrLevel[11]
            objects = idOrLevel.objects ?? idOrLevel[12]
            diff = idOrLevel.diff ?? idOrLevel[13]
            creator = idOrLevel.creator ?? idOrLevel[14]
            featureLevel = idOrLevel.featureLevel ?? idOrLevel[15]
            gameVersion = idOrLevel.gameVersion ?? idOrLevel[16]
            lazyLength = idOrLevel.lazyLength ?? idOrLevel[17]
            storageType = idOrLevel.storageType ?? idOrLevel[18]
            idOrLevel = idOrLevel.id ?? idOrLevel[0]
        }

        this._id = idOrLevel                            // in-game level id (UNIQUE)
        this._name = name||"Unnamed "+oLevelCount++     // level name
        this._title = title                             // level hover title
        this._url = url                                 // completion url
        this._attempts = attempts                       // attempt count
        this._progs = progs                             // list of progresses ("1 3 5 12")??
        this._time = time                               // time taken (days)
        this._date = date                               // completion date in ms
        this._enjoy = enjoy                             // enjoyement rating
        this._length = length                           // level length as string (ex: "2:01")
        this._song = song                               // song name
        this._songURL = songURL                         // song url
        this._objects = objects                         // object count
        this._diff = diff                               // level difficulty
        this._creator = creator                         // level's creator name
        this._featureLevel = featureLevel               // level feature rating (int)
        this._lazyLength = lazyLength                   // level length rating (Small - XL)
        this._gameVersion = gameVersion                 // game version at time of release date 
        this._storageType = storageType||"local"        // storage type (sync / local)

        this._rank = rank                               // level's personnal ranking on the list
    }

    toStorageFormat() {
        return {a:this._id, b:this._name, c:this._title, d:this._url, e:this._attempts, f:this._progs, g:this._time, h:this._date, i:this._enjoy, j:this._length, k:this._song, l:this._songURL, m:this._objects, n:this._diff, o:this._creator, p:this._featureLevel, q:this._gameVersion, r:this._lazyLength, s:this._storageType}
    }

    toObject() {

    }

    save() {
        chrome.storage[this._storageType].set({})
    }


    // getLengthInSeconds() {
    //     return (this._length+"")?.split(":").reduce((a, b, i)=>a+=i?+b:b*60,0)||0
    // }

    // getFormatedLength() {
    //     let t = msToTime(this.getLengthInSeconds()*1000)
    //     return `${pad0(t[3])}:${pad0(t[4])} (${this._lazyLength})`
    // }


    // Storage format to Level instance
    static toInstance(obj, rank) {
        return new Level(Object.values(obj), rank)
    }

    // From plain js to Level Instance
    static fromObject() {

    }

    static get PERSO_INFOS_DISPLAY_PROPS() {
        return [{prop:"attempts"}, {prop:"progs"}, {prop:"time"}, {prop:"date", mod:"getLengthInSeconds"}, {prop:"enjoy"}]
    }

    static get LEVEL_INFOS_DISPLAY_PROPS() {
        return [{prop:"id"}, {prop:"creator"}, {prop:"length"}, {prop:"song"}, {prop:"objects"}, {prop:"diff"}]
    }

	get uid() {return this._uid}
	get id() {return this._id}
	get rank() {return this._rank}
	get name() {return this._name}
	get title() {return this._title}
	get url() {return this._url}
	get attempts() {return this._attempts}
	get progs() {return this._progs}
	get time() {return this._time}
	get date() {return this._date}
	get enjoy() {return this._enjoy}
	get length() {return this._length}
	get song() {return this._song}
	get songURL() {return this._songURL}
	get objects() {return this._objects}
	get diff() {return this._diff}
	get creator() {return this._creator}
	get featureLevel() {return this._featureLevel}
	get lazyLength() {return this._lazyLength}
	get gameVersion() {return this._gameVersion}
	get storageType() {return this._storageType}


}

export default Level