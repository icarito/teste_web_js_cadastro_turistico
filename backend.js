const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Exemplo de dados de pontos (substitua por sua própria lógica de dados)
let pontos = [
    { id: 1, nome: "Ponto 1", coordenadas: [10.1234, -20.5678] },
    { id: 2, nome: "Ponto 2", coordenadas: [30.8765, -40.4321] }
];

app.use(bodyParser.json());

// Rota para obter todos os pontos
app.get('/pontos', (req, res) => {
    res.json(pontos);
});

// Rota para adicionar um novo ponto
app.post('/pontos/novo', (req, res) => {
    const novoPonto = req.body;
    pontos.push(novoPonto);
    res.json({ message: 'Ponto adicionado com sucesso', ponto: novoPonto });
});

// Rota para obter um ponto por ID
app.get('/pontos/:id', (req, res) => {
    const pontoId = parseInt(req.params.id);
    const ponto = pontos.find(p => p.id === pontoId);
    if (!ponto) {
        res.status(404).json({ message: 'Ponto não encontrado' });
    } else {
        res.json(ponto);
    }
});

// Rota para atualizar um ponto por ID
app.post('/pontos/:id', (req, res) => {
    const pontoId = parseInt(req.params.id);
    const novoPonto = req.body;
    let pontoIndex = pontos.findIndex(p => p.id === pontoId);
    if (pontoIndex === -1) {
        res.status(404).json({ message: 'Ponto não encontrado' });
    } else {
        pontos[pontoIndex] = novoPonto;
        res.json({ message: 'Ponto atualizado com sucesso', ponto: novoPonto });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

