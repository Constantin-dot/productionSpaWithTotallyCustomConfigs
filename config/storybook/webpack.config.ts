import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
  };

  if (config!.resolve!.modules) {
    config!.resolve!.modules = [
      path.resolve(__dirname, '../../src'),
      'node_modules',
    ];
  }

  config!.resolve!.modules!.unshift(paths.src);
  config!.resolve!.extensions!.push('.ts', '.tsx');
  config.resolve!.alias = {
    ...config!.resolve!.alias,
    '@': paths.src,
  };

  const rules = config!.module!.rules as RuleSetRule[];
  config!.module!.rules = rules.map((rule) => (/svg/.test(rule.test as string)
    ? { ...rule, exclude: /\.svg$/i }
    : rule
  ));

  config!.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  config!.module!.rules.push(buildCssLoader(true));

  config!.plugins!.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('https://testapi.ru'),
    __PROJECT__: JSON.stringify('storybook'),
  }));

  return config;
};
