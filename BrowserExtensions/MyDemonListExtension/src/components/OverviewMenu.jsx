import InfoSection, { INFO_SECTION } from './InfoSection'

/**
 * Don't forget the doc!
 * @param {*}
 */
function OverviewMenu() {
    return <>
        <InfoSection type={INFO_SECTION.ICON_LIST} headerText="Ranked Demons" value={[{demonType:"easy", demon:"0"},{demonType:"medium", demon:"0"},{demonType:"hard", demon:"0"},{demonType:"insane", demon:"0"},{demonType:"extreme", demon:"0"}]}></InfoSection>
        <InfoSection headerText="Total Stars" value={"410★"}></InfoSection>
        <InfoSection headerText="Total Attempts" value={"att"}></InfoSection>
        <InfoSection headerText="Most Objects" value={"obj"}></InfoSection>
        <InfoSection headerText="Least Objects" value={"obj"}></InfoSection>
        <InfoSection headerText="Oldest Level" value={"a"}></InfoSection>
        <InfoSection headerText="Most Recent Level" value={"a"}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Most Attempts" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Biggest Flukes" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Worst Deaths" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Longest Journeys" value={["1", "(#41) Journey Sound, from 42% (58%)", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Longest Levels" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Recent Completions" value={["1", "2", "3"]}></InfoSection>
    </>
}
export default OverviewMenu
