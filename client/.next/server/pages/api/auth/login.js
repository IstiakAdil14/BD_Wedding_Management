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
exports.id = "pages/api/auth/login";
exports.ids = ["pages/api/auth/login"];
exports.modules = {

/***/ "(api-node)/../server/models/ClientUser.js":
/*!**************************************!*\
  !*** ../server/models/ClientUser.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"(api-node)/../server/node_modules/mongoose/index.js\");\r\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"(api-node)/../server/node_modules/bcryptjs/index.js\");\r\n\r\nconst ClientUserSchema = new mongoose.Schema(\r\n  {\r\n    email: {\r\n      type: String,\r\n      required: true,\r\n      unique: true,\r\n      lowercase: true,\r\n      trim: true,\r\n    },\r\n    password: {\r\n      type: String,\r\n      required: true,\r\n    },\r\n    otp: {\r\n      type: String,\r\n    },\r\n    otpExpiration: {\r\n      type: Date,\r\n    },\r\n    isVerified: {\r\n      type: Boolean,\r\n      default: false,\r\n    },\r\n  },\r\n  { timestamps: true }\r\n);\r\n\r\n// Hash password before saving\r\nClientUserSchema.pre(\"save\", async function (next) {\r\n  if (!this.isModified(\"password\")) return next();\r\n  try {\r\n    const salt = await bcrypt.genSalt(10);\r\n    this.password = await bcrypt.hash(this.password, salt);\r\n    next();\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n});\r\n\r\n// Method to compare password\r\nClientUserSchema.methods.comparePassword = async function (candidatePassword) {\r\n  return bcrypt.compare(candidatePassword, this.password);\r\n};\r\n\r\nmodule.exports =\r\n  mongoose.models.ClientUser || mongoose.model(\"ClientUser\", ClientUserSchema);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uLi9zZXJ2ZXIvbW9kZWxzL0NsaWVudFVzZXIuanMiLCJtYXBwaW5ncyI6IkFBQUEsaUJBQWlCLG1CQUFPLENBQUMscUVBQVU7QUFDbkMsZUFBZSxtQkFBTyxDQUFDLHFFQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkQ6XFxOZXcgZm9sZGVyXFxzZXJ2ZXJcXG1vZGVsc1xcQ2xpZW50VXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcclxuY29uc3QgYmNyeXB0ID0gcmVxdWlyZShcImJjcnlwdGpzXCIpO1xyXG5cclxuY29uc3QgQ2xpZW50VXNlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXHJcbiAge1xyXG4gICAgZW1haWw6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgICBsb3dlcmNhc2U6IHRydWUsXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcGFzc3dvcmQ6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBvdHA6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgfSxcclxuICAgIG90cEV4cGlyYXRpb246IHtcclxuICAgICAgdHlwZTogRGF0ZSxcclxuICAgIH0sXHJcbiAgICBpc1ZlcmlmaWVkOiB7XHJcbiAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG4vLyBIYXNoIHBhc3N3b3JkIGJlZm9yZSBzYXZpbmdcclxuQ2xpZW50VXNlclNjaGVtYS5wcmUoXCJzYXZlXCIsIGFzeW5jIGZ1bmN0aW9uIChuZXh0KSB7XHJcbiAgaWYgKCF0aGlzLmlzTW9kaWZpZWQoXCJwYXNzd29yZFwiKSkgcmV0dXJuIG5leHQoKTtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKTtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaCh0aGlzLnBhc3N3b3JkLCBzYWx0KTtcclxuICAgIG5leHQoKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIG5leHQoZXJyKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gTWV0aG9kIHRvIGNvbXBhcmUgcGFzc3dvcmRcclxuQ2xpZW50VXNlclNjaGVtYS5tZXRob2RzLmNvbXBhcmVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChjYW5kaWRhdGVQYXNzd29yZCkge1xyXG4gIHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9XHJcbiAgbW9uZ29vc2UubW9kZWxzLkNsaWVudFVzZXIgfHwgbW9uZ29vc2UubW9kZWwoXCJDbGllbnRVc2VyXCIsIENsaWVudFVzZXJTY2hlbWEpO1xyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api-node)/../server/models/ClientUser.js\n");

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

/***/ "(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Clogin.js&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Clogin.js&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages-api/module.compiled */ \"(api-node)/./node_modules/next/dist/server/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(api-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_auth_login_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\auth\\login.js */ \"(api-node)/./pages/api/auth/login.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_api_auth_login_js__WEBPACK_IMPORTED_MODULE_3__]);\n_pages_api_auth_login_js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_auth_login_js__WEBPACK_IMPORTED_MODULE_3__, 'default'));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_auth_login_js__WEBPACK_IMPORTED_MODULE_3__, 'config');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/auth/login\",\n        pathname: \"/api/auth/login\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    userland: _pages_api_auth_login_js__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVNfQVBJJnBhZ2U9JTJGYXBpJTJGYXV0aCUyRmxvZ2luJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGcGFnZXMlNUNhcGklNUNhdXRoJTVDbG9naW4uanMmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ0U7QUFDMUQ7QUFDeUQ7QUFDekQ7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLHFEQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLGVBQWUsd0VBQUssQ0FBQyxxREFBUTtBQUNwQztBQUNPLHdCQUF3Qix5R0FBbUI7QUFDbEQ7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQscUMiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlc0FQSVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzXFxcXGFwaVxcXFxhdXRoXFxcXGxvZ2luLmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Clogin.js&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api-node)/./pages/api/auth/login.js":
/*!*********************************!*\
  !*** ./pages/api/auth/login.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../server/utils/dbConnect */ \"(api-node)/../server/utils/dbConnect.js\");\n/* harmony import */ var _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _server_models_ClientUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../server/models/ClientUser */ \"(api-node)/../server/models/ClientUser.js\");\n/* harmony import */ var _server_models_ClientUser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_server_models_ClientUser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([bcryptjs__WEBPACK_IMPORTED_MODULE_2__]);\nbcryptjs__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nasync function handler(req, res) {\n    await _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0___default()();\n    if (req.method !== \"POST\") {\n        res.setHeader(\"Allow\", [\n            \"POST\"\n        ]);\n        return res.status(405).end(`Method ${req.method} Not Allowed`);\n    }\n    const { email, password } = req.body;\n    if (!email || !password) {\n        return res.status(400).json({\n            message: \"Email and password are required\"\n        });\n    }\n    try {\n        const user = await _server_models_ClientUser__WEBPACK_IMPORTED_MODULE_1___default().findOne({\n            email: email.trim()\n        });\n        if (!user) {\n            return res.status(401).json({\n                message: \"Invalid email or password\"\n            });\n        }\n        const isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(password, user.password);\n        if (!isMatch) {\n            return res.status(401).json({\n                message: \"Invalid email or password\"\n            });\n        }\n        const accessToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n            userId: user._id,\n            email: user.email\n        }, \"5f1ebeeebb9a38f330f36d8c66b92b52aceb7c2f0e55f3362a52958ec347c68a\", {\n            expiresIn: \"1h\"\n        });\n        // Determine if password is set (password field exists and is not empty)\n        const passwordSet = !!user.password;\n        return res.status(200).json({\n            accessToken,\n            passwordSet\n        });\n    } catch (error) {\n        return res.status(500).json({\n            message: \"Server error\",\n            error: error.message\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uL3BhZ2VzL2FwaS9hdXRoL2xvZ2luLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTJEO0FBQ0c7QUFDaEM7QUFDQztBQUVoQixlQUFlSSxRQUFRQyxHQUFHLEVBQUVDLEdBQUc7SUFDNUMsTUFBTU4sOERBQVNBO0lBRWYsSUFBSUssSUFBSUUsTUFBTSxLQUFLLFFBQVE7UUFDekJELElBQUlFLFNBQVMsQ0FBQyxTQUFTO1lBQUM7U0FBTztRQUMvQixPQUFPRixJQUFJRyxNQUFNLENBQUMsS0FBS0MsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFTCxJQUFJRSxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQy9EO0lBRUEsTUFBTSxFQUFFSSxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHUCxJQUFJUSxJQUFJO0lBRXBDLElBQUksQ0FBQ0YsU0FBUyxDQUFDQyxVQUFVO1FBQ3ZCLE9BQU9OLElBQUlHLE1BQU0sQ0FBQyxLQUFLSyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFrQztJQUMzRTtJQUVBLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1mLHdFQUFrQixDQUFDO1lBQUVVLE9BQU9BLE1BQU1PLElBQUk7UUFBRztRQUM1RCxJQUFJLENBQUNGLE1BQU07WUFDVCxPQUFPVixJQUFJRyxNQUFNLENBQUMsS0FBS0ssSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQTRCO1FBQ3JFO1FBRUEsTUFBTUksVUFBVSxNQUFNakIsd0RBQWMsQ0FBQ1UsVUFBVUksS0FBS0osUUFBUTtRQUM1RCxJQUFJLENBQUNPLFNBQVM7WUFDWixPQUFPYixJQUFJRyxNQUFNLENBQUMsS0FBS0ssSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQTRCO1FBQ3JFO1FBRUEsTUFBTU0sY0FBY2xCLHdEQUFRLENBQzFCO1lBQUVvQixRQUFRUCxLQUFLUSxHQUFHO1lBQUViLE9BQU9LLEtBQUtMLEtBQUs7UUFBQyxHQUN0Q2Msa0VBQTZCLEVBQzdCO1lBQUVHLFdBQVc7UUFBSztRQUdwQix3RUFBd0U7UUFDeEUsTUFBTUMsY0FBYyxDQUFDLENBQUNiLEtBQUtKLFFBQVE7UUFFbkMsT0FBT04sSUFBSUcsTUFBTSxDQUFDLEtBQUtLLElBQUksQ0FBQztZQUFFTztZQUFhUTtRQUFZO0lBQ3pELEVBQUUsT0FBT0MsT0FBTztRQUNkLE9BQU94QixJQUNKRyxNQUFNLENBQUMsS0FDUEssSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBZ0JlLE9BQU9BLE1BQU1mLE9BQU87UUFBQztJQUMxRDtBQUNGIiwic291cmNlcyI6WyJEOlxcTmV3IGZvbGRlclxcY2xpZW50XFxwYWdlc1xcYXBpXFxhdXRoXFxsb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGJDb25uZWN0IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2ZXIvdXRpbHMvZGJDb25uZWN0XCI7XHJcbmltcG9ydCBDbGllbnRVc2VyIGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2ZXIvbW9kZWxzL0NsaWVudFVzZXJcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgYXdhaXQgZGJDb25uZWN0KCk7XHJcblxyXG4gIGlmIChyZXEubWV0aG9kICE9PSBcIlBPU1RcIikge1xyXG4gICAgcmVzLnNldEhlYWRlcihcIkFsbG93XCIsIFtcIlBPU1RcIl0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5lbmQoYE1ldGhvZCAke3JlcS5tZXRob2R9IE5vdCBBbGxvd2VkYCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XHJcblxyXG4gIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkVtYWlsIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWRcIiB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgQ2xpZW50VXNlci5maW5kT25lKHsgZW1haWw6IGVtYWlsLnRyaW0oKSB9KTtcclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiBcIkludmFsaWQgZW1haWwgb3IgcGFzc3dvcmRcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc01hdGNoID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgaWYgKCFpc01hdGNoKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gand0LnNpZ24oXHJcbiAgICAgIHsgdXNlcklkOiB1c2VyLl9pZCwgZW1haWw6IHVzZXIuZW1haWwgfSxcclxuICAgICAgcHJvY2Vzcy5lbnYuSldUX0FDQ0VTU19TRUNSRVQsXHJcbiAgICAgIHsgZXhwaXJlc0luOiBcIjFoXCIgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgaWYgcGFzc3dvcmQgaXMgc2V0IChwYXNzd29yZCBmaWVsZCBleGlzdHMgYW5kIGlzIG5vdCBlbXB0eSlcclxuICAgIGNvbnN0IHBhc3N3b3JkU2V0ID0gISF1c2VyLnBhc3N3b3JkO1xyXG5cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGFjY2Vzc1Rva2VuLCBwYXNzd29yZFNldCB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIHJlc1xyXG4gICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIlNlcnZlciBlcnJvclwiLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImRiQ29ubmVjdCIsIkNsaWVudFVzZXIiLCJiY3J5cHQiLCJqd3QiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic2V0SGVhZGVyIiwic3RhdHVzIiwiZW5kIiwiZW1haWwiLCJwYXNzd29yZCIsImJvZHkiLCJqc29uIiwibWVzc2FnZSIsInVzZXIiLCJmaW5kT25lIiwidHJpbSIsImlzTWF0Y2giLCJjb21wYXJlIiwiYWNjZXNzVG9rZW4iLCJzaWduIiwidXNlcklkIiwiX2lkIiwicHJvY2VzcyIsImVudiIsIkpXVF9BQ0NFU1NfU0VDUkVUIiwiZXhwaXJlc0luIiwicGFzc3dvcmRTZXQiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api-node)/./pages/api/auth/login.js\n");

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

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = import("bcryptjs");;

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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mongoose","vendor-chunks/mongodb","vendor-chunks/tr46","vendor-chunks/bson","vendor-chunks/mquery","vendor-chunks/whatwg-url","vendor-chunks/bcryptjs","vendor-chunks/ip-address","vendor-chunks/socks","vendor-chunks/smart-buffer","vendor-chunks/jsbn","vendor-chunks/sift","vendor-chunks/kareem","vendor-chunks/aws4","vendor-chunks/webidl-conversions","vendor-chunks/mongodb-connection-string-url","vendor-chunks/mpath","vendor-chunks/sprintf-js","vendor-chunks/@mongodb-js","vendor-chunks/memory-pager","vendor-chunks/supports-color","vendor-chunks/sparse-bitfield","vendor-chunks/has-flag"], () => (__webpack_exec__("(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Clogin.js&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();