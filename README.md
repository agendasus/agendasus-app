# agendasus-app

Antes de tudo, é preciso configurar o ambiente para desenvolvimento utilizando o react-native. Existe um guia na própria página do react-native: https://reactnative.dev/docs/environment-setup

### Instalando as dependências

`npm install`
 <br/>ou 
<br/>`yarn install`

### Para rodar em ambiente de denvolvimento
Obs: Não esqueça de devidamente configurar o emulador e/ou o dispositivo antes.

`npx react-native run-android`

Caso o servidor de codigo não seja iniciado automaticamente:
<br/>
`yarn start`

### Para instalar uma versão de produção
`npx react-native run-android --variant=release`

Obs: Caso você tenha instalado uma versão de desenvolvimento antes, é preciso desinstalar, senão dará erro. Também deve desinstalar a versão de produção caso queira instalar a versão de desenvolvimento.

Mais detalhes:
https://reactnative.dev/docs/running-on-device


## USO
### AINDA NÃO FUNCIONA NO iOS, APENAS NO ANDROID

As requisições HTTP estão configuradas com um servidor aleatório, para apontar pra um servidor correto há 2 opções:
1. Alterar o endereço no arquivo database/Remote.js
2. Na tela de login, tocar no logo(imagem logo acima do campo de usuário) que irá abrir uma tela para inserir o servidor.

