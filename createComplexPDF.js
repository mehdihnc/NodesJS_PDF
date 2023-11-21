// Importation des bibliothèques nécessaires
const PDFDocument = require('pdfkit'); // pdfkit est la bibliothèque utilisée pour créer des documents PDF.
const fs = require('fs'); // 'fs' (FileSystem) est utilisé pour interagir avec le système de fichiers, ici pour enregistrer le PDF.

// Création d'un nouveau document PDF
let doc = new PDFDocument(); // Initialise un nouveau document PDF.

// Configuration du flux de sortie pour écrire le PDF dans un fichier
doc.pipe(fs.createWriteStream('complexDocument.pdf')); // Crée un flux de sortie pour enregistrer le document PDF en tant que 'complexDocument.pdf'.

// Ajout de texte formaté dans le document
doc.font('Times-Roman') // Définit la police de caractères pour le texte suivant.
   .fontSize(24) // Définit la taille de la police pour le texte suivant.
   .fillColor('blue') // Définit la couleur du texte.
   .text('Bienvenue dans votre PDF!', 100, 100); // Ajoute le texte au document avec la position spécifiée (x: 100, y: 100).

// Insertion d'une image
doc.image('images/chat.jpg', { // Spécifie le chemin de l'image et les options.
     fit: [250, 300], // Adapte la taille de l'image à ces dimensions (largeur: 250, hauteur: 300).
     align: 'center', // Centre l'image horizontalement dans le document.
     valign: 'center' // Centre l'image verticalement dans le document.
});

// Ajout d'une liste de tâches
doc.moveDown(); // Déplace le curseur vers le bas pour séparer les sections.
doc.fontSize(14).fillColor('white'); // Réinitialise la taille de la police et la couleur pour la liste.
doc.text('Liste de tâches :', { underline: true }); // Ajoute un titre pour la liste avec un soulignement.
const tasks = ['Tâche 1', 'Tâche 2', 'Tâche 3']; // Définit un tableau de tâches.
tasks.forEach((task, index) => { // Itère sur chaque tâche et l'ajoute au document.
    doc.text(`${index + 1}. ${task}`); // Formatte et ajoute chaque tâche.
});

// Création d'un tableau simple
doc.moveDown(); // Déplace le curseur vers le bas.
doc.text('Emploi du temps :', { underline: true }); // Ajoute un titre pour l'emploi du temps.
const timetable = [['Lundi', 'Cours de NodeJS'], ['Mardi', 'Cours de PDFKit']]; // Définit un tableau pour l'emploi du temps.
timetable.forEach(row => { // Itère sur chaque ligne de l'emploi du temps et l'ajoute au document.
    doc.text(`${row[0]}: ${row[1]}`); // Formatte et ajoute chaque ligne de l'emploi du temps.
});

// Finalisation du document
doc.end(); // Indique la fin du document PDF. Après cette ligne, plus rien ne peut être ajouté au document.
