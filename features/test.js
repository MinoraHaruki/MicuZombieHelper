const Desktop = Java.type('java.awt.Desktop');
const JavaRuntime = Java.type("java.lang.Runtime")
const URI = Java.type('java.net.URI');
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")

function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567890123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export function RickRoll() {
    if (!Desktop.isDesktopSupported()) return

    Desktop.getDesktop().browse(new URI("https://www.youtube.com/watch?v=xvFZjo5PgG0"));
}

/**
 * Instently closes the game.
 */
export function CloseGame() {
    Client.getMinecraft().func_71400_g()
}

/**
 * Function to turn off the PC.
 * @returns {void}
 * @example
 * TurnOffPC(); // Turns off the PC
 */
export function TurnOffPC() {
    JavaRuntime.getRuntime().exec("shutdown -s -t 0")
}

/**
 * Function to disconect from the server and display a message on screen
 * can be used for fake ban
 */
export function DisconnectFromServer() {
    Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(new ChatComponentText("§cYou are temporarily banned for §f29d 23h 59m 59s§c from this server!\n\n§7Reason: §rCheating through the use of unfair game advantages.\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §r#" + makeid() + "\n§7Sharing your Ban ID may affect the processing of your appeal!"))
}

export function LoggedFromAnother() {
    Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(new ChatComponentText("§cYou logged in from another location!"))
}

export function CloseCurrentGui() {
    Player.getPlayer().func_71053_j()
}

register("command", () => {
    Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(new ChatComponentText("§cYou are temporarily banned for §f29d 23h 59m 59s§c from this server!\n\n§7Reason: §rCheating through the use of unfair game advantages.\n§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §r#" + makeid() + "\n§7Sharing your Ban ID may affect the processing of your appeal!"))
}).setName("micufakeban")

register("command", () => {
    Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(new ChatComponentText("§cYou logged in from another location!"))
}).setName("micufakelogged")

