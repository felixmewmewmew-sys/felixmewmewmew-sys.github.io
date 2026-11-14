#!/bin/sh
# Накладывает домашние правки на свежую Lampa: personal.lampa (без рекламы) + home.js (плагин).
set -e
cd "$(dirname "$0")/.."
cp personal/personal.lampa personal.lampa
cp personal/home.js home.js
cp personal/axel_tv.js axel_tv.js
grep -q 'src="./home.js"' index.html || sed -i.bak 's#<script src="./webos/webOSTV.js"></script>#<script src="./home.js"></script>\n    <script src="./webos/webOSTV.js"></script>#' index.html
rm -f index.html.bak
touch .nojekyll
