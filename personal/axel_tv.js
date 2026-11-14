// Аксель → Lampa: бот кладёт {id, k, title} в канал ntfy.sh (разрешено пользователем 14.11), плагин раз в 5 с забирает и открывает карточку.
(function () {
    if (window.axel_tv_started) return;
    window.axel_tv_started = true;
    var URL = 'https://ntfy.sh/axel-tv-7f3k9q2m/json?poll=1&since=';
    var since = Lampa.Storage.get('axel_tv_since', '') || '10m';
    var busy = false;

    function open(m) {
        var id = parseInt(m.id, 10);
        if (!id) return;
        var method = m.k === 'tv' ? 'tv' : 'movie';
        Lampa.Activity.push({ url: '', component: 'full', id: id, method: method, card: { id: id, source: 'tmdb' }, source: 'tmdb' });
        if (Lampa.Noty) Lampa.Noty.show('Аксель: ' + (m.title || 'фильм'));
    }

    function tick() {
        if (busy) return;
        busy = true;
        var x = new XMLHttpRequest();
        x.open('GET', URL + encodeURIComponent(since), true);
        x.timeout = 8000;
        x.onloadend = function () { busy = false; };
        x.onload = function () {
            var last = null;
            (x.responseText || '').split('\n').forEach(function (line) {
                if (!line) return;
                try {
                    var e = JSON.parse(line);
                    if (e.event !== 'message') return;
                    since = e.id;
                    Lampa.Storage.set('axel_tv_since', since);
                    if (Date.now() / 1000 - e.time < 600) last = JSON.parse(e.message);
                } catch (err) {}
            });
            if (last) open(last);
        };
        x.send();
    }

    setInterval(tick, 5000);
    tick();
})();
