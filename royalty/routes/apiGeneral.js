var express = require('express');
var apirouter = express.Router();


function apiGeneral(db){
  var sesion="";
  var usuario = db.collection("usuario");
 var producto = db.collection("producto");
  var CarritoCompra = db.collection("CarritoCompra");

  var Comentario = db.collection("Comentario");




    apirouter.post("/registroUsuario",function(req,res){
      console.log(req.body);
      var nuevoUsuario={};
      nuevoUsuario.Nombre=req.body.txtnombre;
      nuevoUsuario.Apellido=req.body.txtapellido
      nuevoUsuario.Correo=req.body.txtcorreo
      nuevoUsuario.Usuario=req.body.txtuser
      nuevoUsuario.Clave=req.body.txtPass;
      nuevoUsuario.Carrito=[]

      usuario.insertOne(nuevoUsuario,function(err,doc){
        if(err){
          res.status(500).json({"error":err});

          }

        else{

          res.redirect("../login");


          //res.status(200).json({"usuario":doc});
          }
      })
    })//registroUsuario


      apirouter.post("/obtenerUsuario",
              function(req, res){
                 //res.status(500).json({"error":"Función no Implementada"});
                 //var query = {$and:[{"Usuario": req.params.Usuario},{"Clave":req.params.Clave}]};
                 console.log(req.body.txtUserName);
                 usuario.findOne({$and:[{"Usuario": req.body.txtUserName},{"Clave":req.body.txtPass}]}, function(err, doc){
                    if(doc==null){

                      res.redirect("../login");

                      //  res.status(500).json({"error":err});
                    }else{
                      req.session.usuarioId=doc._id;
                    req.session.usuarioNombre=doc.Usuario;

                      res.redirect("../mindex");

                        //res.status(200).json({"usuario":doc});
                    }
                });

              }
          ) // obtenerUsuario
          
            apirouter.get("/insertarCarrito/:des",function(req,res){
    var query = req.params.des;

  var Carrito={
    idUsuario:req.session.usuarioId,
    Usuario:req.session.usuarioNombre,
    producto:query

  };
      CarritoCompra.insertOne(Carrito,function(err,doc){
    console.log("Insertado");
    if(err){
      res.status(500).json({"error":err});
      }

    else{

  //    res.redirect("../mindex");

      res.status(200).json({"resultado":doc});



      }
  })
})//CarritoCompra



  return apirouter;
}//apiUsuario
module.exports = apiGeneral;
