import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export function splitManualPDF(sourceFolder, destinationParentFolder, storeFolderName, fileName, splitSize) {
    const pdfCopyFolder = sourceFolder;
  
    if(fs.existsSync(pdfCopyFolder + '/' + fileName)) {
  
        const uint8Array = fs.readFileSync(pdfCopyFolder + '/' + fileName);
        PDFDocument.load(uint8Array)
        .then(async (originalPdf) => {
            const manualSplitFolderName = destinationParentFolder;
            if(!fs.existsSync(manualSplitFolderName)) {
                fs.mkdirSync(manualSplitFolderName);
            }
    
            const folderName = manualSplitFolderName + '/' + storeFolderName;
            if(!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
            let originalPdfLength = originalPdf.getPages().length;
            let index = 0;
            let splitOriginalPdfArray = [];
            let splitCounter = 0;
            let singleSplitArray = [];
        
            while( index < originalPdfLength) {
                splitCounter++;
                singleSplitArray.push(index);
                
                index++;
                if(splitCounter === splitSize || index === originalPdfLength) {
                    splitCounter = 0;
                    splitOriginalPdfArray.push(singleSplitArray);
                    singleSplitArray = [];
                }
            }
    
            let partCount = 0;
            for(let singleSplitArr of splitOriginalPdfArray) {
                partCount++;
                const pdfDoc = await PDFDocument.create();
                const pdfPages = await pdfDoc.copyPages(originalPdf, singleSplitArr);
                for(let i = 0, len = pdfPages.length; i < len; i++) {
                    pdfDoc.addPage(pdfPages[i]);
                }
                const pdfBytes = await pdfDoc.save();
                const filePath = folderName + '/' + fileName + ' Part ' + partCount + '.pdf';
                fs.writeFileSync(filePath, pdfBytes);
            }
        }).then(() => {
            console.log('Finish Split PDF');
        });
    }
}