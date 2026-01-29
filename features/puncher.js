import Settings from "../config";

let in_zombies = false;
let image
let imageWidth
let imageHeight
let shouldDrawImage = false
let timeoutId
let map;
let puncher_count = 0;

register("step", () => {
    in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;
    if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("alien")) { map = "Alien Arcadium" }
    if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("bad blood")) { map = "Bad Blood" }
    if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("dead end")) { map = "Dead End" }
    if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("prison")) { map = "Prison" }
}).setFps(1);

try {
    image = new Image("puncher.png", "../assets/puncher.png");
    imageWidth = image.getTextureWidth();
    imageHeight = image.getTextureHeight();
} catch (e) {
    ChatLib.chat(":/");
}

register("worldUnload", () => {
    puncher_count = 0;
})

register("renderOverlay", () => {
    if (!shouldDrawImage || !image) return;
    const x = Renderer.screen.getWidth() /2 - imageWidth /2
    const y = (Renderer.screen.getHeight() / 2 - imageHeight /2) - 160
    const w = imageWidth
    const h = imageHeight
    image.draw(x, y, w, h);
}),
() => Settings.puncher_alert && image

register("chat", (chat, event) => {
    chat = String(ChatLib.getChatMessage(event, true))
    if (Settings.puncher_alert && in_zombies && map === "Alien Arcadium") {
        if (chat.includes("&r&7You found &r&6The Puncher &r&7in the &r&5Lucky Chest&r&7! You have &r&c10s &r&7to claim it before it disappears!&r")) {
            puncher_count++
            shouldDrawImage = true;
            new Sound({ source: "puncher.ogg" })?.play();
            if (Settings.puncher_chat_alert) { ChatLib.command(`pc [Micu] Oi Cai DissCorMess (Puncher Count: ${puncher_count})`) }
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                shouldDrawImage = false;
            }, 3000);
        }
    }
}).setCriteria("${chat}");

register("chat", (name) => {
    if (Settings.puncher_alert && in_zombies && map === "Alien Arcadium") {
        puncher_count++
        new Sound({ source: "puncher.ogg" })?.play();
        () => Settings.puncher_alert
        if (Settings.puncher_chat_alert) { ChatLib.command(`pc [Micu] WASTED. ${name} rolled The Puncher! (Puncher Count: ${puncher_count})`) }
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