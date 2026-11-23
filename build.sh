#!/bin/sh
# Assemble pages: shared <head> + page body. Run after editing src/*.body.html
cd "$(dirname "$0")"
for f in src/*.body.html; do
  n=$(basename "$f" .body.html)
  t=$(case $n in index) echo Home;; quiz) echo Quiz;; topics) echo Topics;; topic) echo Topic;; mocks) echo Mocks;; formulas) echo Formulas;; esac)
  sed "s/__TITLE__/$t/" src/head.html > "$n.html"; cat "$f" >> "$n.html"
done
