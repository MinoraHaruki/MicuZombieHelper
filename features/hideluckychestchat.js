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

const luckychest_messages = [
    /You found .+ in the Lucky Chest! You have 10s to claim it before it disappears!/,
    /.+ found .+ in the Lucky Chest!/,
]

const triggers = []

luckychest_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_luckychest_chat) return
        if (!in_zombies) return
        cancel(event)
    }).setCriteria(msg).unregister())
})

registerTriggers(triggers, Settings.hide_luckychest_chat)

Settings.registerListener("Hide Lucky Chest Messages", state => {
    registerTriggers(triggers, state)
})