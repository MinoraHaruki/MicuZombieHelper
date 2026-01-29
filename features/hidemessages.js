import Settings from "../config";

let in_zombies = false;

register("step", () => {
    in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;
}).setFps(1);

register("chat", (chat, event) => {
    if (!in_zombies) return
    chat = String(ChatLib.getChatMessage(event, true))

    if (Settings.hide_windows_chat) {
        if (chat.includes("&r&aRepairing windows. Keep holding SNEAK to continue repairing.&r") ||
        chat.includes("&r&aYou have fully repaired this window!&r") ||
        chat.includes("&r&cStopped repairing. Hold SNEAK to continue repairing!&r") ||
        chat.includes("&r&cStopped repairing. There are enemies nearby!&r") ||
        chat.includes("&r&cStopped repairing. Stay within range of the window to repair it!&r") ||
        chat.includes("&r&cYou can't repair windows while enemies are nearby!&r"))
        cancel(event)
    }
    if (Settings.hide_revive_chat) {
        if (chat.includes(`&r&erevived`)) cancel(event)
    }
    if (Settings.hide_targethit_chat) {
        if (chat.includes(`⊕`)) cancel(event)
    }
    if (Settings.hide_leaverejoin_chat) {
        if (chat.includes(`&r&7left the game.&r`) || chat.includes(`&r&7rejoined.&r`)) cancel(event)
    }
    if (Settings.hide_openarea_chat) {
        if (chat.includes(`&r&7opened`)) cancel(event)
    }
    if (Settings.hide_luckychest_chat) {
        if (chat.includes(`&r&7in the &r&5Lucky Chest&r&7! You have &r&c10s &r&7to claim it before it disappears!&r`) ||
            chat.includes(`&r&7in the &r&5Lucky Chest&r&7!&r`) ||
            chat.includes(`&r&cSomeone else is using the Lucky Chest right now. Try again when they are finished!&r`)) cancel(event)
    }
    if (Settings.hide_knockdown_chat) {
        if (chat.includes(`&r&ewas knocked down by`) && chat.includes(`You have &r&c25s &r&eto revive them!&r`)) cancel(event)
    }
    if (Settings.hide_powerup_chat) {
        if (chat.includes(`&r&eactivated &r&9&lMax Ammo&r&e!&r`) ||
        chat.includes(`&r&eactivated &r&c&lInsta Kill&r&e for 10s!&r`) ||
        chat.includes(`&r&eactivated &r&9&lCarpenter&r&e!&r`) ||
        chat.includes(`&r&eactivated &r&6&lBouns Gold&r&e!&r`) ||
        chat.includes(`&r&eactivated &r&6&lDouble Gold&r&e for &r&c30s&r&e!&r`) ||
        chat.includes(`&r&eactivated Shopping Spree for 20s!`) ||
        chat.includes(`&r  &r&e&l> &r&eThe &r&5Lucky Chest &r&eis temporarily dirt cheap. Buy now!&r`))
        cancel(event)
    }
    if (Settings.hide_gold_chat) {
        if (chat.includes("&r&6+")) cancel(event)
    }
}).setCriteria("${chat}")