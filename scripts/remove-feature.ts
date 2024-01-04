import { Node, Project, SyntaxKind } from 'ts-morph';

const removeFeatureName = process.argv[2]; // example isCounterEnabled
const featureState = process.argv[3]; // example off/on

if (!removeFeatureName) {
  throw new Error('You need take a feature flag name!');
}

if (!featureState) {
  throw new Error('You need take a feature state (on or off)!');
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('You took incorrect feature state!');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/MainPage.tsx');
// project.addSourceFilesAtPaths('src/**/*.ts');
// project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toggleFeatures'
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
      );

      if (!objectOptions) return;

      const onFunctionProperty = objectOptions.getProperty('on');
      const offFunctionProperty = objectOptions.getProperty('off');
      const featureNameProperty = objectOptions.getProperty('name');

      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

      if (featureName !== removeFeatureName) return;

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
