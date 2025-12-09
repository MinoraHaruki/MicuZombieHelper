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

const gold_messages = [ 
    /\+\d Gold/,
    /\+\d Gold .+/
]

const triggers = []

gold_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_gold_chat) return
        if (!in_zombies) return
        cancel(event)
    }).setCriteria(msg).unregister())
})

registerTriggers(triggers, Settings.hide_gold_chat)

Settings.registerListener("Hide Gold Received Messages", state => {
    registerTriggers(triggers, state)
})