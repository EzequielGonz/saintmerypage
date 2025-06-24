const bcrypt = require('bcryptjs');

async function testHash() {
    const password = 'Mandycat01';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña original:', password);
    console.log('Hash generado:', hashedPassword);
    
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('¿La contraseña coincide con el hash?:', isValid);
}

testHash(); 