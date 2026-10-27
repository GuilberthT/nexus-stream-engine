# Nexus Stream Engine

Dashboard de telemetria em tempo real com feed de eventos, métricas de servidores e reconexão automática.

🔗 **Demo:** https://nexus-stream-engine.vercel.app/

## Stack

- React 19 + TypeScript (modo estrito)
- TanStack Router (roteamento tipado)
- TanStack Query (cache de dados assíncronos)
- Axios (cliente HTTP)
- Tailwind CSS v4
- Vite

## Funcionalidades

- Feed de eventos ao vivo com pausar/retomar
- Status de conexão com reconexão automática e backoff exponencial
- Detecção de perda de internet real do navegador
- Filtro de severidade na URL (search params tipados)
- Painel de métricas com cache de 5s e atualização ao focar a janela
- Rota dinâmica com validação de parâmetro, página 404 e tela de erro
- Layout responsivo

## Decisões técnicas

### Por que TanStack Query em vez de useEffect + fetch?
Com useEffect e fetch, eu teria que programar cache, atualização em segundo plano e novas tentativas manualmente. O TanStack Query já faz isso. Por exemplo, quando volto pro dashboard, as métricas aparecem na hora, e se a requisição falha, ele tenta de novo três vezes sozinho.

### Como funciona a reconexão do feed?
Após a queda, a espera dobra entre as tentativas: 1s, 2s, 4s, até o limite de 8s. Quando a conexão volta, o attempt zera a contagem. Não tentar a cada segundo é melhor porque, se vários usuários tentassem reconectar a cada segundo, isso derrubaria o servidor de novo assim que ele voltasse. O app também detecta quando a internet do próprio usuário cai e nem tenta reconectar até ela voltar.

### Por que o status da conexão é derivado e não um useState?
O status é calculado a partir das informações que já existem, como se tem internet e se está reconectando. Se fosse um useState, eu teria que atualizar ele em vários lugares, e se esquecesse um, o app mostraria o status errado. Calculando, ele está sempre certo.

### Por que o filtro fica na URL?
O usuário ganha três coisas: recarregar a página sem perder o filtro, compartilhar o link com o filtro aplicado e usar o botão Voltar do navegador para desfazer o filtro.

### Como o TypeScript evita bugs neste projeto?
Porque ele encontra bugs enquanto estou digitando o código, e não quando o usuário está usando o app. Por exemplo, com as rotas registradas: se eu colocar uma rota que não existe, ele dá erro antes de virar um link quebrado. Outro exemplo é o error como unknown: o TypeScript me obrigou a checar instanceof Error antes de usar .message.
## Estrutura

```
src/
├── api/         # cliente HTTP e funções de acesso a dados
├── components/  # componentes de interface reutilizáveis
├── hooks/       # lógica com estado (useLiveFeed)
├── lib/         # instâncias únicas (queryClient)
├── pages/       # páginas ligadas às rotas
├── types/       # tipos compartilhados
└── router.tsx   # árvore de rotas
```

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

## Próximos passos

- Trocar os mocks por um back-end real (WebSocket + REST)
- Carregar o histórico com `loader` na rota
- Code splitting por rota
