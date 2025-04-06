// After updating the Bitfont1.png, execute this generator and paste result in Bitfont1.xml

const offset = 1

const charWidth = 8
const charHeight = 10

const sheetWidth = 8
const sheetHeight = 5

const fileName = "Bitfont1.png"

let fileResult = `
<?xml version="1.0"?>
    <font>
        <info face="${fileName}" size="10"/>
        <common lineHeight="14" base="10" scaleW="6" scaleH="8" pages="1" packed="0"/>    
        <pages>
            <page id="0" file="${fileName}"/>
        </pages>
        <chars>
`

const chars = [
    ...range(65, 90),
    ...range(48, 57),
    63, // ?
    33, // !
    46, // .
    32, // space
]

let x = 0
let y = 0
for (let asciiIndex of chars) {
    fileResult += `     <char id="${asciiIndex++}" x="${(charWidth - 1) * x}" y="${(charHeight - 1) * y}" width="${charWidth}" height="${charHeight}" xoffset="0" yoffset="0" xadvance="${charWidth}" page="0"/>\n`
    x = x + 1
    if (x >= sheetWidth) {
        x = 0
        y = (y + 1) % sheetHeight
    }
}

fileResult += `
        </chars>
    </font>
`

console.debug(fileResult)

function range(min, max) {
    var len = max - min + 1;
    var arr = new Array(len);
    for (var i=0; i<len; i++) {
      arr[i] = min + i;
    }
    return arr;
}