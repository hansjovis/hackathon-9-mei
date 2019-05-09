"use strict";/**
 * Updates the traffic light present on the page
 *
 * @param {Object} indicator The indicator for the keyword score.
 *
 * @returns {void}
 */function updateAdminBar(a){jQuery(".adminbar-seo-score").attr("class","wpseo-score-icon adminbar-seo-score "+a.className).find(".adminbar-seo-score-text").text(a.screenReaderText)}
