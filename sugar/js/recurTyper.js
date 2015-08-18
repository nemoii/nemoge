/* global malarkey */
function recur_typer(selector, arr) {
  var el = document.querySelector(selector);
  if (!el) return;
  var initialText = el.textContent;
  var pause = 800;
  var opts = {
    typeSpeed: 100,
    deleteSpeed: 50,
    loop: true,
    postfix: ''
  };

  var typist = malarkey(el, opts);

  typist.delete(initialText.length);
  arr.forEach(function (str) {
    typist.type(str).pause(pause).delete(str.length);
  });
}