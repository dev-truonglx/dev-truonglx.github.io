(function () {
  var REPO = "dev-truonglx/snapdoc";
  var FALLBACK = "https://github.com/" + REPO + "/releases/latest";

  function pickAsset(assets, test) {
    for (var i = 0; i < assets.length; i++) {
      if (test(assets[i].name)) return assets[i].browser_download_url;
    }
    return null;
  }

  fetch("https://api.github.com/repos/" + REPO + "/releases/latest")
    .then(function (res) {
      if (!res.ok) throw new Error("release fetch failed");
      return res.json();
    })
    .then(function (release) {
      var assets = release.assets || [];
      var macUrl = pickAsset(assets, function (n) { return /\.dmg$/i.test(n); });
      var winUrl = pickAsset(assets, function (n) { return /\.exe$/i.test(n); });

      document.querySelectorAll('[data-platform="mac"]').forEach(function (el) {
        el.href = macUrl || FALLBACK;
      });
      document.querySelectorAll('[data-platform="win"]').forEach(function (el) {
        el.href = winUrl || FALLBACK;
      });
    })
    .catch(function () {
      document.querySelectorAll('[data-platform="mac"], [data-platform="win"]').forEach(function (el) {
        el.href = FALLBACK;
      });
    });
})();

function switchGuideTab(tabId, btn) {
  var contents = document.querySelectorAll('.guide-content');
  contents.forEach(function(c) { c.classList.remove('active'); });

  var btns = document.querySelectorAll('.guide-tab-btn');
  btns.forEach(function(b) { b.classList.remove('active'); });

  var target = document.getElementById(tabId);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
}

function showEditorTool(icon, name, key, desc, el) {
  var cards = document.querySelectorAll('.tool-item-card');
  cards.forEach(function(c) { c.classList.remove('active'); });

  if (el) el.classList.add('active');

  var panel = document.getElementById('tool-preview-panel');
  if (panel) {
    panel.innerHTML = '<h4><span>' + icon + '</span> ' + name + ' <kbd style="margin-left:8px; font-size:11px">Phím: ' + key + '</kbd></h4>' +
      '<p>' + desc + '</p>';
  }
}
