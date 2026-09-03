#!/usr/bin/env bash
set -e

# Verifica se há alterações pendentes não commitadas
if [ -n "$(git status --porcelain)" ]; then
  echo "Desfazendo alterações pendentes na árvore de trabalho..."
  git restore .
  git clean -fd
  echo "Código restaurado para o checkpoint atual: $(git log -1 --oneline)"
else
  # Verifica o número de commits disponíveis
  COMMIT_COUNT=$(git rev-list --count HEAD 2>/dev/null || echo "1")
  if [ "$COMMIT_COUNT" -gt 1 ]; then
    echo "Voltando para a versão anterior..."
    git reset --hard HEAD~1
    echo "Sucesso! Versão ativa agora: $(git log -1 --oneline)"
  else
    echo "Você já está no checkpoint inicial estável: $(git log -1 --oneline)"
  fi
fi
