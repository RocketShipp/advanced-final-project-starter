import mongoose, {Schema} from 'mongoose';

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    requried: true
  },
  items: [{
    text: {
      type: String,
      required: true
    }
  }]
});

export default mongoose.model('List', ListSchema);
