import Settings from "../config";

let in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;

register("chat", (message, event) => {
    if (!in_zombies) return
    message = ChatLib.getChatMessage(event)

    if (Settings.hide_windows_chat) {
        if (message.includes("Repairing windows. Keep holding SNEAK to continue repairing.") ||
        message.includes("You have fully repaired this window!") ||
        message.includes("Stopped repairing. Hold SNEAK to continue repairing!") ||
        message.includes("Stopped repairing. There are enemies nearby!") ||
        message.includes("Stopped repairing. Stay within range of the window to repair it!") ||
        message.includes("You can't repair windows while enemies are nearby!"))
        cancel(event)
    }
    if (Settings.hide_revive_chat) {
        if (message.includes(`revived`)) cancel(event)
    }
    if (Settings.hide_targethit_chat) {
        if (message.includes(`⊕`)) cancel(event)
    }
    if (Settings.hide_leaverejoin_chat) {
        if (message.includes(`left the game.`) || message.includes(`rejoined.`)) cancel(event)
    }
    if (Settings.hide_openarea_chat) {
        if (message.includes(`opened`)) cancel(event)
    }
    if (Settings.hide_luckychest_chat) {
        if (message.includes(`in the Lucky Chest! You have 10s to claim it before it disappears!`) || message.includes(`in the Lucky Chest!`)) cancel(event)
    }
    if (Settings.hide_knockdown_chat) {
        if (message.includes(`was knocked down by`) && message.includes(`You have 25s to revive them!`)) cancel(event)
    }
    if (Settings.hide_powerup_chat) {
        if (message.includes(`activated Max Ammo!`) ||
        message.includes(`activated Insta Kill for 10s!`) ||
        message.includes(`activated Carpenter!`) ||
        message.includes(`activated Bouns Gold!`) ||
        message.includes(`activated Double Gold for 30s!`) ||
        message.includes(`activated Shopping Spree for 20s!`) ||
        message.includes(`The Lucky Chest is temporarily dirt cheap, Buy now!`))
        cancel(event)
    }
    if (Settings.hide_gold_chat) {
        if (message.includes(`Gold`)) cancel(event)
    }
}).setCriteria("${message}")