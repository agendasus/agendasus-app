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
