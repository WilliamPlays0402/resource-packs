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
      console.log('Exiting...');
      process.exit();
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
      structure = structure.replace('$s', answer);
    }
    // first make sure to make the folders
    fs.mkdirSync('./output/'+structure, { recursive: true });
    // check if file exists
    fs.readdirSync('./template/'+structure).forEach(file => {
      if (file.includes(answer)) {
        console.log('File '+file+' exists. Copying...');
        fs.copyFileSync('./template/'+structure+file, './output/'+structure+file);
      }
    });
  });
}

top();
