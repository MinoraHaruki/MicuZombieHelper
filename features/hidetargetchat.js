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

const triggers = []

const target_messages = [ / ⊕ .+ hit the target!/ ]

target_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_targethit_chat) return
        if (!in_zombies) return
        cancel(event)
    }).setCriteria(msg).unregister())
})

registerTriggers(triggers, Settings.hide_targethit_chat)

Settings.registerListener("Hide Target Hit Messages", state => {
    registerTriggers(triggers, state)
})