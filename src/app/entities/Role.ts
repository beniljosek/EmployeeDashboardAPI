import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";

@Entity("Role")
export class Role extends AbstractEntity {
    @PrimaryGeneratedColumn("increment")
    public rid: string;

    @Column({nullable: false})
    public rname: string;
}