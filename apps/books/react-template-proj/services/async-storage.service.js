export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save,
};

function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return new Promise(resolve => setTimeout(() => resolve(entities), delay));
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId);
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`);
        return entity;
    });
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve(value); // Optional: Return the value for chaining
}

function post(entityType, newEntity) {
    newEntity = { ...newEntity };
    newEntity.id = _makeId();
    return query(entityType).then(entities => {
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    });
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id);
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`);
        entities[idx] = { ...entities[idx], ...updatedEntity };
        _save(entityType, entities);
        return updatedEntity;
    });
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId);
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`);
        entities.splice(idx, 1);
        _save(entityType, entities);
    });
}

// Private functions
function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
    console.log(`Saved ${entities.length} entities to ${entityType}`);
}

function _makeId(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
