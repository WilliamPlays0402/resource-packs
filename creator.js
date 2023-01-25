const fs = require('fs');
function prompt(question) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    const stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', data => {
      resolve(data.toString().trim())
      stdin.pause();
    });
  });
}

var dir = './output';

function name() {
  prompt('Name of resource pack? (x to eXit|leave empty to skip) ').then(answer => {
    if (answer.toLowerCase() === ('x' || 'exit')) {
      console.log('Exiting...');
      process.exit();
    }
    if (answer.toLowerCase() === 'template') {
      console.log('You can\'t use the template name. Please try again.');
      name();
    }
    if (answer === '') {
      return top();
    }
    dir = './' + answer;
    // if output folder already exists, skip this part and go to top()
    if (fs.existsSync('./' + answer)) {
      console.log('Output folder already exists. Skipping...');
      return top();
    }
    // make the output folder
    fs.mkdirSync('./' + answer, { recursive: true });
    // ask user for options (for pack.mcmeta)
    prompt('Description of resource pack? ').then(desc => {
      prompt('Pack format? (leave empty for 1.19.3) ').then(version => {
        if (version === '') {
          format = '12';
        }
        // look up table:
        /* 1.6.1 - 1.8.9: 1
        1.9 - 1.10.2: 2
        1.11 - 1.12.2: 3
        1.13 - 1.14.4: 4
        1.15 - 1.16.1: 5
        1.16.2 - 1.16.5: 6
        1.17.x: 7
        1.18.x: 8
        1.19 - 1.19.2: 9
        1.19.3: 12 */
        if (version === '1.6.1' || version === '1.6.2' || version === '1.6.3' || version === '1.6.4' || version === '1.7.2' || version === '1.7.10' || version === '1.8.1' || version === '1.8.2' || version === '1.8.3' || version === '1.8.4' || version === '1.8.5' || version === '1.8.6' || version === '1.8.7' || version === '1.8.8' || version === '1.8.9') {
          format = '1';
        } else if (version === '1.9' || version === '1.9.1' || version === '1.9.2' || version === '1.9.3' || version === '1.9.4' || version === '1.10' || version === '1.10.1' || version === '1.10.2') {
          format = '2';
        }
        else if (version === '1.11' || version === '1.11.1' || version === '1.11.2' || version === '1.12' || version === '1.12.1' || version === '1.12.2') {
          format = '3';
        }
        else if (version === '1.13' || version === '1.13.1' || version === '1.13.2' || version === '1.14' || version === '1.14.1' || version === '1.14.2' || version === '1.14.3' || version === '1.14.4') {
          format = '4';
        }
        else if (version === '1.15' || version === '1.15.1' || version === '1.15.2' || version === '1.16' || version === '1.16.1') {
          format = '5';
        }
        else if (version === '1.16.2' || version === '1.16.3' || version === '1.16.4' || version === '1.16.5') {
          format = '6';
        }
        else if (version === '1.17' || version === '1.17.1') {
          format = '7';
        }
        else if (version === '1.18' || version === '1.18.1' || version === '1.18.2') {
          format = '8';
        }
        else if (version === '1.19' || version === '1.19.1' || version === '1.19.2') {
          format = '9';
        }
        else if (version === '1.19.3') {
          format = '12';
        }
        else {
          console.log('Invalid version. Defaulting to 1.19.3');
          format = '12';
        }
        // write the pack.mcmeta file
        fs.writeFileSync('./'+ answer +'/pack.mcmeta', '{\n  "pack": {\n    "pack_format": ' + format + ',\n    "description": "' + desc + '"\n  }\n}');
        // copy the pack.png file (if there is one)
        try {
          fs.copyFileSync('./template/pack.png', './' + answer + '/pack.png');
        } catch (err) {
          console.log('No pack.png file found. Skipping...');
        }
        dir = './' + answer;
        top();
      });
    });

    
  });
}

function top() {
  // ask user for what category of texture they want to modify
  prompt('What texture would you like to modify? (x to eXit) Choices: [B]lock, [I]tem, [E]ntity, [A]rmor. Just write the capital letter of the option you want. ').then(answer => {
    if (answer.toLowerCase() === ('b' || 'block')) {
      stage('block', 'assets/minecraft/textures/block/', 'grass_block');
    } else if (answer.toLowerCase() === ('i' || 'item')) {
      stage('item', 'assets/minecraft/textures/item/', 'stick');
    } else if (answer.toLowerCase() === ('e' || 'entity')) {
      stage('entity', 'assets/minecraft/textures/entity/$s/', 'zombie');
    } else if (answer.toLowerCase() === ('a' || 'armor')) {
      stage('armor', 'assets/minecraft/textures/models/armor/', 'leather_layer_1');
    } else if (answer.toLowerCase() === ('x' || 'exit')) {
      console.log('Going up...');
      name();
    } else {
      console.log('Invalid option. Please try again.');
      top();
    }
  });
}

function stage(type, structure, example) {
  // ask user for what block they want to modify
  prompt(`What ${type} would you like to modify? (${example}/x to eXit) `).then(answer => {
    if (answer.toLowerCase() === ('x' || 'eXit')) {
      console.log('Going up...');
      top();
      return;
    }
    // if there is a $s in the structure, replace it with the answer
    if (structure.includes('$s')) {
      noS = structure.replace('$s', '');
      structure = structure.replace('$s', answer);
    }
    // first make sure to make the folders
    fs.mkdirSync('./' + dir + '/'+structure, { recursive: true });
    // check if file exists
    try {
      fs.readdirSync('./template/'+structure).forEach(file => {
        if (file.includes(answer)) {
          console.log('File '+file+' exists. Copying...');
          fs.copyFileSync('./template/'+structure+file, './' + dir + '/'+structure+file);
        }
      })
    } catch (err) {
      // if the file doesn't exist, try without the $s
      // this is for entities (such as trident, which is trident.png, not trident/trident.png)
      
      // check if file exists
      fs.readdirSync('./template/'+noS).forEach(file => {
        if (file.includes(answer)) {
          console.log('File '+file+' exists. Copying...');
          fs.copyFileSync('./template/'+noS+file, './' + dir + '/'+noS+file);
        }
      })
    }
  });
}

name();
