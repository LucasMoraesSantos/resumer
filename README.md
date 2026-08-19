# Resumo de Atendimento

Extensão Chrome Manifest V3 que transforma uma conversa completa em um parágrafo de até 80 palavras usando a API da OpenAI. O prompt proíbe listas e emojis, omite completamente a atendente virtual Clara, preserva os nomes dos atendentes humanos nas transferências e deduz o departamento inicial quando ele estiver claro na transcrição.

## Instalação

Abra `chrome://extensions`, ative o modo do desenvolvedor, escolha **Carregar sem compactação** e selecione esta pasta. Abra as configurações da extensão e informe uma chave de API exclusiva, preferencialmente com limite de uso. Depois, cole a conversa ou selecione seu texto em uma página, abra a extensão e gere o resumo. O botão de tema no cabeçalho alterna entre os modos claro e escuro e guarda a preferência para os próximos usos.

Por segurança, nenhuma chave de API está incluída no código. Como uma extensão instalada no navegador não consegue manter um segredo completamente protegido, revogue imediatamente qualquer chave compartilhada publicamente e gere uma nova chave exclusiva.

## Testes

Execute `node --test`.
