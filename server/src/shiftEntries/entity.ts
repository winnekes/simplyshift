import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, IsDate } from 'class-validator';
import User from '../users/entity';
import ShiftModel from '../shiftModels/entity';

@Entity('shift_entries')
export default class ShiftEntry extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @IsDate()
    @Column('timestamp')
    startsAt: Date;

    @IsDate()
    @Column('timestamp')
    endsAt: Date;

    @IsString()
    @Column('varchar', { nullable: true })
    note: string;

    @ManyToOne(
        () => User,
        user => user.shiftEntries,
        { nullable: false }
    )
    user: User;

    @ManyToOne(
        () => ShiftModel,
        shiftModel => shiftModel.shiftEntries,
        { nullable: false }
    )
    shiftModel: ShiftModel;
}