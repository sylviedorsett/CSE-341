const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
//const ui = require("swagger-ui");
const swaggerDocument = require("../swagger-output.json");
/*
ui.initOAuth({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.SECRET,
  appName: "School Database",
  scopes: [],
  additionalQueryStringParams: { test: "hello" },
  useBasicAuthenticationWithAccessCodeGrant: true,
  usePkceWithAuthorizationCodeGrant: true,
});
*/

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
