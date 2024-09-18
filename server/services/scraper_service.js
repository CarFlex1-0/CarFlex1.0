// services/scraperService.js
const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeData(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const scrapedData = {
      General: {},
      Performance: {},
      Engine: {},
      Volume: {},
      Dimensions: {},
      Drivetrain: {},
    };

    let currentSection = null;
    let skipNextRow = false;

    function cleanText(text) {
      return text.replace(/\s+/g, " ").trim();
    }

    $("table.cardetailsout.car2 tr").each((index, element) => {
      const $element = $(element);
      if (
        $element.find(".adin").length > 0 ||
        $element.find(".no2").length > 0
      ) {
        skipNextRow = true;
        return;
      }

      if (skipNextRow) {
        skipNextRow = false;
        return;
      }

      if ($element.hasClass("no")) {
        const th = $element.find("th").text().trim();
        if (th && scrapedData[th.split(" ")[0]]) {
          currentSection = th.split(" ")[0];
        } else {
          currentSection = null;
        }
        return;
      }

      if (currentSection) {
        const th = $element.find("th").text().trim().replace(/\s+/g, "_");
        let td = cleanText($element.find("td").text());

        $element.find("td span").each((i, span) => {
          td += " " + cleanText($(span).text());
        });

        td = [...new Set(td.split(" "))].join(" ");

        if (th && td) {
          scrapedData[currentSection][th] = td;
        }
      }
    });

    Object.keys(scrapedData).forEach((section) => {
      if (Object.keys(scrapedData[section]).length === 0) {
        delete scrapedData[section];
      }
    });
    console.log(scrapedData);
    return scrapedData;
  } catch (error) {
    console.error("Error scraping data:", error);
    throw error;
  }
}

module.exports = {
  scrapeData,
};
