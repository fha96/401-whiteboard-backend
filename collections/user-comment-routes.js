'use strict'; 



class CommentRoutes {

    constructor(model){
        this.model = model;
    }


    async read(id) {
        try {
            if(id){
                return await this.model.findOne({where:{id}});
            } else {
                return await this.model.findAll();
            }
            
        } catch (error) {
            console.error(`Error while reading :${error.message}`);

        }


    }

    async create(obj) {
        try {      
            return await this.model.create(obj);
        } catch (error) {
            console.error(`Error while creating`);
        }
    }

    async delete(id) {
        try {
            
            return await this.model.destroy({where:{id}});
        } catch (error) {
            console.error(`Error while deleting${error.message}`);

        }
    }
    async update(obj,id) {
        try {
            
            return await this.model.update(obj,{where:{id}});
        } catch (error) {
            console.error(`Error while updating`);
        }
    }
    async readWithComments(Model) {
        try {
            return await this.model.findAll({include:[Model]})
        } catch (error) {
            console.error(`Error while read Posts with comments :${error.message}`);
            
        }
    }

    async CreateAndReadAllComments(Model,obj,id) {
        try {
            await this.model.create(obj);
            return await this.model.findAll({include:[Model],where:{postID:id}})
        } catch (error) {
            console.error(`Error while read All comments :${error.message}`);
            
        }
    }

}

module.exports = CommentRoutes;