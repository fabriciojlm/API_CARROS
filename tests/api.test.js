const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
    it('Cadastrar veículo', async () => {
        const res = await request(app)
            .post('/api/veiculo')
            .send({
                Marca: "Fiat",
                Modelo: "Uno",
                Versao: "Mile",
                Ano: 2010,
                Quilometragem: "10000km",
                tipocambio: "Manual",
                precodevenda: "20000"
            })

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('Listar veículos', async () => {
        const res = await request(app)
            .get('/api/veiculo');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
    });

    it('Buscar veículo', async () => {
        const res = await request(app)
            .get('/api/veiculo/123');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
    });

});