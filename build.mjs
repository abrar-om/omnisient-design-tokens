import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['tokens/source/**/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { outputReferences: true }
      }]
    },
    tailwind: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/tailwind/',
      files: [{
        destination: 'tokens.json',
        format: 'json/flat'
      }]
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    }
  }
});

await sd.buildAllPlatforms();
console.log('Tokens built successfully.');