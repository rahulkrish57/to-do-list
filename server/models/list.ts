import { Schema, model, Document } from "mongoose";

interface IState extends Document {
  name: string;
  status: Boolean;
  cAt: Date;
  uAt: Date;
}

const ListSchema = new Schema<IState>({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  cAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  uAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const List = model<IState>("List", ListSchema);

export default List;
