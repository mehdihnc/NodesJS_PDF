// Importation de 'pdfkit' pour la création de documents PDF et de 'fs' pour écrire le fichier PDF sur le disque.
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Initialisation d'un document PDF et configuration de son flux de sortie pour enregistrer dans 'complexDocument.pdf'.
let doc = new PDFDocument();
doc.pipe(fs.createWriteStream('complexDocument.pdf'));

// Ajout de texte formaté au PDF, en spécifiant la police, la taille, la couleur et la position.
doc.font('Times-Roman').fontSize(24).fillColor('blue').text('Bienvenue dans votre PDF!', 100, 100);

// Insertion d'une image en définissant son chemin, sa taille ajustée et son positionnement dans le document.
doc.image('images/chat.jpg', {fit: [250, 300], align: 'center', valign: 'center'});

// Ajout d'une liste de tâches, en utilisant une boucle pour générer chaque item de la liste.
doc.moveDown();
doc.fontSize(14).fillColor('white').text('Liste de tâches :', { underline: true });
const tasks = ['Tâche 1', 'Tâche 2', 'Tâche 3'];
tasks.forEach((task, index) => {
    doc.text(`${index + 1}. ${task}`);
});

// Création d'un tableau simple pour l'emploi du temps, en affichant chaque jour et activité associée.
doc.moveDown();
doc.text('Emploi du temps :', { underline: true });
const timetable = [['Lundi', 'Cours de NodeJS'], ['Mardi', 'Cours de PDFKit']];
timetable.forEach(row => {
    doc.text(`${row[0]}: ${row[1]}`);
});

// Finalisation du document, indiquant que le PDF est complet et prêt à être sauvegardé.
doc.end();
