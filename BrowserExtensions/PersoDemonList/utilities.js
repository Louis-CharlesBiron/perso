// JS
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

const wday_bank = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
month_bank = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
featureLevels = ["no rate", "rate", "featured", "epic", "legendary", "mythic"]

function pad0(num) {return (num	< 10) ? '0'+ num : num}

function getDateFormated() {
    let d = new Date()
    return `${pad0(d.getFullYear())}-${pad0(d.getMonth()+1)}-${pad0(d.getDate())}`
}

function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

function getLengthInSeconds(length) {
    return (length+"")?.split(":").reduce((a, b, i)=>a+=i?+b:b*60,0)||0
}

function daysBetweenDates(d1, d2=new Date().getTime()) {
    return Math.floor(Math.abs(d1-d2)/86400000)
}

function msToTime(ms=0) {// y:0, d:1, h:2, m:3, s:4, ms:5
    return [365.2422,24,60,60,1000].reduce((a, b, i)=>(a.push((a[i]%1)*b),a),[ms/1000/60/60/24/365.2422]).map(x=>x>>0)
}

Element.prototype.num_input_opt = function num_input_opt(invalids, replaceElementValue, min, max) {// valids = "1234567890-+.e"
    let v = this.value
    min = (isNaN(min)) ? Number(this.min) : Number(min),
    max = (isNaN(max)) ? Number(this.max) : Number(max)
    v = v.replaceAll(new RegExp("(["+invalids+"])+","gi"), "")
    if (v !== "") v = (v < min) ? min : (v > max) ? max : v
    if (replaceElementValue) {
        this.onblur=()=>{
            if (v == "") this.value = min
            if (typeof this.oninput == "function") this.oninput()
        }
        this.value = v
    }
    return v
}

Element.prototype.input_opt = function(chars, charstate, replaceElementValue) {// chars(the characters to check), charstate(whether the characters are valid or invalid), replaceElementValue(if defined, will replace the element value and this arg value is the default value)
    let new_v = this.value.replaceAll(new RegExp("(["+((charstate=="valid") ? "^" : "")+chars+"])+","g"), "")
    if (replaceElementValue !== null && replaceElementValue !== false) {
        this.onblur=()=>{
            if (this.value == "") this.value = replaceElementValue
            if (typeof this.oninput == "function") this.oninput()
        }
        this.value = new_v
    }
    return new_v
}

Number.prototype.numSep = String.prototype.numSep = function(){
    return (this+"").split("").reduce((a, b)=>{return b+a}).split("").reduce((x, y, i)=>{return y+(i%3==0?",":"")+x})
}

function hardReset() {
    chrome.storage.sync.clear()
    chrome.storage.sync.set({
        $a:1,
        $bd:[]
    })
}

function r() {
    chrome.storage.sync.get((r)=>{console.log(r)})
}

function arrr() {
    chrome.storage.sync.set({
        "$l": [
            "Phobos",
            "Marathon",
            "Bloodbath",
            "A Bizzare Phantasm",
            "Moment",
            "Aftermath",
            "Duelo Maestro",
            "Dark Odyssey",
            "Cataclysm",
            "Acu",
            "Azurite",
            "The End",
            "ICDX",
            "Acropolis",
            "Ulon",
            "Supersonic",
            "Invisible Deadlocked",
            "El Dorado",
            "Poltergeist",
            "Carp Minor",
            "Fishbass",
            "Chroma",
            "Sharp Minor",
            "Windy Landscape",
            "SlaughterHouse",
            "Stereo Demoness",
            "Buff This",
            "dooMEd",
            "Omicron",
            "Stalemate",
            "The Moonlight"
        ],
        "$u": "LCB79",
        "A Bizzare Phantasm": {
            "attempts": "19875",
            "date": "2023-11-18",
            "diff": "extreme",
            "enjoy": "42",
            "id": "16023141",
            "length": "1:58",
            "name": "A Bizzare Phantasm",
            "objects": "39686",
            "progs": "6 9 10 28 41 54 61 64 66 69 71 80 100",
            "rank": "4",
            "song": "Betrayal Of Fate",
            "songURL": "https://www.newgrounds.com/audio/listen/137492",
            "time": "43",
            "title": "finally man..",
            "url": "https://www.youtube.com/watch?v=TFXv_hUul3I"
        },
        "Acropolis": {
            "attempts": "9402",
            "date": "2023-05-25",
            "diff": "insane",
            "enjoy": "38",
            "id": "5155022",
            "length": "1:14",
            "name": "Acropolis",
            "objects": "11083",
            "progs": "3 4 5 7 8 10 17 27 29 53 55 60 78 100",
            "rank": "7",
            "song": "-Final Battle-",
            "songURL": "https://www.newgrounds.com/audio/listen/598349",
            "time": "2",
            "title": "",
            "url": "https://www.youtube.com/watch?v=-kyNoiaXEjw"
        },
        "Acu": {
            "attempts": "12446",
            "date": "2023-06-14",
            "diff": "extreme",
            "enjoy": "85",
            "id": "61079355",
            "length": "1:17",
            "name": "Acu",
            "objects": "32155",
            "progs": "1 2 3 4 7 11 12 13 15 16 18 23 28 29 30 62 76 92 98 100",
            "rank": "4",
            "song": "Epiloge - Creo",
            "songURL": "https://www.newgrounds.com/audio/listen/723714",
            "time": "1",
            "title": "I beat Acu!",
            "url": "https://www.youtube.com/watch?v=o8AqRXlGUfc"
        },
        "Aftermath": {
            "attempts": "9509",
            "date": "2023-12-28",
            "diff": "extreme",
            "enjoy": "45",
            "id": "25610878",
            "length": "1:3",
            "name": "Aftermath",
            "objects": "16107",
            "progs": "",
            "rank": "5",
            "song": "At The Speed Of Light",
            "songURL": "https://www.newgrounds.com/audio/listen/467339",
            "time": "18",
            "title": "idk",
            "url": "https://www.youtube.com/watch?v=ltrZEjrN2As"
        },
        "Azurite": {
            "attempts": "4411",
            "date": "2023-09-17",
            "diff": "extreme",
            "enjoy": "95",
            "id": "62214792",
            "length": "1:09",
            "name": "Azurite",
            "objects": "86524",
            "progs": "1 3 4 5 7 8 17 20 22 26 39 46 47 58 100",
            "rank": "7",
            "song": "Center Of Existence",
            "songURL": "https://www.youtube.com/watch?v=HYgdTcBdpoY",
            "time": "4",
            "title": "Fluke from 58%",
            "url": "https://www.youtube.com/watch?v=5VJvOzdhl4E"
        },
        "Bloodbath": {
            "attempts": "120274",
            "date": "2023-12-10",
            "diff": "extreme",
            "enjoy": "95",
            "id": "10565740",
            "length": "1:52",
            "name": "Bloodbath",
            "objects": "24746",
            "progs": "1 2 3 6 7 8 11 14 16 17 19 25 27 31 51 58 65 76 85 100",
            "rank": "3",
            "song": "At The Speed Of light",
            "songURL": "https://www.newgrounds.com/audio/listen/467339",
            "time": "20",
            "title": "omg wtf",
            "url": "https://www.youtube.com/watch?v=fpK9UxIKooo"
        },
        "Buff This": {
            "attempts": "2788",
            "date": "2023-09-23",
            "diff": "insane",
            "enjoy": "58",
            "id": "38306937",
            "length": "1:02",
            "name": "Buff This",
            "objects": "62803",
            "progs": "1 2 3 4 6 8 27 31 35 53 71 80 82 85 95 100",
            "rank": "21",
            "song": "Nerf This",
            "songURL": "https://www.newgrounds.com/audio/listen/726252",
            "time": "1",
            "title": ":/",
            "url": "https://www.youtube.com/watch?v=p8soMpxh82Q"
        },
        "Carp Minor": {
            "attempts": "3279",
            "date": "2023-01-16",
            "diff": "insane",
            "enjoy": "37",
            "id": "87353798",
            "length": "1:17",
            "name": "Carp Minor",
            "objects": "76449",
            "progs": "2 4 7 22 23 46 60 65 73 83 92 100",
            "rank": "13",
            "song": "ill sharp minor",
            "songURL": "https://www.newgrounds.com/audio/listen/559803",
            "time": "5",
            "title": "",
            "url": "https://www.youtube.com/watch?v=TGAczoXgC_4"
        },
        "Cataclysm": {
            "attempts": "34439",
            "date": "2023-05-29",
            "diff": "extreme",
            "enjoy": "74",
            "id": "3979721",
            "length": "1:27",
            "name": "Cataclysm",
            "objects": "15216",
            "progs": "1 2 5 10 11 13 18 20 23 24 36 41 48 74 100",
            "rank": "5",
            "song": "At The Speed Of Light",
            "songURL": "https://www.newgrounds.com/audio/listen/467339",
            "time": "2",
            "title": "",
            "url": "https://www.youtube.com/watch?v=rNw9EYaOkTw"
        },
        "Chroma": {
            "attempts": "5480",
            "date": "2023-03-13",
            "diff": "insane",
            "enjoy": "26",
            "id": "68372319",
            "length": "1:0",
            "name": "Chroma",
            "objects": "94540",
            "progs": "3 8 10 11 13 14 18 21 23 28 35 38 54 63 71 79 97 100",
            "rank": "15",
            "song": "{Rose}",
            "songURL": "https://www.newgrounds.com/audio/listen/65711",
            "time": "",
            "title": "a level",
            "url": "https://www.youtube.com/watch?v=rp_eQuPKYk8"
        },
        "Dark Odyssey": {
            "attempts": "25473",
            "date": "2023-05-27",
            "diff": "extreme",
            "enjoy": "50",
            "id": "69010770",
            "length": "06:15",
            "name": "Dark Odyssey",
            "objects": "311900",
            "progs": "2 6 7 10 16 18 23 27 32 34 35 41 50 59 64 73 76 82 99 100",
            "rank": "3",
            "song": "Dark Matter Suite",
            "songURL": "https://www.newgrounds.com/audio/listen/693041",
            "time": "3",
            "title": "Omg, I just- HUU",
            "url": "https://www.youtube.com/watch?v=6fO1XW76jIw"
        },
        "Duelo Maestro": {
            "attempts": "43000",
            "date": "2022-01-20",
            "diff": "insane",
            "enjoy": "95",
            "id": "23298409",
            "length": "03:43",
            "name": "Duelo Maestro",
            "objects": "45133",
            "progs": "1 2 3 4 5 7 8 9 15 18 25 30 41 42 43 52 53 79 100",
            "rank": "3",
            "song": "~Lunar Abyss~",
            "songURL": "https://www.youtube.com/watch?v=F_TV4vZRSE8",
            "time": "120",
            "title": "What a journey <3",
            "url": "https://www.youtube.com/watch?v=aC-VFIgagJ4"
        },
        "El Dorado": {
            "attempts": "9172",
            "date": "",
            "diff": "insane",
            "enjoy": "40",
            "id": "11904920",
            "length": "1:0",
            "name": "El Dorado",
            "objects": "8879",
            "progs": "2 4 5 6 7 8 10 13 17 35 36 51 68 71 100",
            "rank": "11",
            "song": "-Thunderzone v2-",
            "songURL": "https://www.newgrounds.com/audio/listen/638150",
            "time": "5",
            "title": "This level is actually quite hard! Quite glad it's done (beaten in five days :)). Overall kind of fun, but I don't exactly recommend. 5th insane demon tho :)",
            "url": "https://www.youtube.com/watch?v=DKYLG-kw9R8"
        },
        "Fishbass": {
            "attempts": "5813",
            "date": "",
            "diff": "insane",
            "enjoy": "70",
            "id": "86565813",
            "length": "1:12",
            "name": "Fishbass",
            "objects": "57333",
            "progs": "1 18 20 28 29 30 42 73 74 75 91 100",
            "rank": "14",
            "song": "Fracture",
            "songURL": "https://www.newgrounds.com/audio/listen/433947",
            "time": "",
            "title": "Pretty fun",
            "url": "https://www.youtube.com/watch?v=VNm4_ZkIkG4"
        },
        "ICDX": {
            "attempts": "3580",
            "date": "2023-09-27",
            "diff": "insane",
            "enjoy": "88",
            "id": "814678",
            "length": "1:27",
            "name": "ICDX",
            "objects": "7816",
            "progs": "1 2 3 4 27 28 40 100",
            "rank": "9",
            "song": "Clubstep",
            "songURL": "https://www.youtube.com/watch?v=vj8ZW0jr83I",
            "time": "3",
            "title": "fluke from fucking 40",
            "url": "https://www.youtube.com/watch?v=u-xUl24IqsA"
        },
        "Invisible Deadlocked": {
            "attempts": "8072",
            "date": "",
            "diff": "insane",
            "enjoy": "80",
            "id": "14145098",
            "length": "1:39",
            "name": "Invisible Deadlocked",
            "objects": "19460",
            "progs": "2 4 6 8 10 11 16 26 36 46 74 78 100",
            "rank": "10",
            "song": "Deadlocked",
            "songURL": "https://www.youtube.com/watch?v=OPBECnDBiRQ",
            "time": "",
            "title": "",
            "url": ""
        },
        "Marathon": {
            "attempts": "39428",
            "date": "2023-05-23",
            "diff": "extreme",
            "enjoy": "Fucking glad it's done",
            "id": "57595201",
            "length": "4:34",
            "name": "Marathon",
            "objects": "32990",
            "progs": "1 2 3 4 5 7 9 10 13 14 15 16 17 19 22 23 29 33 65 67 69 70 93 100",
            "rank": "2",
            "song": "Troubles",
            "songURL": "https://www.youtube.com/watch?v=e_CqYoKGef4",
            "time": "125",
            "title": "Definition of daunting, but I love it",
            "url": "https://www.youtube.com/watch?v=a4XNW8z8N68"
        },
        "Moment": {
            "attempts": "10153",
            "date": "2024-02-04",
            "diff": "extreme",
            "enjoy": "90",
            "id": "68848817",
            "length": "1:02",
            "name": "Moment",
            "objects": "31553",
            "progs": "2 12 14 16 19 26 29 53 64 76 87 100",
            "rank": "5",
            "song": "moment",
            "songURL": "https://www.youtube.com/watch?v=1QMG2QjsjdA",
            "time": "15",
            "title": "10th extreme :)",
            "url": "https://www.youtube.com/watch?v=NamE7cErIUs"
        },
        "Omicron": {
            "attempts": "1308",
            "date": "2023-07-18",
            "diff": "insane",
            "enjoy": "96",
            "id": "20053020",
            "length": "1:01",
            "name": "Omicron",
            "objects": "12684",
            "progs": "1 23 41 50 60 89 100",
            "rank": "19",
            "song": "Buzzstone Symphony",
            "songURL": "https://www.newgrounds.com/audio/listen/183180",
            "time": "1",
            "title": "I beat this in under 45 min :D. Very fun level, but very skill based!",
            "url": "https://www.youtube.com/watch?v=uB4P0N0_hhw"
        },
        "Phobos": {
            "attempts": "38354",
            "date": "2023-09-08",
            "diff": "extreme",
            "enjoy": "78",
            "id": "19759411",
            "length": "2:16",
            "name": "Phobos",
            "objects": "26211",
            "progs": "1 3 4 9 11 14 20 22 25 26 27 35 43 50 57 59 63 69 78 82 84 100",
            "rank": "1",
            "song": "Phobos",
            "songURL": "https://www.youtube.com/watch?v=zMsxKPtZDZ8",
            "time": "75",
            "title": "AAAAAAAAAAAAAAAAAAAAA",
            "url": "https://www.youtube.com/watch?v=cTTrYbYmlUU"
        },
        "Poltergeist": {
            "attempts": "29422",
            "date": "",
            "diff": "insane",
            "enjoy": "52",
            "id": "7054561",
            "length": "1:0",
            "name": "Poltergeist",
            "objects": "14871",
            "progs": "5 6 9 10 12 15 17 20 21 25 26 27 29 32 57 79 86 100",
            "rank": "12",
            "song": "Poltergeist",
            "songURL": "https://www.newgrounds.com/audio/listen/587870",
            "time": "",
            "title": "I beat it",
            "url": "https://www.youtube.com/watch?v=jlggVLa1LHg"
        },
        "Sharp Minor": {
            "attempts": "5600",
            "date": "",
            "diff": "insane",
            "enjoy": "66",
            "id": "10312917",
            "length": "1:8",
            "name": "Sharp Minor",
            "objects": "17428",
            "progs": "1 6 12 13 22 32 37 48 50 54 55 58 59 66 68 76 87 89 90 100",
            "rank": "16",
            "song": "ill sharp minor",
            "songURL": "https://www.newgrounds.com/audio/listen/559803",
            "time": "4",
            "title": "Overall, I think this level is quite fun!",
            "url": "https://www.youtube.com/watch?v=ccF9H-jynMg"
        },
        "SlaughterHouse": {
            "attempts": "2290",
            "date": "2023-10-01",
            "diff": "insane",
            "enjoy": "33",
            "id": "13850073",
            "length": "1:15",
            "name": "SlaughterHouse",
            "objects": "16131",
            "progs": "2 3 9 11 15 16 18 21 22 25 47 52 87 100",
            "rank": "21",
            "song": "Screamroom",
            "songURL": "586809",
            "time": "2",
            "title": "goodn't",
            "url": "https://www.youtube.com/watch?v=qeZvZib_mzY"
        },
        "Stalemate": {
            "attempts": "1740",
            "date": "2023-09-29",
            "diff": "insane",
            "enjoy": "73",
            "id": "4545425",
            "length": "1:35",
            "name": "Stalemate",
            "objects": "10565",
            "progs": "1 6 9 12 13 55 59 70 88 98 100",
            "rank": "25",
            "song": "kzx - Stalemate",
            "songURL": "https://www.newgrounds.com/audio/listen/482872",
            "time": "1",
            "title": "98% 💀",
            "url": "https://www.youtube.com/watch?v=RRtcVQFtjKs"
        },
        "Stereo Demoness": {
            "attempts": "1400",
            "date": "2023-06-22",
            "diff": "insane",
            "enjoy": "100",
            "id": "260693",
            "length": "1:27",
            "name": "Stereo Demoness",
            "objects": "6723",
            "progs": "3 11 78 100",
            "rank": "18",
            "song": "Stero Madness",
            "songURL": "https://www.youtube.com/watch?v=JhKyKEDxo8Q",
            "time": "4",
            "title": "Best map in the game",
            "url": "https://www.youtube.com/watch?v=sXM2HtgT-A8"
        },
        "Supersonic": {
            "attempts": "42000",
            "date": "2021-06-02",
            "diff": "insane",
            "enjoy": "75",
            "id": "4706930",
            "length": "1:33",
            "name": "Supersonic",
            "objects": "21372",
            "progs": "1 2 6 9 11 14 17 19 24 29 31 36 37 42 43 45 50 60 61 66 68 72 88 100",
            "rank": "15",
            "song": "Ludicrous Speed",
            "songURL": "https://www.newgrounds.com/audio/listen/467267",
            "time": "60",
            "title": "I can do it",
            "url": ""
        },
        "The End": {
            "attempts": "5600",
            "date": "2023-04-30",
            "diff": "insane",
            "enjoy": "85",
            "id": "63915746",
            "length": "2:36",
            "name": "The End",
            "objects": "200053",
            "progs": "1 2 4 7 10 12 14 16 19 44 77 83 100",
            "rank": "6",
            "song": "Our Special Place",
            "songURL": "https://www.youtube.com/watch?v=RJoxs41Wias",
            "time": "6",
            "title": "This level is really cool! I would definitely recommend. This is my 12th insane demon and overall 95th demon!",
            "url": "https://www.youtube.com/watch?v=RJiZM2x0T6s"
        },
        "The Moonlight": {
            "attempts": "",
            "date": "2024-02-06",
            "diff": "insane",
            "enjoy": "85",
            "id": "",
            "length": "",
            "name": "The Moonlight",
            "objects": "",
            "progs": "",
            "song": "",
            "songURL": "",
            "time": "",
            "title": "",
            "url": ""
        },
        "Ulon": {
            "attempts": "12500",
            "date": "",
            "diff": "insane",
            "enjoy": "80",
            "id": "68688822",
            "length": "1:41",
            "name": "Ulon",
            "objects": "78761",
            "progs": "1 2 3 7 18 29 31 36 37 48 49 50 58 75 89 90 95 97 100",
            "rank": "8",
            "song": "Infestation",
            "songURL": "https://www.newgrounds.com/audio/listen/792910",
            "time": "25",
            "title": "This level is really cool! Enjoyed pretty much every part. Would Absolutely recommend!",
            "url": "https://www.youtube.com/watch?v=A6zwmtmyLEg"
        },
        "Windy Landscape": {
            "attempts": "",
            "date": "",
            "diff": "insane",
            "enjoy": "45",
            "id": "4957691",
            "length": "1:17",
            "name": "Windy Landscape",
            "objects": "10891",
            "progs": "2 3 5 10 12 19 26 30 36 39 40 57 97 100",
            "rank": "17",
            "song": "Windfall",
            "songURL": "https://www.newgrounds.com/audio/listen/621135",
            "time": "4",
            "title": "I almost beat this in a day, but I got 97% and ended up beating it 3 days later. Overall not that bad of a level, but definitely not my type.",
            "url": "https://www.youtube.com/watch?v=SjIHbqjcO6Q"
        },
        "dooMEd": {
            "attempts": "1719",
            "date": "2023-09-10",
            "diff": "hard",
            "enjoy": "74",
            "id": "91966426",
            "length": "0:30",
            "name": "dooMEd",
            "objects": "16000",
            "progs": "3 6 24 47 56 58 67 75 79 100",
            "rank": "25",
            "song": "daydream",
            "songURL": "https://www.newgrounds.com/audio/listen/1212855",
            "time": "1",
            "title": "1h completion",
            "url": "https://www.youtube.com/watch?v=xdQRLTOqrGQ"
        }
    })
}