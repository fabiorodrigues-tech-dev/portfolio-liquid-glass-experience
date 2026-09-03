# Regra de Rollback Instantâneo: Comando (reverse)

Sempre que o usuário digitar `reverse`, `(reverse)` ou solicitar "desfazer", "voltar versão anterior" ou "reverter":

1. **Ação Imediata**:
   - Execute o comando: `bash scripts/reverse.sh` (ou `npm run reverse`).
   - Isso desfaz automaticamente qualquer alteração pendente ou reverte para o commit/checkpoint anterior no Git.

2. **Feedback Claro**:
   - Informe ao usuário a versão exata que foi restaurada e as alterações que foram revertidas.
   - Apresente o log do git atual (`git log -1 --oneline`).

3. **Criação Preventiva de Checkpoints**:
   - Sempre que o usuário solicitar uma alteração significativa ou nova funcionalidade, garanta que a versão funcional anterior esteja salva em um checkpoint:
     `bash scripts/checkpoint.sh "checkpoint: <descrição sucinta da alteração>"`
   - Assim, o usuário sempre poderá digitar `reverse` a qualquer momento para voltar com 100% de segurança.
