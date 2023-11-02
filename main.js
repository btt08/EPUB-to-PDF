const path = require('path');
const fs = require('fs');
const ebookConverter = require('node-ebook-converter');

const mainPath = path.join(__dirname, 'input');
const output = path.join(__dirname, 'output');

const run = () => {
  const filesToConvert = getFiles(mainPath);

  filesToConvert.forEach((file, index) => {
    const fileName = (file.split('\\').slice(-1) + '').replace('.epub', '');
    ebookConverter.convert({
      input: file,
      output: path.join(output, fileName + '.pdf')
    }).then(response => {
      console.log(response.output);
      console.log(`${index} de ${filesToConvert.length}}`);
      console.log('Duration: ' + response.duration);
    })
      .catch(error => console.error(error));
  })
}

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);

  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}
