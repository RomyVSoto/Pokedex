const Region = require("../models/Regiones");

exports.GetRegionAdminIndex = (req, res, next) => {
    Region.findAll().then((result) => {
        const regiones = result.map((result) => result.dataValues);
        res.render("admin/region-list", {
            pageTitle: "Region Admin",
            regs: regiones,
            hasRegiones: regiones.length > 0,
            IsRegionList: true,
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.GetAddRegion = (req, res, next) => {
    res.render("admin/save-region", {
        pageTitle: "Add Region",
        editMode: false,
    });
};

exports.GetEditRegion = (req, res, next) => {
    const id = req.params.regionId;

    Region.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/admin/regiones");
        }

        const region = result.dataValues;

        res.render("admin/save-region", {
            pageTitle: `Edit - ${region?.name} `,
            region: region,
            editMode: true,
        });        
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostAddRegion = (req, res, next) => {
    const name = req.body.Name;
    Region.create({ name: name }).then(() => {
        res.redirect("/admin/regiones");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostEditRegion = (req, res, next) => {
    const id = req.body.RegionId;
    const name = req.body.Name;
  
    Region.update(
    {
        name: name,
    }, { 
        where: { id: id } 
    }).then((result) => {
        return res.redirect("/admin/regiones");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostRegionDelete = (req, res, next) => {
    const id = req.body.RegionId;
  
    Region.destroy({ where: { id } 
    }).then((result) => {
        return res.redirect("/admin/regiones");
      }).catch((err) => {
        console.log(err);
      });
  };
  