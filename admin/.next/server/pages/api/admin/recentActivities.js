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
exports.id = "pages/api/admin/recentActivities";
exports.ids = ["pages/api/admin/recentActivities"];
exports.modules = {

/***/ "(api-node)/../server/models/ContactMessage.js":
/*!******************************************!*\
  !*** ../server/models/ContactMessage.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"(api-node)/../server/node_modules/mongoose/index.js\");\r\n\r\nconst ContactMessageSchema = new mongoose.Schema({\r\n  name: {\r\n    type: String,\r\n    required: true,\r\n    trim: true,\r\n  },\r\n  email: {\r\n    type: String,\r\n    required: true,\r\n    trim: true,\r\n  },\r\n  message: {\r\n    type: String,\r\n    required: true,\r\n  },\r\n  sentAt: {\r\n    type: Date,\r\n    default: Date.now,\r\n  },\r\n});\r\n\r\nmodule.exports = mongoose.model('ContactMessage', ContactMessageSchema);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uLi9zZXJ2ZXIvbW9kZWxzL0NvbnRhY3RNZXNzYWdlLmpzIiwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQixtQkFBTyxDQUFDLHFFQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBIiwic291cmNlcyI6WyJEOlxcTmV3IGZvbGRlclxcc2VydmVyXFxtb2RlbHNcXENvbnRhY3RNZXNzYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuXHJcbmNvbnN0IENvbnRhY3RNZXNzYWdlU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgbmFtZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB0cmltOiB0cnVlLFxyXG4gIH0sXHJcbiAgZW1haWw6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdHJpbTogdHJ1ZSxcclxuICB9LFxyXG4gIG1lc3NhZ2U6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgc2VudEF0OiB7XHJcbiAgICB0eXBlOiBEYXRlLFxyXG4gICAgZGVmYXVsdDogRGF0ZS5ub3csXHJcbiAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdDb250YWN0TWVzc2FnZScsIENvbnRhY3RNZXNzYWdlU2NoZW1hKTtcclxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api-node)/../server/models/ContactMessage.js\n");

/***/ }),

/***/ "(api-node)/../server/models/Testimonial.js":
/*!***************************************!*\
  !*** ../server/models/Testimonial.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"(api-node)/../server/node_modules/mongoose/index.js\");\r\n\r\nconst TestimonialSchema = new mongoose.Schema({\r\n  clientName: { type: String, required: true },\r\n  email: { type: String, required: false },\r\n  message: { type: String, required: true },\r\n  clientImage: { type: String, default: '' },\r\n  display: { type: Boolean, default: true }, // whether to display this testimonial or not\r\n}, { timestamps: true });\r\n\r\nmodule.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uLi9zZXJ2ZXIvbW9kZWxzL1Rlc3RpbW9uaWFsLmpzIiwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQixtQkFBTyxDQUFDLHFFQUFVO0FBQ25DO0FBQ0E7QUFDQSxnQkFBZ0IsOEJBQThCO0FBQzlDLFdBQVcsK0JBQStCO0FBQzFDLGFBQWEsOEJBQThCO0FBQzNDLGlCQUFpQiwyQkFBMkI7QUFDNUMsYUFBYSw4QkFBOEI7QUFDM0MsQ0FBQyxJQUFJLGtCQUFrQjtBQUN2QjtBQUNBIiwic291cmNlcyI6WyJEOlxcTmV3IGZvbGRlclxcc2VydmVyXFxtb2RlbHNcXFRlc3RpbW9uaWFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuXHJcbmNvbnN0IFRlc3RpbW9uaWFsU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgY2xpZW50TmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UgfSxcclxuICBtZXNzYWdlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICBjbGllbnRJbWFnZTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgZGlzcGxheTogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH0sIC8vIHdoZXRoZXIgdG8gZGlzcGxheSB0aGlzIHRlc3RpbW9uaWFsIG9yIG5vdFxyXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVscy5UZXN0aW1vbmlhbCB8fCBtb25nb29zZS5tb2RlbCgnVGVzdGltb25pYWwnLCBUZXN0aW1vbmlhbFNjaGVtYSk7XHJcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api-node)/../server/models/Testimonial.js\n");

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

/***/ "(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2FrecentActivities&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5CrecentActivities.js&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2FrecentActivities&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5CrecentActivities.js&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages-api/module.compiled */ \"(api-node)/./node_modules/next/dist/server/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(api-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_admin_recentActivities_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\admin\\recentActivities.js */ \"(api-node)/./pages/api/admin/recentActivities.js\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_admin_recentActivities_js__WEBPACK_IMPORTED_MODULE_3__, 'default'));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_admin_recentActivities_js__WEBPACK_IMPORTED_MODULE_3__, 'config');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/admin/recentActivities\",\n        pathname: \"/api/admin/recentActivities\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    userland: _pages_api_admin_recentActivities_js__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVNfQVBJJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZyZWNlbnRBY3Rpdml0aWVzJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGcGFnZXMlNUNhcGklNUNhZG1pbiU1Q3JlY2VudEFjdGl2aXRpZXMuanMmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ0U7QUFDMUQ7QUFDcUU7QUFDckU7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLGlFQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLGVBQWUsd0VBQUssQ0FBQyxpRUFBUTtBQUNwQztBQUNPLHdCQUF3Qix5R0FBbUI7QUFDbEQ7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlc0FQSVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzXFxcXGFwaVxcXFxhZG1pblxcXFxyZWNlbnRBY3Rpdml0aWVzLmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9yZWNlbnRBY3Rpdml0aWVzXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vcmVjZW50QWN0aXZpdGllc1wiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2FrecentActivities&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5CrecentActivities.js&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api-node)/./pages/api/admin/recentActivities.js":
/*!*********************************************!*\
  !*** ./pages/api/admin/recentActivities.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../server/utils/dbConnect */ \"(api-node)/../server/utils/dbConnect.js\");\n/* harmony import */ var _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _server_models_ContactMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../server/models/ContactMessage */ \"(api-node)/../server/models/ContactMessage.js\");\n/* harmony import */ var _server_models_ContactMessage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_server_models_ContactMessage__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _server_models_Testimonial__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../server/models/Testimonial */ \"(api-node)/../server/models/Testimonial.js\");\n/* harmony import */ var _server_models_Testimonial__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_server_models_Testimonial__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function handler(req, res) {\n    await _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0___default()();\n    try {\n        // Fetch recent 3 ContactMessages sorted by sentAt descending\n        const recentMessages = await _server_models_ContactMessage__WEBPACK_IMPORTED_MODULE_1___default().find({}).sort({\n            sentAt: -1\n        }).limit(3).lean();\n        // Fetch recent 3 Testimonials sorted by createdAt descending (timestamps)\n        const recentTestimonials = await _server_models_Testimonial__WEBPACK_IMPORTED_MODULE_2___default().find({\n            display: true\n        }).sort({\n            createdAt: -1\n        }).limit(3).lean();\n        // Map messages to unified format\n        const mappedMessages = recentMessages.map((msg)=>({\n                id: `msg-${msg._id}`,\n                type: \"Message\",\n                title: msg.name,\n                date: msg.sentAt ? msg.sentAt.toISOString().split(\"T\")[0] : \"\",\n                message: msg.message || \"\"\n            }));\n        // Map testimonials to unified format\n        const mappedTestimonials = recentTestimonials.map((test)=>({\n                id: `test-${test._id}`,\n                type: \"Testimonial\",\n                title: test.clientName,\n                date: test.createdAt ? test.createdAt.toISOString().split(\"T\")[0] : \"\",\n                message: test.message || \"\"\n            }));\n        // Combine and sort by date descending\n        const combined = [\n            ...mappedMessages,\n            ...mappedTestimonials\n        ].sort((a, b)=>new Date(b.date) - new Date(a.date));\n        res.status(200).json(combined);\n    } catch (error) {\n        console.error(\"Error fetching recent activities:\", error);\n        res.status(500).json({\n            message: \"Internal server error\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uL3BhZ2VzL2FwaS9hZG1pbi9yZWNlbnRBY3Rpdml0aWVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMkQ7QUFDVztBQUNOO0FBRWpELGVBQWVHLFFBQVFDLEdBQUcsRUFBRUMsR0FBRztJQUM1QyxNQUFNTCw4REFBU0E7SUFFZixJQUFJO1FBQ0YsNkRBQTZEO1FBQzdELE1BQU1NLGlCQUFpQixNQUFNTCx5RUFBbUIsQ0FBQyxDQUFDLEdBQy9DTyxJQUFJLENBQUM7WUFBRUMsUUFBUSxDQUFDO1FBQUUsR0FDbEJDLEtBQUssQ0FBQyxHQUNOQyxJQUFJO1FBRVAsMEVBQTBFO1FBQzFFLE1BQU1DLHFCQUFxQixNQUFNVixzRUFBZ0IsQ0FBQztZQUFFVyxTQUFTO1FBQUssR0FDL0RMLElBQUksQ0FBQztZQUFFTSxXQUFXLENBQUM7UUFBRSxHQUNyQkosS0FBSyxDQUFDLEdBQ05DLElBQUk7UUFFUCxpQ0FBaUM7UUFDakMsTUFBTUksaUJBQWlCVCxlQUFlVSxHQUFHLENBQUMsQ0FBQ0MsTUFBUztnQkFDbERDLElBQUksQ0FBQyxJQUFJLEVBQUVELElBQUlFLEdBQUcsRUFBRTtnQkFDcEJDLE1BQU07Z0JBQ05DLE9BQU9KLElBQUlLLElBQUk7Z0JBQ2ZDLE1BQU1OLElBQUlSLE1BQU0sR0FBR1EsSUFBSVIsTUFBTSxDQUFDZSxXQUFXLEdBQUdDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHO2dCQUM1REMsU0FBU1QsSUFBSVMsT0FBTyxJQUFJO1lBQzFCO1FBRUEscUNBQXFDO1FBQ3JDLE1BQU1DLHFCQUFxQmYsbUJBQW1CSSxHQUFHLENBQUMsQ0FBQ1ksT0FBVTtnQkFDM0RWLElBQUksQ0FBQyxLQUFLLEVBQUVVLEtBQUtULEdBQUcsRUFBRTtnQkFDdEJDLE1BQU07Z0JBQ05DLE9BQU9PLEtBQUtDLFVBQVU7Z0JBQ3RCTixNQUFNSyxLQUFLZCxTQUFTLEdBQUdjLEtBQUtkLFNBQVMsQ0FBQ1UsV0FBVyxHQUFHQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRztnQkFDcEVDLFNBQVNFLEtBQUtGLE9BQU8sSUFBSTtZQUMzQjtRQUVBLHNDQUFzQztRQUN0QyxNQUFNSSxXQUFXO2VBQUlmO2VBQW1CWTtTQUFtQixDQUFDbkIsSUFBSSxDQUM5RCxDQUFDdUIsR0FBR0MsSUFBTSxJQUFJQyxLQUFLRCxFQUFFVCxJQUFJLElBQUksSUFBSVUsS0FBS0YsRUFBRVIsSUFBSTtRQUc5Q2xCLElBQUk2QixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDTDtJQUN2QixFQUFFLE9BQU9NLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHFDQUFxQ0E7UUFDbkQvQixJQUFJNkIsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFVCxTQUFTO1FBQXdCO0lBQzFEO0FBQ0YiLCJzb3VyY2VzIjpbIkQ6XFxOZXcgZm9sZGVyXFxhZG1pblxccGFnZXNcXGFwaVxcYWRtaW5cXHJlY2VudEFjdGl2aXRpZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRiQ29ubmVjdCBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmVyL3V0aWxzL2RiQ29ubmVjdFwiO1xyXG5pbXBvcnQgQ29udGFjdE1lc3NhZ2UgZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZlci9tb2RlbHMvQ29udGFjdE1lc3NhZ2VcIjtcclxuaW1wb3J0IFRlc3RpbW9uaWFsIGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2ZXIvbW9kZWxzL1Rlc3RpbW9uaWFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgYXdhaXQgZGJDb25uZWN0KCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBGZXRjaCByZWNlbnQgMyBDb250YWN0TWVzc2FnZXMgc29ydGVkIGJ5IHNlbnRBdCBkZXNjZW5kaW5nXHJcbiAgICBjb25zdCByZWNlbnRNZXNzYWdlcyA9IGF3YWl0IENvbnRhY3RNZXNzYWdlLmZpbmQoe30pXHJcbiAgICAgIC5zb3J0KHsgc2VudEF0OiAtMSB9KVxyXG4gICAgICAubGltaXQoMylcclxuICAgICAgLmxlYW4oKTtcclxuXHJcbiAgICAvLyBGZXRjaCByZWNlbnQgMyBUZXN0aW1vbmlhbHMgc29ydGVkIGJ5IGNyZWF0ZWRBdCBkZXNjZW5kaW5nICh0aW1lc3RhbXBzKVxyXG4gICAgY29uc3QgcmVjZW50VGVzdGltb25pYWxzID0gYXdhaXQgVGVzdGltb25pYWwuZmluZCh7IGRpc3BsYXk6IHRydWUgfSlcclxuICAgICAgLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pXHJcbiAgICAgIC5saW1pdCgzKVxyXG4gICAgICAubGVhbigpO1xyXG5cclxuICAgIC8vIE1hcCBtZXNzYWdlcyB0byB1bmlmaWVkIGZvcm1hdFxyXG4gICAgY29uc3QgbWFwcGVkTWVzc2FnZXMgPSByZWNlbnRNZXNzYWdlcy5tYXAoKG1zZykgPT4gKHtcclxuICAgICAgaWQ6IGBtc2ctJHttc2cuX2lkfWAsXHJcbiAgICAgIHR5cGU6IFwiTWVzc2FnZVwiLFxyXG4gICAgICB0aXRsZTogbXNnLm5hbWUsXHJcbiAgICAgIGRhdGU6IG1zZy5zZW50QXQgPyBtc2cuc2VudEF0LnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdIDogXCJcIixcclxuICAgICAgbWVzc2FnZTogbXNnLm1lc3NhZ2UgfHwgXCJcIixcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBNYXAgdGVzdGltb25pYWxzIHRvIHVuaWZpZWQgZm9ybWF0XHJcbiAgICBjb25zdCBtYXBwZWRUZXN0aW1vbmlhbHMgPSByZWNlbnRUZXN0aW1vbmlhbHMubWFwKCh0ZXN0KSA9PiAoe1xyXG4gICAgICBpZDogYHRlc3QtJHt0ZXN0Ll9pZH1gLFxyXG4gICAgICB0eXBlOiBcIlRlc3RpbW9uaWFsXCIsXHJcbiAgICAgIHRpdGxlOiB0ZXN0LmNsaWVudE5hbWUsXHJcbiAgICAgIGRhdGU6IHRlc3QuY3JlYXRlZEF0ID8gdGVzdC5jcmVhdGVkQXQudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0gOiBcIlwiLFxyXG4gICAgICBtZXNzYWdlOiB0ZXN0Lm1lc3NhZ2UgfHwgXCJcIixcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBDb21iaW5lIGFuZCBzb3J0IGJ5IGRhdGUgZGVzY2VuZGluZ1xyXG4gICAgY29uc3QgY29tYmluZWQgPSBbLi4ubWFwcGVkTWVzc2FnZXMsIC4uLm1hcHBlZFRlc3RpbW9uaWFsc10uc29ydChcclxuICAgICAgKGEsIGIpID0+IG5ldyBEYXRlKGIuZGF0ZSkgLSBuZXcgRGF0ZShhLmRhdGUpXHJcbiAgICApO1xyXG5cclxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGNvbWJpbmVkKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHJlY2VudCBhY3Rpdml0aWVzOlwiLCBlcnJvcik7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJkYkNvbm5lY3QiLCJDb250YWN0TWVzc2FnZSIsIlRlc3RpbW9uaWFsIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInJlY2VudE1lc3NhZ2VzIiwiZmluZCIsInNvcnQiLCJzZW50QXQiLCJsaW1pdCIsImxlYW4iLCJyZWNlbnRUZXN0aW1vbmlhbHMiLCJkaXNwbGF5IiwiY3JlYXRlZEF0IiwibWFwcGVkTWVzc2FnZXMiLCJtYXAiLCJtc2ciLCJpZCIsIl9pZCIsInR5cGUiLCJ0aXRsZSIsIm5hbWUiLCJkYXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsIm1lc3NhZ2UiLCJtYXBwZWRUZXN0aW1vbmlhbHMiLCJ0ZXN0IiwiY2xpZW50TmFtZSIsImNvbWJpbmVkIiwiYSIsImIiLCJEYXRlIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api-node)/./pages/api/admin/recentActivities.js\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mongoose","vendor-chunks/mongodb","vendor-chunks/tr46","vendor-chunks/bson","vendor-chunks/mquery","vendor-chunks/whatwg-url","vendor-chunks/ip-address","vendor-chunks/socks","vendor-chunks/smart-buffer","vendor-chunks/jsbn","vendor-chunks/sift","vendor-chunks/kareem","vendor-chunks/aws4","vendor-chunks/webidl-conversions","vendor-chunks/mongodb-connection-string-url","vendor-chunks/mpath","vendor-chunks/sprintf-js","vendor-chunks/@mongodb-js","vendor-chunks/memory-pager","vendor-chunks/supports-color","vendor-chunks/sparse-bitfield","vendor-chunks/has-flag"], () => (__webpack_exec__("(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fadmin%2FrecentActivities&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cadmin%5CrecentActivities.js&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();