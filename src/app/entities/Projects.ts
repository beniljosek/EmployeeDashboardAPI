import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";

@Entity("Projects")
export class Projects extends AbstractEntity {
    @PrimaryGeneratedColumn("increment")
    public id: string;

    @Column()
    public name: string;

    @Column({ nullable: true })
    public description: string;

    @Column({ default: true })
    public isActive: boolean;
}