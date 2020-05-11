var jwt = require("jsonwebtoken")
var isuser  = require('../middlewares/is-user');
var isadmin = require('../middlewares/is-admin')
var userController=require('../controller/userController')
var designController=require('../controller/designController')
var submitController=require('../controller/formController')
var articleController=require('../controller/articleController')
var noticeController=require('../controller/noticeController')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login',userController.login );
router.post('/adminlogin',userController.adminlogin );

router.get('/addadmin',userController.addadmin);

router.post('/submitform',submitController.addNewSubmit );
router.post('/register',userController.insert );

//网页管理逻辑
router.post('/saveDesign',designController.addNewDesign);
router.get('/deleteDesign',designController.deleteDesign);
router.get('/getDesigns',isuser,designController.getDesigns);
router.get('/getView',designController.getDesignByAuthorAndId);
//表单逻辑
router.get('/getForms',submitController.getFormsByAuthorId);
router.get('/getSubmits',submitController.getSubmitByformId);

//文章逻辑
router.post('/savearticle',articleController.addNewArticle );
router.get('/getarticles',articleController.getArticlesByAuthorId);
router.get('/delarticle',articleController.deleteArticle);

//admin

router.post('/sendNotice',noticeController.addNewNotice)
router.get('/getAllNotice',noticeController.getAllNotice)
router.get('/getreadNotice',noticeController.getreadNotice)
router.get('/setHaveRead',noticeController.setNoticeState)


router.get('/getAllDesign',designController.getDesigns)


router.get('/designstate',designController.setDesignState)


router.post('/setuserstate',userController.setuserstate)
router.get('/getAlluser',userController.getList)
router.get('/deleteuser',userController.delete)
module.exports = router;
