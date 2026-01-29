import Settings from "../config"

let dauncounter = 0;

function getplayername(player) {
    let num
    let name
    num = player.indexOf(']')
    name = player.substring(num+2)
return name
}
register("chat", (chat, event) => {
    if (Settings.partycmd) {
        chat = String(ChatLib.getChatMessage(event));
        if (chat.toLowerCase().includes("daun") && !chat.includes("!daun") && !chat.includes("[Micu] daun Counter:")) dauncounter++
    }
}).setCriteria("${chat}")

register("chat", (player, message, event) => {
    if (Settings.partycmd && message.slice(0, 1)=="!") {
        switch (message) {
            case "!w":
            case "!warp":
                ChatLib.command("p warp")
                break;

            case "!coords": 
                ChatLib.command("chat p")
                ChatLib.command("patcher sendcoords")
                break;

            case "!allinv":
            case "!allinvite":
                ChatLib.command("p setting allinvite")
                break;

            case "!demote":
                ChatLib.command("p demote " + getplayername(player))
                break;

            case "!promote":
                ChatLib.command("p promote " + getplayername(player))
                break;

            case "!mute":
                ChatLib.command("p mute")
                break;

            case "!kick":
                ChatLib.command("p kick " + getplayername(player))
                break;

            case "!daun":
                ChatLib.command(`pc [Micu] daun Counter: ${dauncounter}`)
                break;

            default:
                break;
        }
    }
}).setCriteria("&r&9Party &8> ${player}&f: &r${message}&r")

register("chat", (player, m1, m2, event) => {
    if (Settings.partycmd && m1.slice(0, 1)=="!") {
        switch (m1) {
            case "!promote":
                ChatLib.command("p promote " + m2)
                break;

            case "!demote":
                ChatLib.command("p demote " + m2)
                break;
            
            case "!transfer":
                   ChatLib.command("p transfer " + m2)
                break;
            case "!kick":
                ChatLib.command("p kick " + m2)
                break;
            default:
                break;
        }
    }
}).setCriteria("&r&9Party &8> ${player}&f: &r${m1} ${m2}&r")