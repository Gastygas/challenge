import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Area } from './area.entity';

@Entity('workers')
export class Worker {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: "text", nullable: false })
    name: string;

    @Column({ type: "text", nullable: false })
    last_name: string;

    @Column({ type: "text", nullable: false })
    dni: string

    @Column({ type: "text", nullable: false })
    birthdate: string

    @Column({ type: "boolean", default: false })
    is_developer: boolean

    @Column({ type: "text", nullable: true })
    about: string;

    @Column({ type: "boolean", default: true })
    status: boolean;
    
    @ManyToOne(() => Area, (area) => area.workers, { eager: true })
    area: Area;

}