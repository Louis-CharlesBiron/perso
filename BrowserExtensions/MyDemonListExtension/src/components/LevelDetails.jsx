// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import './CSS/LevelDetails.css'

/**
 * @param {list} Array of details objects -> [{key:"attempts", value:"123", className?:"someclass", title?:"sometext", onclick?:()=>{}}] 
 */
function LevelDetails({list, className}) {
    return <>
        {!!list.length && <div className={className}>
            {list.map((detail, i)=>
                <span className={"ld_detail "+(detail.className||"")} key={i} onClick={detail.onClick} title={detail.title}>{detail.key}: {detail.value}</span>
            )}
        </div>}
    </>
}
export default LevelDetails
