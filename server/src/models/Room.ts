import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  userId: string;
  userName: string;
  userPicture: string;
  content: string;
  timestamp: Date;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  createdBy: string;
  messages: IMessage[];
  onlineUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userPicture: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  createdBy: {
    type: String,
    required: true
  },
  messages: [messageSchema],
  onlineUsers: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Room = mongoose.model<IRoom>('Room', roomSchema); 