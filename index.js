import Settings from "./config";
import "./features/victory"
import "./features/puncher"
import "./features/skillreadyalert"
import "./features/windowalert"
import "./features/hidegoldchat"
import "./features/hideknockedchat"
import "./features/hideleftrejoinchat"
import "./features/hideluckychestchat"
import "./features/hidepowerupchat"
import "./features/hideopenareachat"
import "./features/hiderevchat"
import "./features/hidewindowchat"
import "./features/hidetargetchat"

register("command", () => Settings.openGUI()).setName("micu");

ChatLib.chat("Truong Thanh Hon")
//pog
import PogObject from "PogData";

//firstload stuff
const data = new PogObject("MicuZombieHelper", {
});

data.autosave();

let pregame_info = "&3[&bMicu&3]&r Important rules: \n\n- You don't have to avoid insta kills but NEVER take it in r18 r23\n- Never take The Puncher from the chest\n- Slimes are important, when they are fully grown, they give MUCH more gold\n- Double Golds are GODLY, if you can, save them when they are a lot of golems or slimes\n- Get Shopping Spree r6 or r7, if r5 you won't get any spree r25 nor r35 (if you want to avoid that)\n- You should get timer mod(named ShowSpawnTime) if you want to know when to shoot slimes. (or you can use AIO Mod called ZombiesAddon)\n\nTo get as much gold as possible, you'll be using Pistol + Shotgun by the time you get cp, they have the highest ratio of gold give per damage dealt (except flamethrower because it's too weak), and if you're in trouble, you may scarcely use a 3rd weapon or a skill, and that until you get Diamond Chestplate!\n\nOnce you have the Diamond Chestplate, tell your team to s1 (save 1 zombie alive)!\nYou should get:\nUnder cps 10~11: DBSG-RR set (DBSG, RR, ZZ, lrod)\nOver cps 10~11: GD-RR set (GD, RR,ZZ, lrod)\nOnce you're set, buy Extra Health when you can (5k, 10k, 20k, 50k, 100k)\n\nThe corners used:\n- Chest corner(cc), at the chest (the block where you have the chest at your right and the wall at your left).\n- Ultimate (ult) corner, in the ultimate machine, the 1-block space.\n- Alternative (alt) corner, in Ferris Wheel, at the back window, opposite side of the iron bars.\n- Perk corner(pc), the left side of the perk store. (The right one is opp-pc, opposite of pc)\n\nWhen you have N Giant (x-y-z) it means the N giants will spawn as a 1st wave of X giants, the second wave of giant will have Y giants and the 3rd one Z giants (n,x,y,z numbers).\n\n(If you are new to this mode please read all of this)\nGood Luck!";

//s'more first load stuff
if (data.firstload || data.firstload == undefined) {
  setTimeout(function() {
    ChatLib.chat("&3[&bMicu&3]&r Thanks for using this module! If you wanna suggest me add helpful feature in zombies please create issue in here https://github.com/MinoraHaruki/MicuZombieHelper/issues/new");
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

let chatlowcase

let max_pat = 0;
let max_pat1 = [2, 5, 8, 12, 16, 21, 26, 31, 36, 41, 46, 51, 61, 66, 71, 76, 81, 86, 91, 96];
let max_pat2 = [3, 6, 9, 13, 17, 22, 27, 32, 37, 42, 47, 52, 62, 67, 72, 77, 82, 87, 92, 97, 102];

let insta_pat = 0;
let insta_pat1 = [2, 5, 8, 11, 14, 17, 20, 23];
let insta_pat2 = [3, 6, 9, 12, 15, 18, 21];

let ss_pat = 0;
let ss_pat1 = [5, 15, 45, 55, 65, 75, 85, 95];
let ss_pat2 = [6, 16, 26, 36, 46, 66, 76, 86, 96];
let ss_pat3 = [7, 17, 27, 37, 47, 67, 77, 87, 97];

let grow_round = [18, 23, 26, 29, 31, 33, 34, 39, 43, 47, 52];
let grow_dg_check = false;

let giant_spawn = [15, 20, 22, 24, 30, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 47, 50, 51, 52, 53, 54, 55, 58, 65, 70, 75, 80, 85, 90, 95, 100];

let camp_spot = [22, 24, 27, 28, 30, 32, 36, 37, 38, 40, 41, 42, 44, 45, 46, 48, 49, 50, 51, 53, 54, 55, 58, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

let round_update;
let round_update_noformat = "[Round 0]";
let round_update_int = 0;
let in_zombies = false;
let infoed = false;
let map = "Waiting Input...";
let strat = "Loading...";
let strat_next = "Loading...";
let map_difficulty = "Loading...";

let round = "[Round 0]";

let show_shootT_alert = false;
let show_shootTdg_alert = false;
let show_giant_alert = false;

let shootT = new Text('Shoot now!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let shootTdg = new Text('Double Gold! Shoot now!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let GiantAlert = new Text('Giants is spawning soon!').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)

let camp_spot_location = {
  22: "CC",
  24: "CC",
  27: "CC",
  28: "CC",
  30: "CC",
  32: "CC",
  36: "CC",
  37: "CC",
  38: "CC",
  40: "CC",
  41: "CC",
  42: "CC",
  44: "CC",
  45: "CC",
  46: "CC",
  48: "CC",
  49: "Alt",
  50: "Ult (Safe) / CC (Faster)",
  51: "Door (the wooden part of ferris wheel)",
  53: "Alt / Ult",
  54: "Alt / Ult",
  55: "Ult",
  58: "Alt",
  60: "Alt / Ult",
  61: "CC",
  62: "Alt / CC",
  63: "CC",
  64: "CC / Alt / P5",
  65: "CC / Alt",
  66: "CC",
  67: "CC / Ult",
  68: "CC / P5",
  69: "Ult",
  70: "P5 / Ult",
  71: "CC",
  72: "Alt / CC",
  73: "CC",
  74: "CC / Alt / P5",
  75: "CC / Alt",
  76: "CC",
  77: "CC / Ult",
  78: "CC / P5",
  79: "Ult",
  80: "P5 / Ult",
  81: "CC",
  82: "Alt / CC",
  83: "CC",
  84: "CC / Alt / P5",
  85: "CC / Alt",
  86: "CC",
  87: "CC / Ult",
  88: "CC / P5",
  89: "Ult",
  90: "P5 / Ult",
  91: "CC",
  92: "Alt / CC",
  93: "CC",
  94: "CC / Alt / P5",
  95: "CC / Alt",
  96: "CC",
  97: "CC / Ult",
  98: "CC / P5",
  99: "Ult",
  100: "P5 / Ult",
}

let grow_round_strat = {
  18: "Please don't shoot slime until i call. (Rev Cycle Spot: CC)",
  23: "Please don't shoot slime until i call. (Rev Cycle Spot: CC)",
  26: "Please don't shoot slime until i call. (Rev Cycle Spot: CC or RC (If x6 SS) / ENT",
  29: "Please don't shoot slime until i call. (Rev Cycle Spot: PC)",
  31: "Please don't shoot slime until i call. (Rev Cycle Spot: PC / CC)",
  33: "Please don't shoot slime until i call. (Rev Cycle Spot: PC / CC)",
  34: "Please don't shoot slime until i call. (Rev Cycle Spot: PC / CC)",
  39: "Start shooting when Giant gets close. (Rev Cycle Spot: CC)",
  43: "Start shooting when Giant gets close. (Rev Cycle Spot: CC)",
  47: "Start shooting when Giant gets close or when slimes are fully grown. (Rev Cycle Spot: CC)",
  52: "Final one! Start shooting when Giant gets close. (Rev Cycle Spot: CC)",
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
  100: 17000,
}

let shoot_time = {
  18: 35000,
  23: 33000,
  26: 40000,
  29: 41000,
  31: 36000,
  33: 36000,
  34: 36000,
  39: 22000,
  43: 13000,
  47: 30000,
  52: 22000,
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
  53: "4 Giants (0-2-2). 4 Giants (0-2-2). Tons of clowns ALT (better) OR ULT CORNER or cc(It's dangerous). Kill clowns and Giants asap! ",
  54: "4 Giants (0-2-2), now they are Rainbow giants! ALT (better) OR ULT CORNER or CC (It's dangerous). 2 o1 (0-1-0-1)! When the giants spawn, an o1 will arrive few seconds later, be careful!",
  55: "5 Giants (0-1-1-1-1-1) Very hard round, be careful. Stay at ultimate corner. ",
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
              b: new Text("§bRound§7: " + round_update_noformat.replace("[Round ", "").replace("]", "").replace("[", "").replace("Game Over!", "Good Game!"), x + 5, y + 15 * scale),
              c: new Text("§9Next Max§7: Round " + max_ammo, x + 5, y + 35 * scale),
              d: new Text("§cNext Insta§7: Round " + insta_kill, x + 5, y + 45 * scale),
              e: new Text("§5Next Spree§7: Round " + shopping_spree, x + 5, y + 55 * scale),
        }
      } else {
        lines = {
              a: new Text("§aMap§7: " + map, x + 5, y + 5 * scale),
              b: new Text("§aDifficulty§7: " + map_difficulty, x + 5, y + 15 * scale),
              c: new Text("§bRound§7: " + round_update_noformat.replace("[Round ", "").replace("]", "").replace("[", "").replace("Game Over!", "Good Game!"), x + 5, y + 25 * scale),
              d: new Text("§9Next Max§7: Round " + max_ammo, x + 5, y + 45 * scale),
              e: new Text("§cNext Insta§7: Round " + insta_kill, x + 5, y + 55 * scale),
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

    if (Settings.notify_grow && show_shootT_alert) { shootT.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
    if (Settings.notify_grow && show_shootTdg_alert) { shootTdg.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
    if (Settings.giant_alert && show_giant_alert) { GiantAlert.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 4) }
}

register("worldUnload", () => {
    max_pat = 0;
    insta_pat = 0;
    ss_pat = 0;
    max_ammo = 0;
    insta_kill = 0;
    shopping_spree = 0;
})

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

  if (!in_zombies) return
    if (map === "Bad Blood" || map === "Dead End" || map === "Prison") {
      if (String(Scoreboard.getLinesByScore(5)).removeFormatting().replace("[Difficulty: ","").replace("]","").toLowerCase().includes("Normal")) { map_difficulty = "§aNormal§r" }
      if (String(Scoreboard.getLinesByScore(5)).removeFormatting().replace("[Difficulty: ","").replace("]","").toLowerCase().includes("Hard")) { map_difficulty = "§cHard§r" }
      if (String(Scoreboard.getLinesByScore(5)).removeFormatting().replace("[Difficulty: ","").replace("]","").toLowerCase().includes("RIP")) { map_difficulty = "§4§lRIP§r" }
    }
  round = String(Scoreboard.getLinesByScore(13))
  if (round_update != round) {
    round_update = round
    round_update_noformat = round_update.removeFormatting();
    if (round_update_noformat.replace("[", "").replace("]", "").toLowerCase().includes("round")) {
      round_update_int = parseInt(round_update_noformat.replace("[Round ", "").replace("]", ""))
    }
    ChatLib.chat(round_update.replace("[", "").replace("]", ""))
      if (Settings.notify_next_power_up && round_update_noformat.replace("[", "").replace("]", "").toLowerCase().includes("round")) {
        if (max_ammo == 0 && insta_kill == 0 && shopping_spree == 0) { ChatLib.chat(`&3[&bMicu&3]&r No power up data yet.`) } 
        else if (round_update_int > 102 && max_ammo == 102 && shopping_spree == 97 || round_update_int > 96 && max_ammo == 96 && shopping_spree == 96 || round_update_int > 102  && max_ammo == 102 && shopping_spree == 96 || round_update_int > 97  && max_ammo == 96 && shopping_spree == 97 || round_update_int > 96  && max_ammo == 96 && shopping_spree == 95 || round_update_int > 102  && max_ammo == 102 && shopping_spree == 95) {
          ChatLib.chat(`&3[&bMicu&3]&r No more power up. We are reaching the end of the Alien Arcadium!`)
        } else if (max_ammo >= 26 && round_update_int > 26 && map !== "Alien Arcadium" || max_ammo >= 27 && round_update_int > 27 && map !== "Alien Arcadium") {
          ChatLib.chat(`&3[&bMicu&3]&r No more power up. We are reaching the end of the ${map}`)
        } else {
          ChatLib.chat(`&3[&bMicu&3]&r Next power up round: ${poweruptext.replace("NaN", "")}`)
          if (Settings.notify_next_power_up_chat) { ChatLib.command(`pc [Micu] Next power up round: ${poweruptext.removeFormatting().replace("NaN", "")}`) }
        }
      }
    if (Settings.next_round_camp && map === "Alien Arcadium" && round_update_noformat.replace("[", "").replace("]", "").toLowerCase().includes("round")) {
    camp_spot.forEach((round) => {
        if (round_update_int == round) {
          ChatLib.chat(`&3[&bMicu&3]&r Camp Spot: ${camp_spot_location[round]}`)
          if (Settings.camp_spot_chat) { setTimeout(() => { ChatLib.command(`pc [Micu] Camp Spot: ${camp_spot_location[round]}`) }, 1000) }
        }
      })
    }
    if (Settings.notify_grow && map === "Alien Arcadium" && round_update_noformat.replace("[", "").replace("]", "").toLowerCase().includes("round")) {
    grow_round.forEach((gr) => {
        if (round_update_int == gr) {
        ChatLib.chat("&3[&bMicu&3]&r&a Grow Round Detected!")
        if (Settings.notify_grow_chat) { setTimeout(() => { ChatLib.command(`pc [Micu] Grow Round! ${grow_round_strat[gr]}`) }, 1000) }
            setTimeout(TextTMacro, shoot_time[gr])
        }
      })
    }
    if (Settings.giant_alert && map === "Alien Arcadium" && round_update_noformat.replace("[", "").replace("]", "").toLowerCase().includes("round")) {
    giant_spawn.forEach((delay) => {
        if (round_update_int == delay) {
          setTimeout(() => {
              GiantSpawn()
          }, giant_spawn_delay[delay]);
        }
      })      
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

    let new_max = false;
    if (max_pat == 1) {
      new_max = false;
      max_pat1.forEach((max) => {
        if (!new_max) {
          if (round_update_int < max) {
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
          if (round_update_int < max) {
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
          if (round_update_int < insta) {
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
          if (round_update_int < insta) {
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
          if (round_update_int < ss) {
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
          if (round_update_int < ss) {
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
          if (round_update_int < ss) {
            shopping_spree = ss;
            new_ss = true;
          }
        }
      });
      new_ss = false;
    }
  
  if (poweruptext != poweruptext_update) poweruptext = poweruptext_update

  if (insta_kill != 0) { poweruptext += textinsta } 
  if (insta_kill == 21 && round_update_int >= 21 || insta_kill == 23 && round_update_int >= 23 || insta_kill == 0) { poweruptext -= textinsta }

  if (max_ammo != 0) { poweruptext += textmax }
  if (max_ammo == 96 && round_update_int > 96 && map === "Alien Arcadium" || max_ammo == 97 && round_update_int > 97 && map === "Alien Arcadium") { poweruptext -= textmax }
  else if (max_ammo == 26 && round_update_int > 26 && map !== "Alien Arcadium" || max_ammo == 27 && round_update_int > 27 && map !== "Alien Arcadium") { poweruptext -= textmax }

  if (shopping_spree != 0) { poweruptext += textspree }
  if (shopping_spree == 95 && round_update_int > 95 || shopping_spree == 96 && round_update_int > 96 || shopping_spree == 97 && round_update_int > 97) { poweruptext -= textspree }

}).setFps(5);

register('renderOverlay', render);

register("chat", (chat, event) => {
  chat = String(ChatLib.getChatMessage(event)).removeFormatting();
  if (chat.includes("power up")) {return;}
  if (chat.includes("activated Max Ammo!")) {
    max_pat1.forEach((max) => {
      if (max == round_update_int) {
        if (max_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&9 Max pattern 1 detected.");}
          max_pat = 1;
        } else if (max_pat == 2) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Max pattern did not match up! Please use /maxpat <1/2> to specify max pattern manually. (use pattern 1 for 2, 5, 8, 12, '1s or '6s, and use pattern 2 for 3, 6, 9, 13, '2s or '7s)");}
        }
      }
    });
    max_pat2.forEach((max) => {
      if (max == round_update_int) {
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
  if (chat.includes("activated Insta Kill for 10s!")) {
    insta_pat1.forEach((insta) => {
      if (insta == round_update_int) {
        if (insta_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&c Insta pattern 1 detected.");}
          insta_pat = 1;
        } else if (insta_pat == 2) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Insta pattern did not match up! Please use /instapat <1/2> to specify insta pattern manually. (use pattern 1 for 2, 5, 8, 11, 14, 17, 20, 23, and use pattern 2 for 3, 6, 9, 12, 15, 18, 21)");}
        }
      }
    });
    insta_pat2.forEach((insta) => {
      if (insta == round_update_int) {
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
  if (chat.includes("activated Shopping Spree for 20s!")) {
    ss_pat1.forEach((ss) => {
      if (ss == round_update_int) {
        if (ss_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&5 Spree pattern 1 detected.");}
          ss_pat = 1;
        } else if (ss_pat == 2 || ss_pat == 3) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Spree pattern did not match up! Please use /sspat <1/2/3> to specify spree pattern manually. (use pattern 1 for 5, 15, 45, '5s, use pattern 2 for 6, '6s (except 56) and use pattern 3 for 7, '7s (except 57))");}
        }
      }
    });
    ss_pat2.forEach((ss) => {
      if (ss == round_update_int) {
        if (ss_pat == 0) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&5 Spree pattern 2 detected.");}
          ss_pat = 2;
        } else if (ss_pat == 1 || ss_pat == 3) {
          if (Settings.powerup_ann) {ChatLib.chat("&3[&bMicu&3]&r&f Spree pattern did not match up! Please use /sspat <1/2/3> to specify spree pattern manually. (use pattern 1 for 5, 15, 45, '5s, use pattern 2 for 6, '6s (except 56) and use pattern 3 for 7, '7s (except 57))");}
        }
      }
    });
    ss_pat3.forEach((ss) => {
      if (ss == round_update_int) {
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
  if (chatlowcase !== chat) {
      chatlowcase = chat
      if (chatlowcase.includes("activated Double Gold for 30s!")) {
        grow_round.forEach((dg) => {
          if (round_update_int == dg && map === "Alien Arcadium") {
              TextTMacro2()
          }
        });
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
    max_ammo = 0;
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
    insta_kill = 0;
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
    shopping_spree = 0;
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


// //Round Test
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

// //PowerUpCheck
// register("command", () => {
//   ChatLib.chat(poweruptext)
// }).setName("micupowerup")

function TextTMacro2() {
  show_shootTdg_alert = true;
  World.playSound("note.pling", 2, 1)
  setTimeout(() => {
    show_shootTdg_alert = false;
  }, 3000)
  ChatLib.chat("&3[&bMicu&3]&r&e Double Gold is activated. You can shoot now!")
  if (Settings.notify_grow_chat) ChatLib.command('pc [Micu] Double Gold is activated. Shoot now!')
}

function TextTMacro() {
  show_shootT_alert = true;
  World.playSound("note.pling", 2, 3)
  setTimeout(() => {
    show_shootT_alert = false;
  }, 3000)
  ChatLib.chat("&3[&bMicu&3]&r&e You can shoot now!")
  if (Settings.notify_grow_chat) ChatLib.command('pc [Micu] Shoot now!')
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