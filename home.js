// Домашние настройки: плагины ставятся сами (на новом адресе своё хранилище).
(function () {
    var need = [
        { url: 'https://nb557.github.io/plugins/online_mod.js', key: 'online_mod', name: 'Онлайн', author: '@nb557' },
        { url: 'https://felixmewmewmew-sys.github.io/axel_tv.js', key: 'axel_tv', name: 'Аксель', author: 'дом' }
    ];
    try {
        var list = JSON.parse(localStorage.getItem('plugins') || '[]');
        need.forEach(function (n) {
            var has = list.some(function (p) { return (typeof p == 'string' ? p : p.url || '').indexOf(n.key) > -1; });
            if (!has) list.push({ url: n.url, status: 1, name: n.name, author: n.author });
        });
        localStorage.setItem('plugins', JSON.stringify(list));
    } catch (e) {}
})();
