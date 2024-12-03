const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [
    { id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
];


app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const { firstName, lastName, role } = req.body;
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    const newUser = { id: lastId + 1, firstName, lastName, role };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, role } = req.body;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.role = role || user.role;

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'Utilisateur supprimé' });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});