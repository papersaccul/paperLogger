import { GuardFunction } from "discordx";
import { CommandInteraction, PermissionsBitField } from "discord.js";
import { i18n } from "../utils/i18n";

export const IsAdmin: GuardFunction<CommandInteraction> = async (
    interaction,
    client,
    next,
) => {
    if (!interaction.guild || !interaction.member) {
        console.error("Guild or Member is undefined.");
        return;
    }

    const memberPermissions = interaction.member.permissions;
    if (!(memberPermissions instanceof PermissionsBitField) || !memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
        throw new Error(i18n.__("errors.notAdmin"));
    }

    await next();
};
