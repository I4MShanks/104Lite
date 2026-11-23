#!/bin/sh
# Assemble pages: shared <head> + page body. Run after editing src/*.body.html
cd "$(dirname "$0")"
for f in src/*.body.html; do
  n=$(basename "$f" .body.html)
  t=$(case $n in index) echo Home;; lecture) echo Lecture;; lectures) echo Lectures;; test) echo Test;; practice) echo Practice;; vault) echo Vault;; esac)
  sed "s/__TITLE__/$t/" src/head.html > "$n.html"; cat "$f" >> "$n.html"
done
