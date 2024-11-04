import InfoSection, { INFO_SECTION } from './InfoSection'

/**
 * Don't forget the doc!
 * @param {*}
 */
function ProfileMenu() {
    return <>
        <InfoSection type={INFO_SECTION.SIMPLE_INPUT} headerText="Username"></InfoSection>
        <InfoSection type={INFO_SECTION.INFO_LIST} headerText="Profile Info" value={[{key:"Rank",value:"9344"}, {key:"Stars",value:"1"}, {key:"Moons",value:"1"}, {key:"Coins",value:"1"}, {key:"User Coins",value:"1"}, {key:"Diamonds",value:"1"}, {key:"Creator Points",value:"1"}, {key:"Levels completed",value:"1"}, {key:"Daily Levels  completed",value:"1"}, {key:"Weekly Demons completed",value:"1"}]}></InfoSection>
        <InfoSection type={INFO_SECTION.ICON_LIST2} headerText="Profile Demons (806 / 675)" title={"Classic: 661 | Plat.: 14 | Distinct Total: 675"} value={[{demonType:"easy", cdemon:"0", pdemon:"1"},{demonType:"medium", cdemon:"0", pdemon:"1"},{demonType:"hard", cdemon:"0", pdemon:"1"},{demonType:"insane", cdemon:"0", pdemon:"1"},{demonType:"extreme", cdemon:"0", pdemon:"1"}]}></InfoSection>
     
    </>
}
export default ProfileMenu
