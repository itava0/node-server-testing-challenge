const request = require("supertest");

const server = require("../api/server");
const db = require("../database/db-config");
const { 
    get, 
    getById, 
    add,
    update,
    remove
} = require("../models/workers-model");

describe("Workers Routes", () => {
    beforeEach( async () => {
        await db('workers').truncate();
    });
   
    describe("GET /api/workers", () => {
        it('Should return status code 200', () => {
            return request(server).get("/api/workers").then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('Should return length of workers table from database', async () => {
            const workers = await get();
            expect(workers).toHaveLength(0);
        });
    });

    
    describe("GET /api/workers/:id", () => {
        it('Should return status code 200', () => {
            return request(server).get("/api/workers/:id").then(res => {
                expect(res.status).toBe(200);
            });
        });
        
        it('Should return the a worker object', async () => {
            await db('workers').insert({
                "name": "Mitch",
                "industry": "tech",
                "position": "data scientist"
            })
            const worker = await getById(1);
            expect(typeof worker).toBe('object');
            expect(worker.name).toBeDefined();
        });
    });
    
    describe("POST /api/workers", () => {
        it("Should return the worker provided", async () => {
            const worker = await add({
                "name": "Mitch",
                "industry": "tech",
                "position": "data scientist"
            });

            await expect(worker.name).toBe("Mitch");
            await expect(worker.id).toBeDefined();
        });

        it("Should respond with status code 201", async () => {
            const worker = {
                "name": "Mitch",
                "industry": "tech",
                "position": "data scientist"
            };

            const res = await request(server).post("/api/workers").send(worker);
            await expect(res.status).toBe(201);
        });
    });

    describe("PUT /api/workers/:id", () => {
        it("Returns status code 201", async () => {
            await db('workers').insert({
                "name": "Mitch",
                "industry": "tech",
                "position": "data scientist"
            });

            const updatedWorker = {
                "name": "Michelle",
                "industry": "tech",
                "position": "data scientist"
            };

            const res = await request(server)
                .put("/api/workers/:id")
                .send(updatedWorker);
            await expect(res.status).toBe(201);
        });
    });

    describe("DELETE /api/workers/:id", () => {
        it("Returns amount of records deleted", async () => {
            await add({
                "name": "Mitch",
                "industry": "tech",
                "position": "data scientist"
            });

            const removedRecords = await remove(1);
            await expect(removedRecords).toBe(1);
        });

        it("Returns status code 200", async () => {
            const res = await request(server).delete("/api/workers/:id");
            await expect(res.status).toBe(200);
        });
    });
});