const moment = require("moment");
const now = new Date();
const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n');

module.exports = function (eleventyConfig) {
    // Plugins i18n
    eleventyConfig.addPlugin(i18n, {
        translations,
        fallbackLocales: {
            '*': 'fr'
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
