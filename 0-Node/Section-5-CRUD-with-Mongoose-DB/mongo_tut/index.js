// STEP 1 - Install and import mongoose node package
import mongoose from 'mongoose'

// STEP 2 - Connect to mongod database 
mongoose.connect('mongodb://localhost/playground', {
     useNewUrlParser: true,
     useUnifiedTopology: true
})
     .then(console.log('Connected to MongoDB...'))
     .catch(err => console.error('Could not connect to MongoDB....', err))

// STEP 3 - Create schema for an object
const courseSchema = new mongoose.Schema({
     name: String,
     author: String,
     tags: [String],
     date: { type: Date, default: Date.now },
     isPublished: Boolean
})

// STEP 4 - Compile schema into a model as a Class
const Course = mongoose.model('Course', courseSchema)

// STEP 5 - Model definition
const createCourse = async () => {
     const course = new Course({
          name: "Angular.js Course",
          author: "Willis",
          tags: ['angular', 'frontend'],
          isPublished: true
     })
     
     const result = await course.save()
     console.log(result)
}

// const getCourses = async () => {
//      // COMPARISON QUERY OPERATORS 
//      // eq (equal)
//      // ne (not equal)
//      // gt (greater than)
//      // gte (greater than or equal to)
//      // lt (less than)
//      // lte (less than or equal to)
//      // in 
//      // nin (not in)

//      const courses = await Course
//           // .find({ author: "Willis", isPublished: true })
//           // .find({ price: { $gte: 10, $lte: 20 } })
//           .find({ price: { $in: [10, 15, 20] } })
//           .limit(10)
//           .sort({ name: -1 }) // Sort in ASC = 1, in DESC = -1
//           .select({ name: 1, tags: 1 }) // Assign 1 by convention
//      console.log("All courses:", courses)
// }

// const getCourses = async () => {
//      // LOGICAL QUERY OPERATORS 
//      // or
//      // and

//      const courses = await Course
//           // .find({ author: "Willis", isPublished: true })
//           .find()
//           .or([{ author: "Willis" }, { isPublished: true }])
//           .and([{}])
//           .limit(10)
//           .sort({ name: -1 }) // Sort in ASC = 1, in DESC = -1
//           .select({ name: 1, tags: 1 }) // Assign 1 by convention
//      console.log("All courses:", courses)
// }

const getCourses = async () => {
     // REGULAR EXPRESSIONS

     const courses = await Course
          // .find({ author: /^Will/ }) // Starts with something
          // .find({ author: /llis$/i }) // Ends with something
          .find({ author: /.*il.*/i }) // Contains something
          .count()
     console.log("All courses:", courses)
}

getCourses()