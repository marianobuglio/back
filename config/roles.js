3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")
 
ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();


