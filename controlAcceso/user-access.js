const { roles } = require('../config/roles')
 
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
      console.log(req.payload)
   const permission = roles.can(req.payload.rol)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}