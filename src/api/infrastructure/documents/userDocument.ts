import {
  attribute,
  autoGeneratedHashKey,
  hashKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { User } from "src/api/infrastructure/interfaces/user.interface";
import { Roles } from "../constants/roles";
import { BaseDocument } from "./baseDocument";

const TABLE_NAME = "hmg-users";

@table(TABLE_NAME)
export class UserDocument extends BaseDocument implements User {
  public static tableName = TABLE_NAME;

  @autoGeneratedHashKey()
  @hashKey({
    indexKeyConfigurations: {
      ItemIdIndex: "HASH",
    },
  })
  id: string;

  @attribute()
  name: string;

  @attribute()
  email: string;

  @attribute()
  password: string;

  @attribute()
  role: Roles;

  public build(id, name, email, role): void {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
