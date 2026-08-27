#!/bin/bash
cd "D:/HERMES/SEULQRmenu" || exit 1
export STRIX_LLM="openrouter/z-ai/glm-4.6"
KEY=$(grep -o 'sk-or-[a-zA-Z0-9_-]*' "/c/Users/Professional/AppData/Local/hermes/profiles/h-rm-s-or/.env" | head -1)
export LLM_API_KEY="$KEY"
"/c/Users/Professional/AppData/Local/Programs/Python/Python314/Scripts/strix.exe" \
  -n -m quick --max-budget 1 \
  -t http://host.docker.internal:5173 \
  --instruction "Visual QA of a restaurant QR-menu website. Focus ONLY on: (1) text readability / low contrast ratio anywhere - headings, subtitles, buttons, nav, secondary text over the background image; list every element and page with poor contrast; (2) verify the same background image is used on all tabs; (3) check overlapping or clipped elements and overflow. Pages: / , /menu , /about , /fresh-ingredients , /location , /contact , /privacy. Report findings as a structured list." 2>&1
