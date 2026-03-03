#!/bin/bash
# Create a new Reveal.js presentation
# Usage: create.sh "Title" output.html [theme]

set -e

TITLE="${1:-Presentation}"
OUTPUT="${2:-presentation.html}"
THEME="${3:-croissan-kp}"

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$(dirname "$OUTPUT")"
[ "$OUTPUT_DIR" = "." ] && OUTPUT_DIR=""

case "$THEME" in
    croissan-kp)
        sed "s|{{TITLE}}|$TITLE|g" "$SKILL_DIR/assets/template-croissan-kp.html" > "$OUTPUT"
        echo "Created: $OUTPUT"
        echo "Theme: croissan-kp (КП / Sales deck)"
        echo ""
        echo "Export to PDF:"
        echo "  bash $SKILL_DIR/scripts/export-pdf.sh $OUTPUT"
        ;;
    croissan)
        sed "s|{{TITLE}}|$TITLE|g" "$SKILL_DIR/assets/template-croissan.html" > "$OUTPUT"
        if [ -n "$OUTPUT_DIR" ]; then
            cp "$SKILL_DIR/theme-croissan.css" "$OUTPUT_DIR/"
        else
            cp "$SKILL_DIR/theme-croissan.css" .
        fi
        echo "Created: $OUTPUT"
        echo "Theme: croissan (website style)"
        echo "CSS: theme-croissan.css copied"
        ;;
    *)
        VALID_THEMES="black white league beige night serif simple solarized moon dracula sky blood"
        if ! echo "$VALID_THEMES" | grep -qw "$THEME"; then
            echo "Warning: '$THEME' is not a built-in theme."
        fi
        sed -e "s|{{TITLE}}|$TITLE|g" \
            -e "s|{{THEME}}|$THEME|g" \
            "$SKILL_DIR/assets/template.html" > "$OUTPUT"
        echo "Created: $OUTPUT"
        echo "Theme: $THEME"
        ;;
esac

echo ""
echo "Open in browser to view. Press S for speaker notes."
