const express = require('express');

const router = express.Router();

const userController = require('../controllers/userC')
const expenseController = require('../controllers/expenseC')
const userAuthentication = require('../middleware/auth')
const purchaseController = require('../controllers/purchaseC')
const premiumLeaderboardController = require('../controllers/premiumFeatureLeaderboard')


router.post('/user/add-user', userController.addUser)
router.post('/user/login', userController.loginN)


router.post('/expense/add-expense', userAuthentication.authenticate, expenseController.addExpense)
router.get('/expense/get-expense', userAuthentication.authenticate, expenseController.getExpense)
router.delete('/expense/delete-expense/:id', userAuthentication.authenticate, expenseController.deleteExpense)

router.get('/purchase/premiummembership', userAuthentication.authenticate, purchaseController.purchasePremium)
router.post('/purchase/updatetransactionstatus', userAuthentication.authenticate, purchaseController.updateTransactionStatus)

router.get('/premium/showleaderboard', userAuthentication.authenticate, premiumLeaderboardController.fetchUserLeaderBoard)

module.exports = router