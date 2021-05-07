import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, IsDate } from "class-validator";
import User from "../identity-access/user";
import ShiftModel from "../shift-model/shift-model";

@Entity("shift_entries")
export default class ShiftEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsDate()
  @Column("timestamp")
  startsAt!: Date;

  @IsDate()
  @Column("timestamp")
  endsAt!: Date;

  @IsString()
  @Column("varchar")
  note!: string;

  @ManyToOne(() => User, (user) => user.shiftEntries)
  user!: User;

  @ManyToOne(() => ShiftModel, (shiftModel) => shiftModel.shiftEntries)
  shiftModel!: ShiftModel;
}