const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function processRmdFiles() {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    console.log('Creating content directory...');
    fs.mkdirSync(contentDir);
  }
  
  const rmdFiles = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.Rmd'));

  if (rmdFiles.length === 0) {
    console.log('No .Rmd files found in content directory');
    return;
  }

  console.log('Converting R Markdown files to HTML...');
  
  for (const file of rmdFiles) {
    const rmdPath = path.normalize(path.join(contentDir, file));
    const htmlPath = path.normalize(rmdPath.replace('.Rmd', '.html'));
    
    try {
      execSync(`Rscript -e "rmarkdown::render('${rmdPath.replace(/\\/g, '\\\\')}', output_format = 'html_fragment')"`, {
        stdio: 'inherit'
      });
      
      console.log(`Successfully converted ${file} to HTML`);
    } catch (error) {
      console.error(`Error converting ${file}:`, error.message);
    }
  }
}

processRmdFiles().catch(console.error);
