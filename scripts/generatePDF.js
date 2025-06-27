const PDFDocument = require('pdfkit');
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

async function generateInsurancePDF(data) {
  const doc = new PDFDocument();
  const outputFileName = `Insurance_${data.farmerName.replace(/\s/g, '_')}.pdf`;
  doc.pipe(fs.createWriteStream(outputFileName));

  // Load logo
  const logoBase64 = await imageToBase64('./assets/logo.png');

  // Add Logo
  doc.image(Buffer.from(logoBase64, 'base64'), 50, 30, { width: 80 });
  doc.fontSize(22).text('AGRI INSURE BLOCKCHAIN', 150, 50);
  doc.fontSize(16).text('Insurance Certificate', 150, 80);
  doc.moveDown(2);

  // Draw table-like section
  doc.rect(50, 140, 500, 170).stroke();

  let y = 150;
  const rowGap = 25;
  const leftX = 60, rightX = 230;

  const info = [
    ['Farmer Name:', data.farmerName],
    ['Contact:', data.contact],
    ['Policy No.:', data.policyNo],
    ['Contract Address:', data.contractAddress],
    ['Issued On:', data.issueDate],
  ];

  info.forEach(([label, value]) => {
    doc.fontSize(12).text(label, leftX, y).text(value, rightX, y);
    y += rowGap;
  });

  // Footer
  doc.fontSize(11).text('This certificate is digitally generated on Blockchain for insurance verification purposes.', 50, 330, { align: 'center' });
  doc.text('Verified & Powered by Agri DApp Hackathon 2025', 50, 350, { align: 'center' });

  doc.end();
  console.log(`PDF generated for ${data.farmerName}: ${outputFileName}`);
}

// Read farmer data JSON
const farmerData = JSON.parse(fs.readFileSync('./farmersData.json'));

// Generate PDF for each farmer
farmerData.forEach(farmer => {
  generateInsurancePDF(farmer);
});
