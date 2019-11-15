const db = require("../database/db-config");

module.exports = {
    get,
    getById,
    add,
    update,
    remove
}

function get() {
    return db('workers');
};

function getById(id) {
    return db('workers').where({ id }).first();
};

function add(worker){
    return db('workers')
        .insert(worker)
        .then(([id]) => getById(id));
};

function update(id, worker){
    return db('workers')
        .where({ id })
        .update(worker);
};

function remove(id){
    return db('workers')
        .where({ id })
        .del();
};