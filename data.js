import PogObject from "../PogData/index"

export const data = new PogObject("MicuZombieHelper", {
    firstInstall: true,
    StatsCoords: {
        x: 5,
        y: 5,
    },
}, ".data.json")

if (data.firstInstall || data.firstInstall == undefined) {
  setTimeout(function() {
    ChatLib.chat("&3[&bMicu&3]&r Thanks for using this module! If you wanna suggest me add helpful feature or feedback about it please create issue in my github!");
    data.firstload = false;
  }, 2000);
}