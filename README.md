# agendasus-app

Antes de tudo, é preciso configurar o ambiente para desenvolvimento utilizando o react-native. Existe um guia na própria página do react-native: https://reactnative.dev/docs/environment-setup

### Instalando as dependências

`npm install`
 <br/>ou 
<br/>`yarn install`

### Para rodar em ambiente de desenvolvimento
Obs: Não esqueça de devidamente configurar o emulador e/ou o dispositivo antes.

`npx react-native run-android`

Caso o servidor de codigo não seja iniciado automaticamente:
<br/>
`yarn start`

### Para instalar uma versão de produção
Devido à questões de segurança, veja na seção Security como gerar o apk.

Na seção Release é possível baixar o apk já gerado.

Mais detalhes:
https://reactnative.dev/docs/running-on-device


## USO
### AINDA NÃO FUNCIONA NO iOS, APENAS NO ANDROID

As requisições HTTP estão configuradas com um servidor aleatório, para apontar pra um servidor correto há 2 opções:
1. Alterar o endereço no arquivo database/Remote.js
2. Na tela de login, tocar no logo(imagem logo acima do campo de usuário) que irá abrir uma tela para inserir o servidor.



------------

## Pendências
- Configurar as dependências no iOS e deixar o aplicativo funcionando - Não esquecer de deixar o guia de configuração aqui;
- Alterar a biblioteca de componentes. A RNUILIB é boa, mas parece imatura (documentação precária);
	Candidatas: 

		https://reactnativepaper.com (tudo fica com cara de Android)
		https://reactnativeelements.com/  (preferida)
		https://docs.nativebase.io/ (mais voltada para aplicativo de vendas/loja)

- Adicionar os testes automatizados: toda a piramide;
- Testar em mais dispositivos com variadas resoluções/tamanhos de tela;
