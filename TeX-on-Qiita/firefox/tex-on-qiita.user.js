// ==UserScript==
// @name        TeX on Qiita
// @namespace   http://naoyat.hatenablog.jp/tex-on-qiita/
// @description Enables TeX-notation on Qiita
// @include     http://qiita.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function(){

function tex2md() {
  var text = $('#item-body')[0].value;
  var md = "";
  while (text.match(/(.*)\[tex:(.+?[^\\])](.*)/)) {
    md += RegExp.leftContext + RegExp.$1;
    var texsrc = RegExp.$2;
    text = RegExp.$3 + RegExp.rightContext;
    md += "![equation](http://chart.apis.google.com/chart?cht=tx&chl=" + encodeURIComponent(texsrc) + ")";
  }
  md += text;
  $('#item-body')[0].value = md;
}

function md2tex() {
  var md = $('#item-body')[0].value;
  var text = "";
  while (md.match(/(.*?)\!\[equation\]\(http:\/\/chart.apis.google.com\/chart\?cht=tx\&chl=([^)]+?)\)(.*)/)) {
    text += RegExp.leftContext + RegExp.$1;
    var texsrc = RegExp.$2;
    md = RegExp.$3 + RegExp.rightContext;
    text += "[tex:" + decodeURIComponent(texsrc) + "]";
  }
  text += md;
  $('#item-body')[0].value = text;
}

$('ul.edit-preview-tabs')
 .append(
   $('<li></li>').append(
     $('<a href="#">&raquo;md</a>').bind('click',function(){tex2md();})
   ))
 .append(
   $('<li></li>').append(
     $('<a href="#">&raquo;tex</a>').bind('click',function(){md2tex();})
   ));

})();
