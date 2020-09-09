import { Request, Response } from 'express';


import pool from '../database';

class GamesController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM SUBCATEGORIA');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        res.json({ message: 'Encontrado' });
        res.json(games);
    }


    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO SUBCATEGORIA set ?', [req.body]);
        res.json({ message: 'Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE SUBCATEGORIA set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM SUBCATEGORIA WHERE id = ?', [id]);
        res.json({ message: "Deleted" });
    }
}

const gamesController = new GamesController;
export default gamesController;
