var _ranChar = function () {
  return 'qwertyuioplkjhgfdsazxcvbnm'[parseInt(Math.random() * 26)];
};

var _dump = function (fn, times) {
  if (times == 0) {
    return [];
  }
  return _dump(fn, times - 1).concat(fn());
};

var _ranStr = function (len) {
  return _dump(_ranChar, len).join('');
};

var _pair = function (arr) {
  return arr.map(function (str) {
    return { str: str, org: _ranStr(str.length) };
  });
}

var words = decodeURI(window.location.search.substring(1)).split('|');

recur_scraper("#span", _pair(words), {
  typeSpeed: 40,
  deleteSpeed: 10,
  loop: true
});