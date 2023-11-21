// Importation des bibliothèques nécessaires
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Création d'un nouveau document PDF
let doc = new PDFDocument();

// Configuration du flux de sortie pour écrire le PDF dans un fichier
doc.pipe(fs.createWriteStream('complexDocument.pdf'));

doc.font('Times-Roman')
   .fontSize(24)
   .fillColor('blue')
   .text('Bienvenue dans votre PDF!', 100, 100);

doc.image('images/chat.jpg', {
     fit: [250, 300],
     align: 'center',
     valign: 'center'
});

doc.moveDown();
doc.fontSize(14).fillColor('white');
doc.text('Liste de tâches :', { underline: true });
const tasks = ['Tâche 1', 'Tâche 2', 'Tâche 3'];
tasks.forEach((task, index) => {
    doc.text(`${index + 1}. ${task}`);
});

// Création d'un tableau simple
doc.moveDown();
doc.text('Emploi du temps :', { underline: true });
const timetable = [['Lundi', 'Cours de NodeJS'], ['Mardi', 'Cours de PDFKit']];
timetable.forEach(row => {
    doc.text(`${row[0]}: ${row[1]}`); // Affichage de chaque ligne de l'emploi du temps
});

// Finalisation du document
doc.end();
