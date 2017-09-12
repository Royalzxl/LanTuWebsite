/** Jquery 3.2.0及3.2.1版本在Edge 里面 会出现闪烁*/
/** banner*/
(function () {
    var $part = $("#banner .b-part .part"),
        $tab = $("#banner .b-tab ul li"),
        $banner = $("#banner"),
        length = $tab.length,
        index = 0,
        timer = null;
    $tab.eq(0).addClass("on");
    $part.eq(0).show();
    $tab.click(function () {
        if(index !== $(this).index()){
            change(function () {
                index = $(this).index();
            }.bind(this));
        }
    });
    auto();
    $banner.hover(function () {
        clearInterval(timer);
    },auto);
    function auto() {
        timer = setInterval(function () {
            change(function() {
                index ++;
                index %= length;
            });
        },3000)
    }
    function change(fn) {
        $tab.eq(index).removeClass("on");
        $part.eq(index).fadeOut(500);
        fn && fn ();
        $tab.eq(index).addClass("on");
        $part.eq(index).fadeIn(500);
    }
})();
/** video play */
(function(){
    $(".play-icon").on("click",function () {
        $(".video").find("video").css({"display":"block"});
        $(this).css({"display":"none"});
        $(".video").find("video").trigger("play");
    });
    /*var oPlay = document.getElementsByClassName('play-icon')[0],
        oVideo = document.getElementsByTagName('video')[0];
    oPlay.onclick = function(){
        this.style.display = 'none';
        oVideo.style.display = 'block';
        oVideo.play();
    };*/
})();
/** classic */
(function () {
    var $ul = $("#classic .c-main ul"),
        $tab = $("#classic .c-tab ul li"),
        $btn = $("#classic .c-btn div"),
        $li = $ul.children(),
        W = $li.eq(0).width(),
        Len = $li.length,
        mIndex = Math.floor(Len/2),
        checkTime = 0,
        sumW = 0,
        Timer = null;
    cCN();
    //初始化ul marginLeft值
    setTimeout(function () {
        sumW = 0;
        $li.each(function () {
            sumW += $(this).width();
        });
        $ul.css("marginLeft",-sumW/2 + "px").css("opacity",1);
    },300);
    //改变窗口大小，重新获取li的width
    $(window).resize(function () {
        clearTimeout(Timer);
        Timer = setTimeout(function () {
            W = $li.eq(0).width();
            sumW = 0;
            $li.each(function () {
                sumW += $(this).width();
            });
            $ul.animate({"marginLeft" : -sumW/2+"px"},300);
        },300)
    });
    //btn点击事件
    $btn.click(function () {
        if(new Date() - checkTime >500){
            if($(this).index()){
                mIndex++;
                mIndex %= Len;
                $ul.stop().animate({
                    "marginLeft" : -sumW/2 - W + "px" 
                },300,function () {
                    $(this).css("marginLeft",-sumW/2+"px").append($(this).children().first());
                })
            }else {
                mIndex--;
                if(mIndex<0)mIndex = Len - 1;
                $ul.stop().animate({
                    "marginLeft" : -sumW/2 + W + "px"
                },300,function () {
                    $(this).css("marginLeft",-sumW/2+"px").prepend($(this).children().last());
                })
            }
            $tab.eq(mIndex).addClass("on").siblings().removeClass("on");
            cCN();
            checkTime = new Date();
        }
    });
    //改变className
    function cCN() {
        var a = mIndex,
            b = mIndex + 1,
            c = mIndex - 1;
        if(b>Len - 1)b = 0;
        if(c<0)c = Len - 1;
        $tab.eq(a).addClass("on");
        $li.removeClass("slide mid");
        $li.eq(a).addClass("mid");
        $li.eq(b).addClass('slide');
        $li.eq(c).addClass('slide');
    }
})();