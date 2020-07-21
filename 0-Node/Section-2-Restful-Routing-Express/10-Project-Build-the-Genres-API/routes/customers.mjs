import { Customer, validateCustomer } from '../models/customer.mjs'
import express from 'express'
const allCustomers = express.Router()

// Read 
allCustomers.get('/', async (req, res) => {
     const customers = await Customer.find().sort('name')
     res.send(customers)
})

// Create 
allCustomers.post('/', async (req, res) => {
     const { error } = validateCustomer(req.body)
     if (error) return res.status(400).send(error.details[0].message)

     let customer = new Customer({
          name: req.body.name,
          phone: req.body.phone,
          isGold: req.body.isGold
     })
     customer = await customer.save()
     res.send(customer)
})

// Read/Show
allCustomers.get('/:id', async (req, res) => {
     const customer = await Customer.findById(req.params.id)
     if (!customer) return res.status(404).send("We couldn't find that customer")
     
     res.send(customer)
})

// Update
allCustomers.put('/:id', async (req, res) => {
     const { error } = validateCustomer(req.body)
     if (error) return res.status(400).send(error.details[0].message)
     
     const customer = await Customer
          .findByIdAndUpdate(req.params.id,
               {
                    name: req.body.name,
                    phone: req.body.phone,
               },
               {
                    new: true
               }
          )
     if (!customer) return res.status(404).send("We couldn't find that customer")
     res.send(customer)
})

// Delete
allCustomers.delete('/:id', async (req, res) => {
     const customer = await Customer.findByIdAndRemove(req.params.id)

     if (!customer) return res.status(404).send("We couldn't find that customer")
     res.send(customer)
})

export default allCustomers