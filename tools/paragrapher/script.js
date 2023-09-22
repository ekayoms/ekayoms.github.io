const canvas = document.querySelector("#text")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

let paragraph = ""
let wrap = 500

const image = new Image
image.src = "letters.png"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[/].!',?`āøēíú"
const spacing = [4, 4, 3, 4, 3, 3, 4, 4, 3, 4, 4, 3, 5, 4, 4, 4, 4, 4, 4, 3, 4, 5, 5, 5, 4, 3, // uppercase
    4, 4, 3, 4, 4, 3, 4, 4, 1, 2, 4, 1, 5, 4, 4, 4, 4, 3, 4, 3, 4, 5, 5, 3, 4, 4, // lowercase
    2, 5, 2, 1, 1, 2, 1, 4, 2, // special
    4, 4, 4, 2, 4] // accented

const updateWrap = (value) => { wrap = value; drawText() }
const updateText = (value) => { paragraph = value.replace("<br>", "\n"); drawText() }

const charHeight = 7

function drawText() {
    canvas.width = window.innerWidth / 2
    canvas.height = window.innerHeight * 0.70 - 40
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let lineWidth = 0
    let x = 0
    let y = 1
    for (let word of paragraph.split(" ")) {
        let wordWidth = 0
        for (let char of word) {
            wordWidth += spacing[letters.indexOf(char)] + 1
        }
        if (lineWidth + wordWidth > wrap) {
            x = 0
            y += charHeight + 1
        }
        else lineWidth += wordWidth
        for (let char of word) {
            let offset = 0
            try { offset = spacing.slice(0, letters.indexOf(char)).reduce((a, b) => a + b + 1) } catch { }
            ctx.drawImage(image,
                offset, 0,
                spacing[letters.indexOf(char)] + 1, charHeight,
                x, y - (letters.indexOf(char) >= 60 ? 1 : 0), spacing[letters.indexOf(char)] + 1, charHeight)
            x += spacing[letters.indexOf(char)] + 1
        }
        x += 4
    }
}