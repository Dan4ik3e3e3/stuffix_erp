const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'Strelok101';
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('Hashed password:', hashedPassword);
}

hashPassword(); 