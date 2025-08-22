# Cowmed Config App

Este projeto é servido pelo Firebase.

## Configuração do Firebase Hosting

Este guia é um passo a passo para fazer o deploy de uma aplicação React para o Firebase Hosting, com base no tutorial em vídeo: [https://www.youtube.com/watch?v=_Q-My6fonts](https://www.youtube.com/watch?v=_Q-My6fonts).

### 1. Criar um novo projeto no Firebase

* Acesse o [Console do Firebase](https://console.firebase.google.com/).
* Clique em **"Criar um projeto"**.
* Dê um nome ao seu projeto, concorde com os termos e clique em **"Continuar"**.
* Escolha uma conta do Google Analytics para o projeto (opcional) e clique em **"Criar projeto"**.

### 2. Instalar e fazer login na Firebase CLI

Se ainda não tiver as ferramentas do Firebase CLI instaladas globalmente, execute o seguinte comando no seu terminal:

```shell
npm install -g firebase-tools
```

Em seguida, faça login com sua conta do Google para autenticar a CLI. Use as credenciais fornecidas no seu console:

```shell
firebase login
```

> Credenciais do console:
> **Usuário:** nspode@gmail.com
> **Senha:** check kaspersky

> **Problema conhecido:** Se você encontrar o erro `Error: Assertion failed: resolving hosting target of a site with no site name or target name. This should have caused an error earlier`, a solução é reautenticar o login com o comando:
>
> ```shell
> firebase login --reauth
> ```

### 3\. Inicializar o Firebase no projeto

No terminal, dentro da pasta raiz do seu projeto React, execute o comando de inicialização:

```shell
firebase init
```

  * Quando perguntado sobre os recursos a serem configurados, selecione **"Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys"**.
  * Selecione **"Use an existing project"** e escolha o projeto que você criou no passo 1.
  * Em `What do you want to use as your public directory?`, digite **`dist`** (o diretório padrão para a compilação do Vite).
  * Em `Configure as a single-page app (rewrite all urls to /index.html)?`, digite **`Y`**.
  * Em `Set up automatic builds and deploys with GitHub?`, digite **`N`** (se não for usar o GitHub Actions).

### 4\. Compilar e Fazer o Deploy do Aplicativo

Com o Firebase inicializado, você precisa primeiro compilar sua aplicação React para produção. Isso cria o diretório `dist` que será enviado para o Firebase Hosting.

```shell
npm run build
```

Finalmente, faça o deploy do seu aplicativo para o Firebase:

```shell
firebase deploy
```

**Comandos de deploy disponíveis:**
- `firebase deploy` - Deploy de todos os serviços configurados
- `firebase deploy --only hosting` - Deploy apenas do Hosting (mais rápido)
- `firebase deploy --only hosting:site-name` - Deploy para um site específico

Seu aplicativo estará agora disponível na URL fornecida pelo Firebase Hosting.

## Problemas Conhecidos

### 1. Firebase sobrescrevendo o index.html

**Problema:** Após o deploy, a aplicação mostra a página padrão "Firebase Hosting Setup Complete" em vez da aplicação React.

**Causa:** O Firebase pode sobrescrever o arquivo `index.html` da sua aplicação com a página padrão do Firebase Hosting.

**Solução:**
1. Execute um novo build: `npm run build`
2. Faça o deploy novamente: `firebase deploy --only hosting`

**Prevenção:** Sempre execute o build antes do deploy:
```shell
npm run build && firebase deploy --only hosting
```

> **Nota sobre `--only hosting`:** Este parâmetro faz o deploy apenas do serviço de Hosting, ignorando outros serviços do Firebase (como Functions, Firestore, etc.). Isso torna o deploy mais rápido e evita erros relacionados a outros serviços não configurados.

### 2. Hosting não aparece na lateral do console

**Problema:** O "Hosting" não aparece como atalho na lateral esquerda do console do Firebase.

**Causa:** O Firebase só mostra o "Hosting" na lateral quando há um site ativo configurado e funcionando.

**Solução:** 
1. Faça o deploy da aplicação primeiro
2. Aguarde alguns minutos para o Firebase atualizar a interface
3. O "Hosting" aparecerá automaticamente na lateral

### 3. Erro de autenticação na CLI

**Problema:** Erro `Error: Assertion failed: resolving hosting target of a site with no site name or target name. This should have caused an error earlier`

**Solução:** Reautenticar o login:
```shell
firebase login --reauth
```




