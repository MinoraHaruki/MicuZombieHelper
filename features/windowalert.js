import Settings from "../config";

let in_zombies = false
let show_window_alert = false;
let show_nearby_alert = false;
let repaired = new Text('Fully Repaired!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.GREEN)
let zombiesnearby = new Text('Mobs Nearby!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.RED)

register("step", () => {
    in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;
}).setFps(5);

function renderwindowalert() {
    if (Settings.window_alert && show_window_alert && in_zombies) { repaired.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
    if (Settings.window_alert && show_nearby_alert && in_zombies) { zombiesnearby.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
}

function fixedwindows() {
  show_window_alert = true;
  World.playSound("note.pling", 2, 1)
  setTimeout(() => {
    show_window_alert = false;
  }, 1000)
}

function zomnearby() {
  show_nearby_alert = true;
  World.playSound("note.pling", 2, 1)
  setTimeout(() => {
    show_nearby_alert = false;
  }, 1000)
}

register('renderOverlay', renderwindowalert);

register("chat", fixedwindows).setCriteria("You have fully repaired this window!");

register("chat", zomnearby).setCriteria("You can't repair windows while enemies are nearby!");