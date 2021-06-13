//Chamadas dos pacotes:
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Veiculo = require("./app/models/veiculo");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/API-CARUPI", {
  useMongoClient: true,
});

//Configuração da variável app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;

//Rotas da nossa API:
//=============================================================================

//Criando uma instância das Rotas via Express:
var router = express.Router();

//Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão:
router.use(function (req, res, next) {

  next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

//Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api):
router.get("/", function (req, res) {
  res.json({ message: "Beleza! Bem vindo(a) a nossa Loja XYZ" });
});

//API's:
//==============================================================================

//Rotas que terminarem com '/veiculo' (servir: GET ALL & POST)
router
  .route("/veiculo")

  /* 1) Método: Criar Veiculo (acessar em: POST http://localhost:8000/api/veiculo)  */
  .post(function (req, res) {
    var veiculo = new Veiculo();

    //Aqui vamos setar os campos do veiculo (via request):

    veiculo.Marca = req.body.Marca;
    veiculo.Modelo = req.body.Modelo;
    veiculo.Versao = req.body.Versao;
    veiculo.Ano = req.body.Ano;
    veiculo.Quilometragem = req.body.Quilometragem;
    veiculo.tipocambio = req.body.tipocambio;
    veiculo.precodevenda = req.body.precodevenda;

    veiculo.save(function (error) {
      if (error) res.send("Erro ao tentar salvar o Veiculo....: " + error);

      res.json({ message: "Veiculo Cadastrado com Sucesso!" });
    });
  })

  /* 2) Método: Selecionar Todos Veiculos (acessar em: GET http://localhost:8000/api/veiculo)  */
  .get(function (req, res) {
    Veiculo.find(function (error, veiculos) {
      if (error)
        res.send("Erro ao tentar Selecionar Todos os veiculos...: " + error);

      res.json(veiculos);
    });
  });

//Rotas que irão terminar em '/veiculo/:veiculo_id' (servir tanto para: GET, PUT & DELETE: id):
router
  .route("/veiculo/:veiculo_id")

  /* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/veiculo/:pveiculo_id) */
  .get(function (req, res) {
    //Função para poder Selecionar um determinado veiculo por ID - irá verificar se caso não encontrar um determinado
    //veiculo pelo id... retorna uma mensagem de error:
    Veiculo.findById(req.params.veiculo_id, function (error, veiculo) {
      if (error) res.send("Id do Veiculo não encontrado....: " + error);

      res.json(veiculo);
    });
  })

  /* 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/veiculo/:veiculo_id) */
  .put(function (req, res) {
    //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'veiculo':
    Veiculo.findById(req.params.veiculo_id, function (error, veiculo) {
      if (error) res.send("Id do Veiculo não encontrado....: " + error);

      //Segundo:
      veiculo.Marca = req.body.Marca;
      veiculo.Modelo = req.body.Modelo;
      veiculo.Versao = req.body.Versao;
      veiculo.Ano = req.body.Ano;
      veiculo.Quilometragem = req.body.Quilometragem;
      veiculo.tipocambio = req.body.tipocambio;
      veiculo.precodevenda = req.body.precodevenda;

      //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
      veiculo.save(function (error) {
        if (error) res.send("Erro ao atualizar o Veiculo....: " + error);

        res.json({ message: "Veiculo atualizado com sucesso!" });
      });
    });
  })

  /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/veiculo/:veiculo_id) */
  .delete(function (req, res) {
    Veiculo.remove(
      {
        _id: req.params.veiculo_id,
      },
      function (error) {
        if (error) res.send("Id do Veiculo não encontrado....: " + error);

        res.json({ message: "Veiculo Excluído com Sucesso!" });
      }
    );
  });

//Definindo um padrão das rotas prefixadas: '/api':
app.use("/api", router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);
module.exports = app;
