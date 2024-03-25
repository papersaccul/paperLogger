import { EmbedBuilder } from "discord.js";
import { ArgsOf, Discord, On, Guard } from "discordx";
import { AppDataSource } from "../utils/dataSource";
import { MemberChannel } from "../entities/MemberChannel";
import { i18n } from "../utils/i18n"; 

@Discord()
abstract class MemberEvent {
    @On({ event: "guildMemberAdd" })
    private async onJoin([member]: ArgsOf<"guildMemberAdd">): Promise<void> {
        
        if (!member || !member.guild) {
            console.error(i18n.__("log.member.description", { error: "Member or member.guild is undefined" }));
            return;
        }

        const guildId = member.guild.id;
        const connection = AppDataSource;
        const memberChannel = await connection.getRepository(MemberChannel).findOne({ where: { guildId } });

        if (!memberChannel) {
            console.log(i18n.__("log.member.channel", { guildId: guildId, error: "not found" }));
            return;
        }

        const channel = member.guild.channels.cache.get(memberChannel.channelId);
        if (!channel || !channel.isTextBased()) {
            console.log(i18n.__("log.msg.channel", { channelId: memberChannel.channelId, error: "not found or is not text-based" }));
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(i18n.__("memberEvent.join", { tag: member.user.tag })) 
            .setColor("#00ff00")
            .setThumbnail(member.user.displayAvatarURL())
            .addFields({ name: i18n.__("memberEvent.Nickname"), value: member.toString() }) 
            .setFooter({ text: i18n.__("memberEvent.id", { id: member.id }) });
        await channel.send({ embeds: [embed] });
    }

    @On({ event: "guildMemberRemove" })
    private async onLeave([member]: ArgsOf<"guildMemberRemove">): Promise<void> {

        const guildId = member.guild.id;
        const connection = AppDataSource;
        const memberChannel = await connection.getRepository(MemberChannel).findOne({ where: { guildId } });

        if (!memberChannel) {
            console.log(i18n.__("log.member.channel", { guildId: guildId, error: "not found" }));
            return;
        }

        const channel = member.guild.channels.cache.get(memberChannel.channelId);
        if (!channel) {
            console.log(i18n.__("log.msg.channel", { channelId: memberChannel.channelId, error: "not found" }));
            return;
        }

        if (channel.isTextBased()) {
            const roles = member.roles.cache.map(role => role.name).join(", ");
            const embed = new EmbedBuilder()
                .setTitle(i18n.__("memberEvent.leave", { tag: member.user.tag }))
                .setColor("#ff0000")
                .setThumbnail(member.user.displayAvatarURL())
                .addFields(
                    { name: i18n.__("memberEvent.Nickname"), value: member.toString() },
                    { name: i18n.__("memberEvent.roles"), value: roles.length > 0 ? roles : i18n.__("memberEvent.noRoles") }
                )
                .setFooter({ text: i18n.__("memberEvent.id", { id: member.id }) });
            await channel.send({ embeds: [embed] });
        }
    }
}

