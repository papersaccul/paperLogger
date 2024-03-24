import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MemberChannel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guildId: string;

    @Column()
    channelId: string;
}
