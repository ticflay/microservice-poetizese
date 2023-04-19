import { NextFunction, Request, Response } from "express";
import { Comment } from "../models/Comment";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { content, postId} = req.body;
    if(!postId || !content) {
        return res.status(401).json({error: "Informe um postId ou Conteúdo"});
    }
    try {
        const comment = await Comment.create({authorId: userId, content, postId});
        if(comment) {
            return res.json({post: comment.dataValues});
        }else {
            return res.status(400).json({error: "Erro ao publicar poema!"})
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({error: "Erro no servidor, tente novamente!"});
    }
    

}

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
   const { postId } = req.params;
    try {
        if(postId) {
            const comments = await Comment.findAll({where: {postId}});
            if(comments) {
                return res.json({posts: comments.map((comment) => comment.dataValues)});
            }else {
                return res.status(400).json({error: "Erro! Tente novamente"})
            }
        }else {
            return res.status(401).json({error: "Um postId deve ser fornecido"})
            
        }
   }catch (err) {
    console.error(err);
    return res.status(500).json({error: "Erro no servidor, tente novamente!"});
}
    
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
       if(id) {
        const comment = await Comment.findByPk(id);
        if(comment) {
            await comment.update({ content});
            await comment.save();
            return res.json({post: comment.dataValues, message: "Publicação atualizada com sucesso!"})
        }else {
            return res.status(404).json({error: "Publicação não encontrada!"})

        }
       }else {
        return res.status(401).json({error: "O id do comentario deve ser informado"})

       }
    }catch (err) {
        console.error(err);
        return res.status(500).json({error: "Erro no servidor, tente novamente!"});
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        if(id) {
         const comment = await Comment.findByPk(id);
         if(comment) {
             await Comment.destroy({where: {id}})
             
             return res.json({ message: "Publicação deletada com sucesso!"})
         }else {
             return res.status(404).json({error: "Publicação não encontrada!"})
 
         }
        }else {
         return res.status(401).json({error: "O id do post deve ser informado"})
 
        }
     }catch (err) {
         console.error(err);
         return res.status(500).json({error: "Erro no servidor, tente novamente!"});
     }
}
