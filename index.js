import Settings from "./config";
import "./features/guide"
import "./features/victory"
import "./features/puncher"
import "./features/skillreadyalert"
import "./features/windowalert"
import "./features/hidemessages"
import "./features/serverhud"
import "./features/partycmd"

register("command", () => Settings.openGUI()).setName("micu");

let isMicu = false;

if (Player.getUUID() == "a811a2de-bf77-4899-876b-37ee63be00b0") {
    ChatLib.chat("Truong Thanh Hon")
    isMicu = true
} else {
    ChatLib.chat("&3[&bMicu&3]&r &dZombie Helper Loaded!&r&a Thank you for using it owo!")
    isMicu = false
}

let pregame_info = new TextComponent("&3[&bMicu&3]&r Click here for AA info and guide!").setClick("run_command", "/micuguidemenu")

let chatlowcase;

let panchodg = 0;
let carpenter = 0;

let grow_round = [18, 23, 26, 29, 31, 33, 34, 39, 43, 47, 52];

let giant_spawn = [15, 20, 22, 24, 30, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 47, 50, 51, 52, 53, 54, 55, 58, 65, 70, 75, 80, 85, 90, 95, 100];

let o1_inc = [40, 45, 46, 48, 54, 55, 58, 60, 64, 67, 68, 69, 74, 77, 78, 79, 84, 87, 88, 89, 94, 97, 98, 99];

let corners_spot_round = [36, 37, 38, 40, 41, 42, 44, 45, 46, 48, 49, 50, 51, 53, 54, 55, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

let round_update;
let round_update_noformat = "[Round 0]";
let round_update_int = 0;
let in_zombies = false;
let alr_started = false;
let infoed = false;
let map = "Waiting Input...";
let strat = "Loading...";
let strat_next = "Loading...";
let testdiff = "Loading...";

let dg_check = false;
let grow_cancel = false;

let round;

let show_shootT_alert = false;
let show_shootTdg_alert = false;
let show_giant_alert = false;
let show_instatouch_alert = false;
let show_o1_alert = false;

let instatouched = new Text('Insta got touched!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.RED)
let shootT = new Text('Shoot now!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let shootTdg = new Text('Double Gold! Shoot now!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let GiantAlert = new Text('Giants is spawning soon!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let o1Alert = new Text('Incoming o1!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.RED) 

let gold_earn_total = 0;
let gold_earn_total_games = 0;
let have_bonus_gold = false;

let corners_spot_safest = {
  36: "CC",
  37: "CC",
  38: "CC",
  40: "CC",
  41: "CC",
  42: "CC",
  44: "CC",
  45: "Ult (Safest)",
  46: "CC",
  48: "CC",
  49: "Door (Safest)",
  50: "Ult (Safest)",
  51: "Door",
  53: "Alt (Safest)",
  54: "Alt (Safest)",
  55: "Ult (Safest)",
  58: "Alt (Safest)",
  59: "Just ledge or stay on P5.",
  60: "Ult",
  61: "CC",
  62: "CC",
  63: "CC",
  64: "P5 (Safest)",
  65: "Ult (Safest)",
  66: "CC",
  67: "Ult (Safest)",
  68: "P5 (Safest)",
  69: "Ult",
  70: "Ult",
  71: "CC",
  72: "CC",
  73: "CC",
  74: "P5 (Safest)",
  75: "Ult (Safest)",
  76: "CC",
  77: "Ult (Safest)",
  78: "P5 (Safest)",
  79: "Ult",
  80: "Ult",
  81: "Ult (Safest)",
  82: "Ult (Safest)",
  83: "Ult (Safest)",
  84: "P5 (Safest)",
  85: "Ult (Safest)",
  86: "Ult (Safest)",
  87: "Ult (Safest)",
  88: "P5 (Safest)",
  89: "Ult",
  90: "Ult",
  91: "Ult (Safest)",
  92: "Ult (Safest)",
  93: "Ult (Safest)",
  94: "P5 (Safest)",
  95: "Ult (Safest)",
  96: "Ult (Safest)",
  97: "Ult (Safest)",
  98: "P5 (Safest)",
  99: "Ult",
  100: "Ult",
}

let corners_spot_fastest = {
  36: "CC",
  37: "CC",
  38: "CC",
  40: "CC",
  41: "CC",
  42: "CC",
  44: "CC",
  45: "CC (Fastest)",
  46: "CC",
  48: "CC",
  49: "Alt (Fastest)",
  50: "CC (Fastest)",
  51: "Door",
  53: "CC (Fastest)",
  54: "CC (Fastest)",
  55: "CC (Fastest)",
  58: "CC (Fastest)",
  59: "Just ledge or stay on P5.",
  60: "Ult",
  61: "CC",
  62: "CC",
  63: "CC",
  64: "CC (Fastest)",
  65: "CC (Fastest)",
  66: "CC",
  67: "CC (Fastest)",
  68: "Ult (Fastest)",
  69: "Ult",
  70: "Ult",
  71: "CC",
  72: "CC",
  73: "CC",
  74: "CC (Fastest)",
  75: "CC (Fastest)",
  76: "CC",
  77: "CC (Fastest)",
  78: "Ult (Fastest)",
  79: "Ult",
  80: "Ult",
  81: "CC",
  82: "CC",
  83: "CC",
  84: "CC (Fastest)",
  85: "CC (Fastest)",
  86: "CC",
  87: "CC (Fastest)",
  88: "Ult (Fastest)",
  89: "Ult",
  90: "Ult",
  91: "CC",
  92: "CC",
  93: "CC",
  94: "CC (Fastest)",
  95: "CC (Fastest)",
  96: "CC",
  97: "CC (Fastest)",
  98: "Ult (Fastest)",
  99: "Ult",
  100: "Ult",
}

let grow_round_strat = {
  18: "Please don't shoot slimes until i call. (Corner Spot: CC)",
  23: "Please don't shoot slimes until i call. (Corner Spot: CC)",
  26: "Please don't shoot slimes until i call. (Corner Spot: RC)",
  29: "Please don't shoot slimes until i call. (Corner Spot: PC)",
  31: "Please don't shoot slimes until i call. (Corner Spot: PC)",
  33: "Please don't shoot slimes until i call. (Corner Spot: CC)",
  34: "Please don't shoot slimes until i call. (Corner Spot: CC)",
  39: "Start shooting when Giants gets close. (Corner Spot: CC)",
  43: "Start shooting when Giants gets close. (Corner Spot: CC)",
  47: "Start shooting when Giants gets close or when slimes are fully grown. (Corner Spot: CC)",
  52: "Final one! Start shooting when Giants gets close. (Corner Spot: CC)"
}

let grow_round_short = {
  18: "Stay at CC and don't shoot slimes until call.",
  23: "Stay at CC and don't shoot slimes until call.",
  26: "Stay at RC and don't shoot slimes until call.",
  29: "Stay at PC and don't shoot slimes until call.",
  31: "Stay at PC and don't shoot slimes until call.",
  33: "Stay at CC and don't shoot slimes until call.",
  34: "Stay at CC and don't shoot slimes until call.",
  39: "Stay at CC and start shooting when Giants gets close.",
  43: "Stay at CC and start shooting when Giants gets close.",
  47: "Stay at CC and start shooting when Giants gets close or when slimes are fully grown.",
  52: "Final one! Stay at CC and start shooting when Giants gets close."
}

let o1_spawn_delay = {
  40: 44000,
  45: 33000,
  46: 34000,
  48: 32000,
  54: 38000,
  55: 33000,
  58: 37000,
  60: 29000,
  64: 25000,
  67: 29000,
  68: 25000,
  69: 25000,
  74: 25000,
  77: 29000,
  78: 25000,
  79: 25000,
  84: 25000,
  87: 29000,
  88: 25000,
  89: 25000,
  94: 25000,
  97: 29000,
  98: 25000,
  99: 25000
}

let giant_spawn_delay = {
  15: 41000,
  20: 16000,
  22: 18000,
  24: 9000,
  30: 5000,
  36: 17000,
  37: 15000,
  38: 17000,
  39: 17000,
  40: 17000,
  41: 16000,
  42: 5000,
  43: 8000,
  44: 5000,
  45: 17000,
  47: 25000,
  50: 17000,
  51: 15000,
  52: 17000,
  53: 17000,
  54: 15000,
  55: 5000,
  58: 17000,
  65: 17000,
  70: 17000,
  75: 17000,
  80: 17000,
  85: 17000,
  90: 17000,
  95: 17000,
  100: 17000
}

let shoot_time = {
  18: 31,
  23: 29,
  26: 35,
  29: 37,
  31: 33,
  33: 33,
  34: 33,
  39: 21,
  43: 12,
  47: 29,
  52: 21
}

let strategies = {
  0: 'Waiting...',
  1: 'Nothing. Get shotgun whenever you can!',
  2: 'Nothing. Get shotgun whenever you can!',
  3: 'Nothing. Get shotgun whenever you can!',
  4: 'Nothing. Get shotgun whenever you can!',
  5: 'Nothing.',
  6: 'Nothing. You can skip ss these first round.',
  7: 'Nothing. You can skip ss these first round.',
  8: 'Nothing.',
  9: 'Nothing.',
  10: 'Nothing. I would like buy a gold armor in this round.',
  11: 'Nothing.',
  12: 'Nothing.',
  13: 'Nothing.',
  14: 'Nothing.',
  15: "Giant on last wave, open Ferris Wheel and ultimate Pistol and Shotgun.",
  16: "Nothing. Open Roller Coaster then roll once for any third weapon or 2 (if got skill in the first roll)",
  17: "Nothing. Open Roller Coaster then roll once for any third weapon or 2 (if got skill in the first roll). You can buy iron armor.",
  18: 'Camp at the cc, grow slimes.',
  19: "Open Bumper Cars, buy Fast Revive, Quick Fire and Extra Health 3. (don't buy higher until Diamond Chestplate is acquired)",
  20: '2 Giants (1-1) ',
  21: 'Getting insta kill is better here.',
  22: '2 Giants (1-1) ',
  23: 'Chest corner, grow slimes. ',
  24: '3 Giants (1-1-1) ',
  25: 'Mega Blob ',
  26: 'Chest corner, only slimes round, grow them FULL size.',
  27: 'Nothing.',
  28: 'Nothing.',
  29: "Grow slimes in perk corner is the safe option here.",
  30: "4 Giants (1-1-2). Camp on Roller Coaster unless it's specified otherwise.",
  31: 'Grow slimes in perk corner is the safe option here.',
  32: 'Nothing.',
  33: 'Grow slimes in perk corner is the safe option here.',
  34: 'Grow slimes in perk corner is the safe option here.',
  35: 'Mega Magma ',
  36: '3 Giants (0-1-2), you can go middle for the first wave, there are clowns be careful, the first giant only spawn at the second wave ',
  37: '3 Giants (0-1-2) ',
  38: '3 Giants (0-1-2) ',
  39: '3 Giants (0-1-2), grow slimes and start shooting when giants spawn (always aim giant first)',
  40: "4 Giants (0-2-2) + 1 o1 (The Old One) Wait the death of the o1 for get out of corner, if it does not come, it's probably stuck (often in Bumper Cars), stay in a corner or go on a stair (like on the refill ammo, at the edge of the block) and the o1 will be sort of stuck.",
  41: '4 Giants (0-2-2) ',
  42: '6 Giants (2-2-2) Now things start to get a little "spicy". Make sure to stay close to the chest.',
  43: '6 Giants (2-2-2). Make sure to have 70+ ammo on the shotgun. Giga Slimes Round! Grow Slimes! FULL SIZE! Aim Giants! ',
  44: "9 Giants (3-3-3) shoot only giants. Other zombies deal no damage. ",
  45: '3 Giants (0-0-3). 2 old ones (2)! A few teams pass this round using Ultimate corner(ult), but many teams use cc instead.',
  46: '100% Golems. 1 Old One! Stay at chest corner and get many golds by shooting golems.',
  47: '3 Giants (3). Make sure to have 70+ ammo on the shotgun. Giga Slimes Round! Grow Slimes! FULL SIZE! Aim Giants! ',
  48: 'Kill the creepers asap they do a lot of damage. 1 Old one! ',
  49: 'Clutch round, no giants, no o1, but tons of mobs and clowns. You need some strategy for passing this round.\n- One guy(Front): stand next to the place which is near the iron bars. So this player will wallshoot mobs using stairs.                  - 3 guys(alt corner): same, but stay at the corner.',
  50: "4 Giants (0-2-2)",
  51: '4 Giants (2-2), stay at chest corner or door(the wooden part of ferris wheel) tons of Skeletons but they deal no damage. ',
  52: '4 Giants (0-2-2) CHEST CORNER. Giga Slimes Round! Grow Slimes and start shooting when giants spawn. Aim Giants! Ask for save 1, get cp and roll the chest. From now on, you can use 3rd weapons freely. ',
  53: "4 Giants (0-2-2). Tons of clowns ALT (better) OR ULT CORNER or cc(It's dangerous). Kill clowns and Giants asap! ",
  54: "4 Giants (0-2-2), now they are Rainbow giants! ALT (better) OR ULT CORNER or CC (It's dangerous). 2 o1 (0-1-0-1)! When the giants spawn, an o1 will arrive few seconds later, be careful!",
  55: "5 Giants (0-1-1-1-1-1) Very hard round, be careful. Stay at ultimate corner. (Micu: Make sure team have atleast 1 lrod and use 3rd this round)",
  56: 'Same as Round 25 with some golems. Mega Blob, roll if you need and if someone does not have chestplate, let them solo this and the next round. ',
  57: 'Same as Round 35 with some golems. Mega Magma. ',
  58: "6 Giants (0-3-0-3), 5 Old ones ALT (better) OR ULT CORNER: 2 o1! Kill the golems asap on the first wave!",
  59: 'ONLY 13 o1! Just go on the ledge of a stair (you can spread 2-2) and kill them asap. ',
  60: "Mini Space Blasters! A LOT! 2 o1! One player should do front at the place next to the stair near the alt corner and get back at wave 3(30s). Other players stay at the corner and don't shoot till the front player comes back to the corner at wave 3(30s). Everyone should have Diamond Chestplate and be set. Now focus on surviving and buy Extra Health whenever you can! The rounds 61-70, are the same as 71-80, 81-90 and 91-100 (except r89 and r99). When you get revived or when 2-3 people are down, block (right click) with your sword to take less damage. x1 means 61, 71, 81, 91 (same for 2s or x2 etc). 1 person buys Frozen Bullets, replacing Quick Fire.",
  61: "CC. Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  62: "CC. Clown's party! Just kill them asap (easiest rounds).",
  63: "CC. Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  64: "CC. 1 player target the blazes nearby and other kill Worms asap. Time lightning well, no giants but still very hard if you do bad.",
  65: "CC or Ult. GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. Focus on shooting magma zombies. (Giants' damage is much lower) You don't need to shoot at slimes because they give almost no damage. Use lightning when there are so many zombies at the corner. If you want to pass r85 and r95 more easily, one guy should do front and get back when giants are spawned.",
  66: "CC. Magma Cubes, Creeper and Bombs.",
  67: "CC. Fire lord zombies and 1 o1. Hard. Use lightning when a lot of zombies are near you.",
  68: "CC. 3 o1s! Golems, Worms and Bombs.",
  69: "Ult. You will likely have a lot of bugged Zombies so be extremly careful near the end of the round. You will likely see more alive zombies than what is written in the scoreboard, that means some zombies are bugged or fake and can only be killed by melee. Identify them and kill them using knife (they don't get gun damages) before starting the next round.",
  70: "Ult. Hardest rounds! Giants and o1! 1 player will focus the iron golems. 1 player will get FB and do ledge on ultimate machine, and get all agro of the mob. Shoot the clowns and giants to slow them down. Other players should kill clowns as much as possible. After ledge comes back to the corner, you should make the revive-cycle.                 The Basic rules:                                  1 - Do knife guard until all o1s are dead.         2 - Revive ONLY one player. Don't try to revive 2+ players. (Unpress the shift after reviving another player)                                            3 - If you are under 7 hearts and not reviving someone, cancel the knife guard and die.           4 - You should unpress shift once when you are DEAD statue (You will appear REVIVED on the scoreboard)",
  71: "CC. Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  72: "CC. Clown's party! Just kill them asap (easiest rounds).",
  73: "CC. Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  74: "CC. 1 player target the blazes nearby and other kill Worms asap. Time lightning well, no giants but still very hard if you do bad.",
  75: "CC or Ult. GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. Focus on shooting magma zombies. (Giants' damage is much lower) You don't need to shoot at slimes because they give almost no damage. Use lightning when there are so many zombies at the corner. If you want to pass r85 and r95 more easily, one guy should do front and get back when giants are spawned.",
  76: "CC. Magma Cubes, Creeper and Bombs.",
  77: "CC. Fire lord zombies and 1 o1. Hard. Use lightning when a lot of zombies are near you.",
  78: "CC. 3 o1s! Golems, Worms and Bombs.",
  79: "Ult. You will likely have a lot of bugged Zombies so be extremly careful near the end of the round. You will likely see more alive zombies than what is written in the scoreboard, that means some zombies are bugged or fake and can only be killed by melee. Identify them and kill them using knife (they don't get gun damages) before starting the next round.",
  80: "Ult. Hardest rounds! Giants and o1! 1 player will focus the iron golems. 1 player will get FB and do ledge on ultimate machine, and get all agro of the mob. Shoot the clowns and giants to slow them down. Other players should kill clowns as much as possible. After ledge comes back to the corner, you should make the revive-cycle.                 The Basic rules:                                  1 - Do knife guard until all o1s are dead.         2 - Revive ONLY one player. Don't try to revive 2+ players. (Unpress the shift after reviving another player)                                            3 - If you are under 7 hearts and not reviving someone, cancel the knife guard and die.           4 - You should unpress shift once when you are DEAD statue (You will appear REVIVED on the scoreboard)",
  81: "CC. Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  82: "CC. Clown's party! Just kill them asap (easiest rounds).",
  83: "CC. Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  84: "CC. 1 player target the blazes nearby and other kill Worms asap. Time lightning well, no giants but still very hard if you do bad.",
  85: "CC or Ult. GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. Focus on shooting magma zombies. (Giants' damage is much lower) You don't need to shoot at slimes because they give almost no damage. Use lightning when there are so many zombies at the corner. If you want to pass r85 and r95 more easily, one guy should do front and get back when giants are spawned.",
  86: "CC. Magma Cubes, Creeper and Bombs.",
  87: "CC. Fire lord zombies and 1 o1. Hard. Use lightning when a lot of zombies are near you.",
  88: "CC. 3 o1s! Golems, Worms and Bombs.",
  89: "Ult. You will likely have a lot of bugged Zombies so be extremly careful near the end of the round. You will likely see more alive zombies than what is written in the scoreboard, that means some zombies are bugged or fake and can only be killed by melee. Identify them and kill them using knife (they don't get gun damages) before starting the next round.",
  90: "Ult. Hardest rounds! Giants and o1! 1 player will focus the iron golems. 1 player will get FB and do ledge on ultimate machine, and get all agro of the mob. Shoot the clowns and giants to slow them down. Other players should kill clowns as much as possible. After ledge comes back to the corner, you should make the revive-cycle.                 The Basic rules:                                  1 - Do knife guard until all o1s are dead.         2 - Revive ONLY one player. Don't try to revive 2+ players. (Unpress the shift after reviving another player)                                            3 - If you are under 7 hearts and not reviving someone, cancel the knife guard and die.           4 - You should unpress shift once when you are DEAD statue (You will appear REVIVED on the scoreboard)",
  91: "CC. Wolves and Magma cubes. Focus on wolves, kill them asap! Buy Quick Fire back (you'll understand for Round X0)",
  92: "CC. Clown's party! Just kill them asap (easiest rounds).",
  93: "CC. Wolves and Creepers, don't let Creeper get close and kill the wolves.",
  94: "CC. 1 player target the blazes nearby and other kill Worms asap. Time lightning well, no giants but still very hard if you do bad.",
  95: "CC or Ult. GIANTS. 2nd Hardest rounds. The X5s are the easiest rounds to lose one as a few mistakes can quickly lead to a loss of the game. Focus on shooting magma zombies. (Giants' damage is much lower) You don't need to shoot at slimes because they give almost no damage. Use lightning when there are so many zombies at the corner. If you want to pass r85 and r95 more easily, one guy should do front and get back when giants are spawned.",
  96: "CC. Magma Cubes, Creeper and Bombs.",
  97: "CC. Fire lord zombies and 1 o1. Hard. Use lightning when a lot of zombies are near you.",
  98: "CC. 3 o1s! Golems, Worms and Bombs.",
  99: "Ult. You will likely have a lot of bugged Zombies so be extremly careful near the end of the round. You will likely see more alive zombies than what is written in the scoreboard, that means some zombies are bugged or fake and can only be killed by melee. Identify them and kill them using knife (they don't get gun damages) before starting the next round.",
  100: "Ult. Hardest rounds! Giants and o1! 1 player will focus the iron golems. 1 player will get FB and do ledge on ultimate machine, and get all agro of the mob. Shoot the clowns and giants to slow them down. Other players should kill clowns as much as possible. After ledge comes back to the corner, you should make the revive-cycle.                 The Basic rules:                                  1 - Do knife guard until all o1s are dead.         2 - Revive ONLY one player. Don't try to revive 2+ players. (Unpress the shift after reviving another player)                                            3 - If you are under 7 hearts and not reviving someone, cancel the knife guard and die.           4 - You should unpress shift once when you are DEAD statue (You will appear REVIVED on the scoreboard)",
  101: "Buy Quick Fire back. Replace Zapper by Shotgun. Everyone goes at middle, aim high, headshot the boss: World Ender (500 hp) Use everything, lightning, double barrel, rainbow rifle, shotgun. You MUST kill it under 5 seconds or you lose (not hard) but make sure to use lightning and double barrel at least.",
  102: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here.",
  103: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here.",
  104: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here.",
  105: "Just a random o1 that runs but does not do any damage, the reason of these rounds existing is unknown but they are here.",
  106: "You Win! Congratulations!"
};

var t, count;

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
      if (map === "Alien Arcadium") {
        Renderer.drawRect(Renderer.color(0, 0, 0, 0), x, y, box_x * scale, (box_y+35) * scale);
        lines = {
              a: new Text("§aMap§7: " + map, x + 5, y + 5 * scale).setShadow(true),
              b: new Text("§bRound§7: " + round_update_noformat.replace("[Round ", "").replace("]", "").replace("[", "").replace("Game Over!", "Good Game!"), x + 5, y + 15 * scale).setShadow(true),
              c: new Text(`§6Gold This Round§7: ${gold_earn_total} (Total: ${gold_earn_total_games})`, x + 5, y + 35 * scale).setShadow(true),
              d: new Text("§6Double Gold&7: " + panchodg, x + 5, y + 45 * scale).setShadow(true),
              e: new Text("§3Carpenter§7: " + carpenter, x + 5, y + 55 * scale).setShadow(true),
              f: new Text("§6Bonus Gold?§7: " + have_bonus_gold, x + 5, y + 65 * scale).setShadow(true),
        }
      } else {
        Renderer.drawRect(Renderer.color(0, 0, 0, 0), x, y, box_x * scale, (box_y+15) * scale);
        lines = {
              a: new Text("§aMap§7: " + map, x + 5, y + 5 * scale).setShadow(true),
              b: new Text("§aDifficulty§7: " + testdiff, x + 5, y + 15 * scale).setShadow(true),
              c: new Text("§bRound§7: " + round_update_noformat.replace("[Round ", "").replace("]", "").replace("[", "").replace("Game Over!", "Good Game!"), x + 5, y + 25 * scale).setShadow(true),
              d: new Text(`§6Gold This Round§7: ${gold_earn_total} (Total: ${gold_earn_total_games})`, x + 5, y + 45 * scale).setShadow(true),
              e: new Text("§6Double Gold&7: " + panchodg, x + 5, y + 55 * scale).setShadow(true),
        }
      }
        for (let line in lines) {
            lines[line].setScale(scale).draw();
        }
        //strat rendering
        if (Settings.strat && map === "Alien Arcadium") {
          box_y = 85;
          box_x = 270;
          this_line = new Text("§7Strat:", x + 5, y + box_y * scale).setShadow(true);
          this_line.setScale(scale).draw();
          box_y += 10;
          if (Array.isArray(strat)) {
            strat.forEach((strat_line) => {
              this_line = new Text("§7" + strat_line, x + 5, y + box_y * scale).setShadow(true);
              this_line.setScale(scale).draw();
              box_y += 10;
            })
          } else {
            this_line = new Text("§7" + strat, x + 5, y + box_y * scale).setShadow(true);
            this_line.setScale(scale).draw();
            box_y += 10;
          }
          box_y += 10;
          this_line2 = new Text("§7Next Strat:", x + 5, y + box_y * scale).setShadow(true);
          this_line2.setScale(scale).draw();
          box_y += 10;
          if (Array.isArray(strat_next)) {
            strat_next.forEach((strat_line) => {
              this_line2 = new Text("§7" + strat_line, x + 5, y + box_y * scale).setShadow(true);
              this_line2.setScale(scale).draw();
              box_y += 10;
            })
          } else {
            this_line2 = new Text("§7" + strat_next, x + 5, y + box_y * scale).setShadow(true);
            this_line2.setScale(scale).draw();
            box_y += 10;
          }
        } else {
          box_y = 55;
          box_x = 150;
        }
    }

    if (Settings.notify_grow && show_shootT_alert) { shootT.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
    if (Settings.notify_grow && show_shootTdg_alert) { shootTdg.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
    if (Settings.giant_alert && show_giant_alert) { GiantAlert.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
    if (Settings.o1_alert && show_o1_alert) { o1Alert.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
    if (Settings.instatouch && show_instatouch_alert) { instatouched.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
}

register("worldUnload", () => {
    panchodg = 0;
    carpenter = 0;
    gold_earn_total = 0;
    gold_earn_total_games = 0;
    have_bonus_gold = false;
})

register("step", () => {
  in_zombies = Scoreboard.getTitle().removeFormatting().toLowerCase().includes("zombies") ? true : false;
  alr_started = String(Scoreboard.getLinesByScore(13)).replace("[", "").replace("]", "").toLowerCase().includes("round") ? true : false;
  round = String(Scoreboard.getLinesByScore(13));

  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("alien")) { map = "Alien Arcadium" }
  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("bad blood")) { map = "Bad Blood" }
  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("dead end")) { map = "Dead End" }
  if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("prison")) { map = "Prison" }

  if (in_zombies && !infoed && !alr_started) {
    panchodg = 0;
    carpenter = 0;
    gold_earn_total = 0;
    gold_earn_total_games = 0;
    strat = "Loading...";
    have_bonus_gold = false;
    if (String(Scoreboard.getLinesByScore(6)).removeFormatting().replace("[","").replace("]","").toLowerCase().includes("alien")) { ChatLib.chat(pregame_info); infoed = true; }
  } if (infoed && !in_zombies) { infoed = false; }

  if (!alr_started) return

  if (round_update != round) {
    round_update = round
    round_update_noformat = round_update.removeFormatting();
    ChatLib.chat(round_update.replace("[", "").replace("]", ""))
    if (map === "Bad Blood" || map === "Dead End" || map === "Prison") testdiff = String(Scoreboard.getLinesByScore(5)).replace("[Difficulty: ","").replace("]",""); else testdiff = "Loading..."
      round_update_int = parseInt(round_update_noformat.replace("[Round ", "").replace("]", ""))
      if (round_update_int >= 2) resetgoldcounter()
      if (map === "Alien Arcadium") {
        if (Settings.next_round_camp) {
          corners_spot_round.forEach((round) => {
            if (round_update_int == round) {
              ChatLib.chat(`&3[&bMicu&3]&r Corner Spot: ${Settings.corners_options == 0 ? corners_spot_safest[round] : undefined || Settings.corners_options == 1 ? corners_spot_fastest[round] : undefined}}`)
              if (Settings.camp_spot_chat) ChatLib.command(`pc [Micu] Corner Spot: ${Settings.corners_options == 0 ? corners_spot_safest[round] : undefined || Settings.corners_options == 1 ? corners_spot_fastest[round] : undefined}`)
            }})
        }
        if (Settings.notify_grow) {
          grow_round.forEach((grow) => {
              if (round_update_int == grow && dg_check !== true && grow_cancel !== true) {
                  ChatLib.chat(`&3[&bMicu&3]&r&a&l Grow Round Detected! &r&a${grow_round_short[grow]}`)
                  count = shoot_time[grow];
                  t = setTimeout(countdown, 1000);
                  if (Settings.notify_grow_chat) ChatLib.command(`pc [Micu] Grow Round! ${grow_round_strat[grow]}`);
              } else { dg_check = false; grow_cancel = false; }
            })
        }
        if (Settings.o1_alert) o1_inc.forEach((o1) => { if (round_update_int == o1) { setTimeout(o1Inc, o1_spawn_delay[o1]) } })
        if (Settings.giant_alert) giant_spawn.forEach((delay) => { if (round_update_int == delay) { setTimeout(GiantSpawn, giant_spawn_delay[delay]) } })
      }
      if (Settings.strat) {
        if (strategies[round_update_int].length > 50) {
          strat = stringDivider(strategies[round_update_int], 50, "\n");
          strat = strat.split("\n");
        } else {
          strat = strategies[round_update_int];
        }
        if (strategies[round_update_int+1].length > 50) {
          strat_next = stringDivider(strategies[round_update_int+1], 50, "\n");
          strat_next = strat_next.split("\n");
        } else {
          strat_next = strategies[round_update_int+1];
        }
      }
    }
}).setFps(1);

register('renderOverlay', render);

register("chat", (chat, event) => {
  chat = String(ChatLib.getChatMessage(event, true));

  if (chat.includes("&r&6+4 Gold")) gold_earn_total += 4;
  if (chat.includes("&r&6+5 Gold")) gold_earn_total += 5;
  if (chat.includes("&r&6+6 Gold")) gold_earn_total += 6;
  if (chat.includes("&r&6+7 Gold")) gold_earn_total += 7;
  if (chat.includes("&r&6+8 Gold")) gold_earn_total += 8;
  if (chat.includes("&r&6+9 Gold")) gold_earn_total += 9;
  if (chat.includes("&r&6+10 Gold")) gold_earn_total += 10;
  if (chat.includes("&r&6+11 Gold")) gold_earn_total += 11;
  if (chat.includes("&r&6+12 Gold")) gold_earn_total += 12;
  if (chat.includes("&r&6+13 Gold")) gold_earn_total += 13;
  if (chat.includes("&r&6+14 Gold")) gold_earn_total += 14;
  if (chat.includes("&r&6+15 Gold")) gold_earn_total += 15;
  if (chat.includes("&r&6+16 Gold")) gold_earn_total += 16;
  if (chat.includes("&r&6+17 Gold")) gold_earn_total += 17;
  if (chat.includes("&r&6+18 Gold")) gold_earn_total += 18;
  if (chat.includes("&r&6+19 Gold")) gold_earn_total += 19;
  if (chat.includes("&r&6+20 Gold")) gold_earn_total += 20;
  if (chat.includes("&r&6+24 Gold")) gold_earn_total += 24;
  if (chat.includes("&r&6+30 Gold")) gold_earn_total += 30;
  if (chat.includes("&r&6+40 Gold")) gold_earn_total += 40;
  if (chat.includes("&r&6+50 Gold")) gold_earn_total += 50;
  if (chat.includes("&r&6+60 Gold")) gold_earn_total += 60;
  if (chat.includes("&r&6+100 Gold")) gold_earn_total += 100;
  if (chat.includes("&r&6+200 Gold")) gold_earn_total += 200;
  if (chat.includes("&r&6+400 Gold")) gold_earn_total += 400;
  if (chat.includes("&r&6+500 Gold")) gold_earn_total += 500;
  if (chat.includes("&r&6+1000 Gold")) gold_earn_total += 1000;

  if (chat.includes("&r&6+4 Gold")) gold_earn_total_games += 4;
  if (chat.includes("&r&6+5 Gold")) gold_earn_total_games += 5;
  if (chat.includes("&r&6+6 Gold")) gold_earn_total_games += 6;
  if (chat.includes("&r&6+7 Gold")) gold_earn_total_games += 7;
  if (chat.includes("&r&6+8 Gold")) gold_earn_total_games += 8;
  if (chat.includes("&r&6+9 Gold")) gold_earn_total_games += 9;
  if (chat.includes("&r&6+10 Gold")) gold_earn_total_games += 10;
  if (chat.includes("&r&6+11 Gold")) gold_earn_total_games += 11;
  if (chat.includes("&r&6+12 Gold")) gold_earn_total_games += 12;
  if (chat.includes("&r&6+13 Gold")) gold_earn_total_games += 13;
  if (chat.includes("&r&6+14 Gold")) gold_earn_total_games += 14;
  if (chat.includes("&r&6+15 Gold")) gold_earn_total_games += 15;
  if (chat.includes("&r&6+16 Gold")) gold_earn_total_games += 16;
  if (chat.includes("&r&6+17 Gold")) gold_earn_total_games += 17;
  if (chat.includes("&r&6+18 Gold")) gold_earn_total_games += 18;
  if (chat.includes("&r&6+19 Gold")) gold_earn_total_games += 19;
  if (chat.includes("&r&6+20 Gold")) gold_earn_total_games += 20;
  if (chat.includes("&r&6+24 Gold")) gold_earn_total_games += 24;
  if (chat.includes("&r&6+30 Gold")) gold_earn_total_games += 30;
  if (chat.includes("&r&6+40 Gold")) gold_earn_total_games += 40;
  if (chat.includes("&r&6+50 Gold")) gold_earn_total_games += 50;
  if (chat.includes("&r&6+60 Gold")) gold_earn_total_games += 60;
  if (chat.includes("&r&6+100 Gold")) gold_earn_total_games += 100;
  if (chat.includes("&r&6+200 Gold")) gold_earn_total_games += 200;
  if (chat.includes("&r&6+400 Gold")) gold_earn_total_games += 400;
  if (chat.includes("&r&6+500 Gold")) gold_earn_total_games += 500;
  if (chat.includes("&r&6+1000 Gold")) gold_earn_total_games += 1000;
        
  if (chat.includes("&r&eactivated &r&6&lDouble Gold&r&e for &r&c30s&r&e!&r")) panchodg++
  if (chat.includes("&r&eactivated &r&9&lCarpenter&r&e!&r")) carpenter++

  if (chatlowcase !== chat) {
      chatlowcase = chat
      if (chat.includes("&r&eactivated &r&6&lDouble Gold&r&e for &r&c30s&r&e!&r")) {
        grow_round.forEach((dg) => {if (round_update_int == dg && map === "Alien Arcadium") { cdreset(); dg_check = true }})
      }
      if (chat.includes("&r&eactivated &r&c&lInsta Kill&r&e for &r&c10s&r&e!&r")) {
        grow_round.forEach((insta) => {if (round_update_int == insta && map === "Alien Arcadium") { InstaTouch() }})
      }
      if (chat.includes("&r&eactivated &r&6&lBonus Gold&r&e!&r")) have_bonus_gold = true;
    }
}).setCriteria("${chat}");

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

register("command", () => {
    if (map === "Alien Arcadium" && in_zombies) {
      grow_round.forEach((dg) => {
        if (round_update_int == dg) { 
          if (count == 0) {
            if (grow_cancel == true) ChatLib.chat(`&3[&bMicu&3]&r You already cancelled the grow.`)
            else ChatLib.chat(`&3[&bMicu&3]&r Timer already finished.`)
          } else {
            nogrow()
            ChatLib.chat(`&3[&bMicu&3]&r &cCancelled! No grow!`)
            if (Settings.notify_grow_chat) ChatLib.command(`pc [Micu] Cancelled! No grow!`)
          }
        } 
      })
    }
}).setName("micunogrow")

register("chat", (player, message, event) => {
    if (Settings.zombiescmd && in_zombies && message.slice(0, 1)=="!") {
        switch (message) {
            case "!gold":
                ChatLib.command(`pc [Micu] Total gold earned this game: ${gold_earn_total_games}`)
                break;
            case "!dg":
                ChatLib.command(`pc [Micu] Total Double Gold this game: ${panchodg}`)
                break;
            case "!carp": 
                if (map === "Alien Arcadium") ChatLib.command(`pc [Micu] Total Carpenter this game: ${carpenter}`)
                break;
            case "!bg": 
                if (map === "Alien Arcadium") ChatLib.command(`pc [Micu] Have Bonus Gold this game: ${have_bonus_gold}`)
                break;
            case "!ng":
                if (map === "Alien Arcadium") {
                  grow_round.forEach((dg) => {
                    if (round_update_int == dg) { 
                      if (count == 0) {
                        if (Settings.notify_grow_chat) {
                          if (grow_cancel == true) { ChatLib.command(`pc [Micu] ${stripRank(player)}. You already cancelled the grow.`); }
                          else { ChatLib.command(`pc [Micu] ${stripRank(player)}. Timer already finished.`) }
                        }
                      } else {
                        nogrow()
                        ChatLib.chat(`&3[&bMicu&3]&r &cCancelled! No grow! (by ${stripRank(player)})`)
                        if (Settings.notify_grow_chat) ChatLib.command(`pc [Micu] Cancelled by ${stripRank(player)}! No grow!`)
                      }
                    }
                  })
                }
                break;
            default:
                break;
        }
    }
}).setCriteria("&r&9Party &8> ${player}&f: &r${message}&r")

// Round Test
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
// }).setName("micuround")

function resetgoldcounter() {
  ChatLib.chat(`&3[&bMicu&3]&r Round ${round_update_int - 1} Gold Earned: &6+${gold_earn_total} Gold&r`)
  gold_earn_total = 0
}

function countdown() {
    if (count == 0) {
        TextTMacro()
    } else {
        count--;
        t = setTimeout(countdown, 1000);
    }
}

function cdreset() {
    count = 0;
}

function TextTMacro() {
  grow_round.forEach((grow) => {
    if (round_update_int == grow) {
      if (dg_check == true) {
          show_shootTdg_alert = true;
          World.playSound("note.pling", 2, 1)
          setTimeout(() => {
          show_shootTdg_alert = false;
          }, 3000)
        ChatLib.chat("&3[&bMicu&3]&r&e Double Gold is activated. You can shoot now!")
        if (Settings.notify_grow_chat) ChatLib.command('pc [Micu] Double Gold is activated. Shoot now!')
      } else {
        if (grow_cancel !== true) {
          show_shootT_alert = true;
          World.playSound("note.pling", 2, 3)
          setTimeout(() => {
            show_shootT_alert = false;
          }, 3000)
          ChatLib.chat("&3[&bMicu&3]&r&e You can shoot now!")
          if (Settings.notify_grow_chat) ChatLib.command('pc [Micu] Shoot now!')
        }
      }
    }
  })
}

function nogrow() {
  World.playSound("note.pling", 1, 2)
  grow_cancel = true;
  cdreset();
}

function GiantSpawn() {
  show_giant_alert = true;
  World.playSound("note.pling", 2, 1)
  setTimeout(() => {
    show_giant_alert = false;
  }, 2000)
  ChatLib.chat("&3[&bMicu&3]&r&e Giants is spawning soon!")
  if (Settings.giant_alert_chat) { ChatLib.command('pc [Micu] Giants is spawning soon!') }
}

function o1Inc() {
  show_o1_alert = true;
  World.playSound("note.pling", 2, 1)
  setTimeout(() => {
    show_o1_alert = false;
  }, 2000)
  ChatLib.chat("&3[&bMicu&3]&r&c&l INCOMING o1(s)!!!!!")
  if (Settings.o1_alert_chat) { ChatLib.command('pc [Micu] INCOMING o1(s)!!!!!') }
}

function InstaTouch() {
  show_instatouch_alert = true;
  World.playSound("note.pling", 2, 1)
  setTimeout(() => {
    show_instatouch_alert = false;
  }, 2000)
  ChatLib.chat("&3[&bMicu&3]&r&c Insta has been touched! Stop shooting slimes then use sword to block and kill only mobs.")
  if (Settings.instatouch_chat) { ChatLib.command('pc [Micu] Insta has been touched! Stop shooting slimes then use sword to block and kill only mobs.') }
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

function stripRank(player) {
    let stripped = String(player) // 😏
    stripped = stripped.replace("[MVP++] ","")
    stripped = stripped.replace("[MVP+] ","")
    stripped = stripped.replace("[MVP] ","")
    stripped = stripped.replace("[VIP+] ","")
    stripped = stripped.replace("[VIP] ","")
    stripped = stripped.replace(" ","")
    return stripped
}