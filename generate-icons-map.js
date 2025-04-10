const fs = require('fs');
const path = require('path');

// Function to read SVG files and create the map
async function createIconsMap(inputIconDir, outputMaps, outputIconFile) {
  const outputFile = path.join(__dirname, outputIconFile);
  const cryptoIconsDir = path.join(__dirname, 'icons', inputIconDir);
  if (!fs.existsSync(cryptoIconsDir)) return;

  const files = fs.readdirSync(cryptoIconsDir);
  const svgFiles = files.filter(file => file.toLowerCase().endsWith('.svg'));
  
  const mapEntries = [];
  
  for (const file of svgFiles) {
    try {
      const name = file.replace('.svg', '').toLowerCase();
      
      // Read SVG content
      const svgContent = fs.readFileSync(path.join(cryptoIconsDir, file), 'utf8');
      
      // Add to map entries
      mapEntries.push(`  ['${name}', '${svgContent.replace(/'/g, "\\'")}']`);
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  }
  

  // Create the final output
  const output = `
const ${outputMaps}: Map<string, string> = new Map([
${mapEntries.join(',\n')}
]);

export const ${outputMaps};

`;
  console.log({outputFile, output})
  fs.writeFileSync(outputFile, output, 'utf8');
}



[{
    'inputIconDir': 'crypto',
    'outputMaps': 'binanceCryptoIcons',
    'outputIconFile': 'binance-crypto-icons.ts'
},  
{
    'inputIconDir': 'currency',
    'outputMaps': 'binanceCurrencyIcons',
    'outputIconFile': 'binance-currency-icons.ts'
}].forEach((current) => {
    createIconsMap(current.inputIconDir, current.outputMaps, current.outputIconFile).catch(console.error);
});


