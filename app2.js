/**
 * Created by Postbird on 2017/2/22.
 */
var express=require('express');
var fs=require('fs');
var bodyParser=require('body-parser');
var multer=require('multer');

//创建app
var app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('../item'));
//设置文件上传存储路径
var uploadDir=__dirname+'/public/upload/';
//设置multer upload
var upload=multer({dest:uploadDir}).array('images');

// 请求 / 返回 uploadMoreFile.html
app.get('/',function(req,res){
    res.sendFile(__dirname+'/'+'uploadMoreFile.html');
});

//post请求 提交表单
app.post('/file_upload',function(req,res,next){
    //多个文件上传
    upload(req,res,function(err){
        if(err){
            console.error('[System] '+err.message);
        }else{
            //循环处理
            var fileCount=req.files.length;
             req.files.forEach(function(i){
                 //设置存储的文件路径
                 var uploadFilePath=uploadDir+i.originalname;
                 //获取临时文件的存储路径
                 var uploadTmpPath=i.path;
                 //读取临时文件
                 fs.readFile(uploadTmpPath,function(err,data){
                     if(err){
                         console.error('[System] '+err.message);
                     }else{
                         //读取成功将内容写入到上传的路径中，文件名为上面构造的文件名
                         fs.writeFile(uploadFilePath,data,function(err){
                             if(err){
                                 console.error('[System] '+err.message);
                             }else{
                                 //写入成功,删除临时文件
                                 fs.unlink(uploadTmpPath,function(err){
                                     if(err){
                                         console.error('[System] '+err.message);
                                     }else{
                                         console.log('[System] '+'Delete '+uploadTmpPath+' successfully!');
                                     }
                                 });
                             }
                         });
                     }
                 });
            });

            //所有文件上传成功
            //回复信息
            var reponse={
                message:'File uploaded successfully',
            };
            //返回
            res.end(JSON.stringify(reponse));
        }
    });
});

//监听端口
var server=app.listen(80,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('[System] Listen at http://%s:%s',host,port);
});
