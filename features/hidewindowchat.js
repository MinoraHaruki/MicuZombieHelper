import Settings from "../config";

const registerTriggers = (triggers, state) => {
    for (let i = 0; i < triggers.length; i++) {
        if (state) {
            triggers[i].register()
        }
        else {
            triggers[i].unregister()
        }
    }
}

let in_zombies = false

register("step", () => {
    in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;
}).setFps(5);

const window_messages = [
    /Repairing windows. Keep holding SNEAK to continue repairing./,
    /You have fully repaired this window!/,
    /Stopped repairing. Hold SNEAK to continue repairing!/,
    /Stopped repairing. There are enemies nearby!/,
    /Stopped repairing. Stay within range of the window to repair it!/,
    /You can't repair windows while enemies are nearby!/,
]

const triggers = []

window_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_windows_chat) return
        if (!in_zombies) return
        cancel(event)
    }).setCriteria(msg).unregister())
})

registerTriggers(triggers, Settings.hide_windows_chat)

Settings.registerListener("Hide Window Repair Messages", state => {
    registerTriggers(triggers, state)
})
