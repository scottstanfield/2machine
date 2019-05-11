#!/bin/bash

docker run -it --name certbot --rm \
    -v "/etc/letsencrypt:/etc/letsencrypt" \
    -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
    -v "/home/scott/2machine/ssl:/secrets" \
    certbot/dns-google certonly \
    --dns-google \
    --dns-google-credentials /secrets/google.json \
    --dns-google-propagation-seconds 60 \
    --server https://acme-v02.api.letsencrypt.org/directory \
    -d '*.albina.dev'
