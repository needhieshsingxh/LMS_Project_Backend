import mongoose, {Schema} from "mongoose";

const lectureSchema = new mongoose.Schema({
title: {
    type: String,
    trim: true,
    required: [true, "Lecture title is required"],
    maxLength: [100, "Lecture title cannot exceed 100 characters"],
},
description: {
 type: String,
 trim: true,
 maxLength: [500, "description cannot exceed 500 characters"],
},
videoUrl: {
    type: String,
    required: [true, "Video URL is required"],
},
duration :{
    type: Number,
    default: 0
},
publicId:{
    type: String,
    required: [true, 'Public ID is required for video manangement']
},
isPrevied:{
    type: Boolean,
    default: false
},
order: {
type: Number,
required: [true, 'Lecture order is required']
}
}):

lectureSchema.pre('save', function(next){

})


const Lecture = mongoose.model("Lecture", lectureSchema)