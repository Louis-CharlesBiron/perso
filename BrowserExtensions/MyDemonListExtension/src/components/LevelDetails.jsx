import './CSS/LevelDetails.css'

/**
 * Don't forget the doc!
 * @param {list} Array of details objects -> [{key:"attempts", value:"123", className?:"someclass", title?:"sometext", onclick?:()=>{}}] 
 */
function LevelDetails({list, className}) {
    console.log(list)
    return <div className={className}>
        {
            list.map((detail, i)=>{
                return <span className={"ld_detail "+(detail.className||"")} key={i} onClick={detail.onClick} title={detail.title}>{detail.key}: {detail.value}</span>
            })
        }
    </div>
}
export default LevelDetails
