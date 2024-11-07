import { useContext, useEffect, useRef, useState } from 'react'
import InfoSection, { INFO_SECTION } from './InfoSection'
import { fakechrome } from '../App'
import { UserContext } from './contexts/UserContext'
import { DEMON_TYPES, EMPTY_STATS1 } from '../Utils/Utility'

/**
 * Don't forget the doc!
 * @param {*}
 */


function ProfileMenu() {
    const usernameInputRef = useRef(null),
          userManager = useContext(UserContext),
          [userProfileInfoStats, setUserProfileInfoStats] = useState([]),
          [userProfileDemonsStats, setUserProfileDemonsStats] = useState({demons:[],total:"X",distinctClassic:"X",distinctPlat:"X"})

    let fetchRegulatorId

    function fetchProfile(u) {
        //I love GD cologne!
        if (u) fetch('https://gdbrowser.com/api/profile/'+u).then(r=>r.json()).then(stats=>{
            console.log(stats)
            // Adjust username
            if (u !== stats.username) {
                userManager.setUsername(stats.username)
                fakechrome.storage.sync.set({$u:stats.username})
            }

            // Icon color
            let p1Color = `rgb(${stats.col1RGB.r} ${stats.col1RGB.g} ${stats.col1RGB.b})`, p2Color = `rgb(${stats.col2RGB.r} ${stats.col2RGB.g} ${stats.col2RGB.b})`
            if (userManager.playerColors?.p1 !== p1Color || userManager.playerColors?.p2 !== p2Color) userManager.setPlayerColors({p1:p1Color, p2:p2Color})

            // Display Profile Info
            let all = [stats.classicDemonsCompleted, stats.classicLevelsCompleted, stats.platformerDemonsCompleted, stats.platformerLevelsCompleted].flatMap(x=>Object.entries(x??EMPTY_STATS1)).reduce((a, b)=>(a[b[0].match(/weekly|gauntlet|daily/g)?"distinctTotal":"total"]+=b[1],a),{total:0, distinctTotal:0})
            setUserProfileInfoStats([
                {key:"Rank",value:stats.rank, title:"Rank "+stats.rank},
                {key:"Stars",value:stats.stars, title:"Stars "+stats.stars},
                {key:"Moons",value:stats.moons, title:"Moons "+stats.moons},
                {key:"Coins",value:stats.coins, title:"Gold Coins "+stats.coins},
                {key:"User Coins",value:stats.userCoins, title:"Silver coins "+stats.userCoins},
                {key:"Diamonds",value:stats.diamonds, title:"Diamonds "+stats.diamonds},
                {key:"Creator Points",value:stats.cp, title:"Creator Points "+stats.cp},
                {key:"Levels completed",value:all.total, title:"Minimum Distinct "+all.distinctTotal},
                {key:"Daily Levels completed",value:stats.classicLevelsCompleted?.daily||0, title:stats.classicLevelsCompleted?"Daily levels: "+stats.classicLevelsCompleted.daily:" Profile Error"},
                {key:"Weekly Demons completed",value:stats.classicDemonsCompleted?.weekly||0, title:stats.classicDemonsCompleted?"Weekly demon levels: "+stats.classicDemonsCompleted.weekly:" Profile Error"},
                {key:"Gauntlet Demons completed",value:stats.classicDemonsCompleted?.gauntlet||0, title:stats.classicDemonsCompleted?"Gauntlet demon levels: "+stats.classicDemonsCompleted.gauntlet:" Profile Error"},
            ])

            // Display Profile Demons
            let distinctTotal = DEMON_TYPES.reduce((a,b)=>(a.classic+=stats.classicDemonsCompleted?.[b]||0,a.plat+=stats.platformerDemonsCompleted?.[b]||0,a), {plat:0, classic:0})
            setUserProfileDemonsStats({
                demons:[
                    {demonType:"easy", cdemon:stats.classicDemonsCompleted?.easy      ||0, pdemon:stats.platformerDemonsCompleted?.easy   ||0},
                    {demonType:"medium", cdemon:stats.classicDemonsCompleted?.medium  ||0, pdemon:stats.platformerDemonsCompleted?.medium ||0},
                    {demonType:"hard", cdemon:stats.classicDemonsCompleted?.hard      ||0, pdemon:stats.platformerDemonsCompleted?.hard   ||0},
                    {demonType:"insane", cdemon:stats.classicDemonsCompleted?.insane  ||0, pdemon:stats.platformerDemonsCompleted?.insane ||0},
                    {demonType:"extreme", cdemon:stats.classicDemonsCompleted?.extreme||0, pdemon:stats.platformerDemonsCompleted?.extreme||0}
                ],
                total: stats.demons,
                distinctClassic: distinctTotal["classic"],
                distinctPlat: distinctTotal["plat"]
            })

        }).catch(()=>{})
    }

    // Called on username input
    function tryFetchProfile(e) {
        clearTimeout(fetchRegulatorId)
        fetchRegulatorId = setTimeout(()=>userManager.setUsername(e.target.value),750)
    }

    useEffect(()=>{
        fetchProfile(userManager.username)
    }, [userManager.username])




    return <>
        <InfoSection ref={usernameInputRef} onChange={e=>tryFetchProfile(e)} defaultValue={userManager.username} placeholder={userManager.username} type={INFO_SECTION.SIMPLE_INPUT} headerText="Username"></InfoSection>
        <InfoSection type={INFO_SECTION.INFO_LIST} headerText="Profile Info" value={userProfileInfoStats}></InfoSection>
        <InfoSection type={INFO_SECTION.ICON_LIST2} headerText={"Profile Demons ("+userProfileDemonsStats.total+" / "+(userProfileDemonsStats.distinctClassic+userProfileDemonsStats.distinctPlat)+")"} title={"Classic: "+userProfileDemonsStats.distinctClassic+" | Plat.: "+userProfileDemonsStats.distinctPlat+" | Distinct Total: "+(userProfileDemonsStats.distinctClassic+userProfileDemonsStats.distinctPlat)} value={userProfileDemonsStats.demons}></InfoSection>
    </>
}
export default ProfileMenu
