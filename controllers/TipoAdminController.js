const Tipo = require("../models/Tipos");

exports.GetTipoAdminIndex = (req, res, next) => {
    Tipo.findAll().then((result) => {
        const tipos = result.map((result) => result.dataValues);
        res.render("admin/tipo-list", {
            pageTitle: "Tipo Admin",
            types: tipos,
            hasTipos: tipos.length > 0,
            IsTipoList: true,
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.GetAddTipo = (req, res, next) => {
    res.render("admin/save-tipo", {
        pageTitle: "Add tipo",
        editMode: false,
    });
};

exports.GetEditTipo = (req, res, next) => {
    const id = req.params.typeId;

    Tipo.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/admin/tipos");
        }

        const tipo = result.dataValues;

        res.render("admin/save-tipo", {
            pageTitle: `Edit - ${tipo?.name} `,
            tipo: tipo,
            editMode: true,
        });  
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostAddTipo = (req, res, next) => {
    const name = req.body.Name;

    Tipo.create({
        name: name,
    }).then((result) => {
        return res.redirect("/admin/tipos");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostEditTipo = (req, res, next) => {
    const id = req.body.TypeId;
    const name = req.body.Name;
  
    Tipo.update(
    {
        name: name,
    }, { 
        where: { id: id } 
    }).then((result) => {
        return res.redirect("/admin/tipos");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostTipoDelete = (req, res, next) => {
    const id = req.body.TypeId;
  
    Tipo.destroy({ where: { id } 
    }).then((result) => {
        return res.redirect("/admin/tipos");
      }).catch((err) => {
        console.log(err);
      });
  };
  