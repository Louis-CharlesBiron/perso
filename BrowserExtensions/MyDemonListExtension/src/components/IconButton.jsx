import { forwardRef } from 'react'
import './CSS/IconButton.css'


/**
 * Returns a button with text or as an svg icon
 * Use like this: <IconButton ...props>text</IconButton> OR <IconButton ...props>$iconName</IconButton>
 */
const IconButton = forwardRef(({ size=32, title, className="", onClick, children }, ref) => {
    const ICONS = {
        $stats: <svg height={size} width={size} viewBox="0 -960 960 960"><path d="M160-160v-440h140v440H160Zm250 0v-640h140v640H410Zm250 0v-280h140v280H660Z"></path></svg>,
        $search: <svg height={size} width={size} viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"></path></svg>,
        $expand: <svg height={size} width={size} viewBox="0 -960 960 960"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"></path></svg>,
        $plus: <svg height={size} width={size} viewBox="0 -960 960 960"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"></path></svg>,
        $edit: <svg height={size} width={size} viewBox="0 -960 960 960"><path d="M266.118-430Q287-430 301.5-444.618q14.5-14.617 14.5-35.5Q316-501 301.382-515.5q-14.617-14.5-35.5-14.5Q245-530 230.5-515.382q-14.5 14.617-14.5 35.5Q216-459 230.618-444.5q14.617 14.5 35.5 14.5Zm214 0Q501-430 515.5-444.618q14.5-14.617 14.5-35.5Q530-501 515.382-515.5q-14.617-14.5-35.5-14.5Q459-530 444.5-515.382q-14.5 14.617-14.5 35.5Q430-459 444.618-444.5q14.617 14.5 35.5 14.5Zm213 0Q714-430 728.5-444.618q14.5-14.617 14.5-35.5Q743-501 728.382-515.5q-14.617-14.5-35.5-14.5Q672-530 657.5-515.382q-14.5 14.617-14.5 35.5Q643-459 657.618-444.5q14.617 14.5 35.5 14.5ZM480.266-80q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"></path></svg>,
        $delete: <svg height={size} width={size} viewBox="0 -960 960 960"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"></path></svg>,
        $close: <svg height={size} width={size} viewBox="0 -960 960 960"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"></path></svg>,
        $settings: <svg height={size} width={size} viewBox="0 96 960 960"><path d="M530.846 957.333H428.385q-14.462 0-25.013-8.602-10.551-8.603-12.218-23.064l-12.359-88.206q-17.103-5.589-39.949-18.012-22.846-12.424-37.59-26.039l-80.692 36.077q-12.205 6.82-26.462 1.321-14.256-5.5-21.23-18.552l-52.385-93.974q-7.641-12.384-4.025-25.846 3.615-13.461 15-21.769L200.641 618q-.923-9.667-2.154-21.449-1.23-11.782-1.23-22.115 0-8.564 1.23-19.885 1.231-11.32 2.154-23.884L131.462 480q-12.385-7.975-15-22.103-2.616-14.128 4.359-26.512l52.051-91.282q8.41-11.103 21.064-17.154t25.525.102l78.359 34.462q17.385-13.872 39.398-26.41 22.013-12.539 41.141-19.231L391.154 225q1.333-14.462 12.051-23.064 10.718-8.603 25.18-8.603h102.461q14.462 0 25.564 8.603 11.103 8.602 13.103 23.064l11.359 87.974q21.436 8.231 41.09 19.488 19.653 11.256 37.141 25.384l81.102-34.461q12.205-6.154 26.077-1.039 13.872 5.116 20.846 16.987l52.051 91.898q6.975 12.384 4.193 26.589-2.782 14.205-14.167 22.18l-74.256 53.487q2.461 11.692 3.512 22.744 1.052 11.051 1.052 19.769 0 7.949-1.436 18.923-1.436 10.975-2.205 23.795L827.103 671q11.641 8.205 14.794 22.051 3.154 13.847-4.333 26.231l-51.872 94.41q-8.153 12.539-21.692 17.192-13.538 4.654-26.256-2.166l-81.641-36.077q-17.821 14.82-36.834 26.423-19.013 11.603-37.397 17.295l-12.359 89.308q-2.334 14.461-13.27 23.064-10.935 8.602-25.397 8.602Zm-54.41-267.077q48.718 0 82.154-33.436 33.436-33.435 33.436-82.153t-33.436-82.154q-33.436-33.436-82.154-33.436-47.949 0-81.769 33.436-33.821 33.436-33.821 82.154 0 48.718 33.821 82.153 33.82 33.436 81.769 33.436Z"></path></svg>,
        $download: <svg height={size} width={size} viewBox="0 96 960 960"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"></path></svg>
    }

    let content = ICONS[children] || children
    return <button ref={ref} title={title} className={className+" iconButton"} onClick={onClick}>{content}</button>
})

export default IconButton