import { NextFunction, Request, Response } from "express";
import { Post } from "../models/Post";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const {title, content } = req.body;
    if(!title || !content) {
        return res.status(401).json({error: "Título e Conteúdo são obrigatórios"});
    }
    try {
        const post = await Post.create({authorId: userId, title, content});
        if(post) {
            return res.json({post: post.dataValues, message: "Publicado com sucesso!"});
        }else {
            return res.status(400).json({error: "Erro ao publicar poema!"})
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({error: "Erro no servidor, tente novamente!"});
    }
    

}

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
   const { authorId } = req.params;
    try {
        if(authorId) {
            const posts = await Post.findAll({where: {authorId}});
            if(posts) {
                return res.json({posts: posts.map((post) => post.dataValues)});
            }else {
                return res.status(400).json({error: "Erro! Tente novamente"})
            }
        }else {
            const posts = await Post.findAll();
            if(posts) {
                return res.json({posts: posts.map((post) => post.dataValues)});
            }else {
                return res.status(400).json({error: "Erro! Tente novamente"})
            }
        }
   }catch (err) {
    console.error(err);
    return res.status(500).json({error: "Erro no servidor, tente novamente!"});
}
    
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        if(id) {
            const post = await Post.findByPk(id);
            if(post) {
                return res.json({post: post.dataValues});
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

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content} = req.body;
    try {
       if(id) {
        const post = await Post.findByPk(id);
        if(post) {
            await post.update({title, content});
            await post.save();
            return res.json({post: post.dataValues, message: "Publicação atualizada com sucesso!"})
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

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        if(id) {
         const post = await Post.findByPk(id);
         if(post) {
             await Post.destroy({where: {id}})
             
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
