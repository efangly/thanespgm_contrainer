const express = require("express")
const router = express.Router()
const plan = require("../controllers/planController")
const dtplan = require("../controllers/detailplanController")
const user = require("../controllers/userController")
const location = require("../controllers/locationController")
const {requireLogin} = require("../controllers/authController")

//user 
router.get('/user',requireLogin,user.getuser)
router.get('/user/:userID',requireLogin,user.getuserbyid)
router.get('/userlistnoself/:userID',requireLogin,user.userlistnoself)
router.get('/userlist/:userID',requireLogin,user.userlistbyid)
router.post('/createuser',requireLogin,user.createuser)
router.put('/updateuser/:userid',requireLogin,user.updateuser)
router.delete('/removeuser/:userID',requireLogin,user.removeuser)

//report
router.get('/planlist',requireLogin,plan.planlist)
router.get('/planlist/:userID',requireLogin,plan.planlistbyid)
router.post('/createplan',requireLogin,plan.createplan)
router.delete('/removeplan/:planID',requireLogin,plan.removeplan)

//detailplan
router.get('/dtplanlist',requireLogin,dtplan.detailplanlist)
router.get('/dtplanlist/:detailID',requireLogin,dtplan.detailplanlistbyid)
router.get('/dtplanlistbyplan/:planID',requireLogin,dtplan.detailplanlistbyplanid)
router.put('/updatedtplan/:detailID',requireLogin,dtplan.updatedetailplan)
router.delete('/removedtplan/:detailID',requireLogin,dtplan.removedetailplan)

//location
router.get('/locationlist',requireLogin,location.locationlist)
router.get('/locationlist/:locationID',requireLogin,location.locationlistbyid)
router.post('/createlocation',requireLogin,location.createlocation)
router.delete('/removelocation/:locationID',requireLogin,location.removelocation)
//pdf
router.get('/exportplanpdf/:planID',requireLogin,dtplan.exportPlanPDF)


module.exports=router