# Simple Workflow

## Informações

Workflow simples com:

* ES2015 (Babel)
* Browserify
* SASS
* Pug/Jade
* Gulp


## Gerar os arquivos

Com o [NodeJS](https://nodejs.org/en/) e o [Gulp](http://gulpjs.com/) devidamente instalados:

* Instale as dependências com: `$ npm install`
* Ambiente de desenvolvimento está disponível com: `$ npm run dev` (o mesmo que rodar `$ gulp watch`)
    * Irá subir automaticamente um server em `http://localhost:8080`
* Build para produção estará disponível com: `$ npm run build` (o mesmo que rodar `$ gulp --production`)
    * Minifica todos os arquivos
    * Otmiza todas as imagens


## Organização

Todo o desenvolvimento é feito no diretório `/src/`
Após rodada as tarefas, é gerado o diretório `/dist/` a disposição do browser
