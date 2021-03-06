import db from "../services/db.services.js";

export const getUsers = async(request, response, next) => {
    //Obtener la lista de usuarios
    try{
        const users = await db.findAll();
        //Reponder al cliente con una respuesta de tipo json
        response.json(users);
    }catch(error){
        //En caso de error envíar hacía el middleware de manejo de errores
        next(error);
    }
}

export const getUserById = async(request, response, next) => {
    //Obtener la lista de usuarios
    try{
        const {id} = request.params;
        const user = await db.findById(parseInt(id));
        //Reponder al cliente con una respuesta de tipo json
        if(user === undefined)
            return response.json("user no se encuentra")
        response.json(user);
    }catch(error){
        //En caso de error envíar hacía el middleware de manejo de errores
        next(error);
    }
}

export const createUser = async(request, response, next) => {
    //Obtener los datos del usuario
    try{
        const {firstname, lastname, email} = request.body;
        const user = await db.create({firstname, lastname, email});
        //Reponder al cliente con una respuesta de tipo json
        response.status(201).json(user);
    }catch(error){
        //En caso de error envíar hacía el middleware de manejo de errores
        next(error);
    }
}

export const updateUser = async(request, response, next) => {
    //Obtener los datos del usuario
    try{
        const {id} = request.params;
        const {firstname, lastname, email} = request.body;
        const user = await db.update({firstname, lastname, email}, parseInt(id));
        //Reponder al cliente con una respuesta de tipo json
        response.status(201).json(user);
    }catch(error){
        //En caso de error envíar hacía el middleware de manejo de errores
        next(error);
    }
}

export const deleteUser = async(request, response, next) => {
    //Obtener los datos del usuario
    try{
        const {id} = request.params;
        const msg = await db.delete(parseInt(id));
        //Reponder al cliente con una respuesta de tipo json
        response.status(201).json(msg);
    }catch(error){
        //En caso de error envíar hacía el middleware de manejo de errores
        next(error);
    }
}