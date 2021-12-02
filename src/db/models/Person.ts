import mongoose from "mongoose";

const Person = mongoose.model('Person', 
{
    name: String,
    salary: Number,
    aproved: Boolean,
});

export default Person;