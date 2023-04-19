import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";


export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({where: {userId}})
        if(user) {
            return res.status(200).json({user: user.dataValues});
        }else {
            return res.status(404).json({error: "Usuario não encontrado"})
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export const getUserProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll()
        if(users) {
            return res.status(200).json({users: users.map((user) => user.dataValues)});
        }else {
            return res.status(404).json({error: "Usuario não encontrado"})
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {description, name} = req.body;
    const userId = req.userId;
    try {
        const user = await User.findOne({where: {userId}})
        if(user) {
            await user.update({name, description});
            await user.save();
            return res.json({user: user.dataValues, message: "Usuário atualizado com sucesso"})
        }else {
            return res.status(404).json({error: "Usuario não encontrado"})
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export const postProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {description, name} = req.body;
    const userId = req.userId;
    try {
        const user = await User.create({userId, description, name});
        console.log(user);
        if(user) {
            return res.json({user: user.dataValues, message: "Usuário criado com sucesso"})
        }else {
            return res.status(404).json({error: "Não foi possível criar o usuario"})
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}