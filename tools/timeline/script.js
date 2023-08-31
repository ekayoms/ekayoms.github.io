const canvas = document.querySelector("#canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

tree = {
    year: null, label: "Untitled Timeline", color: "#ccc", height: 0, side: 0, end: null, root: true, children: []
}

function diverge(root, color, year, label) {
    root.children.push(
        { side: -1, label, year, color, height: 0, end: null, children: [] }
    )
    return root.children[root.children.length - 1]
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

mouse = { x: 0, y: 0, down: false, moved: false }
camera = { x: 0, y: 0 }

let yearWidth = 5

let years = [[" AD", " BC"], [" CE", " BCE"], ["", ""]]
let adBc = 0
let hide = false
let showYears = true

function draw() {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawTimeline(tree, 0)
    drawTimelineText(tree, 0)
    if (showYears) drawTimelineYears(tree, 0)

    if (found && !editing && !startMake) {
        ctx.lineWidth = 5
        ctx.strokeStyle = "dodgerblue"
        ctx.fillStyle = "#2c2c2c"
        ctx.beginPath()
        ctx.arc(
            Math.round(mouse.x / yearWidth) * yearWidth,
            canvas.height / 2 - closest + camera.y + (closestTimeline.side <= 0 ? 2.5 : 0),
            6,
            0,
            2 * Math.PI
        )
        ctx.fill()
        ctx.stroke()
    }

    ctx.font = "15px sans-serif"
    ctx.lineWidth = 10
    ctx.textAlign = "center"
    if (found && !startMake && showYears) {
        drawLabel(Math.abs(Math.round((mouse.x - canvas.width / 2 - camera.x) / yearWidth)).toString() + (Math.round(((mouse.x - canvas.width / 2))) > 0 ? years[adBc][0] : years[adBc][1]), Math.round(mouse.x / yearWidth) * yearWidth, canvas.height / 2 - closest - 15 + camera.y)
    }

    if (hide) return
    ctx.textAlign = "left"
    drawLabel("i cant be bothered to add buttons or a proper UI so you can use keybinds dont be lazy", 5, 15)
    drawLabel("Tab - toggle label edit mode     G - move timeline", 5, 40)
    drawLabel("Click - start divergence / confirm      Click and Drag - move the camera", 5, 65)
    drawLabel("Y - cycle showing years (none - BC/AD - BCE/CE - numbers only)", 5, 90)
    drawLabel("X - delete timeline (deletes all divergences)", 5, 115)
    drawLabel("H - hide this dumb help message      All actions apply to the hovered timeline", 5, 140)
    drawLabel("S - save the timeline      O - open a timeline from a file", 5, 165)
}
requestAnimationFrame(draw)

function drawTimelineYears(timeline, offset) {
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = timeline.color
    if (closestTimeline == timeline && found) {
        ctx.fillStyle = "dodgerblue"
    }
    ctx.font = "10px sans-serif"
    ctx.lineWidth = 5
    ctx.strokeStyle = "#2c2c2c"
    if (timeline.year != null) {
        drawLabel(Math.abs(timeline.year.toString()) + (timeline.year > 0 ? years[adBc][0] : years[adBc][1]), (timeline.year * yearWidth) + canvas.width / 2 + camera.x, canvas.height / 2 - offset - 15 + camera.y)
    }
    if (timeline.children.length > 0) {
        for (let child of timeline.children) {
            drawTimelineYears(child, offset + timeline.height * (timeline.year == null ? 0 : timeline.side))
        }
    }
}

function deleteTimeline(timeline, parent) {
    if (parent != null) {
        if (timeline == closestTimeline) {
            parent.children.splice(parent.children.indexOf(timeline), 1)
            closestTimeline = null
            found = false
        }
    }
    if (timeline.children.length > 0) {
        for (let child of timeline.children) {
            deleteTimeline(child, timeline)
        }
    }
}

function drawTimelineText(timeline, offset) {
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillStyle = timeline.color
    if (closestTimeline == timeline && found) {
        ctx.fillStyle = "dodgerblue"
    }
    ctx.font = "20px sans-serif"
    ctx.lineWidth = 10
    ctx.strokeStyle = "#2c2c2c"
    let condition = editing && timeline == closestTimeline
    if (timeline.year == null) {
        ctx.strokeText(timeline.label + (condition ? " ▎" : ""), 5, canvas.height / 2 + camera.y - timeline.height + 2.5)
        ctx.fillText(timeline.label + (condition ? " ▎" : ""), 5, canvas.height / 2 + camera.y - timeline.height + 2.5)
    }
    else if (canvas.width / 2 + camera.x + (yearWidth * timeline.end) > -5 || timeline.end == null) {
        ctx.strokeText(timeline.label + (condition ? " ▎" : ""),
            Math.max(canvas.width / 2 + camera.x + (yearWidth * timeline.year) + 50, 5),
            canvas.height / 2 + camera.y - offset + timeline.height + 2.5)
        ctx.fillText(timeline.label + (condition ? " ▎" : ""),
            Math.max(canvas.width / 2 + camera.x + (yearWidth * timeline.year) + 50, 5),
            canvas.height / 2 + camera.y - offset + timeline.height + 2.5)
    }
    if (timeline.children.length > 0) {
        for (let child of timeline.children) {
            drawTimelineText(child, offset + timeline.height * (timeline.year == null ? 0 : timeline.side))
        }
    }
}

function drawLabel(text, x, y) {
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#ccc"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#2c2c2c"
    ctx.strokeText(text, x, y)
    ctx.fillText(text, x, y)
}

function drawTimeline(timeline, offset) {
    if (timeline.year == null) {
        ctx.fillStyle = timeline.color
        ctx.fillRect(0, canvas.height / 2 + camera.y - timeline.height, canvas.width, 5)
        ctx.fillRect(canvas.width / 2 + camera.x, canvas.height / 2 + camera.y - 5 - timeline.height, 5, 15)
        offset += timeline.height
    }
    else {
        ctx.fillStyle = timeline.color
        ctx.strokeStyle = timeline.color
        ctx.lineWidth = 5

        ctx.beginPath()
        ctx.moveTo(
            canvas.width / 2 + camera.x + (yearWidth * timeline.year),
            canvas.height / 2 + camera.y - offset + 2.5
        )
        ctx.bezierCurveTo(
            canvas.width / 2 + camera.x + yearWidth * timeline.year + 50,
            canvas.height / 2 + camera.y - offset,
            canvas.width / 2 + camera.x + (yearWidth * timeline.year),
            canvas.height / 2 + camera.y - (offset - timeline.side + timeline.height * timeline.side) + yearWidth,
            canvas.width / 2 + camera.x + (yearWidth * timeline.year) + 51,
            canvas.height / 2 + camera.y - (offset - timeline.side + timeline.height * timeline.side) + (timeline.side == -1 ? 2.5 : 0)
        )
        ctx.stroke()

        if (timeline.end != null) {
            ctx.fillRect(
                canvas.width / 2 + camera.x + (yearWidth * timeline.year) + 50,
                canvas.height / 2 + camera.y - offset - timeline.height * timeline.side,
                (yearWidth * timeline.end) - (yearWidth * timeline.year) - 50,
                5
            )
            ctx.fillRect(
                canvas.width / 2 + camera.x + (yearWidth * timeline.year) + (yearWidth * timeline.end) - (yearWidth * timeline.year),
                canvas.height / 2 + camera.y - offset - timeline.height * timeline.side - 5,
                5, 15
            )
        }
        else {
            ctx.fillRect(
                canvas.width / 2 + camera.x + (yearWidth * timeline.year) + 50,
                canvas.height / 2 + camera.y - offset - timeline.height * timeline.side - (timeline.side == 1 ? 2.5 : 0),
                canvas.width - camera.x, 5)
        }

        ctx.fillStyle = "#2c2c2c"
        ctx.beginPath()
        ctx.arc(
            canvas.width / 2 + camera.x + (yearWidth * timeline.year),
            canvas.height / 2 + camera.y - offset + 2.5,
            6,
            0,
            2 * Math.PI
        )
        ctx.fill()
        ctx.stroke()
    }

    if (timeline.children.length > 0) {
        for (let child of timeline.children) {
            drawTimeline(child, offset + timeline.height * (timeline.year == null ? 0 : timeline.side))
        }
    }
}

let closestTimeline
let closest
let closestDistance
let found = false

function getClosestPoint(mouseY, mouseX, timeline, offset) {
    if (timeline.year == null) {
        offset += timeline.height
    }
    let distance = Math.abs(-(mouseY - camera.y - (canvas.height / 2)) - (offset + (timeline.height * timeline.side)))
    if (distance < closestDistance &&
        (timeline.year == null || timeline.year * yearWidth + 50 < -camera.x + (mouseX - canvas.width / 2))
        && (-camera.x + (mouseX - canvas.width / 2) < timeline.end * yearWidth || timeline.end == null)) {
        closest = offset - (timeline.height * -timeline.side)
        closestDistance = distance
        closestTimeline = timeline
        found = true
    }
    if (timeline.children.length > 0) {
        for (let child of timeline.children) {
            getClosestPoint(mouseY, mouseX, child, offset + timeline.height * timeline.side)
        }
    }

}

let startMake = false
let making
let height = 0
let year = 0

let editing = false

window.onmousedown = () => {
    mouse.down = true
    mouse.moved = false
}
window.onmouseup = () => {
    mouse.down = false
    if (!mouse.moved && found && !startMake) {
        startMake = true
        making = diverge(closestTimeline, closestTimeline.color, Math.round(((mouse.x - camera.x) - canvas.width / 2) / yearWidth), "Divergence")
        height = 0
        year = (mouse.x - canvas.width / 2) - camera.x
        return
    }
    if (startMake && !mouse.moved) startMake = false, found = false
}
window.onmousemove = (e) => {
    if (mouse.down) {
        mouse.moved = true
        camera.x += e.movementX
        camera.y += e.movementY
    }
    mouse.x = e.x
    mouse.y = e.y
    if (!editing && !startMake) {
        closest = 50
        closestDistance = 50
        found = false
        getClosestPoint(e.y, e.x, tree, 0)
    }

    if (startMake && !mouse.down) {
        year += Math.round(e.movementX)
        height += Math.round(e.movementY)
        // if (making.side == 1) height -= Math.round(e.movementY)
        // else if (making.side == -1) height += Math.round(e.movementY)
        // if (height < 0) making.side *= -1
        making.year = Math.round(year / yearWidth)
        making.height = Math.round(height / 25) * 25
    }
}
window.onkeydown = (e) => {
    switch (e.key) {
        case "Tab":
            e.preventDefault()
            if (found) editing = !editing
            break
        case "Enter":
            e.preventDefault()
            if (editing) editing = false
        case "Backspace":
            e.preventDefault()
            if (editing && closestTimeline.label.length > 0) {
                closestTimeline.label = closestTimeline.label.substr(0, closestTimeline.label.length - 1)
            }
            break
        default:
            if (e.key.length == 1 && editing) {
                closestTimeline.label += e.key
            }
            break
    }
    if (editing) return
    switch (e.key) {
        case "g":
            if (closestTimeline.year == null || !found) break
            startMake = true
            making = closestTimeline
            height = closestTimeline.height
            year = closestTimeline.year * yearWidth
            break
        case "h":
            hide = !hide
            break
        case "y":
            adBc++
            if (adBc > 3) adBc = 0
            showYears = adBc != 3
            break
        case "x":
            if (closestTimeline.root || !found) break
            deleteTimeline(tree, null)
            break
        case "s":
            saveJSONToFile(tree, tree.label + ".tree")
            break
        case "o":
            readJSONFromFile()
            found = false
            startMake = false
            editing = false
            break
    }
}

function saveJSONToFile(jsonObject, fileName) {
    const jsonString = JSON.stringify(jsonObject);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
}

function readJSONFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.tree';

    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                try {
                    const jsonObject = JSON.parse(content);
                    tree = jsonObject
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    input.click();
}