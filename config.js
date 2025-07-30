import {
    @SwitchProperty,
    @PercentSliderProperty,
    @SliderProperty,
    @Vigilant,
    @ButtonProperty,
    Color,
} from 'Vigilance';
import {RickRoll, TurnOffPC, CloseGame, DisconnectFromServer, CloseCurrentGui} from "./test";

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
        description: "Shows info about AA in chat when you join General",
        category: "Alien Arcadium",
    })
    show_pregame_info = true;

    @SwitchProperty({
        name: "Notify Grow Round",
        description: "",
        category: "Alien Arcadium",
    })
    notify_grow = true;

    @SwitchProperty({
        name: "Notify Grow Round In Party Chat",
        description: "",
        category: "Alien Arcadium",
    })
    notify_grow_chat = false;

    @SwitchProperty({
        name: "Lightning Rod Alert",
        description: "Alerts you when your lightning rod is ready",
        category: "Alien Arcadium",
    })
    lrod_alert = true;

    @SwitchProperty({
        name: "Cornering Waypoints",
        description: "Showing corner spot for revive cycle (not working now.)",
        category: "Alien Arcadium",
    })
    corner_spot = false;

    @SwitchProperty({
        name: "Cornering Spot In Party Chat",
        description: "Tell player corner spot for the next round (not working now.)",
        category: "Alien Arcadium",
    })
    corner_spot_chat = false;

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
        description: "Sound effect play(you or other player) and image will appear(only you) when rolled puncher in AA",
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

    constructor() {
        this.initialize(this);
        this.setCategoryDescription('General', 'Settings for MicuZombieHelper');
        this.setSubcategoryDescription('General', 'Fun', 'frfr');
        this.setCategoryDescription('Overlay', 'Overlay Settings');
        this.setCategoryDescription('Alien Arcadium', 'Alien Arcadium Utilities');
    }
}

export default new Settings;