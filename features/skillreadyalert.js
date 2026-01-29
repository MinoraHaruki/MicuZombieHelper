import Settings from "../config";

let show_skill_alert = false;
let show_skill2_alert = false;
let alert = new Text('Skill ready!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.AQUA)
let alerting = false;
let alerting2 = false;
let in_zombies = false;

register("step", () => {
  in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;

  if (!in_zombies) {return;}
  if (Settings.lrod_alert) {
    item = Player.getInventory()
    lrod = item.indexOf(369)
    heal = item.indexOf(322)
    if (!alerting) {
      if (item && lrod !== -1) {
        show_skill_alert = true;
        World.playSound("note.pling", 2, 3)
        setTimeout(() => {
          show_skill_alert = false;
        }, 3000)
        alerting = true;
      }
    }
    if (lrod == -1) {
      show_skill_alert = false;
      alerting = false;
    }
    if (!alerting2) {
      if (item && heal !== -1) {
        show_skill2_alert = true;
        World.playSound("note.pling", 2, 3)
        setTimeout(() => {
          show_skill2_alert = false;
        }, 3000)
        alerting2 = true;
      }
    }
    if (heal == -1) {
      show_skill2_alert = false;
      alerting2 = false;
    }
  }
}).setFps(5);

function renderskill() {
    if (Settings.lrod_alert && show_skill_alert || Settings.lrod_alert && show_skill2_alert) { alert.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
}

register('renderOverlay', renderskill);