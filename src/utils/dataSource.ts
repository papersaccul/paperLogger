import { DataSource } from "typeorm";
import { MsgChannel } from "../entities/MsgChannel";
import { MemberChannel } from "../entities/MemberChannel";
import * as path from "path";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.join(__dirname, "../db/db.sqlite"),
    entities: [MsgChannel, MemberChannel],
    synchronize: true,
    logging: false,
});


