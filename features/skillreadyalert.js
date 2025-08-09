import Settings from "../config";

let show_lrod_alert = false;
let alert = new Text('Lighting Rod Ready!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.AQUA)
let alerting = false;
let in_zombies = false;

register("step", () => {
  in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;

  if (!in_zombies) {return;}
  if (Settings.lrod_alert) {
    item = Player.getInventory().getStackInSlot(4)
    if (!alerting) {
      if (String(item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Name")).removeFormatting().toLowerCase().includes("lightning rod skill") && String(item.getUnlocalizedName()).removeFormatting().toLowerCase().includes("blazerod")) {
        show_lrod_alert = true;
        World.playSound("note.pling", 2, 3)
        setTimeout(() => {
          show_lrod_alert = false;
        }, 3000)
        alerting = true;
      }
    }
    if (!String(item.getUnlocalizedName()).removeFormatting().toLowerCase().includes("blazerod")) {
      show_lrod_alert = false;
      alerting = false;
    }
  }
}).setFps(5);

function renderskill() {
    if (Settings.lrod_alert && show_lrod_alert) { alert.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 3) }
}

register('renderOverlay', renderskill);