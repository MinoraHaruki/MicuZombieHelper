import Settings from "../config";

let in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;
let image
let imageWidth
let imageHeight
let shouldDrawImage = false
let timeoutId

register("worldUnload", () => {
    shouldDrawImage = false
    if (timeoutId) clearTimeout(timeoutId)
})

try {
    image = new Image("victory.png", "../assets/victory.png")
    imageWidth = image.getTextureWidth()
    imageHeight = image.getTextureHeight()
} catch (e) {
    ChatLib.chat("Failed to load the image: victory.png")
}

register("renderOverlay", () => {
    if (!shouldDrawImage || !image) return
    const x = Renderer.screen.getWidth() /2 - imageWidth /2
    const y = (Renderer.screen.getHeight() / 2 - imageHeight /2) - 160
    const w = imageWidth
    const h = imageHeight
    image.draw(x, y, w, h);
}),
() => Settings.victory_dance && image

register("command", () => {
    shouldDrawImage = true
    new Sound({ source: "victory.ogg" })?.play();
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        shouldDrawImage = false
    }, 10000)
}).setName("micutestvictory");

register("chat", (chat, event) => {
  chat = ChatLib.getChatMessage(event).removeFormatting();
  chat = String(chat).toLowerCase();
      if (chat.includes("survived!") && Settings.victory_dance && in_zombies) {
        shouldDrawImage = true
        new Sound({ source: "victory.ogg" })?.play();
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
        shouldDrawImage = false
        }, 4000)
    }
}).setCriteria("${chat}");