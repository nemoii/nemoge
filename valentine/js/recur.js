/* global malarkey */
function recur_typer(selector, arr, opts) {
  var el = document.querySelector(selector);
  if (!el) return;
  opts = opts || {};
  var pause = opts.pause || 800;
  opts = $.extend({
    typeSpeed: 100,
    deleteSpeed: 50,
    loop: true
  }, opts);
  
  var typist = malarkey(el, opts);

  typist.delete();
  arr.forEach(function (str) {
    typist.type(str).pause(pause).delete();
  });
}

function recur_scraper(selector, arr, opts) {
  var el = document.querySelector(selector);
  if (!el) return;
  opts = opts || {};
  var pause = opts.pause || 1000;
  opts = $.extend({
    typeSpeed: 100,
    deleteSpeed: 100,
    loop: true
  }, opts);
  
  var typist = malarkey(el, opts);

  typist.delete();
  arr.forEach(function (pair) {
    typist.type(pair.org, 10).scrape(pair.str, 0).pause(pause).messy();
  });
}