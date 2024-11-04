// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//
let idGiver = 0

class Level {
    constructor(nameOrLevel, title, url, attempts, progs, time, date, enjoy, id, length, song, songURL, objects, diff, creator, featureLevel, gameVersion, lazyLength, storageType) {
        this._uid = idGiver++
        
        if (typeof nameOrLevel == "object") {
            id = nameOrLevel.id
            title = nameOrLevel.title
            url = nameOrLevel.url
            attempts = nameOrLevel.attempts
            progs = nameOrLevel.progs
            time = nameOrLevel.time
            date = nameOrLevel.date
            enjoy = nameOrLevel.enjoy
            length = nameOrLevel.length
            song = nameOrLevel.song
            songURL = nameOrLevel.songURL
            objects = nameOrLevel.objects
            diff = nameOrLevel.diff
            creator = nameOrLevel.creator
            featureLevel = nameOrLevel.featureLevel
            gameVersion = nameOrLevel.gameVersion
            lazyLength = nameOrLevel.lazyLength
            storageType = nameOrLevel.storageType
            nameOrLevel = nameOrLevel.name
        }

        //this.rank
        this._id = id                                   // in-game level id
        this._name = nameOrLevel||"Unnamed "+this._uid  // level name
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
    }


    test(asd) {
        return "TEST MOD WORK"+asd
    }

    // getLengthInSeconds() {
    //     return (this._length+"")?.split(":").reduce((a, b, i)=>a+=i?+b:b*60,0)||0
    // }

    // getFormatedLength() {
    //     let t = msToTime(this.getLengthInSeconds()*1000)
    //     return `${pad0(t[3])}:${pad0(t[4])} (${this._lazyLength})`
    // }

    save() {
        
    }

    remove() {

    }

    
    update() {

    }

    static get PERSO_INFOS_DISPLAY_PROPS() {
        return [{prop:"attempts"}, {prop:"progs"}, {prop:"time"}, {prop:"date", mod:"test"}, {prop:"enjoy"}]
    }

    static get LEVEL_INFOS_DISPLAY_PROPS() {
        return [{prop:"id"}, {prop:"creator"}, {prop:"length"}, {prop:"song"}, {prop:"objects"}, {prop:"diff"}]
    }

	get uid() {return this._uid}
	get id() {return this._id}
	//get rank() {return this.rank}
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