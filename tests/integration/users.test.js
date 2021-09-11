import AcademloDb from "../../services/db.services.js";
import faker from "faker";
import request from "supertest";
import app from "../../app.js";


//Hooks de pruebas
//BeforeEach -> Antes de cada prueba
//BeforeAll -> Antes de todas las pruebas
//AfterEach -> Después de cada prueba
//AfterAll -> Después de todas las pruebas

describe("Obtener usuarios", () => {
    let newUser = {};
    let id = 0;
    //Antes de las pruebas
    beforeAll(async() => {
        //1. Voy a crear un usuario con datos "fake"
        newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
        }
        //2. Insertar el usuario en la DB
        const userCreated = await AcademloDb.create(newUser);
        //3. Guardar el id del usuario que acabo de crear
        id = userCreated.id;
    });

    //Después de la prueba
    afterAll(async() => {
        //1. Borrar el usuario que agregué antes de la prueba
        await AcademloDb.delete(id);
    });

    it("Debería de obtener un arreglo al hacer una petición al recurso de usuarios", async() => {
        const response = await request(app).get("/api/v1/users");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    it("Debería de obtener los datos del usuario que acabo de insertar en la DB haciendo una solicitud a /users/:id", async() => {
        //4. Realizar la solicitud de /users/:id -> con el id del usuario que acabo de crear
        const response = await request(app).get(`/api/v1/users/${id}`);
        //5. Voy a comprobar que los datos que me regresa la solictud son los mismos que del usuario que acabo de crear
        expect(response.body).toMatchObject(newUser);
    });
});


describe("Probando la creación de usuarios", () => {
    let newUser = {};
    //Antes de las pruebas
    beforeAll(async() => {
        //1. Voy a crear un usuario con datos "fake"
        newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
        }
    });

    //Después de la prueba
    afterAll(async() => {
        //1. Borrar el usuario que agregué antes de la prueba
        await AcademloDb.clear();
    });

    it("Debería de regresar un status 201 y el objeto del usuario que acabamos de crear en la DB", async() => {
        const response = await request(app).post(`/api/v1/users`).send(newUser);

        //comprobar el status 201
        expect(response.status).toBe(201);
        //comprobar el objeto
        expect(response.body).toMatchObject(newUser);
        // Otra forma de hacerlo expect(response.body).toHaveProperty("firstname", newUser.firstname);
    });
});

describe("Probando la actualización de usuarios", () => {
    let newUser = {};
    let id = null;
    //Antes de las pruebas
    beforeAll(async() => {
        //1. Voy a crear un usuario con datos "fake"
        newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
        }

        //2. Insertar el usuario en la DB
        const userCreated = await AcademloDb.create(newUser);
        //3. Guardar el id del usuario que acabo de crear
        id = userCreated.id;
    });

    //Después de la prueba
    afterAll(async() => {
        //1. Borrar el usuario que agregué antes de la prueba
        await AcademloDb.clear();
    });

    it("Debería de regresar un status 201 y el objeto del usuario que acabamos de crear en la DB", async() => {
        const response = await request(app).put(`/api/v1/users/${id}`).send(newUser);

        //comprobar el status 201
        expect(response.status).toBe(201);
        //comprobar el objeto
        expect(response.body).toMatchObject(newUser);
        // Otra forma de hacerlo expect(response.body).toHaveProperty("firstname", newUser.firstname);
    });
});

describe("Probando la eliminación de usuarios", () => {
    let newUser = {};
    let id = null;
    //Antes de las pruebas
    beforeAll(async() => {
        //1. Voy a crear un usuario con datos "fake"
        newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
        }
        //2. Insertar el usuario en la DB
        const userCreated = await AcademloDb.create(newUser);
        //3. Guardar el id del usuario que acabo de crear
        id = userCreated.id;
    });

    it("Debería de regresar un status 201 y un texto true", async() => {
        const response = await request(app).delete(`/api/v1/users/${id}`);

        //comprobar el status 201
        expect(response.status).toBe(201);
        //comprobar el objeto
        expect(response.body).toBe(true);
        // Otra forma de hacerlo expect(response.body).toHaveProperty("firstname", newUser.firstname);
    });

    it("No debería encontrar el usuario si busca por ID", async() => {
        const response = await request(app).get(`/api/v1/users/${id}`);

        //5. Voy a comprobar que los datos que me regresa la solictud son los mismos que del usuario que acabo de crear
        expect(response.body).toBe("user no se encuentra");
    });
});