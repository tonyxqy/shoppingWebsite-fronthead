window.addEventListener('load',function(){
    console.log('123');
    var preview_img = this.document.querySelector('.preview_img');
    var mask = this.document.querySelector('.mask');
    var big = this.document.querySelector('.big');
    preview_img.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove',function(e){
        var x = e.pageX -this.offsetLeft;
        var y = e.pageY -this.offsetTop;
        var maskX = x - mask.offsetWidth/2;
        var maskY = y- mask.offsetWidth/2;
        var maskMask = preview_img.offsetWidth-mask.offsetWidth;
        if (maskX<=0){
            maskX=0;
        } else if(maskX>=maskMask){
            maskX=maskMask;
        }
        if (maskY<=0){
            maskY=0;
        }else if(maskY>=maskMask){
            maskY = maskMask;
        }
        mask.style.left = maskX +'px';
        mask.style.top = maskY +'px';
        var bigIMG = document.querySelector('.bigImg');
        var bigMax = bigIMG.offsetWidth-big.offsetWidth;
        var bigX = maskX *bigMax /maskMask;
        var bigY = maskY *bigMax /maskMask;
        bigIMG.style.left = -bigX +'px';
        bigIMG.style.top = -bigY +'px';
        
    })

}) 
$(function(){
    $('.detail_tab_list li').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        console.log(index);
        $('.detail_tab_con .item').eq(index).show().siblings().hide();
    });
});