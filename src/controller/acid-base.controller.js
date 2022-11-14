const {
  HttpErrorResponse,
  HttpApiResponse,
  HandleError,
} = require("../utils/utils");

async function getDisorder(req, res) {
  const { weight, age, pH, CO2, HCO3, Na, K, Cl, Albumin, Lactate } = req.body;

  //check pH and CO2 4 conditions

  try {
    if (pH > 7.4 && CO2 > 40) {
      const disorder = "metabolic alkalosis";
      const expected_PCO2 = 0.7 * Math.abs(24 - HCO3);
      const chloride_deficit = 0.2 * weight * Math.abs(100 - Cl);
      const saline_required = chloride_deficit / 154;
      const report = {
        disorder: disorder,
        expected_PCO2: expected_PCO2,
        chloride_deficit: chloride_deficit,
        saline_required: saline_required,
      };
      return res.send(HttpApiResponse(report));
    } else if (pH < 7.4 && CO2 < 40) {
      var disorder = "";
      var gap_gap_analysis;
      const expected_PCO2 = 0.7 * Math.abs(24 - HCO3);
      const HCO3_deficit = 0.6 * weight * Math.abs(15 - HCO3);
      const anion_gap = Na + K - Cl;
      if (anion_gap > 12) {
        gap_gap_analysis = (anion_gap - 12) / Math.abs(24 - HCO3);
        if (gap_gap_analysis > 1) {
          disorder =
            "High anion gap metabolic acidosis + Normal anion gap metabolic acidosis";
        } else if (gap_gap_analysis == 1) {
          disorder = "High anion gap metabolic acidosis";
        } else {
          disorder = "High anion gap metabolic acidosis + metabolic alkalosis";
        }
      } else {
        disorder = "Normal anion gap metabolic acidosis";
      }
      const report = {
        disorder: disorder,
        expected_PCO2: expected_PCO2,
        HCO3_deficit: HCO3_deficit,
        anion_gap: anion_gap,
        gap_gap_analysis: gap_gap_analysis,
      };
      return res.send(HttpApiResponse(report));
    } else if (pH > 7.4 && CO2 < 40) {
    } else if (pH < 7.4 && CO2 > 40) {
    }
  } catch (error) {
    await HandleError("acid-base", "getDisorder", err);
    return res.send(HttpErrorResponse(err.message));
  }

  //
}

module.exports = { getDisorder };
