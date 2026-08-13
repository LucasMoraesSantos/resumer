# Resumo de Atendimento

Aplicação web focada no fluxo **colar conversa → gerar resumo → copiar resumo**. Ela transforma conversas de suporte em registros profissionais em português, sem manter histórico ou persistir os dados no navegador.

## Tecnologias

- Next.js com App Router, React e TypeScript
- Tailwind CSS
- API Route executada no servidor
- SDK oficial da OpenAI (Responses API)
- Vitest e Testing Library

## Requisitos

- Node.js 20.9 ou superior
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
