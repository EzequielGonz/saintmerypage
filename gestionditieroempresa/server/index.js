const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db/database');
const path = require('path');
const multer = require('multer');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'ditiero_secret_key_2024';

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/profiles'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // límite de 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        body: req.body,
        headers: req.headers
    });
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..'))); // Servir archivos desde el directorio raíz

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/clientes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'clientes.html'));
});

app.get('/proyectos', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'proyectos.html'));
});

app.get('/configuracion', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'configuracion.html'));
});

// Middleware de autenticación
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No se proporcionó token');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await db.findUserById(decoded.id);
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(401).json({ error: 'Por favor autentíquese.' });
    }
};

// Middleware para verificar permisos
const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user.permisos.includes(permission)) {
            return res.status(403).json({ error: 'No tiene permiso para realizar esta acción' });
        }
        next();
    };
};

// Rutas de autenticación
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, nombre } = req.body;
        
        if (!email || !password || !nombre) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const existingUser = await db.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const user = await db.createUser({ 
            email, 
            password, 
            nombre,
            fotoPerfil: '/profiles/default.jpg',
            permisos: ['usuario']
        });
        
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        console.log('Cuerpo de la petición:', req.body);
        const { email, password } = req.body;
        
        console.log('Intento de login para:', email);
        console.log('Contraseña recibida:', password);
        
        if (!email || !password) {
            console.log('Faltan credenciales');
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const user = await db.findUserByEmail(email);
        console.log('Usuario encontrado:', user ? 'Sí' : 'No');
        if (user) {
            console.log('Detalles del usuario:', {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                rol: user.rol,
                password: user.password // Solo para depuración
            });
        }
        
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        const isValidPassword = await db.verifyPassword(password, user.password);
        console.log('Contraseña válida:', isValidPassword ? 'Sí' : 'No');
        
        if (!isValidPassword) {
            console.log('Contraseña inválida');
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }
        
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        const { password: _, ...userWithoutPassword } = user;
        
        console.log('Login exitoso');
        res.json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(400).json({ error: error.message });
    }
});

// Ruta para actualizar foto de perfil
app.post('/api/profile/photo', auth, upload.single('foto'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
        }

        const fotoPerfil = '/profiles/' + req.file.filename;
        await db.updateUserProfile(req.user.id, { fotoPerfil });
        
        res.json({ fotoPerfil });
    } catch (error) {
        console.error('Error al actualizar foto de perfil:', error);
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener perfil del usuario
app.get('/api/profile', auth, async (req, res) => {
    try {
        const { password, ...userWithoutPassword } = req.user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ error: 'Error al obtener perfil' });
    }
});

// Rutas de administración de usuarios
app.get('/api/users', auth, checkPermission('gestion_usuarios'), async (req, res) => {
    try {
        const users = await db.findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/users/:id', auth, checkPermission('gestion_usuarios'), async (req, res) => {
    try {
        const user = await db.findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await db.deleteUser(user.id);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/users/:id/role', auth, checkPermission('gestion_usuarios'), async (req, res) => {
    try {
        const { role, permisos } = req.body;
        if (!['admin', 'usuario'].includes(role)) {
            return res.status(400).json({ error: 'Rol inválido' });
        }

        const user = await db.findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await db.updateUserRole(user.id, role, permisos);
        res.json({
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            rol: role,
            permisos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rutas para proyectos
app.get('/api/proyectos', auth, async (req, res) => {
    try {
        const proyectos = await db.getAllProyectos();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/proyectos', auth, checkPermission('gestion_proyectos'), async (req, res) => {
    try {
        const proyecto = await db.createProyecto(req.body);
        res.status(201).json(proyecto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/proyectos/:id', auth, checkPermission('gestion_proyectos'), async (req, res) => {
    try {
        const proyecto = await db.updateProyecto(req.params.id, req.body);
        res.json(proyecto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/proyectos/:id', auth, checkPermission('gestion_proyectos'), async (req, res) => {
    try {
        await db.deleteProyecto(req.params.id);
        res.json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para clientes
app.get('/api/clientes', auth, async (req, res) => {
    try {
        const clientes = await db.getAllClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/clientes', auth, checkPermission('gestion_clientes'), async (req, res) => {
    try {
        const cliente = await db.createCliente(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/clientes/:id', auth, checkPermission('gestion_clientes'), async (req, res) => {
    try {
        const cliente = await db.updateCliente(req.params.id, req.body);
        res.json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/clientes/:id', auth, checkPermission('gestion_clientes'), async (req, res) => {
    try {
        await db.deleteCliente(req.params.id);
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 