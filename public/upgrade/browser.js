/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable */
(function () {
  // 获取浏览器版本
  function getIEVersion() {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;


    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion === 7) {
        return 7;
      } else if (fIEVersion === 8) {
        return 8;
      } else if (fIEVersion === 9) {
        return 9;
      } else if (fIEVersion === 10) {
        return 10;
      } else {
        return 6; // IE版本<=7
      }
    } else if (isEdge) {
      return 'edge'; // edge
    } else if (isIE11) {
      return 11; // IE11
    } else {
      return -1; // 不是ie浏览器
    }
  }

  // 判断当前页面是否是升级提示页面
  function isGradePage() {
    return window.location.pathname.indexOf('/upgrade/upgrade.html') !== -1;
  }

  // 禁止Backsoace回退
  function forbidBackSpace(e) {
    var ev = e || window.event;
    var obj = ev.target || ev.srcElement;
    var t = obj.type || obj.getAttribute('type');
    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;
    vReadOnly = vReadOnly === undefined ? false : vReadOnly;
    vDisabled = vDisabled === undefined ? true : vDisabled;
    var flag1 =
      ev.keyCode === 8 &&
      (t === 'password' || t === 'text' || t === 'textarea'|| t === 'search') &&
      (vReadOnly === true || vDisabled === true);
    var flag2 = ev.keyCode === 8 && t !== 'password' && t !== 'text' && t !== 'textarea';
    if (flag2 || flag1) return false;
  }

  var version = getIEVersion();
  var isTipPage = isGradePage();
  var isXP = navigator.userAgent.indexOf('Windows NT 5') > -1; //判断是否xp系统

  //xp系统隐藏edge浏览器链接
  if (isXP && isTipPage) {
    document.getElementById('xplink').setAttribute('style', 'display:none')
  }

  // 不支持IE低版本浏览器
  if (version === -1 || version === 'edge') { // || version === 11
    if (isTipPage) {
      window.location.href = '/';
    }
  } else {
    document.onkeypress = forbidBackSpace;
    document.onkeydown = forbidBackSpace;

    if (!isTipPage) {
      window.location.href = window.publicPath + 'upgrade/upgrade.html';
    }
  }
})(window);
