
window.addEventListener('load',function(){
        var over = document.querySelector('.over');
        var demo = document.querySelector('.reg_form');
        var alarm = document.querySelector('.alarm');
        var time1 = 5;
        var eye1 = document.getElementById('eye1');
        var pwd1 = document.getElementById('pwd1');
        var eye2 = document.getElementById('eye2');
        var pwd2 = document.getElementById('pwd2');
        var check = document.getElementById('check');
        var btn = document.querySelector('.fasong');
        var time = 10;

        var username = document.querySelector("#nam");
        var telphone = document.querySelector("#tel");
        
        username.addEventListener('blur',function(){
            var reg = /^[\u4e00-\u9fa5]{2,8}$/;
            if(reg.test(this.value)){
                var usernameval = this.value;
                var xhr = new XMLHttpRequest();
                xhr.open("get","./php/checkUsername.php?uname="+usernameval,true);
                xhr.send(null);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        if(xhr.status==200){
                            var result = xhr.responseText;
                            var username_result=document.querySelector("#nameresult");
                            if(result=='ok'){
                                username_result.innerHTML = "<i class="+'success_icon'+"></i>用户名可以使用";
                            }else {
                                username_result.innerHTML = "<i class="+'error_icon'+"></i>用户名已被注册";
                            }
                        }
                    }
                }
            }
            else {
                var username_result=document.querySelector("#nameresult");
                username_result.innerHTML = "<i class="+'error_icon'+"></i>用户名只能为中文";
            }
        })
        
        telphone.addEventListener('blur',function(){
            var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if(reg.test(this.value)){
                var telphoneval = this.value;
                var xhr = new XMLHttpRequest();
                xhr.open("post","./php/checkPhone.php",true);
                var params = "phonenumber="+telphoneval;
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.send(params);
                xhr.onreadystatechange=function(){
                  if(xhr.readyState==4){
                      if(xhr.status==200){
                          var result= xhr.responseText;
                          result = JSON.parse(result);
                          var phone_result = document.querySelector("#phone_result");
                          if(result.status == 0){
                              phone_result.innerHTML = "<i class="+'success_icon'+"></i>"+result.message.phonefrom;
                          }else if (result.status == 1){
                              phone_result.innerHTML = "<i class="+'error_icon'+"></i>"+result.message;
                          }
                      }
                  }
                };
            }
            else {
                var phone_result = document.querySelector("#phone_result");
                phone_result.innerHTML = "<i class="+'error_icon'+"></i>请输入合法的手机号";
            }
        })

        over.addEventListener('click',function(){
        over.disabled = true;
            var timer = setInterval(function(){
                demo.style.display = 'none';
                if(time1 == 0){
                    clearInterval(time1);
                    location.href='index.html';
                }
                else{
                alarm.innerHTML = '还剩下'+time1+'秒';
                time1--;	
                }
            
            }, 1000);
        })

        // 1. 获取元素

        // 2. 注册事件 处理程序
        var flag = 0;
        eye1.onclick = function() {
            // 点击一次之后， flag 一定要变化
            if (flag == 0) {
                pwd1.type = 'text';
                eye1.src = 'img/open.png';
                flag = 1; // 赋值操作
            } else {
                pwd1.type = 'password';
                eye1.src = 'img/close.png';
                flag = 0;
            }
        }
        pwd1.onblur = function() {
            if (this.value.length < 6 || this.value.length > 16) {
        // console.log('错误');
                checks.className= 'error';
                checks.innerHTML = '<i class="error_icon" id="checkicon"></i>您输入的位数不对要求6~16位';
            } else {
                checks.className= 'success';
                checks.innerHTML = '<i class="success_icon" id="checkicon"></i>您输入的密码符合要求';
        }
        }
        // 1. 获取元素

        // 2. 注册事件 处理程序
        var flag2 = 0;
        eye2.onclick = function() {
            // 点击一次之后， flag 一定要变化
            if (flag2 == 0) {
                pwd2.type = 'text';
                eye2.src = 'img/open.png';
                flag2 = 1; // 赋值操作
            } else {
                pwd2.type = 'password';
                eye2.src = 'img/close.png';
                flag2 = 0;
            }
        }
        pwd2.onblur = function() {
            if (pwd2.value != pwd1.value){
                check.className= 'error';
                check.innerHTML = '<i class="error_icon" id="checkicon"></i>很抱歉两次密码输入不一致';
            }
            else if(pwd2.value === pwd1.value) 
            {
                check.className= 'success';
                check.innerHTML = '<i class="success_icon" id="checkicon"></i>您输入的密码一制';
            }
        }

        btn.addEventListener('click',function(){
            btn.disabled = true;
            var timer = setInterval(function(){
                if(time == 0){
                    clearInterval(timer);
                    btn.disabled=false;
                    time = 10;
                    btn.innerHTML = '发送';
                }
                else{
                btn.innerHTML = '还剩下'+time+'秒';
                time--;	
                }
            
            }, 1000);
        })
})