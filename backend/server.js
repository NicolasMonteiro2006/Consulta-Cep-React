const express = require('express');
const cors = require('cors');
const cepPromise = require('cep-promise');

const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.send('API de Consulta de CEP - use /consultar-cep/:cep');
});

app.get('/consultar-cep/:cep', async (req, res) => {
    let { cep } = req.params;
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        return res.status(400).json({ error: 'CEP inválido! Deve conter 8 dígitos numéricos.' });
    }

    try {
        const data = await cepPromise(cep);
        res.json({
            cep: data.cep,
            street: data.street,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state
        });
    } } catch (error) {
        console.error('Erro na consulta do CEP:', error);
        res.status(400).json({ error: 'CEP não encontrado ou inválido.' });
    }
  
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
