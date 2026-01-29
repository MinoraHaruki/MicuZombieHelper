import { data } from "../data"
import Settings from "../config"

const checkingTriggers = []
const registerWhen = (trigger, checkFunc) => checkingTriggers.push([trigger.unregister(), checkFunc])

register("tick", () => {
    for (let i = 0; i < checkingTriggers.length; i++) {
        let [trigger, func] = checkingTriggers[i]
        if (func()) trigger.register()
        else trigger.unregister()
    }
})

const S37PacketStatistics = Java.type('net.minecraft.network.play.server.S37PacketStatistics')
const C16PacketClientStatus = Java.type('net.minecraft.network.play.client.C16PacketClientStatus')
const S03_PACKET_TIME_UPDATE = Java.type('net.minecraft.network.play.server.S03PacketTimeUpdate')

let prevTime = null
let averageTps = 20
const tpsWindow = 10
const S01PacketJoinGame = Java.type('net.minecraft.network.play.server.S01PacketJoinGame')
const System = Java.type('java.lang.System')

let isPinging = false

let pingCache = -1
let lastPingAt = -1

function sendPing() {
    if (!isPinging) {
        Client.sendPacket(new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS))
        lastPingAt = System.nanoTime()
        isPinging = true
    }
}

register('step', () => {
    if (Settings.StatsHUD) sendPing()
}).setDelay(2)

register('worldLoad', () => {
    prevTime = null
    averageTps = 20
    pingCache = -1
    isPinging = false
})

register('packetReceived', () => {
    if (lastPingAt > 0) {
        lastPingAt = -1
        isPinging = false
}}).setFilteredClass(S01PacketJoinGame)

register('packetReceived', () => {
    if (lastPingAt > 0) {
        let diff = Math.abs((System.nanoTime() - lastPingAt) / 1_000_000)
        lastPingAt *= -1
        pingCache = diff
        isPinging = false
    }
}).setFilteredClass(S37PacketStatistics)

register('packetReceived', () => {
    if (prevTime !== null) {
        let time = Date.now() - prevTime
        let instantTps = MathLib.clampFloat(20000 / time, 0, 20)
        let alpha = 2 / (tpsWindow + 1)
        averageTps = instantTps * alpha + averageTps * (1 - alpha)
    }
    prevTime = Date.now()
}).setFilteredClass(S03_PACKET_TIME_UPDATE)
///////////////////////////////////////////////////////////////////

registerWhen(register('renderOverlay', () => {
    if (Settings.StatsHUD) {
        Renderer.drawString(`§bFPS: §f${Client.getFPS()}  §bPing: §f${parseInt(pingCache)}  §bTPS: §f${averageTps.toFixed(1)}`, data.StatsCoords.x, data.StatsCoords.y, true)
    }
}), () => Settings.StatsHUD)

registerWhen(register('renderOverlay', () => {
    if ((Settings.StatsGui.isOpen() && !Settings.StatsHUD) || !Settings.StatsHUD) {
        Renderer.drawString(`§bFPS: §f${Client.getFPS()}  §bPing: §f${parseInt(pingCache)}  §bTPS: §f${averageTps.toFixed(1)}`, data.StatsCoords.x, data.StatsCoords.y, true)
    }
}), () => Settings.StatsGui.isOpen())
////////////////////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (Settings.StatsGui.isOpen()) {
        data.StatsCoords.x = x
        data.StatsCoords.y = y
        data.save()
    }
})

register("chat", (player, message, event) => {
    if (Settings.zombiescmd && message.slice(0, 1)=="!") {
        switch (message) {
            case "!tps":
                ChatLib.command(`pc [Micu] TPS: ${averageTps.toFixed(1)}`)
                break;
            case "!fps":
                ChatLib.command(`pc [Micu] FPS: ${Client.getFPS()}`)
                break;
            case "!ping": 
                ChatLib.command(`pc [Micu] Ping: ${parseInt(pingCache)}`)
                break;
            default:
                break;
        }
    }
}).setCriteria("&r&9Party &8> ${player}&f: &r${message}&r")