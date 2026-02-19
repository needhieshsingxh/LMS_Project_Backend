import mongoose, {Schema} from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Course title is required"],
        trim: true,
        maxLength: [100, "Course title cannot exceed 100 character"]
    },
    title: {
        type: String,
        trim : true,
        maxLength: [200, "Course subtitile cannot exceed 200 characters"]
    },
    description:{
        type: String,
        trim: true
    },
    category:{
        type: String,
        required: [true, 'Coutse category is required'],
        trim: true,
    },
    levels: {
        type: String,
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: "Please select a valid course level"
        },
        default: 'beginner'
    },
    price:{
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, "Course price must be a positive number"]
    },
    thumbnail:{
        type: String,
        required: [true, 'Course thumbnail is required']
    },
    enrolledStudents:[{
        types: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lectures: [
        {
            types: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture'
        }
    ],
    instructor:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: [true, "Course instrutor is required"]   
    },
    isPublished:{
        type: Boolean,
        default: false
    },
    totalDuration:{
            types:Number,
            default: 0
        },
    totalLectures: {
        type: Number,
        default: 0
    }
    
},
{
    timestamps: true,
    toJSON: {virtuals: true},
    toObkect: {virtuals: true}
});

courseSchema.virtual('averageRating').get(function(){
    return 0;//average Rating
})

courseSchema.pre("save", function(next){
    if(this.lectures){
        this.totalLectures = this.lectures.length;
    }
})


export const Course = mongoose.models("Course", courseSchema);