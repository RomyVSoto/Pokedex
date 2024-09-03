const Pokemon = require("../models/Pokemones");
const Region = require("../models/Regiones");
const Tipo = require("../models/Tipos");

//Pokemones


exports.GetPokemonIndex = (req, res, next) => {
  Promise.all([
    Pokemon.findAll({
      include: [
        { model: Tipo, as: 'tipo' },
        { model: Region, as: 'region' }
      ]
    }),
    Region.findAll(),
    Tipo.findAll()
  ])
  .then(([pokemones, regiones, tipos]) => {
    res.render("pokedex/index", {
      pageTitle: "Pokedex",
      pokes: pokemones.map(pokemon => pokemon.toJSON()),
      hasPokemones: pokemones.length > 0,
      regs: regiones.map(region => region.toJSON()),
      tipos: tipos.map(tipo => tipo.toJSON()),
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.GetPokemon = (req, res, next) => {
  const id = req.params.pokemonId;

  Pokemon.findOne({
    where: { id: id },
    include: [
      { model: Tipo, as: 'tipo' },
      { model: Region, as: 'region' }
    ]
  })
  .then((result) => {
    if (!result) {
      return res.redirect("/");
    }

    const pokemon = result.toJSON();
    console.log("Pokemon encontrado:", pokemon);
    res.render("pokedex/pokemon-detail", {
      pageTitle: `Pokemon - ${pokemon.name}`,
      pokemon: pokemon,
      hasPokemon: true,
    });
  })
  .catch((err) => {
    console.log(err);
  });
};


//Regiones

exports.GetRegionIndex = (req, res, next) => {
    Region.findAll()
      .then((result) => {
        const regiones = result.map((result) => result.dataValues);
        res.render("pokedex/index", {
          pageTitle: "Pokedex",
          regs: regiones,
          hasRegiones: regiones.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetRegion = (req, res, next) => {
    const id = req.params.regionId;
  
    Region.findOne({ where: { id: id } })
      .then((result) => {
  
         if (!result) {
           return res.redirect("/");
         }
  
        const region = result.dataValues;  
  
        res.render("pokedex/region-detail", {
          pageTitle: `Region - ${region?.name}`,
          region: region,
          hasRegion: region ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


//Tipos

exports.GetTipoIndex = (req, res, next) => {
    Tipo.findAll()
      .then((result) => {
        const tipos = result.map((result) => result.dataValues);
        res.render("pokedex/index", {
          pageTitle: "Pokedex",
          types: tipos,
          hasTipos: tipos.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetTipo = (req, res, next) => {
    const id = req.params.tipoId;
  
    Tipo.findOne({ where: { id: id } })
      .then((result) => {
  
         if (!result) {
           return res.redirect("/");
         }
  
        const tipo = result.dataValues;  
  
        res.render("pokedex/tipo-detail", {
          pageTitle: `Tipo - ${tipo?.name}`,
          tipo: tipo,
          hasTipo: tipo ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


//Search
exports.SearchPokemones = async (req, res, next) => {
  try {
    const name = req.query.name.toLowerCase();

    const pokemones = await Pokemon.findAll({
      include: [
        { model: Tipo, as: 'tipo' },
        { model: Region, as: 'region' }
      ]
    });
    const pokemonesFiltrados = pokemones.filter(pokemon => pokemon.name.toLowerCase().includes(name));

    // Obtener todas las regiones y tipos
    const regiones = await Region.findAll();
    const tipos = await Tipo.findAll();
    
    res.render('pokedex/index', {
      pageTitle: 'Pokedex - Search',
      pokes: pokemonesFiltrados.map(pokemon => pokemon.toJSON()),
      hasPokemones: pokemonesFiltrados.length > 0,
      regs: regiones.map(region => region.toJSON()),
      tipos: tipos.map(tipo => tipo.toJSON()),
    });
  } catch (error) {
    next(error);
  }
};


//Filter

exports.FilterByType = (req, res, next) => {
  const typeId = req.query.typeId;

  if (!typeId) {
    return res.redirect('/');
  }

  Pokemon.findAll({
    where: { typeId: typeId },
    include: [
      { model: Tipo, as: 'tipo' },
      { model: Region, as: 'region' }
    ]
  }).then(pokemonResult => {
    const pokemonesFiltrados = pokemonResult.map(pokemon => pokemon.toJSON());
    Promise.all([Region.findAll(), Tipo.findAll()]).then(([regiones, tipos]) => {
      res.render("pokedex/index", {
        pageTitle: "Pokedex",
        pokes: pokemonesFiltrados,
        hasPokemones: pokemonesFiltrados.length > 0,
        regs: regiones.map(region => region.toJSON()),
        tipos: tipos.map(tipo => tipo.toJSON()),
        selectedType: typeId
      });
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.FilterByRegion = (req, res, next) => {
  const regionId = req.query.regionId;

  Promise.all([
    Pokemon.findAll({
      where: regionId ? { regionId: regionId } : {},
      include: [
        { model: Tipo, as: 'tipo' },
        { model: Region, as: 'region' }
      ]
    }),
    Region.findAll(),
    Tipo.findAll()
  ]).then(([pokemonResult, regiones, tipos]) => {
    const pokemonesFiltrados = pokemonResult.map(pokemon => pokemon.toJSON());
    res.render("pokedex/index", {
      pageTitle: "Pokedex",
      pokes: pokemonesFiltrados,
      hasPokemones: pokemonesFiltrados.length > 0,
      regs: regiones.map(region => region.toJSON()),
      tipos: tipos.map(tipo => tipo.toJSON()),
      selectedRegion: regionId
    });
  }).catch((err) => {
    console.log(err);
  });
};