import Settings from "../config";

let image
let imageWidth
let imageHeight
let shouldDrawImage = false
let timeoutId

try {
    image = new Image("puncher.png", "../assets/puncher.png");
    imageWidth = image.getTextureWidth();
    imageHeight = image.getTextureHeight();
} catch (e) {
    ChatLib.chat(":/");
}

register("renderOverlay", () => {
    if (!shouldDrawImage || !image) return;
    const x = Renderer.screen.getWidth() /2 - imageWidth /2
    const y = (Renderer.screen.getHeight() / 2 - imageHeight /2) - 160
    const w = imageWidth
    const h = imageHeight
    image.draw(x, y, w, h);
}),
() => Settings.puncher_alert && image

register("chat", () => {
    if (Settings.puncher_alert) {
        shouldDrawImage = true;
        new Sound({ source: "puncher.ogg" })?.play();
        if (Settings.puncher_chat_alert) { ChatLib.command(`pc [Micu] FUDGE! Rolled The Puncher AHHHHHHHHHHHHHHHHHHHH`) }
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            shouldDrawImage = false;
        }, 3000);
    }
}).setCriteria("You found The Puncher in the Lucky Chest! You have 10s to claim it before it disappears!");

register("chat", (name) => {
    if (Settings.puncher_alert) {
        new Sound({ source: "puncher.ogg" })?.play();
        () => Settings.puncher_alert
        if (Settings.puncher_chat_alert) { ChatLib.command(`pc [Micu] WASTED. ${name} rolled The Puncher!`) }
    }
}).setCriteria("${name} found The Puncher in the Lucky Chest!");

register("command", () => {
    shouldDrawImage = true;
    new Sound({ source: "puncher.ogg" })?.play();
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        shouldDrawImage = false;
    }, 3000);
}).setName("micupunchertest1");

register("command", () => {
    new Sound({ source: "puncher.ogg" })?.play();
    () => Settings.puncher_alert
}).setName("micupunchertest2");