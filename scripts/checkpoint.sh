#!/usr/bin/env bash
set -e

MSG="${1:-checkpoint: $(date +'%Y-%m-%d %H:%M:%S')}"
git add -A
if git diff --cached --quiet; then
  echo "Nenhuma alteração detectada para criar checkpoint."
else
  git commit -m "$MSG"
  echo "Checkpoint criado com sucesso: $(git log -1 --oneline)"
fi
