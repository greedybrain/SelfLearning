import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/mongo-exercises', {
     useNewUrlParser: true,
     useUnifiedTopology: true
})
     .then(console.log("Connected to the database successfully"))
     .catch(err => console.error("Could not connect", err))

const courseSchema = new mongoose.Schema({
     name: String,
     author: String,
     tags: [String],
     date: { type: Date, default: Date.now },
     isPublished: Boolean,
     price: Number
})

const Course = mongoose.model('Course', courseSchema)

// const getCoursesE1 = async () => {
//      return await Course
//           .find({ isPublished: true, tags: 'backend' })
//           .sort({ name: 1 })
//           .select({ name: 1, author: 1, tags: 1 })
// } 

// const getCoursesE2 = async () => {
//      return await Course
//           .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
//           .sort({ price: -1 })
//           .select({ name: 1, author: 1 })
// } 

const getCoursesE3 = async () => {
     return await Course
          .find({ isPublished: true })
          .or([
               { price: { $gte: 15 } },
               { name: /.*by.*/i }
          ])
} 

const run = async () => {
     // const courses = await getCoursesE1()
     // const courses = await getCoursesE2()
     const courses = await getCoursesE3();
     console.log(courses)
}

run()