const Pokemon = require("../models/Pokemones");
const Tipo = require("../models/Tipos");
const Region = require("../models/Regiones");

exports.GetPokemonAdminIndex = (req, res, next) => {
    Pokemon.findAll({
        include: [
            { model: Tipo, as: 'tipo' },
            { model: Region, as: 'region' }
        ]
    }).then((result) => {
        const pokemones = result.map(pokemon => pokemon.toJSON());
        res.render("admin/pokemon-list", {
            pageTitle: "Pokemon Admin",
            pokes: pokemones,
            hasPokemones: pokemones.length > 0,
            IsPokemonList: true,
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.GetAddPokemon = (req, res, next) => {
    const tiposPromise = Tipo.findAll();
    const regionesPromise = Region.findAll();

    Promise.all([tiposPromise, regionesPromise]).then(results => {
        const tipos = results[0].map(result => result.toJSON());
        const regiones = results[1].map(result => result.toJSON());

        res.render("admin/save-pokemon", {
            pageTitle: "Add Pokemon",
            editMode: false,
            tipos: tipos,
            regiones: regiones
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.GetEditPokemon = (req, res, next) => {
    const id = req.params.pokemonId;
    const pokemonPromise = Pokemon.findOne({
        where: { id: id },
        include: [{ model: Tipo, as: 'tipo' }, { model: Region, as: 'region' }]
    }); // Cambio: Incluir asociaciones en la consulta
    const tiposPromise = Tipo.findAll();
    const regionesPromise = Region.findAll();

    Promise.all([pokemonPromise, tiposPromise, regionesPromise]).then(results => {
        const pokemon = results[0] ? results[0].toJSON() : null;
        const tipos = results[1].map(result => result.toJSON());
        const regiones = results[2].map(result => result.toJSON());

        if (!pokemon) {
            return res.redirect("/admin/pokemones");
        }

        res.render("admin/save-pokemon", {
            pageTitle: `Edit - ${pokemon.name}`,
            pokemon: pokemon,
            editMode: true,
            tipos: tipos,
            regiones: regiones
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.PostAddPokemon = (req, res, next) => {
    const name = req.body.Name;
    const image = req.body.Image;
    const typeId = req.body.TypeId;
    const regionId = req.body.RegionId;

    Pokemon.create({
        name: name,
        imageUrl: image,
        typeId: typeId,
        regionId: regionId
    }).then((result) => {
        return res.redirect("/admin/pokemones");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostEditPokemon = (req, res, next) => {
    const id = req.body.PokemonId;
    const name = req.body.Name;
    const image = req.body.Image;
    const typeId = req.body.TypeId;
    const regionId = req.body.RegionId;

    Pokemon.update(
        {
            name: name,
            imageUrl: image,
            typeId: typeId,
            regionId: regionId
        }, {
            where: { id: id }
        }).then((result) => {
            return res.redirect("/admin/pokemones");
        }).catch((err) => {
            console.log(err);
        });
};

exports.PostPokemonDelete = (req, res, next) => {
    const id = req.body.PokemonId;

    Pokemon.destroy({ where: { id } }).then((result) => {
        return res.redirect("/admin/pokemones");
    }).catch((err) => {
        console.log(err);
    });
};
