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

const window_messages = [
    /Repairing windows. Keep holding SNEAK to continue repairing./,
    /You have fully repaired this window!/,
    /Stopped repairing. Hold SNEAK to continue repairing!/,
    /Stopped repairing. There are enemies nearby!/,
    /Stopped repairing. Stay within range of the window to repair it!/,
    /You can't repair windows while enemies are nearby!/,
]
const revive_messages = [ /.+ revived .+!/ ]
const leaverejoin_messages = [
    /.+ left the game./,
    /.+ rejoined./,
]
const target_messages = [ / ⊕ .+ hit the target!/ ]
const openarea_messages = [ /.+ opened .+!/ ]
const luckychest_messages = [
    /You found .+ in the Lucky Chest! You have 10s to claim it before it disappears!/,
    /.+ found .+ in the Lucky Chest!/,
]
const knockdown_messages = [ /.+ was knocked down by .+ in .+! You have 25s to revive them!/ ]
const powerup_messages = [
    /.+ activated Max Ammo!/,
    /.+ activated Insta Kill for 10s!/,
    /.+ activated Carpenter!/,
    /.+ activated Bouns Gold!/,
    /.+ activated Double Gold for 30s!/,
    /.+ activated Shopping Spree for 20s!/,
    /  >  The Lucky Chest is temporarily dirt cheap, Buy now!/,
]
const gold_messages = [ /\+\d Gold/ ]

register("step", () => {
    in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;
}).setFps(5);

const triggers = []

window_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_windows_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
revive_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_revive_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
leaverejoin_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_leaverejoin_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
target_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_targethit_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
openarea_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_openarea_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
luckychest_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_luckychest_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
knockdown_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_windows_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
powerup_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_powerup_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})
gold_messages.forEach(msg => {
    triggers.push(register("chat", event => {
        if (!Settings.hide_gold_chat) return
        cancel(event)
    }).setCriteria(msg).unregister())
})

registerTriggers(triggers, Settings.hide_windows_chat)
registerTriggers(triggers, Settings.hide_revive_chat)
registerTriggers(triggers, Settings.hide_targethit_chat)
registerTriggers(triggers, Settings.hide_leaverejoin_chat)
registerTriggers(triggers, Settings.hide_powerup_chat)
registerTriggers(triggers, Settings.hide_gold_chat)
registerTriggers(triggers, Settings.hide_openarea_chat)
registerTriggers(triggers, Settings.hide_luckychest_chat)
registerTriggers(triggers, Settings.hide_knockdown_chat)

Settings.registerListener("Hide Window Repair Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Knockdown Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Lucky Chest Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Open Area Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Gold Received Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Power Up Pickup Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Player Leave/Rejoin Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Target Hit Messages", state => {
    registerTriggers(triggers, state)
})
Settings.registerListener("Hide Revive Messages", state => {
    registerTriggers(triggers, state)
})