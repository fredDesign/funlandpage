const moment = require("moment");
const now = new Date();
const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n');

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
    // Can also be handled by netlify.toml?
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

    // published items
    // - don't have draft key set to true
    // - have a date smaller or equal to now
    const isPublished = (item) => {
        return item.data.draft !== true && item.date <= now;
    };
    // blogposts collection
    eleventyConfig.addCollection("blogposts", function(collection) {
        return collection
            .getFilteredByGlob("pages/blogposts/*.md")
            .reverse();
    });

    // limit filter
    eleventyConfig.addFilter("limit", function(array, limit) {
        return array.slice(0, limit);
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
