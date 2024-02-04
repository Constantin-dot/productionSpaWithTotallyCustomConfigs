import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const removeFeatureName = process.argv[2]; // example isCounterEnabled
const featureState = process.argv[3]; // example off/on

const TOGGLE_FUNCTION_NAME = 'toggleFeatures';
const TOGGLE_COMPONENT_NAME = 'ToggleFeatures';

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

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === TOGGLE_FUNCTION_NAME
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === TOGGLE_COMPONENT_NAME;
}

function replaceToggleFunction(node: Node) {
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
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }

  if (featureState === 'off') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }
}

function getAttribureNodeByName(jsxAttributes: JsxAttribute[], name: string) {
  return jsxAttributes.find((node) => node.getName() === name);
}

function getReplacedComponent(attribute?: JsxAttribute) {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
}

function replaceToggleComponent(node: Node) {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttribureNodeByName(attributes, 'on');
  const offAttribute = getAttribureNodeByName(attributes, 'off');
  const featureNameAttribute = getAttribureNodeByName(attributes, 'feature');

  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1);

  if (featureName !== removeFeatureName) return;

  const onValue = getReplacedComponent(onAttribute);
  const offValue = getReplacedComponent(offAttribute);

  if (featureState === 'on' && offValue) {
    node.replaceWithText(offValue);
  }

  if (featureState === 'off' && onValue) {
    node.replaceWithText(onValue);
  }
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node);
      return;
    }

    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      replaceToggleComponent(node);
    }
  });
});

project.save();
