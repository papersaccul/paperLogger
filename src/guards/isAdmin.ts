import { GuildMember, PermissionFlagsBits } from "discord.js";

export function IsAdmin(): MethodDecorator {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const [member] = args as [GuildMember]; // Приведение типа первого аргумента к GuildMember
            if (member.permissions.has(PermissionFlagsBits.Administrator)) {
                return originalMethod.apply(this, args);
            }
        }
    }
}