import mongoose from "mongoose";
import { Book } from "./bookTypes";

const BookSchema = new mongoose.Schema<Book>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  coverImage: {
    type: String,
    required: true, // Corrected from `required: Boolean`
  },

  file: {
    type: String,
    required: true,
  },

  gener: {
    type: String,
    required: true,
  },
});

const BookModel = mongoose.model<Book>("Book", BookSchema);

export default BookModel;
