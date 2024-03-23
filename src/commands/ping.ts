import { CommandInteraction, Message, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import { i18n } from "../utils/i18n";

@Discord()
abstract class PingCommand {

    @Slash({ name: "ping", description: i18n.__("ping.description") })
    async ping(interaction: CommandInteraction): Promise<void> {

        const reply = (await interaction.deferReply({ fetchReply: true })) as Message;
        const roundTripLatency = reply.createdTimestamp - interaction.createdTimestamp;
        const websocketPing = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
                .setTitle(i18n.__("ping.title"))
                .addFields(
                    { name: i18n.__("ping.roundtrip"), value: `\`\`\`${roundTripLatency} ms\`\`\``, inline: true },
                    { name: i18n.__("ping.websocket"), value: `\`\`\`${websocketPing} ms\`\`\``, inline: true }
                )
                .setColor("#00ff7f");

        interaction.editReply({ embeds: [embed] });
    }
}