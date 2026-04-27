import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

// tokens-studio's transformGroup ends with `name/camel`; swap it for kebab so
// generated CSS vars match Tailwind v4 / shadcn convention (`--color-foo-bar`).
StyleDictionary.registerTransformGroup({
  name: 'tokens-studio-kebab',
  transforms: StyleDictionary.hooks.transformGroups['tokens-studio'].map(
    (t) => (t === 'name/camel' ? 'name/kebab' : t)
  ),
});

const sd = new StyleDictionary({
  source: ['tokens/source/**/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: 'build/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { outputReferences: true }
      }]
    },
    tailwind: {
      transformGroup: 'tokens-studio-kebab',
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