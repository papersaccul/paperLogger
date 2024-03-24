import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MsgChannel {
    @PrimaryGeneratedColumn()
    id: number; 
    
    @Column()
    guildId: string; 

    @Column()
    channelId: string; 
}
