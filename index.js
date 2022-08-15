// import { splitManualPDF } from './pdf-lib-function/index.js';
// import { updateWorkspace } from './wa-function/index.js';
import { calculateIconsPositions } from './get-specific-icon-position-function/index.js';

console.log('started');

// splitManualPDF('./pdf-lib-function/config/pdfCopy', './pdf-lib-function/dist', 'P18F4520', 'P18F4520 manual.pdf', 10);

// updateWorkspace('2020-04-01', '', 'https://gateway.watsonplatform.net/assistant/api', '');

const positions = calculateIconsPositions(1920, 7, 90, 90, 65, 85, 10, 10, 1);

console.log('odd row: ', positions[0].join(', '));
console.log('even row: ', positions[1].join(', '));



console.log('done');