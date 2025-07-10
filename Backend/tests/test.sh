#!/bin/sh

set -eu

curl http://localhost:8080/travel \
    -H 'Content-Type: application/json' \
    -d '{
        "country": "Japan",
        "from": "2025-08-01",
        "to": "2025-08-15",
        "wishes": "Mountains, culture, sushi"
    }' -v
