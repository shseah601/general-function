import { splitManualPDF } from './pdf-lib-function/index.js';
import { updateWorkspace } from './wa-function/index.js';

console.log('started');

splitManualPDF('./pdf-lib-function/config/pdfCopy', './pdf-lib-function/dist', 'P18F4520', 'P18F4520 manual.pdf', 10);

// updateWorkspace('2020-04-01', '', 'https://gateway.watsonplatform.net/assistant/api', '');

console.log('done');