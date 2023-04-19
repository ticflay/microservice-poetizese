import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secret_key } from '../config/secret';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token malformado.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformado.' });
  }

  jwt.verify(token, secret_key, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }

    req.userId = decoded.id;

    return next();
  });
};

export default authMiddleware;
