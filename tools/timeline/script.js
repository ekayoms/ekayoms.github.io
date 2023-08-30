const canvas = document.querySelector("#canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

tree = {
    year: null, label: "Untitled Timeline", color: "#ccc", height: 0, side: 0, end: null, children: []
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

function draw() {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawTimeline(tree, true, 0)

    if (found) {
        ctx.lineWidth = 5
        ctx.strokeStyle = "dodgerblue"
        ctx.fillStyle = "#2c2c2c"
        ctx.beginPath()
        ctx.arc(
            mouse.x,
            canvas.height / 2 - closest + camera.y + (closestTimeline.side <= 0 ? 2.5 : 0),
            6,
            0,
            2 * Math.PI
        )
        ctx.fill()
        ctx.stroke()
    }
}
requestAnimationFrame(draw)

function drawTimeline(timeline, root, offset) {
    if (root) {
        ctx.fillStyle = timeline.color
        ctx.fillRect(0, canvas.height / 2 + camera.y, canvas.width, 5)
        ctx.fillRect(canvas.width / 2 + camera.x, canvas.height / 2 + camera.y - 5, 5, 15)
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
            drawTimeline(child, false, offset + timeline.height * timeline.side)
        }
    }
}

let closestTimeline
let closest = 25
let closestDistance = 25
let found = false

function getClosestPoint(mouseY, mouseX, timeline, offset) {
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

window.onmousedown = () => {
    mouse.down = true
    mouse.moved = false
}
window.onmouseup = () => {
    mouse.down = false
    if (!mouse.moved && found && !startMake) {
        startMake = true
        making = diverge(closestTimeline, closestTimeline.color, Math.round(((mouse.x - camera.x) - canvas.width / 2) / yearWidth), "")
        height = 0
        return
    }
    if (startMake && !mouse.moved) startMake = false
}
window.onmousemove = (e) => {
    if (mouse.down) {
        mouse.moved = true
        camera.x += e.movementX
        camera.y += e.movementY
    }
    mouse.x = e.x
    mouse.y = e.y
    closest = 25
    closestDistance = 25
    found = false
    getClosestPoint(e.y, e.x, tree, 0)

    if (startMake && !mouse.down) {
        making.year += Math.round(e.movementX / yearWidth)
        height += Math.round(e.movementY)
        // if (making.side == 1) height -= Math.round(e.movementY)
        // else if (making.side == -1) height += Math.round(e.movementY)
        // if (height < 0) making.side *= -1
        making.height = Math.round(height / 25) * 25
    }
}