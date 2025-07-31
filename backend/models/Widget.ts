import { Schema, model, Document } from 'mongoose';

interface IWidget extends Document {
  location: string;
  createdAt: Date;
}

const WidgetSchema = new Schema<IWidget>({
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Widget = model<IWidget>('Widget', WidgetSchema);