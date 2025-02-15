// Código creado por Deyin

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

var handler = async (m, { conn }) => {
  conn.reply(m.chat, '⚡ Iniciando el reemplazo de emojis en el repositorio...', m);

  const replaceEmojisInRepo = (folderPath) => {
    const emojisToReplace = {
      '🍭': '⚡',
      '🍬': '👑',
    };

    const processFile = (filePath) => {
      try {
        const content = readFileSync(filePath, 'utf8'); // Leer el archivo
        let updatedContent = content;

        // Reemplazar emojis en el contenido del archivo
        for (const [emoji, replacement] of Object.entries(emojisToReplace)) {
          updatedContent = updatedContent.replaceAll(emoji, replacement);
        }

        // Guardar cambios si se modificó el contenido
        if (content !== updatedContent) {
          writeFileSync(filePath, updatedContent, 'utf8');
          console.log(`✅ Emojis reemplazados en: ${filePath}`);
        }
      } catch (err) {
        console.error(`❌ Error al procesar el archivo ${filePath}:`, err);
      }
    };

    const traverseDirectory = (currentPath) => {
      const items = readdirSync(currentPath); // Leer el contenido del directorio
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = statSync(itemPath);

        if (stats.isDirectory()) {
          traverseDirectory(itemPath); // Recursión para carpetas
        } else if (stats.isFile()) {
          processFile(itemPath); // Procesar archivos
        }
      }
    };

    traverseDirectory(folderPath);
  };

  // Ruta del repositorio local (suponiendo que está en la raíz del proyecto)
  const repoPath = path.resolve('./'); // Usar la raíz del repositorio actual
  replaceEmojisInRepo(repoPath);

  // Hacer commit de los cambios en Git y subir al repositorio de GitHub
  try {
    // Añadir todos los archivos modificados
    execSync('git add .');
    console.log('🔧 Archivos añadidos a git');

    // Realizar commit con un mensaje de "Reemplazo de emojis"
    execSync('git commit -m "Reemplazo de emojis 🍭🍬 por ⚡👑"');
    console.log('✅ Commit realizado con éxito');

    // Subir los cambios al repositorio remoto
    execSync('git push');
    console.log('🚀 Cambios subidos al repositorio remoto');
    
    // Responder al usuario en WhatsApp
    conn.reply(m.chat, '✅ Reemplazo de emojis completado y cambios subidos al repositorio.', m);
  } catch (error) {
    console.error('❌ Error al hacer commit o push:', error);
    conn.reply(m.chat, '⚠️ Ocurrió un error al intentar subir los cambios al repositorio.', m);
  }
};

// Configuración del comando
handler.help = ['replace'];
handler.tags = ['owner'];
handler.command = ['replace']; // Comando que activa el script
handler.rowner = true; // Solo el dueño del bot puede usar este comando

export default handler;