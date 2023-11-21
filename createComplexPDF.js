// Importation des bibliothèques nécessaires
// pdfkit est utilisé pour la création du document PDF, et fs (File System) est nécessaire pour sauvegarder le fichier PDF sur le disque.
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Initialisation d'un nouveau document PDF
// Ici, un nouveau document PDF est créé. C'est le point de départ pour toute création de contenu dans le PDF.
let doc = new PDFDocument();

// Configuration du fichier de sortie pour le document PDF
// Cette ligne configure le document pour qu'il soit écrit dans un fichier nommé 'complexDocument.pdf' sur votre système.
doc.pipe(fs.createWriteStream('complexDocument.pdf'));

// Ajout de texte formaté au document
// Dans cette section, nous ajoutons du texte au document. Nous définissons la police, la taille, la couleur et le contenu du texte, ainsi que sa position dans le document.
doc.font('Times-Roman').fontSize(24).fillColor('blue').text('Bienvenue dans votre PDF!', 100, 100);

// Insertion d'une image dans le document
// Ce bloc ajoute une image au PDF. Vous devez fournir le chemin de l'image et vous pouvez également spécifier sa taille et sa position.
doc.image('images/chat.jpg', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
});

// Ajout d'une liste de tâches
// Ici, nous ajoutons une liste de tâches au document. Chaque tâche est ajoutée individuellement avec un numéro d'ordre.
doc.moveDown();
doc.fontSize(14).fillColor('white').text('Liste de tâches :', { underline: true });
const tasks = ['Tâche 1', 'Tâche 2', 'Tâche 3'];
tasks.forEach((task, index) => {
    doc.text(`${index + 1}. ${task}`);
});

// Création et ajout d'un tableau simple au document
// Cette section crée un tableau simple sous forme de texte. Chaque ligne du tableau est ajoutée séparément.
doc.moveDown();
doc.text('Emploi du temps :', { underline: true });
const timetable = [['Lundi', 'Cours de NodeJS'], ['Mardi', 'Cours de PDFKit']];
timetable.forEach(row => {
    doc.text(`${row[0]}: ${row[1]}`);
});

// Finalisation du document PDF
// Cette ligne marque la fin du document. Après cette commande, plus aucun contenu ne peut être ajouté au PDF.
doc.end();
