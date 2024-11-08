import { useContext } from 'react'
import InfoSection, { INFO_SECTION } from './InfoSection'
import {LevelsContext} from './contexts/LevelsContext'
import { capitalize, numSep } from '../Utils/Utility'


/**
 * Don't forget the doc!
 * @param {*}
 */
function OverviewMenu() {
    const levelManager = useContext(LevelsContext)

    let levels = levelManager.levels,
        totalStars = levels.length*10,
        totalAttempts = levels.reduce((a,b)=>a+(+b.attempts||0),0),

        objectsSorted = levels.toSorted((a,b)=>b.objects-a.objects),
        mostObjects = objectsSorted[0],
        leastObjects = objectsSorted.last(),

        idSorted = levels.toSorted((a,b)=>a.id-b.id),
        oldestLevel = idSorted[0],
        mostRecentLevel = idSorted.last(),

        mostAttempts = levels.toSorted((a,b)=>b.attempts-a.attempts).map(l=>`(#${l.rank}) ${l.name}, ${numSep(l.attempts)} Attempts`),

        //REDO
        biggestFlukes = levels.map(level=>({value:100-level.progs.replace("100","").trim().split(" ").last(), level})).filter(x=>x.value&&isFinite(x.value)).toSorted((a,b)=>b.value-a.value),

        worstDeaths = biggestFlukes.toReversed(),

        longestJourneys = levels.filter(l=>+l.time).sort((a,b)=>b.d-a.d)

        console.log(longestJourneys)


    return <>
        <InfoSection type={INFO_SECTION.ICON_LIST} headerText="Ranked Demons" value={[{demonType:"easy", demon:"0"},{demonType:"medium", demon:"0"},{demonType:"hard", demon:"0"},{demonType:"insane", demon:"0"},{demonType:"extreme", demon:"0"}]}></InfoSection>
        <InfoSection headerText="Total Stars" value={totalStars+"★"}></InfoSection>
        <InfoSection headerText="Total Attempts" value={numSep(totalAttempts)}></InfoSection>
        <InfoSection headerText="Most Objects" value={mostObjects?.name+" ("+numSep(mostObjects?.objects)+")"}></InfoSection>
        <InfoSection headerText="Least Objects" value={leastObjects?.name+" ("+numSep(leastObjects?.objects)+")"}></InfoSection>
        <InfoSection headerText="Oldest Level" value={oldestLevel?.name+" (Id: "+oldestLevel?.id+")"}></InfoSection>
        <InfoSection headerText="Most Recent Level" value={mostRecentLevel?.name+" (Id: "+mostRecentLevel?.id+")"}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Most Attempts" value={mostAttempts.slice(0,3)}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Biggest Flukes" value={biggestFlukes.slice(0,3).map(l=>`(#${l.level.rank}) ${l.level.name}, From ${100-l.value}% (${l.value}%)`)}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Worst Deaths" value={worstDeaths.slice(0,3).map(l=>`(#${l.level.rank}) ${l.level.name}, At ${100-l.value}%`)}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Longest Journeys" value={["1", "(#41) Journey Sound, from 42% (58%)", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Longest Levels" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Recent Completions" value={["1", "2", "3"]}></InfoSection>
    </>
}
export default OverviewMenu
