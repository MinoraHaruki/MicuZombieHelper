import Settings from "./config";
import { Color } from "Vigilance";
import "./features/victory"
import "./features/puncher"
import "./features/hidemessages"

register("command", () => Settings.openGUI()).setName("micu");

ChatLib.chat("Truong Thanh Hon")
//pog
import PogObject from "PogData";

//firstlaod stuff
const data = new PogObject("MicuZombieHelper", {

});

data.autosave();

let pregame_info = "\n\n\n&7          -----[&cPREGAME INFO&7]-----\n&eAlien Arcadium Eco Strategy &7(written by &eLaPercy (Percy84)&7, original idea by greaneye)\n&7A way for players to reach win the game (round 105) the most efficiently possible.\n&cWarning: The strategy is hard, even for experienced zombies players, you need a team that understands and follows the strategy well, good cohesion, and &4&ldon't take Puncher&7.\n\n&7If you plan on winning, make sure you have at least &e2.5h/2h30 !!\n&7Eco stands for economy, the goal is to get as much &6gold &7as possible.\n\n&cImportant rules:\n&7- &cNever &7take &cInsta Kill &7cus coins\n&7- &cNever &7take &4&lThe Puncher &7from the chest\n&7- &aSlimes &7are important, when they are fully grown, they give &cMUCH &7more &6gold\n&7- &6Double Golds &7are &6&lGODLY&7, if you can, save them when they are a lot of golems or slimes\n&7- Get &5Shopping Spree &er6 &7or &er7, &7if &c&lr5 you won't get any spree r25 nor r35 (you want to avoid that)\n\n&7To get as much &6gold &7as possible, &c&lyou'll be using Pistol + Shotgun as MUCH as possible&7, they have the &6highest ratio of gold give per damage dealt &7(except flamethrower but it's too weak), and if you're in trouble, you may scarcely use a 3rd weapon or a skill, and that &c&luntil you get Diamond Chestplate&7!\n\n&7Once you have the &bDiamond Chestplate&7, tell your team to s1 (save 1 zombie alive)!\n&7Roll for &eRainbow Rifle&7 (ultimate 3) + &eZombie Zapper&7 + &eDouble Barrel Shotgun&7 (ultimate 3) + &eLightning rod Skill\n&7Once you're set, buy &6Extra Health&7 when you can (5k, 10k, 20k, 50k, 100k)\n\n&4o1 &7(data provided by 93tillInfinity):\n&7- r40-64: 250 hp (Bombie + 10hp)\n&7- r64-100: 650 hp (Broodmother + 100 hp)\n&7- r102-105: 900hp (half of Herobrine or Wither), doesn't matter since they do no damage.\n\n&cThe corners used&7:\n&7- &6Chest corner&7, at the chest (the block where you have the chest at your right and the wall at your left).\n&7- &6Ultimate (ult) corner&7, in the ultimate machine, the 1-block space.\n&7- &6Alternative (alt) corner&7, in Ferris Wheel, at the back window, opposite side of the iron bars.\n\n&7When you have &3N Giant (x-y-z) &7it means the &3N giants&7 will spawn as a &61st wave of X giants&7, &6the second wave of giant will have Y giants&7 and &6the 3rd one Z giants &7(n,x,y,z numbers).\n\n&7-----&cPREGAME INFO &7(SCROLL UP TO READ WHOLE THING, &4&lVERY IMPORTANT &7IF YOU DON'T KNOW)&7-----";

//s'more first load stuff
if (data.firstload || data.firstload == undefined) {
  setTimeout(function() {
    ChatLib.chat("hu hu khec khec");
    data.firstload = false;
  }, 2000);
}

let insta_kill = 0
let max_ammo = 0
let shopping_spree = 0

let poweruptext_update
let poweruptext
let textinsta
let textspree
let textmax

let max_pat = 0;
let max_pat1 = [2, 5, 8, 12, 16, 21, 26, 31, 36, 41, 46, 51, 61, 66, 71, 76, 81, 86, 91, 96];
let max_pat2 = [3, 6, 9, 13, 17, 22, 27, 32, 37, 42, 47, 52, 62, 67, 72, 77, 82, 87, 92, 97];

let insta_pat = 0;
let insta_pat1 = [2, 5, 8, 11, 14, 17, 20, 23];
let insta_pat2 = [3, 6, 9, 12, 15, 18, 21];

let ss_pat = 0;
let ss_pat1 = [5, 15, 45, 55, 65, 75, 85, 95];
let ss_pat2 = [6, 16, 26, 36, 46, 66, 76, 86, 96];
let ss_pat3 = [7, 17, 27, 37, 47, 67, 77, 87, 97];

let grow_round = [18, 23, 26, 29, 31, 33, 34, 39, 43, 47, 52];

let round_update = 0;
let in_zombies = false;
let infoed = false;
let map = "Loading...";
let round = "Loading...";
let strat = "Loading...";
let strat_next = "Loading...";
let round_in_int = 0;

let show_lrod_alert = false;
let show_window_alert = false;
let show_nearby_alert = false;
let show_shootT_alert = false;

let alert = new Text('Lighting Rod Ready!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.AQUA)
let repaired = new Text('Fully Repaired!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.GREEN)
let zombiesnearby = new Text('Mobs Nearby!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.RED)
let shootT = new Text('Shoot Now!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)

let grow_round_strat = {
  18: "Please dont shoot slime until i call (Revive Cycle Spot: Chest Corner)",
  23: "Please dont shoot slime until i call (Revive Cycle Spot: Chest Corner)",
  26: "Please dont shoot slime until i call (Revive Cycle Spot: Chest Corner or Entrance Corner)",
  29: "Please dont shoot slime until i call (Revive Cycle Spot: Perk Corner)",
  31: "Please dont shoot slime until i call (Revive Cycle Spot: Perk Corner or Chest Corner)",
  33: "Please dont shoot slime until i call (Revive Cycle Spot: Perk Corner or Chest Corner)",
  34: "Please dont shoot slime until i call (Revive Cycle Spot: Perk Corner or Chest Corner)",
  39: "Start shooting when Giant gets close (Revive Cycle Spot: Chest Corner)",
  43: "Start shooting when Giant gets close (Revive Cycle Spot: Chest Corner)",
  47: "Start shooting when Giant gets close or when slimes are fully grown (Revive Cycle Spot: Chest Corner)",
  52: "Final one! Start shooting when Giant gets close (Revive Cycle Spot: Chest Corner)",
}

let strategies = {
  0: '',
  1: 'make sure to step back not to take Insta Kill ',
  2: 'make sure to step back not to take Insta Kill ',
  3: 'make sure to step back not to take Insta Kill ',
  4: 'make sure to step back not to take Insta Kill ',
  5: 'make sure to step back not to take Insta Kill ',
  6: "Save the spree for the end of the round, open Roller Coaster. # Never replace Pistol or Shotgun. Roll once only. Don't take puncher. What you need is a 3rd gun (Rainbow Rifle, Double Barrel Shotgun or Zombie Zapper - best weapon to get), as well as Lightning Rod Skill (heal skill is fine in the mean time) ",
  7: "Save the spree for the end of the round, open Roller Coaster. # Never replace Pistol or Shotgun. Roll once only. Don't take puncher. What you need is a 3rd gun (Rainbow Rifle, Double Barrel Shotgun or Zombie Zapper - best weapon to get), as well as Lightning Rod Skill (heal skill is fine in the mean time) ",
  8: 'Spread, kill zombies, nothing particular here, you can grow r10 slimes a bit, not important. ',
  9: 'Spread, kill zombies, nothing particular here, you can grow r10 slimes a bit, not important. ',
  10: 'Spread, kill zombies, nothing particular here, you can grow r10 slimes a bit, not important. ',
  11: 'Spread, kill zombies, nothing particular here, you can grow r10 slimes a bit, not important. ',
  12: 'Spread, kill zombies, nothing particular here, you can grow r10 slimes a bit, not important. ',
  13: 'Spread, kill zombies, nothing particular here, you can grow r10 slimes a bit, not important. ',
  14: 'Spread, kill zombies, nothing particular here, you can grow r10 slimes a bit, not important. ',
  15: 'Giant on last wave (when a few mobs left), not important to grow the slimes ',
  16: 'Grow slimes a bit. Open Ferris Wheel and ultimate Pistol and Shotgun. ',
  17: 'Grow slimes a bit. Open Ferris Wheel and ultimate Pistol and Shotgun. ',
  18: 'Camp at the Lucky Chest, grow slimes FULL size, for the scarce zombies that come, use pistol on them or shotgun aiming at the ground. ',
  19: "Open Bumper Cars, buy Fast Revive, Quick Fire and at least Extra Health 1. Get to Extra Health 3 asap (don't buy higher until Diamond Chestplate is acquired) ",
  20: '2 Giants (1-1) ',
  21: 'Only time you may take insta kill ',
  22: '2 Giants (1-1) ',
  23: 'Chest corner, grow slimes. ',
  24: '3 Giants (1-1-1) ',
  25: 'Mega Blob ',
  26: 'Chest corner, only slimes round, grow them FULL size.',
  27: 'nop',
  28: 'nop',
  29: "clowns 'n slimes stay close and keep moving to take less damage.",
  30: "4 Giants (1-1-2). Camp (near) chest corner unless it's specified otherwise.",
  31: 'nop',
  32: 'nop',
  33: 'You may grow slimes in perk corner preferably. ',
  34: 'You may grow slimes in perk corner preferably. ',
  35: 'Mega Magma ',
  36: '3 Giants (1-2), you can go middle for the first wave, there are clowns be careful, the first giant only spawn at the second wave ',
  37: '3 Giants (1-2) ',
  38: '3 Giants (1-2) ',
  39: '3 Giants (1-2), grow slimes. Aim at giants.',
  40: "4 Giants (2-2) + 1 o1 (The Old one) Wait the death of the o1 for get out of corner, if it does not come, it's probably stuck (often in Bumper Cars), stay in a corner or go on a stair (like on the refill ammo, at the edge of the block) and the o1 will be sort of stuck. Harder than r30-39, don't go too far from the chest or you'll make the entire team killed.",
  41: '4 Giants (2-2) ',
  42: '6 Giants (2-2-2) Now things start to get a little "spicy". Make sure to stay close to the chest. ',
  43: '6 Giants (2-2-2). Make sure to have 70+ ammo on the shotgun. Giga Slimes Round! Grow Slimes! FULL SIZE! Aim Giants! ',
  44: '9 Giants (3-3-3) ',
  45: '3 Giants (3). 2 old ones (2)! Go ultimate machine corner. ',
  46: '100% Golems. 1 Old One! Whole team camps in the Chest corner. ',
  47: '3 Giants (3). Make sure to have 70+ ammo on the shotgun. Giga Slimes Round! Grow Slimes! FULL SIZE! Aim Giants! ',
  48: 'Kill the creepers asap they do a lot of damage. 1 Old one! ',
  49: 'Clutch round, no giants, no o1, but tons of mobs and clowns. Dance for at least 20 seconds (dance = run among zombies while killing them asap), then go to Alt corner.',
  50: "4 Giants (2-2) From now on, mobs deal much more damage. The rounds you should be wary of in this block are 50, 55 and 58. Don't under-estimate. The new default corner is Ultimate Machine corner now.",
  51: '4 Giants (2-2), tons of Skeletons but they deal no damage. ',
  52: '4 Giants (2-2) CHEST CORNER. Giga Slimes Round! Grow Slimes! FULL SIZE! Aim Giants! ',
  53: '4 Giants (2-2). Tons of clowns ALT (better) OR ULT CORNER. Kill clowns and Giants asap! ',
  54: '4 Giants (2-2), now they are Rainbow giants! ALT (better) OR ULT CORNER. 2 o1 (1-1)! When the giants spawn, an o1 will arrive few seconds later, be careful! ',
  55: '5 Giants (1-1-1-1-1) ',
  56: 'Mega Blob, roll if you need and if someone does not have chestplate, let them solo this and the next round. ',
  57: 'Mega Magma. ',
  58: '6 Giants (3-3), 5 Old ones ALT (better) OR ULT CORNER',
  59: '13 o1! Just go on the ledge of a stair (you can spread 2-2) and kill them asap. ',
  60: 'Mini Space Blasters! A LOT! 2 o1! Everyone should have Diamond Chestplate and be set. Now focus on surviving and buy Extra Health when you can! The rounds 61-70, are the same as 71-80, 81-90 and 91-100 (except r89 and r99). When you get revived or when 2-3 people are down, block (right click) with your sword to take less damage. 1s or x1 means 61, 71, 81, 91 (same for 2s or x2 etc). 1 person buys Frozen Bullets, replacing Quick Fire. ',
  61: "Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  62: "Clown's party! Go near ALT corner. Wallshoot (if you know), just kill them asap (easiest rounds).",
  63: "Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  64: "3rd Hardest rounds. 1-2 player go in the front and kill the Worms asap, after 10-15 seconds, go backwards while shooting. Time lightning well, no giants but still very hard if you do bad.",
  65: "GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. They aim at the giants and old ones to slow them down. Corner when giants arrive. Use lightning when there is a clutch at the corner.",
  66: "Magma Cubes, Creeper and Bombs. Buy Quick Fire back",
  67: "Fire lord zombies and Magma Cubes. Hard. Use lightning when a lot of zombies are near you.",
  68: "o1s! Golems, Worms and Bombs.",
  69: "Go to Perk corner, you will likely have a lot of bugged Zombies so be extremly careful near the end of the round. You will likely see more alive zombies than what is written in the scoreboard, that means some zombies are bugged or fake and can only be killed by melee. Identify them and kill them before starting the next round.",
  70: "Hardest rounds! Giants and o1! 1 player will focus the Iron Golems near the door, next to the window at the ultimate machine corner. 1 player will dance, loops in Park Entrance near the stone slabs (Ferris, Bumper, Roller, Ferris), makes sure they have the old ones on them. 1 player has Frozen Bullets and will focus the old ones on the dancer and will make sure to freeze the incoming Giants as well.",
  71: "Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  72: "Clown's party! Go near ALT corner. Wallshoot (if you know), just kill them asap (easiest rounds).",
  73: "Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  74: "3rd Hardest rounds. 1-2 player go in the front and kill the Worms asap, after 10-15 seconds, go backwards while shooting. Time lightning well, no giants but still very hard if you do bad.",
  75: "GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. They aim at the giants and old ones to slow them down. Corner when giants arrive. Use lightning when there is a clutch at the corner.",
  76: "Magma Cubes, Creeper and Bombs. Buy Quick Fire back",
  77: "Fire lord zombies and Magma Cubes. Hard. Use lightning when a lot of zombies are near you.",
  78: "o1s! Golems, Worms and Bombs.",
  79: "Go to Perk corner, you will likely have a lot of bugged Zombies so be extremly careful near the end of the round. You will likely see more alive zombies than what is written in the scoreboard, that means some zombies are bugged or fake and can only be killed by melee. Identify them and kill them before starting the next round.",
  80: "Hardest rounds! Giants and o1! 1 player will focus the Iron Golems near the door, next to the window at the ultimate machine corner. 1 player will dance, loops in Park Entrance near the stone slabs (Ferris, Bumper, Roller, Ferris), makes sure they have the old ones on them. 1 player has Frozen Bullets and will focus the old ones on the dancer and will make sure to freeze the incoming Giants as well.",
  81: "Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  82: "Clown's party! Go near ALT corner. Wallshoot (if you know), just kill them asap (easiest rounds).",
  83: "Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  84: "3rd Hardest rounds. 1-2 player go in the front and kill the Worms asap, after 10-15 seconds, go backwards while shooting. Time lightning well, no giants but still very hard if you do bad.",
  85: "GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. They aim at the giants and old ones to slow them down. Corner when giants arrive. Use lightning when there is a clutch at the corner.",
  86: "Magma Cubes, Creeper and Bombs. Buy Quick Fire back",
  87: "Fire lord zombies and Magma Cubes. Hard. Use lightning when a lot of zombies are near you.",
  88: "switch to alternative corner due to guardian zombies glitch",
  89: "Go to Perk corner, you will likely have a lot of bugged Zombies so be extremly careful near the end of the round. You will likely see more alive zombies than what is written in the scoreboard, that means some zombies are bugged or fake and can only be killed by melee. Identify them and kill them before starting the next round.",
  90: "Hardest rounds! Giants and o1! 1 player will focus the Iron Golems near the door, next to the window at the ultimate machine corner. 1 player will dance, loops in Park Entrance near the stone slabs (Ferris, Bumper, Roller, Ferris), makes sure they have the old ones on them. 1 player has Frozen Bullets and will focus the old ones on the dancer and will make sure to freeze the incoming Giants as well.",
  91: "Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  92: "Clown's party! Go near ALT corner. Wallshoot (if you know), just kill them asap (easiest rounds).",
  93: "Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  94: "3rd Hardest rounds. 1-2 player go in the front and kill the Worms asap, after 10-15 seconds, go backwards while shooting. Time lightning well, no giants but still very hard if you do bad.",
  95: "GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. They aim at the giants and old ones to slow them down. Corner when giants arrive. Use lightning when there is a clutch at the corner.",
  96: "Magma Cubes, Creeper and Bombs. Buy Quick Fire back",
  97: "Fire lord zombies and Magma Cubes. Hard. Use lightning when a lot of zombies are near you.",
  98: "o1s! Golems, Worms and Bombs.",
  99: "switch to alternative corner due to guardian zombies glitch",
  100: "Hardest rounds! Giants and o1! 1 player will focus the Iron Golems near the door, next to the window at the ultimate machine corner. 1 player will dance, loops in Park Entrance near the stone slabs (Ferris, Bumper, Roller, Ferris), makes sure they have the old ones on them. 1 player has Frozen Bullets and will focus the old ones on the dancer and will make sure to freeze the incoming Giants as well.",
  101: "Buy Quick Fire back. Replace Zapper by Shotgun. Everyone goes at middle, aim high, headshot the boss: World Ender (500 hp). Use everything, lightning, double barrel, rainbow rifle, shotgun. You MUST kill it under 5 seconds or you lose (not hard) but make sure to use lightning and double barrel at least.",
  102: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here.",
  103: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here.",
  104: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here.",
  105: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here."
};

let box_y = 55;
let box_x = 150;
function render() {
    if (!in_zombies) {return;}
    let x = Settings.x;
    let y = Settings.y;
    const scale = Settings.scale;
    let lines;
    let this_line;
    let this_line2;
    if (Settings.enabled) {
    Renderer.drawRect(Renderer.color(0, 0, 0, 100), x, y, box_x * scale, (box_y+15) * scale);
      if (map === "Alien Arcadium") {
        lines = {
              a: new Text("§aMap§7: " + map, x + 5, y + 5 * scale),
              b: new Text("§bRound§7: " + round.replace("[Round ", "").replace("]", "").replace("[", ""), x + 5, y + 15 * scale),
              c: new Text("§9Next Max§7: Round " + max_ammo, x + 5, y + 35 * scale),
              d: new Text("§cNext Insta§7: Round " + insta_kill, x + 5, y + 45 * scale),
              e: new Text("§5Next Spree§7: Round " + shopping_spree, x + 5, y + 55 * scale),
        }
      } else {
        lines = {
              a: new Text("§aMap§7: " + map, x + 5, y + 5 * scale),
              b: new Text("§bRound§7: " + round.replace("[Round ", "").replace("]", "").replace("[", ""), x + 5, y + 15 * scale),
              c: new Text("§9Next Max§7: Round " + max_ammo, x + 5, y + 35 * scale),
              d: new Text("§cNext Insta§7: Round " + insta_kill, x + 5, y + 45 * scale),
        }
      }
        for (let line in lines) {
            lines[line].setScale(scale).draw();
        }
        //strat rendering
        if (Settings.strat) {
          box_y = 75
          box_x = 270;
          this_line = new Text("§7Strat:", x + 5, y + box_y * scale);
          this_line.setScale(scale).draw();
          box_y += 10;
          if (Array.isArray(strat)) {
            strat.forEach((strat_line) => {
              this_line = new Text("§7" + strat_line, x + 5, y + box_y * scale);
              this_line.setScale(scale).draw();
              box_y += 10;
            })
          } else {
            this_line = new Text("§7" + strat, x + 5, y + box_y * scale);
            this_line.setScale(scale).draw();
            box_y += 10;
          }
          box_y += 10;
          this_line2 = new Text("§7Next Strat:", x + 5, y + box_y * scale);
          this_line2.setScale(scale).draw();
          box_y += 10;
          if (Array.isArray(strat_next)) {
            strat_next.forEach((strat_line) => {
              this_line2 = new Text("§7" + strat_line, x + 5, y + box_y * scale);
              this_line2.setScale(scale).draw();
              box_y += 10;
            })
          } else {
            this_line2 = new Text("§7" + strat_next, x + 5, y + box_y * scale);
            this_line2.setScale(scale).draw();
            box_y += 10;
          }
        } else {
          box_y = 55;
          box_x = 150;
        }
    }
    if (Settings.lrod_alert && show_lrod_alert) { alert.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 3) }
    if (Settings.window_alert && show_window_alert) { repaired.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 3) }
    if (Settings.window_alert && show_nearby_alert) { zombiesnearby.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 3) }
    if (show_shootT_alert) { shootT.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 3) }
}

register("step", () => {
  in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;

  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("alien")) { map = "Alien Arcadium" }
  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("bad blood")) { map = "Bad Blood" }
  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("dead end")) { map = "Dead End" }
  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("prison")) { map = "Prison" }

  if (in_zombies && !infoed) {
    max_pat = 0;
    insta_pat = 0;
    ss_pat = 0;
    max_ammo = 0;
    insta_kill = 0;
    shopping_spree = 0;
    strat = "Loading...";
    if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("alien")) {
      if (Settings.show_pregame_info) {
        setTimeout(() => {
          ChatLib.chat(pregame_info);
        }, 2000)
      }
    }
    infoed = true;
  } if (infoed && !in_zombies) { infoed = false; }

  poweruptext_update = "";
  textinsta = `&cInsta&r: ${insta_kill} `
  textspree = `&5Spree&r: ${shopping_spree} `
  textmax = `&9Max&r: ${max_ammo} `

  if (round_update != String(Scoreboard.getLinesByScore(13))) {
    round_update = String(Scoreboard.getLinesByScore(13))
    let round_update_int = parseInt(round_update.removeFormatting().replace("[Round ", "").replace("]", ""))
    ChatLib.chat(round_update.replace("[", "").replace("]", ""))
      if (Settings.notify_next_power_up && round_update.includes("Round") && map === "Alien Arcadium") {
        if (max_ammo == 0 && insta_kill == 0 && shopping_spree == 0) { ChatLib.chat(`&3[&bMicu&3]&r No power up data yet.`) } 
        else if (round_in_int > 97 && max_ammo == 97 || round_in_int > 96 && max_ammo == 96) {
          ChatLib.chat(`&3[&bMicu&3]&r No more power up. We are reaching the end of the Alien Arcadium!`)
        } else {
          ChatLib.chat(`&3[&bMicu&3]&r Next power up round: ${poweruptext.replace("NaN", "")}`)
          if (Settings.notify_next_power_up_chat) { ChatLib.command(`pc [Micu] Next power up round: ${poweruptext.removeFormatting().replace("NaN", "")}`) }
        }
      }
    if (Settings.notify_grow && map === "Alien Arcadium") {
    grow_round.forEach((gr) => {
        if (round_update_int === gr) {
          ChatLib.chat("&3[&bMicu&3]&r&a Grow Round Detected!")
          if (Settings.notify_grow_chat) { setTimeout(() => { ChatLib.command(`pc [Micu] Grow Round! ${grow_round_strat[gr]}`) }, 1000) }
          if (gr === 18 || gr === 23 || gr === 26 || gr === 29 || gr === 31 || gr === 33 || gr === 34) {
            setTimeout(() => {
                TextTMacro()
                ChatLib.chat("&3[&bMicu&3]&r&e You Can Shoot Now!")
                if (Settings.notify_grow_chat) { ChatLib.command('pc [Micu] Shoot Now!') }
            }, 39000);
          } else if (gr === 47) {
            setTimeout(() => {
                TextTMacro()
                ChatLib.chat("&3[&bMicu&3]&r&e You Can Shoot Now!")
                if (Settings.notify_grow_chat) { ChatLib.command('pc [Micu] Shoot Now!') }
            }, 29000);
          }
        }
      })
    }
  }

  if (poweruptext != poweruptext_update) { poweruptext = poweruptext_update }  

  if (insta_kill != 0) { poweruptext += textinsta } 
  if (insta_kill == 21 && round_in_int >= 21 || insta_kill == 23 && round_in_int >= 23 || insta_kill == 0) { poweruptext -= textinsta }

  if (max_ammo != 0) { poweruptext += textmax }
  if (max_ammo == 96 && round_in_int > 96 || max_ammo == 97 && round_in_int > 97) { poweruptext -= textmax }

  if (shopping_spree != 0) { poweruptext += textspree }
  if (shopping_spree == 95 && round_in_int > 95 || shopping_spree == 96 && round_in_int > 96 || shopping_spree == 97 && round_in_int > 97) { poweruptext -= textspree }

}).setFps(1);

register("step", () => {
  if (!in_zombies) { round = "[Round 0]"; return; }
  round = String(Scoreboard.getLinesByScore(13)).removeFormatting().replace("[]", "[Round 0]");
  if (round.replace("[", "").replace("]", "").toLowerCase().includes("round")) {
    round_in_int = parseInt(round.replace("[Round ", "").replace("]", ""))
  }

  if (Settings.strat) {
    if (strategies[round_in_int].length > 45) {
      strat = stringDivider(strategies[round_in_int], 45, "\n");
      strat = strat.split("\n");
    } else {
      strat = strategies[round_in_int];
    }
    if (strategies[round_in_int+1].length > 45) {
      strat_next = stringDivider(strategies[round_in_int+1], 45, "\n");
      strat_next = strat_next.split("\n");
    } else {
      strat_next = strategies[round_in_int+1];
    }
  }

  let new_max = false;
  if (max_pat == 1) {
    new_max = false;
    max_pat1.forEach((max) => {
      if (!new_max) {
        if (round_in_int < max+1) {
          max_ammo = max;
          new_max = true;
        }
      }
    });
    new_max = false;
  }
  if (max_pat == 2) {
    new_max = false;
    max_pat2.forEach((max) => {
      if (!new_max) {
        if (round_in_int < max+1) {
          max_ammo = max;
          new_max = true;
        }
      }
    });
    new_max = false;
  }
  let new_insta = false;
  if (insta_pat == 1) {
    new_insta = false;
    insta_pat1.forEach((insta) => {
      if (!new_insta) {
        if (round_in_int < insta+1) {
          insta_kill = insta;
          new_insta = true;
        }
      }
    });
    new_insta = false;
  }
  if (insta_pat == 2) {
    new_insta = false;
    insta_pat2.forEach((insta) => {
      if (!new_insta) {
        if (round_in_int < insta+1) {
          insta_kill = insta;
          new_insta = true;
        }
      }
    });
    new_insta = false;
  }
  let new_ss = false;
  if (ss_pat == 1) {
    new_ss = false;
    ss_pat1.forEach((ss) => {
      if (!new_ss) {
        if (round_in_int < ss+1) {
          shopping_spree = ss;
          new_ss = true;
        }
      }
    });
    new_ss = false;
  }
  if (ss_pat == 2) {
    new_ss = false;
    ss_pat2.forEach((ss) => {
      if (!new_ss) {
        if (round_in_int < ss+1) {
          shopping_spree = ss;
          new_ss = true;
        }
      }
    });
    new_ss = false;
  }
  if (ss_pat == 3) {
    new_ss = false;
    ss_pat3.forEach((ss) => {
      if (!new_ss) {
        if (round_in_int < ss+1) {
          shopping_spree = ss;
          new_ss = true;
        }
      }
    });
    new_ss = false;
  }
}).setFps(5);

register('renderOverlay', render);

register("chat", fixedwindows).setCriteria("You have fully repaired this window!");

register("chat", zomnearby).setCriteria("You can't repair windows while enemies are nearby!");

register("command", () => {
// test smth here
}).setName("micutest")

let alerting = false;
register("step", () => {
    //lrod alert stuff
  if (round_in_int === 0) {return;}
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

register("chat", (chat, event) => {
  chat = ChatLib.getChatMessage(event).removeFormatting();
  chat = String(chat).toLowerCase();
  if (chat.includes("power up")) {return;}
  if (chat.includes("max ammo")) {
    max_pat1.forEach((max) => {
      if (max == round_in_int) {
        if (max_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&9 Max pattern 1 detected.");}
          max_pat = 1;
        } else if (max_pat == 2) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Max pattern did not match up! Please use /maxpat <1/2> to specify max pattern manually. (use pattern 1 for 2, 5, 8, 12, '1s or '6s, and use pattern 2 for 3, 6, 9, 13, '2s or '7s)");}
        }
      }
    });
    max_pat2.forEach((max) => {
      if (max == round_in_int) {
        if (max_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&9 Max pattern 2 detected.");}
          max_pat = 2;
        } else if (max_pat == 1) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Max pattern did not match up! Please use /maxpat <1/2> to specify max pattern manually. (use pattern 1 for 2, 5, 8, 12, '1s or '6s, and use pattern 2 for 3, 6, 9, 13, '2s or '7s)");}
        }
      }
    });
    if (max_pat == 0) {
      ChatLib.chat("&3[&bMicu&3]&r&f Max pattern unknown. Use /maxpat <1/2> to specify max pattern manually. Max pattern will be automatically redetected when the next max is obtained. (use pattern 1 for 2, 5, 8, 12, '1s or '6s, and use pattern 2 for 3, 6, 9, 13, '2s or '7s)");
    }
  }
  if (chat.includes("insta kill")) {
    insta_pat1.forEach((insta) => {
      if (insta == round_in_int) {
        if (insta_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&c Insta pattern 1 detected.");}
          insta_pat = 1;
        } else if (insta_pat == 2) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Insta pattern did not match up! Please use /instapat <1/2> to specify insta pattern manually. (use pattern 1 for 2, 5, 8, 11, 14, 17, 20, 23, and use pattern 2 for 3, 6, 9, 12, 15, 18, 21)");}
        }
      }
    });
    insta_pat2.forEach((insta) => {
      if (insta == round_in_int) {
        if (insta_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&c Insta pattern 2 detected.");}
          insta_pat = 2;
        } else if (insta_pat == 1) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Insta pattern did not match up! Please use /instapat <1/2> to specify insta pattern manually. (use pattern 1 for 2, 5, 8, 11, 14, 17, 20, 23, and use pattern 2 for 3, 6, 9, 12, 15, 18, 21)");}
        }
      }
    });
    if (insta_pat == 0) {
      ChatLib.chat("&3[&bMicu&3]&r&f Insta pattern unknown. Use /instapat <1/2> to specify insta pattern manually. Insta pattern will be automatically redetected when the next insta is obtained. (use pattern 1 for 2, 5, 8, 11, 14, 17, 20, 23, and use pattern 2 for 3, 6, 9, 12, 15, 18, 21)");
    }
  }
  if (chat.includes("shopping spree")) {
    ss_pat1.forEach((ss) => {
      if (ss == round_in_int) {
        if (ss_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&5 Spree pattern 1 detected.");}
          ss_pat = 1;
        } else if (ss_pat == 2 || ss_pat == 3) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Spree pattern did not match up! Please use /sspat <1/2/3> to specify spree pattern manually. (use pattern 1 for 5, 15, 45, '5s, use pattern 2 for 6, '6s (except 56) and use pattern 3 for 7, '7s (except 57))");}
        }
      }
    });
    ss_pat2.forEach((ss) => {
      if (ss == round_in_int) {
        if (ss_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&5 Spree pattern 2 detected.");}
          ss_pat = 2;
        } else if (ss_pat == 1 || ss_pat == 3) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Spree pattern did not match up! Please use /sspat <1/2/3> to specify spree pattern manually. (use pattern 1 for 5, 15, 45, '5s, use pattern 2 for 6, '6s (except 56) and use pattern 3 for 7, '7s (except 57))");}
        }
      }
    });
    ss_pat3.forEach((ss) => {
      if (ss == round_in_int) {
        if (ss_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&5 Spree pattern 3 detected.");}
          ss_pat = 3;
        } else if (ss_pat == 1 || ss_pat == 2) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Spree pattern did not match up! Please use /sspat <1/2/3> to specify spree pattern manually. (use pattern 1 for 5, 15, 45, '5s, use pattern 2 for 6, '6s (except 56) and use pattern 3 for 7, '7s (except 57))");}
        }
      }
    });
    if (ss_pat == 0) {
      ChatLib.chat("&3[&bMicu&3]&r&f Spree pattern unknown. Use /sspat <1/2/3> to specify Spree pattern manually. Spree pattern will be automatically redetected when the next spree is obtained. (use pattern 1 for 5, 15, 45, '5s, use pattern 2 for 6, '6s (except 56) and use pattern 3 for 7, '7s (except 57))");
    }
  }
}).setCriteria("${chat}");

register("command", (pattern) => {
  if (pattern == 1) {
    max_pat = 1;
    ChatLib.chat("&3[&bMicu&3]&r&9 Set Max Ammo pattern to 1");
  } else if (pattern == 2) {
    max_pat = 2;
    ChatLib.chat("&3[&bMicu&3]&r&9 Set Max Ammo pattern to 2");
  } else if (pattern == 0) {
    max_pat = 0;
    ChatLib.chat("&3[&bMicu&3]&r Reset Max Ammo pattern.");
  } else {
    ChatLib.chat("&3[&bMicu&3]&r&f To specify max pattern manually, use 1 or 2 as argument. (use pattern 1 for 2, 5, 8, 12, '1s or '6s, and use pattern 2 for 3, 6, 9, 13, '2s or '7s)");
  }
}).setName("maxpat")

register("command", (pattern) => {
  if (pattern == 1) {
    insta_pat = 1;
    ChatLib.chat("&3[&bMicu&3]&r&c Set Insta Kill pattern to 1");
  } else if (pattern == 2) {
    insta_pat = 2;
    ChatLib.chat("&3[&bMicu&3]&r&c Set Insta Kill pattern to 2");
  } else if (pattern == 0) {
    insta_pat = 0;
    ChatLib.chat("&3[&bMicu&3]&r Reset Insta Kill pattern.");
  } else {
    ChatLib.chat("&3[&bMicu&3]&r&f To specify insta pattern manually, use 1 or 2 as argument. (use pattern 1 for 2, 5, 8, 11, 14, 17, 20, 23, and use pattern 2 for 3, 6, 9, 12, 15, 18, 21)");
  }
}).setName("instapat")

register("command", (pattern) => {
  if (pattern == 1) {
    ss_pat = 1;
    ChatLib.chat("&3[&bMicu&3]&r&5 Set Shopping Spree pattern to 1");
  } else if (pattern == 2) {
    ss_pat = 2;
    ChatLib.chat("&3[&bMicu&3]&r&5 Set Shopping Spree pattern to 2");
  } else if (pattern == 3) {
    ss_pat = 3;
    ChatLib.chat("&3[&bMicu&3]&r&5 Set Shopping Spree pattern to 3");
  } else if (pattern == 0) {
    ss_pat = 0;
    ChatLib.chat("&3[&bMicu&3]&r Reset Shopping Spree pattern.");
  } else {
    ChatLib.chat("&3[&bMicu&3]&r&f To specify spree pattern manually, use 1 or 2 or 3 as argument. (use pattern 1 for 5, 15, 45, '5s, use pattern 2 for 6, '6s (except 56) and use pattern 3 for 7, '7s (except 57))");
  }
}).setName("sspat")

register("command", (setmap) => {
  if (setmap == "aa") {
    map = "Alien Arcadium";
    ChatLib.chat("&3[&bMicu&3]&r Set map to Alien Arcadium");
  } else if (setmap == "de") {
    map = "Dead End";
    ChatLib.chat("&3[&bMicu&3]&r Set map to Dead End");
  } else if (setmap == "bb") {
    map = "Bad Blood";
    ChatLib.chat("&3[&bMicu&3]&r Set map to Bad Blood");
  } else if (setmap == "pr") {
    map = "Prison";
    ChatLib.chat("&3[&bMicu&3]&r Set map to Prison");
  } else {
    ChatLib.chat("&3[&bMicu&3]&r Map: aa/de/bb/pr (only used when reload ct in the middle of the game)");
  }
}).setName("setmap")

// register("command", (debuground) => {
//     new_ss = true;
//     new_max = true;
//     new_insta = true;
//     round = `[Round ${debuground}]`;
//     ChatLib.chat(`&3[&bMicu&3]&r Debug Round: ${debuground}`);
//   if (debuground == 0) {
//       new_ss = true;
//       new_max = true;
//       new_insta = true;
//       round = `[Round ${debuground}]`;
//       ChatLib.chat("&3[&bMicu&3]&r Debug Round: Reset to 0");
//     }
// }).setName("micuroundtest")

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

function TextTMacro() {
  show_shootT_alert = true;
  World.playSound("note.pling", 2, 3)
  setTimeout(() => {
    show_shootT_alert = false;
  }, 3000)
}

function stringDivider(str, width, spaceReplacer) {
    if (str.length>width) {
        var p=width
        for (;p>0 && str[p]!=' ';p--) {
        }
        if (p>0) {
            var left = str.substring(0, p);
            var right = str.substring(p+1);
            return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
        }
    }
    return str;
}