import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true,
                        trim: true,
                        minlength: 3,
                        maxlength: 50
                },
                occupation: {
                        type: String,
                        trim: true,
                        required: true
                },
                email: {
                        type: String,
                        required: true,
                        minlength: 8,
                        trim: true,
                        maxlength: 50,
                        unique: true,
                },
                phone: {
                        type: Number,
                        required: true,
                        minlength: 10
                },
                description: {
                        type: String,
                        required: true,
                        trim: true,
                        minlength: 3,
                        maxlength: 100
                },
                gender: {
                        type: String,
                        enum: ['Male', 'Female']
                },
                age: {
                        type: Number,
                        requird: true
                },
        },
        { timestamps: true }
);
const student = mongoose.model('Student', studentSchema);

export default student;