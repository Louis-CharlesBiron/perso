import { useContext, useState } from 'react'
import InfoSection, { INFO_SECTION } from './InfoSection'
import {LevelsContext} from './contexts/LevelsContext'
import { capitalize, DEMON_TYPES, getLengthInSeconds, numSep } from '../Utils/Utility'


/**
 * The sidebar menu displaying stats about the ranked levels
 */
function OverviewMenu() {
    const levelManager = useContext(LevelsContext),
          [diffFilter, setDiffFilter] = useState(null)

    let levels = levelManager.levels?.filter(l=>!diffFilter||l.diff==diffFilter)||[],
        totalStars = levels.length*10,
        totalAttempts = levels.reduce((a,b)=>a+(+b.attempts||0),0),

        objectsSorted = levels.filter(l=>+l.objects).toSorted((a,b)=>b.objects-a.objects),
        mostObjects = objectsSorted[0],
        leastObjects = objectsSorted.last(),

        idSorted = levels.toSorted((a,b)=>a.id-b.id),
        oldestLevel = idSorted[0],
        mostRecentLevel = idSorted.last(),

        mostAttempts = levels.filter(l=>+l.attempts).toSorted((a,b)=>b.attempts-a.attempts).map(l=>`(#${l.rank}) ${l.name}, ${numSep(l.attempts)} Attempts`),

        biggestFlukes = levels.map(level=>({value:100-Math.max(...(level.progs?.match(/[0-9]{1,2} +/g)||[])), level})).filter(x=>x.value&&isFinite(x.value)).toSorted((a,b)=>b.value-a.value),
        worstDeaths = biggestFlukes.toReversed(),

        longestJourneys = levels.filter(l=>+l.time).toSorted((a,b)=>b.time-a.time),

        longestLevels = levels.toSorted((a,b)=>getLengthInSeconds(b.length)-getLengthInSeconds(a.length)),
        shortestLevels = longestLevels.toReversed(),

        recentCompletions = levels.filter(l=>l.getDaysAgo()>=0).toSorted((a,b)=>a.getDaysAgo()-b.getDaysAgo()),

        demons = DEMON_TYPES.reduce((a,b)=>a.concat({demonType:b, demon:(levelManager.levels?.filter(l=>l.diff==b)||[]).length}),[])

    return <>
        <InfoSection headerText={"Ranked Demons"+(diffFilter?" ("+capitalize(diffFilter)+")":"")} type={INFO_SECTION.ICON_LIST} value={demons} onIconClick={(e, type)=>setDiffFilter(f=>f==type ? null : type)}></InfoSection>
        <InfoSection headerText="Total Stars"       value={totalStars+"★"}></InfoSection>
        <InfoSection headerText="Total Attempts"    value={totalAttempts&&numSep(totalAttempts)}></InfoSection>
        <InfoSection headerText="Most Objects"      value={mostObjects&&mostObjects?.name+" ("+numSep(mostObjects?.objects)+")"}></InfoSection>
        <InfoSection headerText="Least Objects"     value={leastObjects&&leastObjects?.name+" ("+numSep(leastObjects?.objects)+")"}></InfoSection>
        <InfoSection headerText="Oldest Level"      value={oldestLevel&&oldestLevel?.name+" (Id: "+oldestLevel?.id+")"}></InfoSection>
        <InfoSection headerText="Most Recent Level" value={mostRecentLevel&&mostRecentLevel?.name+" (Id: "+mostRecentLevel?.id+")"}></InfoSection>
        <InfoSection headerText="Most Attempts"      type={INFO_SECTION.LIST} value={mostAttempts}></InfoSection>
        <InfoSection headerText="Biggest Flukes"     type={INFO_SECTION.LIST} value={biggestFlukes.map(l=>`(#${l.level.rank}) ${l.level.name}, From ${100-l.value}% (${l.value}%)`)}></InfoSection>
        <InfoSection headerText="Worst Deaths"       type={INFO_SECTION.LIST} value={worstDeaths.map(l=>`(#${l.level.rank}) ${l.level.name}, At ${100-l.value}%`)}></InfoSection>
        <InfoSection headerText="Longest Journeys"   type={INFO_SECTION.LIST} value={longestJourneys.map(l=>`(#${l.rank}) ${l.name}, ${l.time} Days`)}></InfoSection>
        <InfoSection headerText="Longest Levels"     type={INFO_SECTION.LIST} value={longestLevels.map(l=>`(#${l.rank}) ${l.name}, ${l.getFormatedLength()}`)}></InfoSection>
        <InfoSection headerText="Shortest Levels"    type={INFO_SECTION.LIST} value={shortestLevels.map(l=>`(#${l.rank}) ${l.name}, ${l.getFormatedLength()}`)}></InfoSection>
        <InfoSection headerText="Recent Completions" type={INFO_SECTION.LIST} value={recentCompletions.map(l=>`(#${l.rank}) ${l.name}, ${l.getDaysAgo()} Days Ago`)}></InfoSection>
    </>
}
export default OverviewMenu
