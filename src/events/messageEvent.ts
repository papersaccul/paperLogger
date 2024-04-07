import { EmbedBuilder } from "discord.js";
import { Discord, ArgsOf, On } from "discordx";
import { AppDataSource } from "../utils/dataSource";
import { MsgChannel } from "../entities/MsgChannel";
import { i18n } from "../utils/i18n";

@Discord()
abstract class MessageEvent {
    @On({ event: "messageUpdate" })
    private async onMessageUpdate([oldMessage, newMessage]: ArgsOf<"messageUpdate">): Promise<void> {

        if (!newMessage.author) return;
        if (newMessage.author.bot) return;
        if (oldMessage.content?.trim() === newMessage.content?.trim()) return;

        const guildId = newMessage.guildId;
        if (!guildId) return;

        const connection = AppDataSource;
        const msgChannel = await connection.getRepository(MsgChannel).findOne({ where: { guildId } });

        if (!msgChannel) {
            console.log(i18n.__("log.msg.channel", { guildId: guildId, error: "not found" }));
            return;
        }

        const channel = newMessage.guild?.channels.cache.get(msgChannel.channelId);
        if (!channel || !channel.isTextBased()) {
            console.log(i18n.__("log.msg.channel", { channelId: msgChannel.channelId, error: "not found or is not text-based" }));
            return;
        }

        const oldContent = oldMessage.content || i18n.__("messageEvent.noContent");
        const newContent = newMessage.content || i18n.__("messageEvent.noContent");

        const combinedContent = "### " + i18n.__("messageEvent.oldContent") + "\n" + oldContent + "\n\n### " + i18n.__("messageEvent.newContent") + "\n" + newContent;

        const parts = combinedContent.match(/[\s\S]{1,4096}/g) || []; 

        for (let i = 0; i < parts.length; i++) {
            const embed = new EmbedBuilder()
                .setColor("#ffa500")
                .setDescription(parts[i]);

            if (i === 0) {
                embed.setTitle(i18n.__("messageEvent.update", { tag: newMessage.author?.tag || i18n.__("messageEvent.unknownUser") }))
                     .setAuthor({ name: newMessage.author?.tag || i18n.__("messageEvent.unknownUser"), iconURL: newMessage.author?.displayAvatarURL() });
            }

            if (i === parts.length - 1) {
                embed.setFooter({ text: i18n.__("messageEvent.id", { id: newMessage.id }) });
            }

            await channel.send({ embeds: [embed] });
        }
    }
    @On({ event: "messageDelete" })
    private async onMessageDelete([message]: ArgsOf<"messageDelete">): Promise<void> {
        if (!message.guildId) return;
        if (message.author?.bot) return;

        const guildId = message.guildId;
        const connection = AppDataSource;
        const msgChannel = await connection.getRepository(MsgChannel).findOne({ where: { guildId } });

        if (!msgChannel) {
            console.log(i18n.__("log.msg.channel", { guildId: guildId, error: "not found" }));
            return;
        }

        const channel = message.guild?.channels.cache.get(msgChannel.channelId);
        if (!channel || !channel.isTextBased()) {
            console.log(i18n.__("log.msg.channel", { channelId: msgChannel.channelId, error: "not found or is not text-based" }));
            return;
        }

        const content = message.content || i18n.__("messageEvent.noContent");

        const embed = new EmbedBuilder()
            .setTitle(i18n.__("messageEvent.delete", { tag: message.author?.tag || i18n.__("messageEvent.unknownUser") }))
            .setColor("#ff0000")
            .setAuthor({ name: message.author?.tag || i18n.__("messageEvent.unknownUser"), iconURL: message.author?.displayAvatarURL() })
            .setDescription(content)
            .setFooter({ text: i18n.__("messageEvent.id", { id: message.id }) });

        await channel.send({ embeds: [embed] });
    }
}
