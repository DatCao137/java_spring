import { CommonCss } from "./CommonCss";

function RoomChoiceCss() {
    return (
<>
<CommonCss />
{`
.mapGrid {
    overflow: hidden;
    overflow-x: auto
}
.mapLine {
    display: grid;
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    grid-template-columns: 140px 150px repeat(31, 1fr);
    grid-template-rows: 25px;
    min-width: 0;
}
.mapBottom {
    display: grid;
    border-top: 1px solid #000;
    grid-template-columns: 1fr;
    grid-template-rows: 5px;
}
.mapItem {
    border-right: 1px solid #000;
    min-width: 20px;
    text-align: center;
}
.mapStay {
    background:rgb(83, 182, 83);
}
`}
</>
)
}

export { RoomChoiceCss }