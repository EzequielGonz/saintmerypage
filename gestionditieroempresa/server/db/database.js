const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'users.json');
const PROYECTOS_PATH = path.join(__dirname, 'proyectos.json');
const CLIENTES_PATH = path.join(__dirname, 'clientes.json');

// Función para leer la base de datos
async function readDB() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer la base de datos:', error);
        throw new Error('Error al acceder a la base de datos');
    }
}

// Función para escribir en la base de datos
async function writeDB(data) {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 4));
    } catch (error) {
        console.error('Error al escribir en la base de datos:', error);
        throw new Error('Error al guardar en la base de datos');
    }
}

// Función para encontrar un usuario por email
async function findUserByEmail(email) {
    try {
        const db = await readDB();
        console.log('Buscando usuario con email:', email);
        console.log('Usuarios en la base de datos:', db.users.map(u => u.email));
        const user = db.users.find(user => user.email === email);
        console.log('Usuario encontrado:', user ? 'Sí' : 'No');
        return user;
    } catch (error) {
        console.error('Error al buscar usuario por email:', error);
        throw new Error('Error al buscar usuario');
    }
}

// Función para encontrar un usuario por ID
async function findUserById(id) {
    try {
        const db = await readDB();
        return db.users.find(user => user.id === parseInt(id));
    } catch (error) {
        console.error('Error al buscar usuario por ID:', error);
        throw new Error('Error al buscar usuario');
    }
}

// Función para crear un nuevo usuario
async function createUser(userData) {
    try {
        const db = await readDB();
        const newId = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const newUser = {
            id: newId,
            email: userData.email,
            password: hashedPassword,
            nombre: userData.nombre,
            rol: userData.rol || 'usuario',
            fotoPerfil: userData.fotoPerfil || '/profiles/default.jpg',
            permisos: userData.permisos || ['usuario']
        };
        
        db.users.push(newUser);
        await writeDB(db);
        
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('Error al crear usuario');
    }
}

// Función para verificar la contraseña
async function verifyPassword(plainPassword, hashedPassword) {
    try {
        console.log('Verificando contraseña...');
        console.log('Contraseña proporcionada:', plainPassword);
        console.log('Hash almacenado:', hashedPassword);
        const isValid = await bcrypt.compare(plainPassword, hashedPassword);
        console.log('Resultado de la verificación:', isValid);
        return isValid;
    } catch (error) {
        console.error('Error al verificar contraseña:', error);
        throw new Error('Error al verificar credenciales');
    }
}

// Función para actualizar el perfil del usuario
async function updateUserProfile(userId, updates) {
    try {
        const db = await readDB();
        const userIndex = db.users.findIndex(user => user.id === parseInt(userId));
        
        if (userIndex === -1) {
            throw new Error('Usuario no encontrado');
        }

        db.users[userIndex] = {
            ...db.users[userIndex],
            ...updates
        };

        await writeDB(db);
        const { password, ...userWithoutPassword } = db.users[userIndex];
        return userWithoutPassword;
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        throw new Error('Error al actualizar perfil');
    }
}

// Función para actualizar el rol y permisos del usuario
async function updateUserRole(userId, role, permisos) {
    try {
        const db = await readDB();
        const userIndex = db.users.findIndex(user => user.id === parseInt(userId));
        
        if (userIndex === -1) {
            throw new Error('Usuario no encontrado');
        }

        db.users[userIndex].rol = role;
        db.users[userIndex].permisos = permisos;

        await writeDB(db);
        return db.users[userIndex];
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        throw new Error('Error al actualizar rol');
    }
}

// Función para obtener todos los usuarios
async function findAllUsers() {
    try {
        const db = await readDB();
        return db.users.map(({ password, ...user }) => user);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('Error al obtener usuarios');
    }
}

// Funciones para proyectos
async function getAllProyectos() {
    try {
        const data = await fs.readFile(PROYECTOS_PATH, 'utf8');
        return JSON.parse(data).proyectos;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw new Error('Error al obtener proyectos');
    }
}

async function createProyecto(proyectoData) {
    try {
        const data = await fs.readFile(PROYECTOS_PATH, 'utf8');
        const db = JSON.parse(data);
        const newId = db.proyectos.length > 0 ? Math.max(...db.proyectos.map(p => p.id)) + 1 : 1;
        
        const newProyecto = {
            id: newId,
            ...proyectoData,
            fechaCreacion: new Date().toISOString()
        };
        
        db.proyectos.push(newProyecto);
        await fs.writeFile(PROYECTOS_PATH, JSON.stringify(db, null, 4));
        return newProyecto;
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        throw new Error('Error al crear proyecto');
    }
}

// Funciones para clientes
async function getAllClientes() {
    try {
        const data = await fs.readFile(CLIENTES_PATH, 'utf8');
        return JSON.parse(data).clientes;
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw new Error('Error al obtener clientes');
    }
}

async function createCliente(clienteData) {
    try {
        const data = await fs.readFile(CLIENTES_PATH, 'utf8');
        const db = JSON.parse(data);
        const newId = db.clientes.length > 0 ? Math.max(...db.clientes.map(c => c.id)) + 1 : 1;
        
        const newCliente = {
            id: newId,
            ...clienteData,
            fechaCreacion: new Date().toISOString()
        };
        
        db.clientes.push(newCliente);
        await fs.writeFile(CLIENTES_PATH, JSON.stringify(db, null, 4));
        return newCliente;
    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw new Error('Error al crear cliente');
    }
}

// Función para actualizar un cliente
async function updateCliente(id, updates) {
    try {
        const data = await fs.readFile(CLIENTES_PATH, 'utf8');
        const db = JSON.parse(data);
        const clienteIndex = db.clientes.findIndex(c => c.id === parseInt(id));
        
        if (clienteIndex === -1) {
            throw new Error('Cliente no encontrado');
        }

        db.clientes[clienteIndex] = {
            ...db.clientes[clienteIndex],
            ...updates,
            id: parseInt(id) // Mantener el ID original
        };

        await fs.writeFile(CLIENTES_PATH, JSON.stringify(db, null, 4));
        return db.clientes[clienteIndex];
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        throw new Error('Error al actualizar cliente');
    }
}

// Función para eliminar un cliente
async function deleteCliente(id) {
    try {
        const data = await fs.readFile(CLIENTES_PATH, 'utf8');
        const db = JSON.parse(data);
        const clienteIndex = db.clientes.findIndex(c => c.id === parseInt(id));
        
        if (clienteIndex === -1) {
            throw new Error('Cliente no encontrado');
        }

        db.clientes.splice(clienteIndex, 1);
        await fs.writeFile(CLIENTES_PATH, JSON.stringify(db, null, 4));
        return true;
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        throw new Error('Error al eliminar cliente');
    }
}

// Función para actualizar un proyecto
async function updateProyecto(id, updates) {
    try {
        const data = await fs.readFile(PROYECTOS_PATH, 'utf8');
        const db = JSON.parse(data);
        const proyectoIndex = db.proyectos.findIndex(p => p.id === parseInt(id));
        
        if (proyectoIndex === -1) {
            throw new Error('Proyecto no encontrado');
        }

        db.proyectos[proyectoIndex] = {
            ...db.proyectos[proyectoIndex],
            ...updates,
            id: parseInt(id) // Mantener el ID original
        };

        await fs.writeFile(PROYECTOS_PATH, JSON.stringify(db, null, 4));
        return db.proyectos[proyectoIndex];
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        throw new Error('Error al actualizar proyecto');
    }
}

// Función para eliminar un proyecto
async function deleteProyecto(id) {
    try {
        const data = await fs.readFile(PROYECTOS_PATH, 'utf8');
        const db = JSON.parse(data);
        const proyectoIndex = db.proyectos.findIndex(p => p.id === parseInt(id));
        
        if (proyectoIndex === -1) {
            throw new Error('Proyecto no encontrado');
        }

        db.proyectos.splice(proyectoIndex, 1);
        await fs.writeFile(PROYECTOS_PATH, JSON.stringify(db, null, 4));
        return true;
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        throw new Error('Error al eliminar proyecto');
    }
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    verifyPassword,
    updateUserProfile,
    updateUserRole,
    findAllUsers,
    getAllProyectos,
    createProyecto,
    updateProyecto,
    deleteProyecto,
    getAllClientes,
    createCliente,
    updateCliente,
    deleteCliente
}; 