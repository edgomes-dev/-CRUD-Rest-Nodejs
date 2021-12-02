import { Router } from "express"
const router = Router();

import Person from '../db/models/Person'
import PersonType from '../types/PersonType'

// Crete Person

router.post('/', async (req, res) =>
{
    const { name, salary, aproved }: PersonType = req.body;

    if (!name)
    {
        res.status(422).json({ error: "O campo name não foi preenchido" })
        return
    }
    if (!salary)
    {
        res.status(422).json({ error: "O campo salary não foi preenchido" })
        return
    }
    if (!aproved)
    {
        res.status(422).json({ error: "O campo aproved não foi preenchido" })
        return
    }

    const person: PersonType = 
    {
        name,
        salary,
        aproved
    }

    try {
        await Person.create(person);

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'});
    } catch(error) {
        res.status(500).json({ error: error });
    }
});

// Read

router.get('/', async (req, res) =>
{
    try {
        const people = await Person.find();

        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const person = await Person.findOne({_id: id});

        if(!person)
        {
            res.status(422).json({message: 'O usuário não foi encontrado'});
            return
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Update

router.patch('/:id', async (req, res) =>
{
    const id = req.params.id
    const { name,salary, aproved }: PersonType = req.body

    const person = { name, salary, aproved };   

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if(updatedPerson.matchedCount === 0)
        {
            res.status(422).json({message: 'O usuário não foi encontrado'});
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// Delete

router.delete('/:id', async (req, res) =>
{
    const id = req.params.id;

    const person = await Person.findOne({_id: id});

    if(!person)
    {
        res.status(422).json({message: 'O usuário não foi encontrado'});
        return
    }

    try {
        await Person.deleteOne({_id: id});

        res.status(200).json({ message: "Usuário removido com sucesso" })
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

export default router;