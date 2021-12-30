module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
        'module-resolver',
        {
            root: ['.'],
            extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
            alias: {
                'api': './api',
                'contexts': './contexts',
                'config': './config',
                'components': './components',
                'data': './data',
                'images': './images',
            },
        },
    ]
]
};
