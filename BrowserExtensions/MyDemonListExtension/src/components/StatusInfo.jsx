// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import './CSS/StatusInfo.css'

/**
 * Small text display in absolute position
 * @param {children} display text
 */
function StatusInfo({children, className}) {
    return <span className={className}>{children}</span>
}
export default StatusInfo
