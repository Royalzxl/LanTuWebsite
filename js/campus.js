//part1 高度随着窗口高度改变而改变高度
(function () {
    var $content = $('#content');
    var $part1 = $('#part1');
    $(window).resize(part1H);
    part1H();
    function part1H(){
        var winH = $(window).height();
        $part1.height(winH - parseFloat($content.css('marginTop')));//edge 浏览器不支持混合写法(margin)
    }
})();
//part3
(function () {
    var $secondLi = $("#part3 .wrap .second ul li"),
        $thirdLi = $("#part3 .wrap .third ul li"),
        Len = $thirdLi.length,
        index = 0,
        Timer = null;
    auto();
    $thirdLi.click(function () {
        clearInterval(Timer);
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $secondLi.eq(index).show().siblings().hide();
        auto();
    });
    function auto() {
        Timer = setInterval(function () {
            index++;
            index %= Len;
            $thirdLi.eq(index).addClass("active").siblings().removeClass("active");
            $secondLi.eq(index).show().siblings().hide();
        },3000);
    }
})();
//part 点击事件
(function () {
    var $part = $("#content .part");
    $part.find(".btn").click(function () {
        var index = $(this).parents(".part").index(".part");
        /**  注意：
         *      index():0 2 4 6 8 算的是父元素所有的同级元素的序号
         *      index(".part"):0 1 2 3 4 只算类名为".part"的父元素序号
         */
        var scrollTop = $part.eq(index+1).offset().top - ($(window).height() - $part.eq(index+1).height()+71)/2;
        $("body,html").animate({
            scrollTop:scrollTop
        },800);
    });
})();