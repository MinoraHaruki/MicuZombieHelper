import {
    @SwitchProperty,
    @PercentSliderProperty,
    @SliderProperty,
    @Vigilant,
    @ButtonProperty,
    @SelectorProperty,
    Color,
} from 'Vigilance';

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
        name: "Notify Corner",
        description: "Notify you where you should stay in specific round",
        category: "Alien Arcadium",
    })
    next_round_camp = true;

    @SelectorProperty({
        name: 'Corner Options',
        description: '',
        category: 'Alien Arcadium',
        options: ['Safest', 'Fastest'],
    })
    corners_options = 0;

    @SwitchProperty({
        name: "Optional Corners",
        description: "Add optional corners for Challenges and Team Size Related",
        category: "Alien Arcadium",
    })
    corners_options_optional = false;

    @SwitchProperty({
        name: "Notify Corner In Party Chat",
        description: "",
        category: "Party Chat",
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
        category: "Party Chat",
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
        category: "Party Chat",
    })
    giant_alert_chat = false;

    @SwitchProperty({
        name: "o1 Alert",
        description: "Alerts you when last o1 wave is coming",
        category: "Alien Arcadium",
    })
    o1_alert = true;

    @SwitchProperty({
        name: "o1 Alert In Party Chat",
        description: "",
        category: "Party Chat",
    })
    o1_alert_chat = false;

    @SwitchProperty({
        name: "Insta Touched Alert (Grow Round)",
        description: "Alerts you when insta has been pick up in grow round",
        category: "Alien Arcadium",
    })
    instatouch = true;

    @SwitchProperty({
        name: "Insta Touched Alert (Grow Round) In Party Chat",
        description: "",
        category: "Party Chat",
    })
    instatouch_chat = false;

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
        category: "General",
    })
    notify_next_power_up = true;

    @SwitchProperty({
        name: "Notify Next Round Power Up In Party Chat",
        description: "",
        category: "Party Chat",
    })
    notify_next_power_up_chat = false;

    @SwitchProperty({
        name: "Power Up Pattern Notification",
        description: "Notify you when power up pattern is detected or when it is wrong. Disabling this might cause imperfection in the next power up feature.",
        category: "General",
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
        description: "Sound effect play(you or other player) and image will appear(only you) when rolled puncher in AA",
        category: "General",
        subcategory: "Fun",
    })
    puncher_alert = false;

    @SwitchProperty({
        name: "The Puncher Alert In Party Chat",
        description: "",
        category: "Party Chat",
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

    @SwitchProperty({
        name: "No Grow",
        description: "Cancel grow timer in grow round (!ng)",
        category: "Party Commands",
    })
    no_grow_cmds = false;

    @SwitchProperty({
        name: "Set Powerup Pattern",
        description: "Set Max/Insta/SS pattern (!max/!insta/!ss 1, 2 or 3)",
        category: "Party Commands",
    })
    powerup_cmds = false;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription('General', 'Settings for MicuZombieHelper');
        this.setCategoryDescription('Messages', 'Hide Messages');
        this.setCategoryDescription('Party Chat', 'Party Chat Settings');
        this.setCategoryDescription('Party Commands', 'Party Commands Settings');
        this.setSubcategoryDescription('General', 'Fun', 'frfr');
        this.setCategoryDescription('Overlay', 'Overlay Settings');
        this.setCategoryDescription('Alien Arcadium', 'Alien Arcadium Utilities');
    }
}

export default new Settings;