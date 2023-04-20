$(function(){
    //layer相关
    var form = layui.form
    var layer =layui.layer

    // 点击切换登录/注册
    $('#reg_link').on('click',function(){
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#login_link').on('click',function(){
        $('.login_box').show()
        $('.reg_box').hide()
    })


    //自定义密码校验规则
    
    form.verify({
        pass: [/(.+){6,12}$/, '密码必须6到12位'],
        repass: function (value) {
            var pwd = $('.reg_box [name=userpwd]').val()
            if (pwd !== value){
                return '两次密码不一致!'
            }
        }
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name="userpwd"]').val()}
        $.post('/api/reguser', data,
            function (res) {
                if(res.status != 0){
                    return layer.msg(res.message)
                }

                layer.msg('注册成功！请登录')
                $('#login_link').click()
            }
        )

    })

    //监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        var data = {username:$('#form_login [name=username]').val(),
        password:$('#form_login [name="userpwd"]').val()}
        $.post('/api/login', data, 
        function(res){
            if(res.status != 0){
                return layer.msg(res.message)
            }
            layer.msg('登录成功！')
            // console.log(res)
            //将登陆成功得到的token保存到localStorage中
            localStorage.setItem('token',res.token)
            //跳转到index主页
            location.href='/index.html'
            // console.log(res)

        } )
    })
})
    


