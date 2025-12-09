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

const leaverejoin_messages = [
    /.+ left the game./,
    /.+ rejoined./,
]

const triggers = []

leaverejoin_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_leaverejoin_chat) return
        if (!in_zombies) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
registerTriggers(triggers, Settings.hide_leaverejoin_chat)
Settings.registerListener("Hide Player Leave/Rejoin Messages", state => {
    registerTriggers(triggers, state)
})