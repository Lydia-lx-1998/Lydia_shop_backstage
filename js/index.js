$(function(){

//调用获取用户信息函数
getUserInfo()


var layer = layui.layer
//绑定退出按钮点击事件
$("#btnLogout").on('click',function(){
    //提示用户是否确定退出
    layer.confirm('确定要退出登录吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        //1.清空本地存储中的token
        localStorage.removeItem('token')

        //2.重新跳转到登录页面
        location.href = '/login.html'

        //3.关闭confirm询问框
        layer.close(index);
      });
})
    
})


//获取用户信息
    function getUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            //headers请求头配置对象
            // headers:{
            //     Authorization: localStorage.getItem('token')||''
            // },
            success:function(res){
                if(res.status != 0){
                   return layui.layer.msg('获取用户信息失败！') 
                }
                //调用renderAvatar渲染用户头像
                renderAvatar(res.data)
            }
        })
    }

//渲染用户头像
    function renderAvatar(user){
        var name = user.nickname || user.username
        $("#welcome").html('欢迎&nbsp;&nbsp' + name)
        if(user.user_pic !== null){
            $(".userinfo img").attr('src',user.user_pic).show()
            $(".text-avatar").hide()
        }else{
            $(".userinfo img").hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }