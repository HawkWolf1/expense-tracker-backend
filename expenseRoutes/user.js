const express = require('express');

const router = express.Router();

const userController = require('../controllers/expense')


router.post('/expense/add-expense', userController.addExpense)

router.get('/expense/get-expense', userController.getExpense )

router.delete('/expense/delete-expense/:id', userController.deleteExpense)

module.exports = router