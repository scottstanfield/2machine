#!/bin/sh
  psql "sslmode=verify-ca sslrootcert=server-ca.pem \
      sslcert=client-cert.pem sslkey=client-key.pem \
      hostaddr=35.185.213.57 \
      port=5432 \
      user=postgres dbname=postgres"
