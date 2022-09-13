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
            console.error(`Error while updating`);

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
            console.error(`Error while deleting`);

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
            
        }
    }

}

module.exports = CommentRoutes;