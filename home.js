// Домашние настройки: плагин онлайн-источников ставится сам (на новом адресе своё хранилище).
(function () {
    var URL = 'https://nb557.github.io/plugins/online_mod.js';
    try {
        var list = JSON.parse(localStorage.getItem('plugins') || '[]');
        var has = list.some(function (p) { return (typeof p == 'string' ? p : p.url || '').indexOf('online_mod') > -1; });
        if (!has) {
            list.push({ url: URL, status: 1, name: 'Онлайн', author: '@nb557' });
            localStorage.setItem('plugins', JSON.stringify(list));
        }
    } catch (e) {}
})();
