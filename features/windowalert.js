import Settings from "../config";

let show_window_alert = false;
let show_nearby_alert = false;
let repaired = new Text('Fully Repaired!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.GREEN)
let zombiesnearby = new Text('Mobs Nearby!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.RED)

function renderwindowalert() {
    if (Settings.window_alert && show_window_alert) { repaired.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 3) }
    if (Settings.window_alert && show_nearby_alert) { zombiesnearby.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 3) }
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