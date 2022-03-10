
// 轮播图
window.addEventListener('load',function(){
    //0、节流阀
    var flag = true;
    // 1.元素获取
    var arraw_l = document.querySelector('.arrow-l');
    var arraw_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2.鼠标经过focus就显示隐藏的左右按钮
    focus.addEventListener('mouseenter',function(){
        arraw_l.style.display = 'block';
        arraw_r.style.display = 'block';
        clearInterval(timer);
        // 清除定时器变量
        timer = null;
    })
    focus.addEventListener('mouseleave',function(){
        arraw_l.style.display = 'none';
        arraw_r.style.display = 'none';
    })
    // 3.动态生成圆点
    var ol = focus.querySelector('.circle');
    var ul = focus.querySelector('ul');
    for (var i = 0; i < ul.children.length;i++){
        var li = document.createElement('li');
        // 设置自定义属性记录圆圈索引号
        li.setAttribute('index',i);
        // 动态添加
        ol.appendChild(li);
        // 圆圈点击事件
        li.addEventListener('click',function(){
            // 排他思想
            for (var i = 0; i<ol.children.length;i++){
                ol.children[i].className='';
            }
            this.className = 'current';
            //将索引号同变量num和circle绑定
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul,-index*focusWidth);
        })
    }
    
    ol.children[0].className = 'current';
    //克隆第一张图片，实现无缝连接
    var first  = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    arraw_r.addEventListener('click',function(){
       if (flag){
           flag = false;
            if (num === ul.children.length-1)
            {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            circle++;
            if (circle == 4){
                circle = 0;
            }
            animate(ul,-num*focusWidth,function(){
                flag = true;
            });
            circleChange();
       }
    })
    arraw_l.addEventListener('click',function(){
        if (flag){
            flag=false;
            if (num === 0)
            {
                num = ul.children.length-1;
                ul.style.left = -(num)*focusWidth+'px';
            }
            num--;
            circle--;
            if (circle < 0){
                circle = ol.children.length-1;
            }
            animate(ul,-num*focusWidth,function(){
                flag = true;
             } );
            circleChange();
        }
    })
    function circleChange() {
        for (var i = 0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        ol.children[circle].className='current';
    }
    var timer = setInterval(() => {
        arraw_r.click();
    }, 2000);
})
	
// 今日秒杀

document.addEventListener('scroll',function(){
    var hour = document.querySelector('.hour'); // 小时的黑色盒子
    var minute = document.querySelector('.minute'); // 分钟的黑色盒子
    var second = document.querySelector('.second'); // 秒数的黑色盒子
    var inputTime = +new Date('2021-8-2 18:00:00'); // 返回的是用户输入时间总的毫秒数
    countDown(); // 我们先调用一次这个函数，防止第一次刷新页面有空白 
    // 2. 开启定时器
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
        var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
        var h = parseInt(times / 60 / 60 % 24); //时
        // console.log(h);
        h = h < 10 ? '0' + h : h;
        // console.log(h);
        hour.innerHTML = h; // 把剩余的小时给 小时黑色盒子
        var m = parseInt(times / 60 % 60); // 分
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;
        var s = parseInt(times % 60); // 当前的秒
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s;
    }
})

// 固定电梯
document.addEventListener('scroll',function(){
    var lift = document.querySelectorAll('.fixedtool li');
    for (var i=0 ;i<lift.length;i++){
        lift[i].onclick=function(){
        for (var j=0;j<lift.length;j++){
            lift[j].className='unchosen';
         }
            this.className='current';
        }
    }  
})


// 顶部遮挡
window.addEventListener('load',function(){
    var downhead = document.querySelector('.downhead');
    var miaosha =  document.querySelector('.nav');
    var miaoshaTop = miaosha.offsetTop;
    // console.log(miaoshaTop);
    var bottomlift = document.querySelector('.bottomlift');
    var fixedtool = document.querySelector('.fixedtool');
    var fixedtoolTop = fixedtool.offsetTop;
    document.addEventListener('scroll',function(){
            if (window.pageYOffset >= miaoshaTop) {
            downhead.style.display = 'block';
            downhead.style.position = 'fixed';
            bottomlift.style.display='block';
        }
    });
    document.addEventListener('scroll',function(){
        if (window.pageYOffset <= miaoshaTop) {
            downhead.style.display = 'none';
            downhead.style.position = 'fixed';
            bottomlift.style.display='none';
            // fixedtool.style.position = 'absolute';
        }
    });
    document.addEventListener('scroll',function(){
        console.log(window.pageYOffset);
        if (window.pageYOffset >= 380) {
            fixedtool.style.position = 'fixed';
            fixedtool.style.top = '55px';
        }
        else {
            fixedtool.style.position = 'absolute';
            fixedtool.style.top = '432px';
        }
        function animateup (obj,target,callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(() => {
                var step = (target - window.pageYOffset) / 10;
                step = step > 0 ? Math.ceil(step):Math.floor(step);
                if(obj.window.pageYOffset == target) {
                    clearInterval(obj.timer)
                }
                callback && callback();
                window.scroll(0,window.pageYOffset+step);
            }, 15);
        }
    bottomlift.addEventListener('click',function(){
        animateup(window,0);
    })
    });
})