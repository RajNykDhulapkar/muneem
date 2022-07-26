import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import Business from "src/modules/business/entities/business.entity";

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

    @Column({ default: false })
    public isEmailConfirmed: boolean;

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

    @OneToMany(() => Business, (business: Business) => business.owner)
    businesses: Business[];
}

export default User;
