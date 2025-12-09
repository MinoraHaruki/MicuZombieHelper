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

const powerup_messages = [
    /.+ activated Max Ammo!/,
    /.+ activated Insta Kill for 10s!/,
    /.+ activated Carpenter!/,
    /.+ activated Bouns Gold!/,
    /.+ activated Double Gold for 30s!/,
    /.+ activated Shopping Spree for 20s!/,
    /  >  The Lucky Chest is temporarily dirt cheap, Buy now!/,
]

const triggers = []

powerup_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_powerup_chat) return
        if (!in_zombies) return
        cancel(event)
    }).setCriteria(msg).unregister())
})

registerTriggers(triggers, Settings.hide_powerup_chat)