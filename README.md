# Resumo de Atendimento

Extensão Chrome Manifest V3 que transforma uma conversa em um parágrafo curto e objetivo usando a API da OpenAI. O prompt proíbe listas e emojis e só considera transferência quando há troca comprovada entre dois atendentes humanos; a passagem da atendente virtual Clara para uma pessoa é ignorada.

## Instalação

Abra `chrome://extensions`, ative o modo do desenvolvedor, escolha **Carregar sem compactação** e selecione esta pasta. Abra as configurações da extensão e informe uma chave de API exclusiva, preferencialmente com limite de uso. Depois, cole a conversa ou selecione seu texto em uma página, abra a extensão e gere o resumo.

Por segurança, nenhuma chave de API está incluída no código. Como uma extensão instalada no navegador não consegue manter um segredo completamente protegido, revogue imediatamente qualquer chave compartilhada publicamente e gere uma nova chave exclusiva.

## Testes

Execute `node --test`.
