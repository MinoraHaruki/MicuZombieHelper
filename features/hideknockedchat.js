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

const knockdown_messages = [ /.+ was knocked down by .+ in .+! You have 25s to revive them!/ ]

const triggers = []

knockdown_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_windows_chat) return
        if (!in_zombies) return
        cancel(event)
    }).setCriteria(msg).unregister())
})

registerTriggers(triggers, Settings.hide_knockdown_chat)

Settings.registerListener("Hide Knockdown Messages", state => {
    registerTriggers(triggers, state)
})