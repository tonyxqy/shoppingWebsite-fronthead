// shortcut动画
$(function(){
    $('.close-btn').click(function(){
        $('.erweima img').hide(1000);
        $(this).hide(1000);
        setTimeout(() => {
            $('.erweima h4').hide(1000);
        }, 1000);
    });
    $('.candown').hover(function(){
        $(this).children('.cov').toggleClass('covon').removeClass('cov');
        $(this).children('.down').stop().slideDown(300);
    },function(){
        $(this).children('.covon').toggleClass('cov').removeClass('covon');
        $(this).children('.down').stop().slideUp(300);
    });
})
// 密码登录
window.addEventListener('load',function(){
    var login = document.querySelector('.login');
    var mask = document.querySelector('.login-bg');
    var link = document.querySelector('#link');
    var lobtn = document.querySelector('#loginBtn');
    var username = document.querySelector('#username')
    var logout = document.querySelector('.logout');
    var remindbox = document.querySelector('#remind');
    var remind = document.querySelector('.remind');
    var password = document.querySelector('#password');
    // console.log(link);
    var closeBtn = document.querySelector('#closeBtn');
    var  title = document.querySelector('#title');
    // username.addEventListener('blur',function(){
    //     var usernameval = this.value;
    //     // 创建ajax XMLHttpRequest对象
    //     var xhr = new XMLHttpRequest();
    //     // 准备发送     请求类型

    //     xhr.open("get","check.php?username="+usernameval,true);
    //     // post方法
    //     // xhr.open("post","check.php",true);
    //     // var param = "username=" + username;
    //     // 设置请求头
    //     // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //     // xhr.send(param);

    //     // 执行发送
    //     xhr.send(null);
    //     xhr.onreadystatechange=function(){
    //         if(xhr.readyState == 4){
    //             if(xhr.status ==200){
    //                 var result = xhr.responseText;
    //                 var resultdiv = document.createElement('div');
    //                 resultdiv.innerText=result;
    //                 remind.appendChild(resultdiv);
    //             }
    //         }
           
    //     }
    // })
    loginOrOut();
    function loginOrOut(){
        if(localStorage.getItem('username')!=null){
            console.log('222');
            link.innerHTML='欢迎'+localStorage.getItem('username');
            link.nextElementSibling.style.display='none';    
            logout.style.display='inline-block';
        }
        else if(sessionStorage.getItem('uname')!=null){
            link.innerHTML='欢迎'+sessionStorage.getItem('uname');
            link.nextElementSibling.style.display='none';    
            logout.style.display='inline-block';
        }
    }

    logout.addEventListener('click',function(){
        sessionStorage.removeItem('uname');
        link.nextElementSibling.style.display='inline-block';
        logout.style.display='none';
        link.innerHTML='请登录';
    });

    title.addEventListener('mousedown',function(e){
        var x = e.pageX -login.offsetLeft;
        var y = e.pageY -login.offsetTop;
        document.addEventListener('mousemove',move)
        function move(e){
            login.style.left = e.pageX - x +'px';
            login.style.top = e.pageY - y +'px';
        }
        document.addEventListener('mouseup',function(){
            document.removeEventListener('mousemove',move);
        })
    })

    link.addEventListener('click',cover)
    function cover() {
        mask.style.display='block';
        login.style.display='block';
        if(localStorage.getItem('username')!=null){
            username.value=localStorage.getItem('username');
        }
        if(localStorage.getItem('password')!=null){
            password.value=localStorage.getItem('password');
        }
    }
    function uncover() {
        mask.style.display='none';
        login.style.display='none';
    }
    closeBtn.addEventListener('click',uncover)

    lobtn.addEventListener('click',function(){
        sessionStorage.setItem('uname',username.value);
        link.innerHTML='欢迎'+sessionStorage.getItem('uname');
        mask.style.display='none';
        login.style.display='none';
        if(remindbox.checked){
            localStorage.setItem('username',username.value);
            localStorage.setItem('password',password.value);
            // console.log('检测到checkbox');
            // console.log(username.value);
            // console.log(localStorage.getItem('username'));
        }
        else{
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
        loginOrOut();
    })
});

