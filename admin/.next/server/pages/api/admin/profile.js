/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/admin/profile";
exports.ids = ["pages/api/admin/profile"];
exports.modules = {

/***/ "(api-node)/../server/models/AdminProfileDetails.js":
/*!***********************************************!*\
  !*** ../server/models/AdminProfileDetails.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"(api-node)/../server/node_modules/mongoose/index.js\");\r\n\r\nconst AdminProfileDetailsSchema = new mongoose.Schema({\r\n  adminUserId: {\r\n    type: mongoose.Schema.Types.ObjectId,\r\n    ref: \"AdminUser\",\r\n    required: true,\r\n    unique: true,\r\n  },\r\n  name: {\r\n    type: String,\r\n  },\r\n  photo: {\r\n    type: String,\r\n  },\r\n  role: {\r\n    type: String,\r\n    default: \"User\",\r\n  },\r\n});\r\n\r\nconst AdminProfileDetails = mongoose.model(\r\n  \"AdminProfileDetails\",\r\n  AdminProfileDetailsSchema\r\n);\r\n\r\nmodule.exports = AdminProfileDetails;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uLi9zZXJ2ZXIvbW9kZWxzL0FkbWluUHJvZmlsZURldGFpbHMuanMiLCJtYXBwaW5ncyI6IkFBQUEsaUJBQWlCLG1CQUFPLENBQUMscUVBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkQ6XFxOZXcgZm9sZGVyXFxzZXJ2ZXJcXG1vZGVsc1xcQWRtaW5Qcm9maWxlRGV0YWlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcclxuXHJcbmNvbnN0IEFkbWluUHJvZmlsZURldGFpbHNTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICBhZG1pblVzZXJJZDoge1xyXG4gICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgcmVmOiBcIkFkbWluVXNlclwiLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB1bmlxdWU6IHRydWUsXHJcbiAgfSxcclxuICBuYW1lOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgfSxcclxuICBwaG90bzoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gIH0sXHJcbiAgcm9sZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgZGVmYXVsdDogXCJVc2VyXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG5jb25zdCBBZG1pblByb2ZpbGVEZXRhaWxzID0gbW9uZ29vc2UubW9kZWwoXHJcbiAgXCJBZG1pblByb2ZpbGVEZXRhaWxzXCIsXHJcbiAgQWRtaW5Qcm9maWxlRGV0YWlsc1NjaGVtYVxyXG4pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBZG1pblByb2ZpbGVEZXRhaWxzO1xyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api-node)/../server/models/AdminProfileDetails.js\n");

/***/ }),

/***/ "(api-node)/../server/models/AdminUser.js":
/*!*************************************!*\
  !*** ../server/models/AdminUser.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"(api-node)/../server/node_modules/mongoose/index.js\");\r\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"(api-node)/../server/node_modules/bcryptjs/index.js\");\r\n\r\nconst AdminUserSchema = new mongoose.Schema({\r\n  email: {\r\n    type: String,\r\n    required: true,\r\n    unique: true,\r\n    lowercase: true,\r\n    trim: true,\r\n  },\r\n\r\n  passwordHash: {\r\n    type: String,\r\n  },\r\n  otp: {\r\n    type: String,\r\n  },\r\n  otpExpiration: {\r\n    type: Date,\r\n  },\r\n  isVerified: {\r\n    type: Boolean,\r\n    default: false,\r\n  },\r\n});\r\n\r\n// Method to set password (hash and set passwordHash) without saving the document\r\nAdminUserSchema.methods.setPassword = async function (password) {\r\n  const salt = await bcrypt.genSalt(10);\r\n  this.passwordHash = await bcrypt.hash(password, salt);\r\n};\r\n\r\n// Method to validate password\r\nAdminUserSchema.methods.validatePassword = async function (password) {\r\n  return bcrypt.compare(password, this.passwordHash);\r\n};\r\n\r\nconst AdminUser = mongoose.model(\"AdminUser\", AdminUserSchema);\r\n\r\nmodule.exports = AdminUser;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uLi9zZXJ2ZXIvbW9kZWxzL0FkbWluVXNlci5qcyIsIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUIsbUJBQU8sQ0FBQyxxRUFBVTtBQUNuQyxlQUFlLG1CQUFPLENBQUMscUVBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJEOlxcTmV3IGZvbGRlclxcc2VydmVyXFxtb2RlbHNcXEFkbWluVXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcclxuY29uc3QgYmNyeXB0ID0gcmVxdWlyZShcImJjcnlwdGpzXCIpO1xyXG5cclxuY29uc3QgQWRtaW5Vc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgZW1haWw6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgbG93ZXJjYXNlOiB0cnVlLFxyXG4gICAgdHJpbTogdHJ1ZSxcclxuICB9LFxyXG5cclxuICBwYXNzd29yZEhhc2g6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICB9LFxyXG4gIG90cDoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gIH0sXHJcbiAgb3RwRXhwaXJhdGlvbjoge1xyXG4gICAgdHlwZTogRGF0ZSxcclxuICB9LFxyXG4gIGlzVmVyaWZpZWQ6IHtcclxuICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICBkZWZhdWx0OiBmYWxzZSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIE1ldGhvZCB0byBzZXQgcGFzc3dvcmQgKGhhc2ggYW5kIHNldCBwYXNzd29yZEhhc2gpIHdpdGhvdXQgc2F2aW5nIHRoZSBkb2N1bWVudFxyXG5BZG1pblVzZXJTY2hlbWEubWV0aG9kcy5zZXRQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwYXNzd29yZCkge1xyXG4gIGNvbnN0IHNhbHQgPSBhd2FpdCBiY3J5cHQuZ2VuU2FsdCgxMCk7XHJcbiAgdGhpcy5wYXNzd29yZEhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgc2FsdCk7XHJcbn07XHJcblxyXG4vLyBNZXRob2QgdG8gdmFsaWRhdGUgcGFzc3dvcmRcclxuQWRtaW5Vc2VyU2NoZW1hLm1ldGhvZHMudmFsaWRhdGVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChwYXNzd29yZCkge1xyXG4gIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZEhhc2gpO1xyXG59O1xyXG5cclxuY29uc3QgQWRtaW5Vc2VyID0gbW9uZ29vc2UubW9kZWwoXCJBZG1pblVzZXJcIiwgQWRtaW5Vc2VyU2NoZW1hKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWRtaW5Vc2VyO1xyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api-node)/../server/models/AdminUser.js\n");

/***/ }),

/***/ "(api-node)/../server/node_modules/mongodb/lib sync recursive":
/*!************************************************!*\
  !*** ../server/node_modules/mongodb/lib/ sync ***!
  \************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(api-node)/../server/node_modules/mongodb/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(api-node)/../server/utils/dbConnect.js":
/*!************************************!*\
  !*** ../server/utils/dbConnect.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"(api-node)/../server/node_modules/mongoose/index.js\");\r\n\r\nconst MONGODB_URI = process.env.MONGODB_URI;\r\n\r\nif (!MONGODB_URI) {\r\n  throw new Error(\r\n    \"Please define the MONGODB_URI environment variable inside .env.local\"\r\n  );\r\n}\r\n\r\n/**\r\n * Global is used here to maintain a cached connection across hot reloads in development.\r\n * This prevents connections growing exponentially during API Route usage.\r\n */\r\nlet cached = global.mongoose;\r\n\r\nif (!cached) {\r\n  cached = global.mongoose = { conn: null, promise: null };\r\n}\r\n\r\n// For debugging: disable connection caching to force new connection each time\r\n// Comment out the following lines to enable caching again\r\ncached.conn = null;\r\ncached.promise = null;\r\n\r\nmongoose.connection.on(\"connected\", () => {\r\n  console.log(\"Mongoose connected to MongoDB\");\r\n});\r\n\r\nmongoose.connection.on(\"error\", (err) => {\r\n  console.error(\"Mongoose connection error:\", err);\r\n});\r\n\r\nmongoose.connection.on(\"disconnected\", () => {\r\n  console.log(\"Mongoose disconnected from MongoDB\");\r\n  cached.conn = null;\r\n  cached.promise = null;\r\n});\r\n\r\nasync function dbConnect() {\r\n  if (cached.conn) {\r\n    console.log(\"Using cached MongoDB connection\");\r\n    return cached.conn;\r\n  }\r\n\r\n  if (!cached.promise) {\r\n    console.log(\"Creating new MongoDB connection promise\");\r\n    const opts = {\r\n      bufferCommands: false,\r\n      useNewUrlParser: true,\r\n      useUnifiedTopology: true,\r\n      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds\r\n      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds\r\n      family: 4, // Use IPv4, can help with some network issues\r\n    };\r\n\r\n    cached.promise = mongoose\r\n      .connect(MONGODB_URI, opts)\r\n      .then((mongoose) => {\r\n        console.log(\"MongoDB connection established\");\r\n        return mongoose;\r\n      })\r\n      .catch((error) => {\r\n        console.error(\"MongoDB connection error:\", error);\r\n        throw error;\r\n      });\r\n  }\r\n  cached.conn = await cached.promise;\r\n  return cached.conn;\r\n}\r\n\r\nmodule.exports = dbConnect;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uLi9zZXJ2ZXIvdXRpbHMvZGJDb25uZWN0LmpzIiwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQixtQkFBTyxDQUFDLHFFQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkQ6XFxOZXcgZm9sZGVyXFxzZXJ2ZXJcXHV0aWxzXFxkYkNvbm5lY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XHJcblxyXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xyXG5cclxuaWYgKCFNT05HT0RCX1VSSSkge1xyXG4gIHRocm93IG5ldyBFcnJvcihcclxuICAgIFwiUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnYubG9jYWxcIlxyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHbG9iYWwgaXMgdXNlZCBoZXJlIHRvIG1haW50YWluIGEgY2FjaGVkIGNvbm5lY3Rpb24gYWNyb3NzIGhvdCByZWxvYWRzIGluIGRldmVsb3BtZW50LlxyXG4gKiBUaGlzIHByZXZlbnRzIGNvbm5lY3Rpb25zIGdyb3dpbmcgZXhwb25lbnRpYWxseSBkdXJpbmcgQVBJIFJvdXRlIHVzYWdlLlxyXG4gKi9cclxubGV0IGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZTtcclxuXHJcbmlmICghY2FjaGVkKSB7XHJcbiAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XHJcbn1cclxuXHJcbi8vIEZvciBkZWJ1Z2dpbmc6IGRpc2FibGUgY29ubmVjdGlvbiBjYWNoaW5nIHRvIGZvcmNlIG5ldyBjb25uZWN0aW9uIGVhY2ggdGltZVxyXG4vLyBDb21tZW50IG91dCB0aGUgZm9sbG93aW5nIGxpbmVzIHRvIGVuYWJsZSBjYWNoaW5nIGFnYWluXHJcbmNhY2hlZC5jb25uID0gbnVsbDtcclxuY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG5cclxubW9uZ29vc2UuY29ubmVjdGlvbi5vbihcImNvbm5lY3RlZFwiLCAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2coXCJNb25nb29zZSBjb25uZWN0ZWQgdG8gTW9uZ29EQlwiKTtcclxufSk7XHJcblxyXG5tb25nb29zZS5jb25uZWN0aW9uLm9uKFwiZXJyb3JcIiwgKGVycikgPT4ge1xyXG4gIGNvbnNvbGUuZXJyb3IoXCJNb25nb29zZSBjb25uZWN0aW9uIGVycm9yOlwiLCBlcnIpO1xyXG59KTtcclxuXHJcbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oXCJkaXNjb25uZWN0ZWRcIiwgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiTW9uZ29vc2UgZGlzY29ubmVjdGVkIGZyb20gTW9uZ29EQlwiKTtcclxuICBjYWNoZWQuY29ubiA9IG51bGw7XHJcbiAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG59KTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRiQ29ubmVjdCgpIHtcclxuICBpZiAoY2FjaGVkLmNvbm4pIHtcclxuICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgY2FjaGVkIE1vbmdvREIgY29ubmVjdGlvblwiKTtcclxuICAgIHJldHVybiBjYWNoZWQuY29ubjtcclxuICB9XHJcblxyXG4gIGlmICghY2FjaGVkLnByb21pc2UpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgbmV3IE1vbmdvREIgY29ubmVjdGlvbiBwcm9taXNlXCIpO1xyXG4gICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgYnVmZmVyQ29tbWFuZHM6IGZhbHNlLFxyXG4gICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXHJcbiAgICAgIHVzZVVuaWZpZWRUb3BvbG9neTogdHJ1ZSxcclxuICAgICAgc2VydmVyU2VsZWN0aW9uVGltZW91dE1TOiAzMDAwMCwgLy8gSW5jcmVhc2UgdGltZW91dCB0byAzMCBzZWNvbmRzXHJcbiAgICAgIHNvY2tldFRpbWVvdXRNUzogNDUwMDAsIC8vIEluY3JlYXNlIHNvY2tldCB0aW1lb3V0IHRvIDQ1IHNlY29uZHNcclxuICAgICAgZmFtaWx5OiA0LCAvLyBVc2UgSVB2NCwgY2FuIGhlbHAgd2l0aCBzb21lIG5ldHdvcmsgaXNzdWVzXHJcbiAgICB9O1xyXG5cclxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2VcclxuICAgICAgLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpXHJcbiAgICAgIC50aGVuKChtb25nb29zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uZ29EQiBjb25uZWN0aW9uIGVzdGFibGlzaGVkXCIpO1xyXG4gICAgICAgIHJldHVybiBtb25nb29zZTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb25nb0RCIGNvbm5lY3Rpb24gZXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiQ29ubmVjdDtcclxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api-node)/../server/utils/dbConnect.js\n");

/***/ }),

/***/ "(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2Fprofile&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5Cprofile.js&middlewareConfigBase64=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2Fprofile&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5Cprofile.js&middlewareConfigBase64=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages-api/module.compiled */ \"(api-node)/./node_modules/next/dist/server/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(api-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_admin_profile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\admin\\profile.js */ \"(api-node)/./pages/api/admin/profile.js\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_admin_profile_js__WEBPACK_IMPORTED_MODULE_3__, 'default'));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_admin_profile_js__WEBPACK_IMPORTED_MODULE_3__, 'config');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/admin/profile\",\n        pathname: \"/api/admin/profile\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    userland: _pages_api_admin_profile_js__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVNfQVBJJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZwcm9maWxlJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGcGFnZXMlNUNhcGklNUNhZG1pbiU1Q3Byb2ZpbGUuanMmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ0U7QUFDMUQ7QUFDNEQ7QUFDNUQ7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLHdEQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLGVBQWUsd0VBQUssQ0FBQyx3REFBUTtBQUNwQztBQUNPLHdCQUF3Qix5R0FBbUI7QUFDbEQ7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlc0FQSVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzXFxcXGFwaVxcXFxhZG1pblxcXFxwcm9maWxlLmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9wcm9maWxlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vcHJvZmlsZVwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2Fprofile&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5Cprofile.js&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api-node)/./pages/api/admin/profile.js":
/*!************************************!*\
  !*** ./pages/api/admin/profile.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nconst dbConnect = __webpack_require__(/*! ../../../../server/utils/dbConnect */ \"(api-node)/../server/utils/dbConnect.js\");\nconst AdminUser = __webpack_require__(/*! ../../../../server/models/AdminUser */ \"(api-node)/../server/models/AdminUser.js\");\nconst AdminProfileDetails = __webpack_require__(/*! ../../../../server/models/AdminProfileDetails */ \"(api-node)/../server/models/AdminProfileDetails.js\");\nconst config = {\n    api: {\n        bodyParser: {\n            sizeLimit: \"5mb\"\n        }\n    }\n};\nasync function handler(req, res) {\n    await dbConnect();\n    if (req.method === \"POST\") {\n        const { name, photo, email, role } = req.body;\n        if (!email) {\n            return res.status(400).json({\n                message: \"Email is required\"\n            });\n        }\n        try {\n            const adminUser = await AdminUser.findOne({\n                email: email.toLowerCase()\n            });\n            if (!adminUser) {\n                return res.status(404).json({\n                    message: \"Admin user not found\"\n                });\n            }\n            let profile = await AdminProfileDetails.findOne({\n                adminUserId: adminUser._id\n            });\n            if (!profile) {\n                profile = new AdminProfileDetails({\n                    adminUserId: adminUser._id\n                });\n            }\n            if (name !== undefined) profile.name = name;\n            if (photo !== undefined) profile.photo = photo;\n            if (role !== undefined) profile.role = role;\n            await profile.save();\n            console.log(\"Profile saved/updated:\", profile);\n            return res.status(200).json({\n                message: \"Profile updated successfully\"\n            });\n        } catch (error) {\n            console.error(\"Error updating profile:\", error);\n            return res.status(500).json({\n                message: \"Internal server error\"\n            });\n        }\n    } else if (req.method === \"GET\") {\n        const { email } = req.query;\n        console.log(\"API GET /profile called with email:\", email);\n        if (!email) {\n            return res.status(400).json({\n                message: \"Email query parameter is required\"\n            });\n        }\n        try {\n            const adminUser = await AdminUser.findOne({\n                email: email.toLowerCase()\n            });\n            console.log(\"Found adminUser:\", adminUser);\n            if (!adminUser) {\n                return res.status(404).json({\n                    message: \"Admin user not found\"\n                });\n            }\n            const profile = await AdminProfileDetails.findOne({\n                adminUserId: adminUser._id\n            });\n            console.log(\"Found profile:\", profile);\n            return res.status(200).json({\n                email: adminUser.email,\n                name: profile?.name || \"\",\n                photo: profile?.photo || \"\",\n                role: profile?.role || \"User\"\n            });\n        } catch (error) {\n            console.error(\"Error fetching profile:\", error);\n            return res.status(500).json({\n                message: \"Internal server error\"\n            });\n        }\n    } else {\n        return res.status(405).json({\n            message: \"Method not allowed\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPVSxTQUFTVixTQUFTO2dCQUN6QkUsTUFBTVEsU0FBU1IsUUFBUTtZQUN6QjtRQUNGLEVBQUUsT0FBT2UsT0FBTztZQUNkRixRQUFRRSxLQUFLLENBQUMsMkJBQTJCQTtZQUN6QyxPQUFPcEIsSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUF3QjtRQUNqRTtJQUNGLE9BQU87UUFDTCxPQUFPVCxJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBcUI7SUFDOUQ7QUFDRiIsInNvdXJjZXMiOlsiRDpcXE5ldyBmb2xkZXJcXGFkbWluXFxwYWdlc1xcYXBpXFxhZG1pblxccHJvZmlsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYkNvbm5lY3QgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vc2VydmVyL3V0aWxzL2RiQ29ubmVjdFwiKTtcclxuY29uc3QgQWRtaW5Vc2VyID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3NlcnZlci9tb2RlbHMvQWRtaW5Vc2VyXCIpO1xyXG5jb25zdCBBZG1pblByb2ZpbGVEZXRhaWxzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3NlcnZlci9tb2RlbHMvQWRtaW5Qcm9maWxlRGV0YWlsc1wiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XHJcbiAgYXBpOiB7XHJcbiAgICBib2R5UGFyc2VyOiB7XHJcbiAgICAgIHNpemVMaW1pdDogXCI1bWJcIiwgLy8gSW5jcmVhc2UgdGhlIGJvZHkgc2l6ZSBsaW1pdCB0byA1TUJcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICBhd2FpdCBkYkNvbm5lY3QoKTtcclxuXHJcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIHBob3RvLCBlbWFpbCwgcm9sZSB9ID0gcmVxLmJvZHk7XHJcblxyXG4gICAgaWYgKCFlbWFpbCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkVtYWlsIGlzIHJlcXVpcmVkXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWRtaW5Vc2VyID0gYXdhaXQgQWRtaW5Vc2VyLmZpbmRPbmUoeyBlbWFpbDogZW1haWwudG9Mb3dlckNhc2UoKSB9KTtcclxuICAgICAgaWYgKCFhZG1pblVzZXIpIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkFkbWluIHVzZXIgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBwcm9maWxlID0gYXdhaXQgQWRtaW5Qcm9maWxlRGV0YWlscy5maW5kT25lKHtcclxuICAgICAgICBhZG1pblVzZXJJZDogYWRtaW5Vc2VyLl9pZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghcHJvZmlsZSkge1xyXG4gICAgICAgIHByb2ZpbGUgPSBuZXcgQWRtaW5Qcm9maWxlRGV0YWlscyh7IGFkbWluVXNlcklkOiBhZG1pblVzZXIuX2lkIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSBwcm9maWxlLm5hbWUgPSBuYW1lO1xyXG4gICAgICBpZiAocGhvdG8gIT09IHVuZGVmaW5lZCkgcHJvZmlsZS5waG90byA9IHBob3RvO1xyXG4gICAgICBpZiAocm9sZSAhPT0gdW5kZWZpbmVkKSBwcm9maWxlLnJvbGUgPSByb2xlO1xyXG5cclxuICAgICAgYXdhaXQgcHJvZmlsZS5zYXZlKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIlByb2ZpbGUgc2F2ZWQvdXBkYXRlZDpcIiwgcHJvZmlsZSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiBcIlByb2ZpbGUgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBwcm9maWxlOlwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyZXEubWV0aG9kID09PSBcIkdFVFwiKSB7XHJcbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEucXVlcnk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFQSSBHRVQgL3Byb2ZpbGUgY2FsbGVkIHdpdGggZW1haWw6XCIsIGVtYWlsKTtcclxuXHJcbiAgICBpZiAoIWVtYWlsKSB7XHJcbiAgICAgIHJldHVybiByZXNcclxuICAgICAgICAuc3RhdHVzKDQwMClcclxuICAgICAgICAuanNvbih7IG1lc3NhZ2U6IFwiRW1haWwgcXVlcnkgcGFyYW1ldGVyIGlzIHJlcXVpcmVkXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWRtaW5Vc2VyID0gYXdhaXQgQWRtaW5Vc2VyLmZpbmRPbmUoeyBlbWFpbDogZW1haWwudG9Mb3dlckNhc2UoKSB9KTtcclxuICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBhZG1pblVzZXI6XCIsIGFkbWluVXNlcik7XHJcbiAgICAgIGlmICghYWRtaW5Vc2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJBZG1pbiB1c2VyIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9maWxlID0gYXdhaXQgQWRtaW5Qcm9maWxlRGV0YWlscy5maW5kT25lKHtcclxuICAgICAgICBhZG1pblVzZXJJZDogYWRtaW5Vc2VyLl9pZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgcHJvZmlsZTpcIiwgcHJvZmlsZSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIGVtYWlsOiBhZG1pblVzZXIuZW1haWwsXHJcbiAgICAgICAgbmFtZTogcHJvZmlsZT8ubmFtZSB8fCBcIlwiLFxyXG4gICAgICAgIHBob3RvOiBwcm9maWxlPy5waG90byB8fCBcIlwiLFxyXG4gICAgICAgIHJvbGU6IHByb2ZpbGU/LnJvbGUgfHwgXCJVc2VyXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHByb2ZpbGU6XCIsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5qc29uKHsgbWVzc2FnZTogXCJNZXRob2Qgbm90IGFsbG93ZWRcIiB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImRiQ29ubmVjdCIsInJlcXVpcmUiLCJBZG1pblVzZXIiLCJBZG1pblByb2ZpbGVEZXRhaWxzIiwiY29uZmlnIiwiYXBpIiwiYm9keVBhcnNlciIsInNpemVMaW1pdCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJuYW1lIiwicGhvdG8iLCJlbWFpbCIsInJvbGUiLCJib2R5Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJhZG1pblVzZXIiLCJmaW5kT25lIiwidG9Mb3dlckNhc2UiLCJwcm9maWxlIiwiYWRtaW5Vc2VySWQiLCJfaWQiLCJ1bmRlZmluZWQiLCJzYXZlIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwicXVlcnkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api-node)/./pages/api/admin/profile.js\n");

/***/ }),

/***/ "?0896":
/*!**************************!*\
  !*** kerberos (ignored) ***!
  \**************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?10a0":
/*!***********************************************!*\
  !*** @aws-sdk/credential-providers (ignored) ***!
  \***********************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?619b":
/*!*******************************************!*\
  !*** mongodb-client-encryption (ignored) ***!
  \*******************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?a2ff":
/*!************************!*\
  !*** snappy (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?e5da":
/*!**********************************!*\
  !*** @mongodb-js/zstd (ignored) ***!
  \**********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mongoose","vendor-chunks/mongodb","vendor-chunks/tr46","vendor-chunks/bson","vendor-chunks/mquery","vendor-chunks/whatwg-url","vendor-chunks/ip-address","vendor-chunks/socks","vendor-chunks/smart-buffer","vendor-chunks/jsbn","vendor-chunks/sift","vendor-chunks/kareem","vendor-chunks/aws4","vendor-chunks/webidl-conversions","vendor-chunks/mongodb-connection-string-url","vendor-chunks/mpath","vendor-chunks/sprintf-js","vendor-chunks/@mongodb-js","vendor-chunks/memory-pager","vendor-chunks/supports-color","vendor-chunks/sparse-bitfield","vendor-chunks/has-flag","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2Fprofile&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5Cprofile.js&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();