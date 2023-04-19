import { NextFunction, Request, RequestHandler, Response,  } from "express";
import { User } from "../models/user";
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret_key } from "../config/secret";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const login = req.body.login;
        const passwordSent = req.body.password;
        if(!login || !passwordSent) {
            return res.status(401).json({error: "Login e senha são obrigatórios"});
        }


        const user = await User.findOne({
            where: {
                [Op.or]: {
                    email: login,
                    username: login    
                }
            }
        });
        if(!user) {
            return res.status(401).json({ error: 'Nome de usuário/enail inválido!' });
        }

        const passwordMatches = await bcrypt.compare(passwordSent, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Senha incorreta' });
          }
      
        const token = jwt.sign({id: user.id, email: user.email, username: user.username}, secret_key)
        const { password, ...rest} = user.dataValues;

        return res.json({token, user: rest});
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const passwordSent = req.body.password;

      if(!username || !passwordSent || !email) {
        return res.status(401).json({error: "Nome de usuário, email e senha são obrigatórios"});
    }
      // Verifica se o usuário já existe
      const userExists = await User.findOne({
        where: {
          [Op.or]: {
            email,
            username
          }
        },
      });
      if (userExists) {
        return res.status(409).json({ error: 'Usuário já cadastrado' });
      }
  
      // Cria o usuário
      const hashedPassword = await bcrypt.hash(passwordSent, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });

  
      // Gera o token de autenticação
      const token = jwt.sign({ id: user.id }, secret_key);
      const { password, ...rest} = user.dataValues;
      return res.json({ token, user: rest });
    } catch (error: any) {
        if(error.errors[0].validatorKey === 'isEmail') {
            res.status(400).json({ error: 'E-mail inválido' })
        }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
