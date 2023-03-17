const express = require('express');

const router = express.Router();

const userController = require('../controllers/userC')
const expenseController = require('../controllers/expenseC')


router.post('/user/add-user', userController.addUser)

router.post('/user/login', userController.loginN)


router.post('/expense/add-expense', expenseController.addExpense)
router.get('/expense/get-expense', expenseController.getExpense)
router.delete('/expense/delete-expense/:id', expenseController.deleteExpense)

module.exports = router