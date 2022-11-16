$(window).on('load', function(){
  mainScript.swiperFnc();
  mainScript.clickFnc();
  mainScript.keydownFnc();
  mainScript.scrollFnc();
})

const mainScript = {
  swiperFnc: function(){
    // 주요뉴스슬라이드
    var newsSlide = new Swiper(".news-slide", {
      observer: true,
      observeParents: true,
      pagination: {
        el: ".fraction",
        type: "fraction",
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
    });
    // 시민참여슬라이드
    var citizenSlide = new Swiper(".citizen-slide", {
      observer: true,
      observeParents: true,
      pagination: {
        el: ".fraction",
        type: "fraction",
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      on: {
        init: function(){
          this.autoplay.stop();
        }
      }
    });
    // 배너슬라이드
    var bannerSlide = new Swiper(".banner-slide", {
      slidesPerView: 3,
      spaceBetween: 43,
      pagination: {
        el: ".fraction",
        type: "fraction",
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
    // 탭메뉴
    $(".btn-tab").click(function (e) {
      e.preventDefault();

      if (!$(this).hasClass('active')) {
        $(".btn-tab").removeClass('active').parent().siblings().css({ 'display': 'none' });
        $(this).addClass('active').parent().siblings().css({ 'display': 'block' });

        // 탭버튼을 누르면 슬라이드 처음부터 시작
        newsSlide.slideTo(0);
        citizenSlide.slideTo(0);

        if($(this).hasClass('news')){ 
          newsSlide.autoplay.start(); 
          $('.autoplay').removeClass('on');
        } else {
          citizenSlide.autoplay.start();
          $('.autoplay').removeClass('on');
        }
      } 
    })
    // 자동재생버튼
    $('.autoplay').click(function(){
      const target = $(this).data('target');

      if(target == 'newsSlide') {
        if($(this).hasClass('on')) {
          newsSlide.autoplay.start();
        } else {
          newsSlide.autoplay.stop();
        }
      } else if(target == 'citizenSlide') {
        if($(this).hasClass('on')) {
          citizenSlide.autoplay.start();
        } else {
          citizenSlide.autoplay.stop();
        }
      } else {
        if($(this).hasClass('on')) {
          bannerSlide.autoplay.start();
        } else {
          bannerSlide.autoplay.stop();
        }
      }

      if($(this).hasClass('on')) {
        $(this).removeClass('on').attr('aria-label','자동재생 정지');
      } else {
        $(this).addClass('on').attr('aria-label','자동재생 재생');
      }
    })
  },
  clickFnc: function(){
    // option value값으로 주소 이동
    $('.link-go').click(function(){
      const url = $('.language-select').val();

      window.open(url);
    })

    // sc-related 리스트클릭시 서브메뉴 보이게
    $('.btn-spread').click(function (e) {
      e.preventDefault();

      if ($(this).hasClass('active')) {
        $('.btn-spread').removeClass('active');
        $(this).siblings('.sub-menu').slideUp(200);
      } else {
        $('.btn-spread').removeClass('active').siblings('.sub-menu').slideUp(200);
        $(this).addClass('active').siblings('.sub-menu').slideDown(200);
      }  
    })
  },
  keydownFnc: function(){
    // sc-related 탭누르면 서브메뉴 닫히게 처리
    $('.sub-menu li:first-child a').keydown(function(e){
      const key = e.keyCode;
      console.log(e.shiftKey)
      if(key === 9 && e.shiftKey) {
        $('.btn-spread').removeClass('active').siblings('.sub-menu').slideUp(200);
      }
    })
    $('.sub-menu li:last-child a').keydown(function(e){
      const key = e.keyCode;
      console.log(e.shiftKey)
      if(key === 9 && !e.shiftKey) {
        $('.btn-spread').removeClass('active').siblings('.sub-menu').slideUp(200);
      }3
    })
  },
  scrollFnc: function(){
    // 상단으로
    $(window).scroll(function () {
      if ($(this).scrollTop() < 100) {
        $('.btn-top').removeClass('show');
      } else {
        $('.btn-top').addClass('show');
      }
    })

    $('.btn-top').click(function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 300);
    })
  }
}