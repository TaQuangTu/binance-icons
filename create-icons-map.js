const fs = require('fs');
const path = require('path');

// Path to crypto icons
const cryptoIconsDir = path.join(__dirname, 'icons', 'currency');

// Function to read SVG files and create the map
async function createIconsMap() {
  // Check if directory exists
  if (!fs.existsSync(cryptoIconsDir)) {
    console.error(`Directory not found: ${cryptoIconsDir}`);
    return;
  }

  // Read all files in the directory
  const files = fs.readdirSync(cryptoIconsDir);
  
  // Filter for SVG files only
  const svgFiles = files.filter(file => file.toLowerCase().endsWith('.svg'));
  
  // Create map entries
  const mapEntries = [];
  
  for (const file of svgFiles) {
    try {
      // Extract name from filename (remove .svg extension)
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
const binanceCurrencyIcons: Map<string, string> = new Map([
${mapEntries.join(',\n')}
]);

export default binanceCurrencyIcons;
`;

  // Write to output file
  const outputFile = path.join(__dirname, 'currency-icons-map.ts');
  fs.writeFileSync(outputFile, output, 'utf8');
  
  console.log(`Successfully created ${outputFile} with ${mapEntries.length} icons`);
}

// Run the function
createIconsMap().catch(console.error);