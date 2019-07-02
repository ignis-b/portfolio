//create HTML 5 elements in IE8
document.createElement('header');
document.createElement('footer');
document.createElement('nav');
document.createElement('section');
document.createElement('article');

var loaded_pics=0;
//scroll func
$(function() {
  $('a[href*=#]').click(function() {
    var target = $(this.hash);
    if (target.length) {
      $('nav a').removeClass('active');
      $(this).addClass('active');
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  });

  i_greyscale_pics();
});

//add greyscale pics func
function i_greyscale_pics() {
  if( ($( window ).width())>=960 && loaded_pics===0) {
    loaded_pics=1;
    $('.img-color').each(function() {
      var color_img=$(this).attr('src').replace('.jpg', '');
      var color_img_alt=$(this).attr('alt');
      $(this).before('<img src="'+color_img+'_gs.jpg" alt="'+color_img_alt+'" class="img-gs">');
    });
  }
}

//scroll func use EventListener
function i_scroll() {
  var pageY;
  if(window.scrollY) { 
    pageY=window.scrollY;
  } else { //window.pageYOffset - for IE and window.scrollY - for the other browsers, show ? pixels scroll
    pageY=window.pageYOffset;
  }
  if ((window.innerHeight + pageY) >= document.body.offsetHeight) {//alert(7776666);
    $('nav a').removeClass('active');
    $('[href=#contacts]').addClass('active');
  }
  if(pageY<=400) {
    $('nav a').removeClass('active');
    $('[href=#projects]').addClass('active');
  }
}
var scro;
function i_scroll_timeout() {
  clearTimeout(scro);
  scro = setTimeout(i_scroll, 100);
}

var resize;
function i_resize_timeout() {
  clearTimeout(resize);
  resize = setTimeout(i_greyscale_pics, 100);
}

if(window.addEventListener) {
  window.addEventListener('scroll', i_scroll_timeout);
  window.addEventListener('resize', i_resize_timeout);
  window.removeEventListener('resize', i_resize_timeout);
}

function check_mail() {

  var x=document.getElementById('email').value;
  if (x===null || x==='') {
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = 'Моля, попълнете e-mail.';
    return false;
  }

  var atpos=x.indexOf('@');
  var dotpos=x.lastIndexOf('.');

  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = 'Моля, попълнете валиден e-mail.';
    return false;
  }

  x=document.getElementById('message').value;
  if (x===null || x==='') {
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = 'Моля, попълнете съобщение.';
    return false;
  }
//}
//function loadXMLDoc() {
  var xmlHttp=GetXmlHttpObject();
  if (xmlHttp===null) {
    alert ('Browser does not support HTTP Request');
  }

  xmlHttp.onreadystatechange=function() {
    if (xmlHttp.readyState==4 && xmlHttp.status==200) { 
      document.getElementById('error').innerHTML=xmlHttp.responseText; 
    }
  };

  var email=encodeURIComponent(document.getElementById('email').value);
  var message=encodeURIComponent(document.getElementById('message').value);
  var subject=encodeURIComponent(document.getElementById('subject').value);
  var parameters='email='+email+'&message='+message+'&subject='+subject;

  xmlHttp.open('POST','send.php',true);
  xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlHttp.send(parameters);

  if (document.getElementById('error').innerHTML != '') {
    document.getElementById('error').style.display = 'block';
    document.getElementById('email').value="";
    document.getElementById('message').value="";
  }
}

function GetXmlHttpObject() {
  var xmlHttp=null;
  try {// Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
  }
  catch (e) {// Internet Explorer
    try {
      xmlHttp=new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (err) {
      xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
    }
  }
  return xmlHttp;
}