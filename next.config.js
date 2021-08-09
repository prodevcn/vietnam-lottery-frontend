const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    cssModules: true
});

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'app/assets/scss')],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    }
};
