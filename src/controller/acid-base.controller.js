const {
  HttpErrorResponse,
  HttpApiResponse,
  HandleError,
} = require("../utils/utils");

async function getDisorder(req, res) {
  const { weight, age, pH, CO2, HCO3, Na, K, Cl, Albumin, Lactate } = req.body;

  //
}
