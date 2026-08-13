# Resumo de Atendimento

Aplicação web focada no fluxo **colar conversa → gerar resumo → copiar resumo**. Ela transforma conversas de suporte em registros profissionais em português, sem manter histórico ou persistir os dados no navegador.

## Tecnologias

- Next.js com App Router, React e TypeScript
- Tailwind CSS
- API Route executada no servidor
- SDK oficial da OpenAI (Responses API)
- Vitest e Testing Library

## Requisitos

- Node.js 22.12 ou superior
- Uma chave de API da OpenAI

## Instalação

```bash
npm install
cp .env.example .env.local
```

Edite `.env.local`:

```dotenv
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_API_KEY` e `OPENAI_MODEL` são lidas exclusivamente no backend. Selecione em `OPENAI_MODEL` um modelo da sua conta adequado ao volume e à qualidade desejados.

## Execução

Desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Para gerar e executar a versão de produção:

```bash
npm run build
npm start
```

## Deploy na Netlify

O repositório inclui `netlify.toml` com o comando de build, diretório de publicação `.next` e versão do Node necessários. Ao importar o repositório na Netlify, mantenha a **Base directory** vazia e não substitua o **Publish directory** nas configurações do painel. Configurações definidas no painel têm precedência e um diretório como `out`, `public` ou a raiz do projeto resultará em uma página 404.

Cadastre `OPENAI_API_KEY` e `OPENAI_MODEL` em **Project configuration → Environment variables** e faça um novo deploy. A aplicação não deve ser configurada como exportação estática, pois `/api/summarize` precisa executar no servidor. O `netlify.toml` fixa a versão moderna do Next.js Runtime (`@netlify/plugin-nextjs` v5), baseada em OpenNext, para garantir que a rota server-side seja publicada mesmo em sites existentes nos quais a integração automática não esteja habilitada.

## Qualidade

```bash
npm test
npm run lint
```

Os testes cobrem validação da conversa, resposta e erro da API na interface, cópia, sanitização, divisão de conteúdo e isolamento de tentativas de prompt injection.

## Estrutura

```text
src/
├── app/
│   ├── api/summarize/route.ts  # validação e endpoint server-side
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                 # formulário, entrada e resultado editável
├── lib/
│   ├── openai.ts               # cliente e modelo configurados pelo ambiente
│   ├── sanitizeSummary.ts      # saída em texto corrido
│   └── summarizer.ts           # orquestração e conversas extensas
└── prompts/supportSummary.ts   # regras do resumo e delimitação dos dados
```

## Processamento e privacidade

A rota `POST /api/summarize` valida `{ "conversation": "..." }`, chama a OpenAI no servidor e retorna `{ "summary": "..." }`. Conversas extensas são divididas em limites de mensagens sempre que possível, analisadas na ordem e consolidadas em uma chamada final. A saída é sanitizada deterministicamente para remover markdown e quebras de linha.

Não há banco de dados, login, histórico nem uso de `localStorage`. O servidor registra apenas detalhes técnicos do erro e nunca inclui a conversa completa nos logs da aplicação. O texto é enviado somente à OpenAI para produzir o resumo; consulte as políticas aplicáveis à sua conta antes de utilizar dados reais.

## Uso

1. Cole a conversa no campo principal.
2. Clique em **Gerar resumo** ou pressione **Ctrl + Enter**.
3. Revise e, se necessário, edite o resultado.
4. Clique em **Copiar resumo**.

O botão **Limpar** remove conversa, resultado e erros apenas da memória da página.
