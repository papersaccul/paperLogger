import { CommandInteraction, GuildChannel, ApplicationCommandOptionType } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
// Импортируйте AppDataSource
import { AppDataSource } from "../utils/dataSource";
import { MsgChannel } from "../entities/MsgChannel";
import { MemberChannel } from "../entities/MemberChannel";
import { i18n } from "../utils/i18n";

@Discord()
@SlashGroup({ name: "log", description: i18n.__("log.group.description") })
class LogCommand {
@SlashGroup("log")
    @Slash({ name: "msg", description: i18n.__("log.msg.description") })
    async msg(
        @SlashOption({ name: "channel", type: ApplicationCommandOptionType.Channel, description: i18n.__("log.msg.channel.description") })
        channel: GuildChannel,
        interaction: CommandInteraction
    ): Promise<void> {
        await interaction.deferReply();
        const guildId = interaction.guildId;
        const channelId = channel.id;

        if (guildId === null) {
            await interaction.editReply(i18n.__("log.msg.guildOnly"));
            return;
        }

        const connection = AppDataSource;
        let msgChannel = await connection.getRepository(MsgChannel).findOne({ where: { guildId } });
        if (msgChannel) {
            msgChannel.channelId = channelId;
        } else {
            msgChannel = new MsgChannel();
            msgChannel.guildId = guildId;
            msgChannel.channelId = channelId;
        }
        await connection.manager.save(msgChannel);

        await interaction.editReply(i18n.__("log.msg.channelSet", { channelId }));
    }

@SlashGroup("log")
    @Slash({ name: "member", description: i18n.__("log.member.description") })
    async member(
        @SlashOption({ name: "channel", type: ApplicationCommandOptionType.Channel, description: i18n.__("log.member.channel.description") })
        channel: GuildChannel,
        interaction: CommandInteraction
    ): Promise<void> {
        await interaction.deferReply();
        const guildId = interaction.guildId;
        const channelId = channel.id;

        if (guildId === null) {
            await interaction.editReply(i18n.__("log.member.guildOnly"));
            return;
        }

        // Save to database
        const connection = AppDataSource;
        let memberChannel = await connection.getRepository(MemberChannel).findOne({ where: { guildId } });
        if (memberChannel) {
            memberChannel.channelId = channelId;
        } else {
            memberChannel = new MemberChannel();
            memberChannel.guildId = guildId;
            memberChannel.channelId = channelId;
        }
        await connection.manager.save(memberChannel);

        await interaction.editReply(i18n.__("log.member.channelSet", { channelId }));
    }
}

