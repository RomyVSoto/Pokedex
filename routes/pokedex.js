const express = require("express");

const router = express.Router();
const pokedexController = require("../controllers/PokedexController");

router.get("/", pokedexController.GetPokemonIndex);
router.get("/regiones", pokedexController.GetRegionIndex);
router.get("/tipos", pokedexController.GetTipoIndex);
router.get("/pokemon-detail/:pokemonId", pokedexController.GetPokemon);
router.get("/search", pokedexController.SearchPokemones);
router.get("/filter-by-type", pokedexController.FilterByType);
router.get("/filter-by-region", pokedexController.FilterByRegion);

module.exports = router;