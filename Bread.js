const express = require('express')
const { request } = require('http')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize('database','username', 'password', {
    host: 'localhost',
    dialect:'sqlite',
    Storage: './database/SqBread.sqlite'
})

const Bread = sequelize.define('bread', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

sequelize.sync()

app.get('/breads', (req, res) => {
    Bread.findAll().then(breads => {
        res.send(breads)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.get('/breads/:id', (req, res) => {
    Bread.findByPk(req.params.id).then(bread => {
        if (!bread) {
            res.status(404).send('Bread not found')
        } else {
            res.send(bread) 
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.post('/breads', (req, res) => {
    Bread.create(req.body).then(bread => {
        res.send(bread)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.put('/breads/:id', (req, res) => {
    Bread.findByPk(req.params.id).then(bread => {
        if (!bread) {
            res.status(404).send('Bread not found')
        } else {
            bread.update(req.body).then(bread => {
                res.send(bread)
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.delete('/breads/:id', (req, res) => {
    Bread.findByPk(req.params.id).then(bread => {
        if (!bread) {
            res.status(404).send('Bread not found')
        } else {
            bread.destroy().then(bread => {
                res.send(bread)
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening at at http://localhost:${port}`));