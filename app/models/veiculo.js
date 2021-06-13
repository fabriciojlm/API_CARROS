var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VeiculoSchema = new Schema({
    Marca: String,
    Modelo: String,
    Versao: String,
    Ano: Number,
    Quilometragem: String,
    tipocambio: String,
    precodevenda: String
});

module.exports = mongoose.model('Veiculo', VeiculoSchema);