#!/bin/bash
# Export Reveal.js presentation to PDF using Decktape
# Usage: export-pdf.sh <input.html> [output.pdf]

set -e

INPUT="${1:?Usage: export-pdf.sh <input.html> [output.pdf]}"
OUTPUT="${2:-${INPUT%.html}.pdf}"
PORT=$((8700 + RANDOM % 100))

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK_DIR="$(dirname "$(realpath "$INPUT")")"
INPUT_FILE="$(basename "$INPUT")"

# Check decktape
if ! command -v decktape &> /dev/null; then
    echo "Error: decktape not found"
    echo "Install with: npm install -g decktape"
    exit 1
fi

# Start server
cd "$WORK_DIR"
python3 -m http.server "$PORT" > /dev/null 2>&1 &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null" EXIT

sleep 2

echo "Exporting: $INPUT → $OUTPUT"
echo "Server: http://localhost:$PORT"

# Run decktape
decktape reveal \
    --size 1280x720 \
    --pause 500 \
    --chrome-arg=--no-sandbox \
    --chrome-arg=--disable-setuid-sandbox \
    --chrome-arg=--disable-dev-shm-usage \
    --pdf-author "Croissan Studio" \
    "http://localhost:$PORT/$INPUT_FILE" \
    "$(realpath "$OUTPUT")"

echo ""
echo "✓ PDF saved: $OUTPUT"
ls -lh "$OUTPUT" | awk '{print "  Size: " $5}'
