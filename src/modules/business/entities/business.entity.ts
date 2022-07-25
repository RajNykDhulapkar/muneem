import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import User from "src/modules/user/entities/user.entity";

export enum UserRole {
    USER = "USER",
    SUPERUSER = "SUPERUSER",
    DELETED = "DELETED",
    GHOST = "GHOST", // TODO this property will be enabled when the user is created and will be changed to USER once the email of the user has been verified
}

@Entity({
    name: "business",
})
export class Business {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    address: string;

    @ManyToOne(() => User, (owner: User) => owner.businesses)
    owner: User;
}

export default Business;
