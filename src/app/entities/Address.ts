import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("Address")
export class Address extends AbstractEntity {
    @PrimaryGeneratedColumn("increment")
    public id: string;

    @Column({nullable: false})
    public address: string;
}