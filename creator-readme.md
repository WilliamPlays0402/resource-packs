# Creator.js
**Is a nodejs program that allows you to easily get the correct textures for resource packs!**

## Installation
1. Download latest version of creator.js from the source code [here](creator.js).
2. Download latest version of template.zip from the source code [here](template.zip).
3. Install NodeJS from [here (https://nodejs.org/en/download)](https://nodejs.org/en/download/). Make sure to install the LTS version and to restart your computer after installing.
4. Extract template.zip and make sure to put the folder inside called `template` in the same folder as `creator.js`.

## Usage
1. Run creator.js by running ```node creator.js``` in the command prompt. If you get an error, make sure you have installed NodeJS correctly.
2. Follow the instructions in the command prompt.
3. This will create a folder called `output` (if name left empty) in the same folder as `creator.js`. This folder will contain a folder called `assets`, which you can copy over to your texture pack.
> * If you are using a texture pack that already has a folder called `assets`, you can copy the files from the `output` folder into the `assets` folder in your texture pack.
> * If you chose a name for your texture pack, it will automatically make a texture pack with the name you chose.
4. Now you can edit the textures in your own texture pack and use them in Minecraft.

> Example of first time instructions:
```
Name of resource pack? (x to eXit|leave empty to skip) William's Textures
Description of resource pack? Wilums textures
Pack format? (leave empty for 1.19.3) 1.19.2
No pack.png file found. Skipping...
What texture would you like to modify? (x to eXit) Choices: [B]lock, [I]tem, [E]ntity, [A]rmor. Just write the capital letter of the option you want. b
What block would you like to modify? (grass_block/x to eXit) netherite_block
File netherite_block.png exists. Copying...
```

> Example of modifying textures in an existing resource pack:
```
Name of resource pack? (x to eXit|leave empty to skip) William's Textures
Output folder already exists. Skipping...
What texture would you like to modify? (x to eXit) Choices: [B]lock, [I]tem, [E]ntity, [A]rmor. Just write the capital letter of the option you want. e
What entity would you like to modify? (zombie/x to eXit) elytra
File elytra.png exists. Copying...
```

## Troubleshooting
If you get an error, make sure you have installed NodeJS correctly. If you still get an error, please create an issue.
