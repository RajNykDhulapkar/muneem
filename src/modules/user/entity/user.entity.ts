import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "user",
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    password: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: "varchar",
    })
    emailVerificationCode: string;
}
