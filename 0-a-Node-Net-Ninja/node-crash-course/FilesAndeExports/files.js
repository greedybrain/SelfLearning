const fs = require('fs')

//! READING FILES
// fs.readFile('./docs/test.txt', (err, data) => {
//         if (err) console.log(err)
//         else console.log(data.toString())
// })

//! WRITING FILES
// fs.writeFile('./docs/test.txt', "Hello, my DUDE", () => {
//         console.log("File has been written")
// })

//! DIRECTORIES 
// if (!fs.existsSync('./assets')) {
//         fs.mkdir('./assets', (err) => {
//                 if (err) console.log(err)
//                 else console.log('folder created')
//         })      
// } else {
//         fs.rmdir('./assets', (err) => {
//                 if (err) console.log(err)
//                 else console.log('folder deleted')
//         })
// }

//! DELETE FILES
if (fs.existsSync('./docs/deleteme.txt')) {
        fs.unlink('./docs/deleteme.txt', err => {
                if (err) console.log(err)
                else console.log('file deleted')
        } )
} else {
        fs.writeFile('./docs/deleteme.txt', 'AWESOME', err => {
                if (err) console.log(err)
                else console.log('file created')
        })
}