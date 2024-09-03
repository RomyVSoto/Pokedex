const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AdminController");
const pokemonAdminController = require("../controllers/PokemonAdminController");
const regionAdminController = require("../controllers/RegionAdminController");
const tipoAdminController = require("../controllers/TipoAdminController");

router.get("/admin-page", adminController.AdminPage);

//Pokemones

router.get("/pokemones", pokemonAdminController.GetPokemonAdminIndex);
router.get("/add-pokemon", pokemonAdminController.GetAddPokemon);
router.get("/edit-pokemon/:pokemonId", pokemonAdminController.GetEditPokemon);
router.post("/add-pokemon", pokemonAdminController.PostAddPokemon);
router.post("/edit-pokemon", pokemonAdminController.PostEditPokemon);
router.post("/pokemon-delete", pokemonAdminController.PostPokemonDelete);

//Tipos

router.get("/tipos", tipoAdminController.GetTipoAdminIndex);
router.get("/add-tipo", tipoAdminController.GetAddTipo);
router.get("/edit-tipo/:tipoId", tipoAdminController.GetEditTipo);
router.post("/add-tipo", tipoAdminController.PostAddTipo);
router.post("/edit-tipo", tipoAdminController.PostEditTipo);
router.post("/tipo-delete", tipoAdminController.PostTipoDelete);

//Regiones

router.get("/regiones", regionAdminController.GetRegionAdminIndex);
router.get("/add-region", regionAdminController.GetAddRegion);
router.get("/edit-region/:regionId", regionAdminController.GetEditRegion);
router.post("/add-region", regionAdminController.PostAddRegion);
router.post("/edit-region", regionAdminController.PostEditRegion);
router.post("/region-delete", regionAdminController.PostRegionDelete);


module.exports = router;
