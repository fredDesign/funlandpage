const moment = require("moment");
const now = new Date();
const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n');
const locales = require('./src/_data/locales');

module.exports = function (eleventyConfig) {
    // Plugins i18n
    eleventyConfig.addPlugin(i18n, {
        translations,
        fallbackLocales: {
            '*': 'en'
        }
    });

    // Browsersync
    // Redirect from root to default language root during --serve
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    if (req.url === '/') {
                        res.writeHead(302, {
                            location: '/en/'
                        });
                        res.end();
                    }
                });
            }
        }
    });



    // date filter
    eleventyConfig.addFilter("date", function(date, format, locale) {
        locale = locale ? locale : "en";
        moment.locale(locale);
        return moment(date).format(format);
    });

    // Base Config
    return {
        dir: {
            input: 'pages',
            output: '_dev',
            includes: '_components',
            layouts: '_includes',
            data: 'data',
            static: '/static'
        },
        templateFormats: ['njk', 'md'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    }
}
