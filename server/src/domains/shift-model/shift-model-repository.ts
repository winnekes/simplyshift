import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
  Repository,
} from "typeorm";
import User from "../identity-access/user";
import ShiftModel from "./shift-model";

@EntityRepository(ShiftModel)
export class ShiftModelRepository extends Repository<ShiftModel> {
  findAllForUser(currentUser: User, options?: FindConditions<ShiftModel>) {
    return this.find({ user: currentUser, ...options });
  }

  findOneForUser(currentUser: User, options?: FindOneOptions<ShiftModel>) {
    return this.findOne({ user: currentUser, ...options });
  }
}