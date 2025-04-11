const fs = require('fs');
const path = require('path');

/**
 * Creates a map of icon names to SVG content
 * @param {string} inputIconDir - Directory containing SVG icons
 * @param {string} outputMapName - Name of the map variable to export
 * @param {string} outputIconFile - Output file path
 * @returns {string} - The name of the exported map for inclusion in index.ts
 */
async function createIconsMap(inputIconDir, outputMapName, outputIconFile) {
  const outputFile = path.join(__dirname, 'src', outputIconFile);
  const iconsDir = path.join(__dirname, 'icons', inputIconDir);
  
  if (!fs.existsSync(iconsDir)) {
    console.warn(`Directory not found: ${iconsDir}`);
    return null;
  }

  const files = fs.readdirSync(iconsDir);
  const svgFiles = files.filter(file => file.toLowerCase().endsWith('.svg'));
  
  console.log(`Processing ${svgFiles.length} SVG files from ${inputIconDir}`);
  
  const mapEntries = [];
  
  for (const file of svgFiles) {
    try {
      const name = file.replace('.svg', '').toLowerCase();
      
      // Read SVG content
      const svgContent = fs.readFileSync(path.join(iconsDir, file), 'utf8');
      
      // Process SVG content
      const processedSvg = processSvgContent(svgContent);
      
      // Add to map entries
      mapEntries.push(`  ['${name}', ${JSON.stringify(processedSvg)}]`);
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  }
  
  // Create the final output
  const output = `// Auto-generated file from ${inputIconDir} SVGs
  
export const ${outputMapName}: Map<string, string> = new Map([
${mapEntries.join(',\n')}
]);
`;

  // Ensure src directory exists
  const srcDir = path.join(__dirname, 'src');
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  console.log(`Writing ${mapEntries.length} icons to ${outputFile}`);
  fs.writeFileSync(outputFile, output, 'utf8');
  
  return outputMapName;
}

/**
 * Process SVG content to ensure it's properly formatted
 * @param {string} svgContent - Raw SVG content
 * @returns {string} - Processed SVG content
 */
function processSvgContent(svgContent) {
  // Remove unnecessary whitespace and line breaks
  let processed = svgContent
    .replace(/\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  
  // Make sure SVG has proper xmlns attribute if needed
  if (!processed.includes('xmlns="http://www.w3.org/2000/svg"')) {
    processed = processed.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Remove any comments
  processed = processed.replace(/<!--[\s\S]*?-->/g, '');
  
  return processed;
}

/**
 * Update or create the main index.ts file with exports for all icon maps
 * @param {string[]} mapNames - Names of the maps to export
 */
function updateIndexFile(mapNames) {
  const indexPath = path.join(__dirname, 'src', 'index.ts');
  
  // Create import statements
  const imports = mapNames
    .map(name => `import { ${name} } from './${getFilenameFromMapName(name)}';`)
    .join('\n');
  
  // Create export statements
  const exports = `export { ${mapNames.join(', ')} };`;
  
  // Create the complete index file content
  const indexContent = `// Auto-generated index file for SVG icon maps
${imports}

${exports}
`;

  console.log(`Updating index.ts with exports for: ${mapNames.join(', ')}`);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
}

/**
 * Convert map name to filename
 * @param {string} mapName - The map variable name
 * @returns {string} - The corresponding filename without extension
 */
function getFilenameFromMapName(mapName) {
  // Convert camelCase to kebab-case
  return mapName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/^binance-/, '');
}

// Configuration for different icon sets
const iconSets = [
  {
    'inputIconDir': 'crypto',
    'outputMapName': 'binanceCryptoIcons',
    'outputIconFile': 'crypto-icons.ts'
  },  
  {
    'inputIconDir': 'currency',
    'outputMapName': 'binanceCurrencyIcons',
    'outputIconFile': 'currency-icons.ts'
  }
];

// Process each icon set and update index.ts
(async () => {
  const successfulMaps = [];
  
  // Process all icon sets
  for (const config of iconSets) {
    try {
      const mapName = await createIconsMap(
        config.inputIconDir, 
        config.outputMapName, 
        config.outputIconFile
      );
      
      if (mapName) {
        successfulMaps.push(mapName);
      }
    } catch (error) {
      console.error(`Error processing ${config.inputIconDir}: ${error.message}`);
    }
  }
  
  // Update index.ts with all successful maps
  if (successfulMaps.length > 0) {
    updateIndexFile(successfulMaps);
  }
})();