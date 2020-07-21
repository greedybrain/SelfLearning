import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/playground', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
     })
     .then(console.log('Connected to MongoDB...'))
     .catch(err => console.error('Could not connect to MongoDB....', err))

const courseSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 255,
          unique: true
          // match: /regular epxression/
     },
     category: {
          type: String,
          enum: ['web', 'mobile', 'network'],
          lowercase: true,
          // uppercase: true 
          trim: true 
     },
     author: String,
     tags: {
          type: Array,
          // creating custom validators 
          validate: {
               validator: value => {
                    setTimeout(() => {
                         try {
                              Promise.resolve(value && value.length > 0)
                         } catch (exc) {
                              console.log(exc.message)
                         }
                    }, 1000)
               },
               message: 'Course should have at least 1 tag'
          }
     },
     date: {
          type: Date,
          default: Date.now
     },
     isPublished: Boolean,
     price: {
          type: Number,
          //Cannot use arrow function below
          required: function () {
               return this.isPublished
          },
          // the below validators also work for dates
          min: 10,
          max: 200,
          get: value => Math.round(value),
          set: value => Math.round(value)
     }
})

// STEP 4 - Compile schema into a model as a Class
const Course = mongoose.model('Course', courseSchema)

// STEP 5 - Model definition
const createCourse = async () => {
     const course = new Course({
          name: "Angular.js Course",
          category: 'Web',
          author: "Willis",
          tags: ['frontend'],
          isPublished: true,
          price: 15.8
     })
     try {
          const result = await course.save()
          console.log(result)
     } catch (exc) {
          for (let field in exc.errors)
               console.log(exc.errors[field].message)
     }
}

createCourse()