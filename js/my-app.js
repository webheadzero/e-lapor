// Initialize your app
var myApp = new Framework7({
    material: true
});

// Export selectors engine
var $$ = Dom7;

var ptrContent = $$('.pull-to-refresh-content');

ptrContent.on('ptr:refresh', function (e) {
    var url = $$(this).parent().data('url');
    
    // Emulate 2s loading
    setTimeout(function () {
        $$.get(url, function (data) {
          $$(this).parent().find('.content').empty().html(data);
          myApp.pullToRefreshDone();
        });
    }, 2000);
});

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false,
    domCache: true 
});
/*
// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});*/



$$(document).on('DOMContentLoaded', function(){
    $$.get('pages/home.html', function (data) {
      $$('.main-tabs #tab-home .content').html(data);
    });
    if($$('#tab-home').hasClass('active')){
        $$('.add-laporan').addClass('in');
    } else {
        $$('.add-laporan').removeClass('in');
    }

    $$('.main-tabs .tab').on('tab:show', function () {
        var url = $$(this).data('url');
        var title = $$(this).data('title');


        if($$('#tab-home').hasClass('active')){
            $$('.add-laporan').addClass('in');
        } else {
            $$('.add-laporan').removeClass('in');
        }

        $$.get(url, function (data) {
          $$('.main-tabs .tab.active .content').html(data);
          $$('.navbar .logo').html(title);
        });
    });
    $$(document).on('click','.zoomImage', function () {
        var photo = $$(this).data('image');
        var myPhotoBrowserDark = myApp.photoBrowser({
            photos : [photo],
            theme: 'dark',
            toolbar: false
        });
        myPhotoBrowserDark.open();
    });

    $$(document).on('click','#form-image-placeholder',function(){
        var buttons = [
            {
                text: 'Ambil Gambar',
                onClick : function(){
                    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                    destinationType: destinationType.DATA_URL,correctOrientation: true });
                }
            },
            {
                text: 'Buka Galeri',
                onClick : function(){
                    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                    destinationType: destinationType.DATA_URL,correctOrientation: true,
                    sourceType: pictureSource.PHOTOLIBRARY });
                }
            },
        ];
        myApp.actions(buttons);
    });
    $$(document).on('click','.btn-capture-photo',function(){
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL,correctOrientation: true });
    });
    $$(document).on('click','.btn-get-gallery',function(){
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL,correctOrientation: true,
        sourceType: pictureSource.PHOTOLIBRARY });
    });
    function onPhotoDataSuccess(imageData) {
      var imgPlaceholder = document.getElementById('image-placeholder');
      var imgPlaceholderIcon = document.getElementById('image-placeholder-icon');
      
      imgPlaceholderIcon.style.display = 'none';
      imgPlaceholder.style.display = 'block';
      imgPlaceholder.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
      console.log('Failed because: ' + message);
    }

    /*$$(document).on('click','.category-item', function () {
        var url = $$(this).attr('href');
        var cat = $$(this).find('h5').text();
        
        $$('#category-label').text(cat);
        pageView.router.loadPage(url);
    });*/

    /*$$(document).on('click','.ajax-link', function () {
        var url = $$(this).attr('href');
        pageView.router.loadPage(url);
    });*/
});