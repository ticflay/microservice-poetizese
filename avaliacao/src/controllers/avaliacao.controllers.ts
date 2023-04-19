import { NextFunction, Request, Response } from "express";
import { Avaliacao } from "../models/Avaliacao";

export const createAvaliacao = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const {avaliacaoNota, postId  } = req.body;
    if(!avaliacaoNota || !postId) {
        return res.status(401).json({error: "Avaliação e postId são obrigatórios"});
    }
    try {
        const checkAvaliacao = await Avaliacao.findOne({where: {postId, authorId: userId }});
        if(checkAvaliacao) {
            return res.status(409).json({error: "Avaliação já foi criada"})
        }

        const avaliacao = await Avaliacao.create({authorId: userId, postId, avaliacao: avaliacaoNota});
        if(avaliacao) {
            return res.json({post: avaliacao.dataValues, message: "Avaliado com sucesso!"});
        }else {
            return res.status(400).json({error: "Erro ao avaliar poema!"})
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({error: "Erro no servidor, tente novamente!"});
    }
    

}

export const getAvaliacoesMean = async (req: Request, res: Response, next: NextFunction) => {
   const { postId } = req.params;
    try {
        if(postId) {
            const avaliacoes = await Avaliacao.findAll({where: {postId}});
            if(avaliacoes) {
                if(avaliacoes.length > 0) {
                    const soma = avaliacoes.reduce((a, b) => a + b.avaliacao, 0);
                    const mean = soma / avaliacoes.length;
                    return res.json({avaliacao: mean.toFixed(2)});
                }else {
                    res.json({avaliacao: "Sem avaliações"})
                }
            }else {
                return res.status(400).json({error: "Erro! Tente novamente"})
            }
        }else {
            return res.status(401).json({error: "Um postId deve ser informado!"})

        }
   }catch (err) {
    console.error(err);
    return res.status(500).json({error: "Erro no servidor, tente novamente!"});
}
    
}


export const updateAvaliacao = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { avaliacaoNota } = req.body;
    try {
       if(id && avaliacaoNota) {
        const avaliacao = await Avaliacao.findByPk(id);
        if(avaliacao) {
            await avaliacao.update({avaliacao: avaliacaoNota});
            await avaliacao.save();
            return res.json({avaliacao: avaliacao.dataValues, message: "Avaliação atualizada com sucesso!"})
        }else {
            return res.status(404).json({error: "Avaliação não encontrada!"})

        }
       }else {
        return res.status(401).json({error: "O id do post e a nota da avaliação devem ser informados"})

       }
    }catch (err) {
        console.error(err);
        return res.status(500).json({error: "Erro no servidor, tente novamente!"});
    }
}
