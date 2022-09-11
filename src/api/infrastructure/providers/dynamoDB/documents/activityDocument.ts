import {
  attribute,
  autoGeneratedHashKey,
  hashKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { Activities } from "src/api/infrastructure/interfaces/Activity.interface";
import { BaseDocument } from "./baseDocument";

const TABLE_NAME = "hmg-activities";

@table(TABLE_NAME)
export class ActivityDocument extends BaseDocument implements Activities {
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
  public build(id: string = undefined, name: string = undefined): void {
    this.id = id;
    this.name = name;
  }
}
