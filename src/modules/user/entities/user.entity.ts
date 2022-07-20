import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

export enum UserRole {
    USER = "USER",
    SUPERUSER = "SUPERUSER",
    DELETED = "DELETED",
    GHOST = "GHOST", // TODO this property will be enabled when the user is created and will be changed to USER once the email of the user has been verified
}

@Entity({
    name: "user",
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    @Exclude()
    password: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        nullable: true,
    })
    @Exclude()
    public currentHashedRefreshToken?: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;
}

export default User;
