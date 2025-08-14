import {
    @SwitchProperty,
    @PercentSliderProperty,
    @SliderProperty,
    @Vigilant,
    @ButtonProperty,
    Color,
} from 'Vigilance';
import {RickRoll, TurnOffPC, CloseGame, DisconnectFromServer, CloseCurrentGui} from "./features/test";

@Vigilant('MicuZombieHelper')
class Settings {
    @SwitchProperty({
        name: "Enabled",
        description: "Enable the overlay for MicuZombieHelper",
        category: "Overlay",
    })
    enabled = true;

    @SwitchProperty({
        name: "Strat",
        description: "Shows the strat in overlay (Alien Arcadium)",
        category: "Overlay",
    })
    strat = true;

    @SwitchProperty({
        name: "Pregame Info",
        description: "Shows important rules in chat when you join Alien Arcadium",
        category: "Alien Arcadium",
    })
    show_pregame_info = true;

    @SwitchProperty({
        name: "Notify Camp",
        description: "Notify you when you should camp in specific round",
        category: "Alien Arcadium",
    })
    next_round_camp = true;

    @SwitchProperty({
        name: "Notify Camp In Party Chat",
        description: "",
        category: "Alien Arcadium",
    })
    camp_spot_chat = false;

    @SwitchProperty({
        name: "Grow Round Alert",
        description: "Alert you when you are in specific round that need grow slimes and will alert you shoot in specific time",
        category: "Alien Arcadium",
    })
    notify_grow = true;

    @SwitchProperty({
        name: "Grow Round Alert In Party Chat",
        description: "",
        category: "Alien Arcadium",
    })
    notify_grow_chat = false;

    @SwitchProperty({
        name: "Giants Alert",
        description: "Alerts you when first Giant wave is coming",
        category: "Alien Arcadium",
    })
    giant_alert = true;

    @SwitchProperty({
        name: "Giants Alert In Party Chat",
        description: "",
        category: "Alien Arcadium",
    })
    giant_alert_chat = false;

    @SwitchProperty({
        name: "Skill Alert",
        description: "Alerts you when your skill is ready",
        category: "Alien Arcadium",
    })
    lrod_alert = true;

    @SwitchProperty({
        name: "Fully Repaired Alert",
        description: "Alerts you when windows is fully repaired",
        category: "General",
    })
    window_alert = true;

    @SwitchProperty({
        name: "Notify Next Round Power Up",
        description: "",
        category: "Alien Arcadium",
    })
    notify_next_power_up = true;

    @SwitchProperty({
        name: "Notify Next Round Power Up In Party Chat",
        description: "",
        category: "Alien Arcadium",
    })
    notify_next_power_up_chat = false;

    @SwitchProperty({
        name: "Power Up Pattern Notification",
        description: "Notify you when power up pattern is detected or when it is wrong. Disabling this might cause imperfection in the next power up feature.",
        category: "Alien Arcadium",
    })
    powerup_ann = true;

    @SwitchProperty({
        name: "Victory!!! Alert",
        description: "Sound effect play and image will appear when you won",
        category: "General",
        subcategory: "Fun",
    })
    victory_dance = false;

    @SwitchProperty({
        name: "The Puncher Alert",
        description: "Sound effect play(you or other player) and image will appear(only you) when rolled puncher in AA turn off this if you don't play AA",
        category: "General",
        subcategory: "Fun",
    })
    puncher_alert = false;

    @SwitchProperty({
        name: "The Puncher Alert In Party Chat",
        description: "",
        category: "General",
        subcategory: "Fun",
    })
    puncher_chat_alert = false;

    @SliderProperty({
        name: "Overlay X",
        description: "Where in the X coordinate is the overlay drawn",
        category: "Overlay",
        min: 0,
        max: parseInt(Renderer.screen.getWidth()),
    })
    x = 0;

    @SliderProperty({
        name: "Overlay Y",
        description: "Where in the Y coordinate is the overlay drawn",
        category: "Overlay",
        min: 0,
        max: parseInt(Renderer.screen.getHeight()),
    })
    y = 0;

    @PercentSliderProperty({
        name: 'Scale',
        description: 'The scale of the overlay',
        category: 'Overlay',
    })
    scale = 0.0;

    @ButtonProperty({
        name: "Don't touch plz",
        description: "just don't :3",
        category: "General",
    })
    idk() {
        Client.currentGui.close()
        RickRoll()
    }

    @SwitchProperty({
        name: "Hide Window Repair Messages",
        description: "",
        category: "Messages",
    })
    hide_windows_chat = false;

    @SwitchProperty({
        name: "Hide Revive Messages",
        description: "",
        category: "Messages",
    })
    hide_revive_chat = false;

    @SwitchProperty({
        name: "Hide Target Hit Messages",
        description: "",
        category: "Messages",
    })
    hide_targethit_chat = false;

    @SwitchProperty({
        name: "Hide Player Leave/Rejoin Messages",
        description: "",
        category: "Messages",
    })
    hide_leaverejoin_chat = false;

    @SwitchProperty({
        name: "Hide Power Up Pickup Messages",
        description: "",
        category: "Messages",
    })
    hide_powerup_chat = false;

    @SwitchProperty({
        name: "Hide Gold Received Messages",
        description: "",
        category: "Messages",
    })
    hide_gold_chat = false;

    @SwitchProperty({
        name: "Hide Open Area Messages",
        description: "",
        category: "Messages",
    })
    hide_openarea_chat = false;

    @SwitchProperty({
        name: "Hide Lucky Chest Messages",
        description: "",
        category: "Messages",
    })
    hide_luckychest_chat = false;

    @SwitchProperty({
        name: "Hide Knockdown Messages",
        description: "",
        category: "Messages",
    })
    hide_knockdown_chat = false;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription('General', 'Settings for MicuZombieHelper');
        this.setCategoryDescription('Messages', 'Hide Messages (badly coded :sob:)')
        this.setSubcategoryDescription('General', 'Fun', 'frfr');
        this.setCategoryDescription('Overlay', 'Overlay Settings');
        this.setCategoryDescription('Alien Arcadium', 'Alien Arcadium Utilities');
    }
}

export default new Settings;