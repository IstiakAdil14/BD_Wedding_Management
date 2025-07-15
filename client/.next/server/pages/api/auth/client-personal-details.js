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
exports.id = "pages/api/auth/client-personal-details";
exports.ids = ["pages/api/auth/client-personal-details"];
exports.modules = {

/***/ "(api-node)/../server/models/ClientPersonalDetails.js":
/*!*************************************************!*\
  !*** ../server/models/ClientPersonalDetails.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"(api-node)/../server/node_modules/mongoose/index.js\");\r\n\r\nconst ClientPersonalDetailsSchema = new mongoose.Schema(\r\n  {\r\n    clientUserId: {\r\n      type: mongoose.Schema.Types.ObjectId,\r\n      ref: \"ClientUser\",\r\n      required: true,\r\n      unique: true,\r\n    },\r\n    email: {\r\n      type: String,\r\n      trim: true,\r\n      required: true,\r\n      unique: true,\r\n    },\r\n    fullName: {\r\n      type: String,\r\n      trim: true,\r\n      required: true,\r\n    },\r\n    phoneNumber: {\r\n      type: String,\r\n      required: true,\r\n      trim: true,\r\n    },\r\n    address: {\r\n      type: String,\r\n      required: true,\r\n      trim: true,\r\n    },\r\n    dateOfBirth: {\r\n      required: false,\r\n      type: Date,\r\n    },\r\n    gender: {\r\n      type: String,\r\n      required: false,\r\n      enum: [\"Male\", \"Female\", \"Other\"],\r\n    },\r\n    profilePicture: {\r\n      type: String,\r\n      trim: true,\r\n      required: false,\r\n    },\r\n  },\r\n  { timestamps: true }\r\n);\r\n\r\nmodule.exports =\r\n  mongoose.models.ClientPersonalDetails ||\r\n  mongoose.model(\"ClientPersonalDetails\", ClientPersonalDetailsSchema);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uLi9zZXJ2ZXIvbW9kZWxzL0NsaWVudFBlcnNvbmFsRGV0YWlscy5qcyIsIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUIsbUJBQU8sQ0FBQyxxRUFBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiRDpcXE5ldyBmb2xkZXJcXHNlcnZlclxcbW9kZWxzXFxDbGllbnRQZXJzb25hbERldGFpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XHJcblxyXG5jb25zdCBDbGllbnRQZXJzb25hbERldGFpbHNTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gIHtcclxuICAgIGNsaWVudFVzZXJJZDoge1xyXG4gICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogXCJDbGllbnRVc2VyXCIsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICB1bmlxdWU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgZW1haWw6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGZ1bGxOYW1lOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcGhvbmVOdW1iZXI6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBhZGRyZXNzOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgZGF0ZU9mQmlydGg6IHtcclxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBEYXRlLFxyXG4gICAgfSxcclxuICAgIGdlbmRlcjoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgZW51bTogW1wiTWFsZVwiLCBcIkZlbWFsZVwiLCBcIk90aGVyXCJdLFxyXG4gICAgfSxcclxuICAgIHByb2ZpbGVQaWN0dXJlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9XHJcbiAgbW9uZ29vc2UubW9kZWxzLkNsaWVudFBlcnNvbmFsRGV0YWlscyB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsKFwiQ2xpZW50UGVyc29uYWxEZXRhaWxzXCIsIENsaWVudFBlcnNvbmFsRGV0YWlsc1NjaGVtYSk7XHJcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api-node)/../server/models/ClientPersonalDetails.js\n");

/***/ }),

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

/***/ "(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Fclient-personal-details&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Cclient-personal-details.js&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Fclient-personal-details&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Cclient-personal-details.js&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages-api/module.compiled */ \"(api-node)/./node_modules/next/dist/server/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(api-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_auth_client_personal_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\auth\\client-personal-details.js */ \"(api-node)/./pages/api/auth/client-personal-details.js\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_auth_client_personal_details_js__WEBPACK_IMPORTED_MODULE_3__, 'default'));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_auth_client_personal_details_js__WEBPACK_IMPORTED_MODULE_3__, 'config');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/auth/client-personal-details\",\n        pathname: \"/api/auth/client-personal-details\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    userland: _pages_api_auth_client_personal_details_js__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVNfQVBJJnBhZ2U9JTJGYXBpJTJGYXV0aCUyRmNsaWVudC1wZXJzb25hbC1kZXRhaWxzJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGcGFnZXMlNUNhcGklNUNhdXRoJTVDY2xpZW50LXBlcnNvbmFsLWRldGFpbHMuanMmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ0U7QUFDMUQ7QUFDMkU7QUFDM0U7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLHVFQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLGVBQWUsd0VBQUssQ0FBQyx1RUFBUTtBQUNwQztBQUNPLHdCQUF3Qix5R0FBbUI7QUFDbEQ7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlc0FQSVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzXFxcXGFwaVxcXFxhdXRoXFxcXGNsaWVudC1wZXJzb25hbC1kZXRhaWxzLmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2NsaWVudC1wZXJzb25hbC1kZXRhaWxzXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9jbGllbnQtcGVyc29uYWwtZGV0YWlsc1wiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Fclient-personal-details&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Cclient-personal-details.js&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api-node)/./pages/api/auth/client-personal-details.js":
/*!***************************************************!*\
  !*** ./pages/api/auth/client-personal-details.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../server/utils/dbConnect */ \"(api-node)/../server/utils/dbConnect.js\");\n/* harmony import */ var _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _server_models_ClientPersonalDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../server/models/ClientPersonalDetails */ \"(api-node)/../server/models/ClientPersonalDetails.js\");\n/* harmony import */ var _server_models_ClientPersonalDetails__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_server_models_ClientPersonalDetails__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _server_models_ClientUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../server/models/ClientUser */ \"(api-node)/../server/models/ClientUser.js\");\n/* harmony import */ var _server_models_ClientUser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_server_models_ClientUser__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst config = {\n    api: {\n        bodyParser: {\n            sizeLimit: \"5mb\"\n        }\n    }\n};\nasync function handler(req, res) {\n    await _server_utils_dbConnect__WEBPACK_IMPORTED_MODULE_0___default()();\n    if (req.method === \"GET\") {\n        const { email } = req.query;\n        console.log(\"GET /client-personal-details called with email:\", email);\n        if (!email) {\n            console.error(\"Email query parameter missing\");\n            return res.status(400).json({\n                message: \"Email query parameter is required\"\n            });\n        }\n        try {\n            console.log(\"Querying ClientPersonalDetails with email:\", email);\n            const personalDetails = await _server_models_ClientPersonalDetails__WEBPACK_IMPORTED_MODULE_1___default().findOne({\n                email\n            });\n            if (!personalDetails) {\n                console.error(\"Personal details not found for email:\", email);\n                return res.status(404).json({\n                    message: \"Personal details not found\"\n                });\n            }\n            // Format the response data\n            const formattedDetails = {\n                id: personalDetails._id.toString(),\n                clientUserId: personalDetails.clientUserId.toString(),\n                email: personalDetails.email,\n                fullName: personalDetails.fullName,\n                phoneNumber: personalDetails.phoneNumber,\n                address: personalDetails.address,\n                dateOfBirth: personalDetails.dateOfBirth ? personalDetails.dateOfBirth.toISOString() : null,\n                gender: personalDetails.gender,\n                profilePicture: personalDetails.profilePicture,\n                createdAt: personalDetails.createdAt ? personalDetails.createdAt.toISOString() : null,\n                updatedAt: personalDetails.updatedAt ? personalDetails.updatedAt.toISOString() : null\n            };\n            console.log(\"Personal details found:\", formattedDetails);\n            return res.status(200).json(formattedDetails);\n        } catch (error) {\n            console.error(\"Error fetching personal details:\", error);\n            return res.status(500).json({\n                message: \"Server error\"\n            });\n        }\n    } else if (req.method === \"POST\") {\n        const { email, fullName, phoneNumber, address, dateOfBirth, gender, profilePicture } = req.body;\n        console.log(\"POST /client-personal-details called with body:\", req.body);\n        if (!email || !fullName) {\n            console.error(\"Email or fullName missing in request body\");\n            return res.status(400).json({\n                message: \"Email and fullName are required\"\n            });\n        }\n        try {\n            // Find client user by email\n            const clientUser = await _server_models_ClientUser__WEBPACK_IMPORTED_MODULE_2___default().findOne({\n                email\n            });\n            if (!clientUser) {\n                console.error(\"Client user not found for email:\", email);\n                return res.status(404).json({\n                    message: \"Client user not found\"\n                });\n            }\n            // Find existing personal details by email or create new\n            let personalDetails = await _server_models_ClientPersonalDetails__WEBPACK_IMPORTED_MODULE_1___default().findOne({\n                email\n            });\n            if (personalDetails) {\n                // Update existing\n                personalDetails.fullName = fullName;\n                personalDetails.phoneNumber = phoneNumber;\n                personalDetails.address = address;\n                personalDetails.dateOfBirth = dateOfBirth;\n                personalDetails.gender = gender;\n                personalDetails.profilePicture = profilePicture;\n            } else {\n                // Create new\n                personalDetails = new (_server_models_ClientPersonalDetails__WEBPACK_IMPORTED_MODULE_1___default())({\n                    clientUserId: clientUser._id,\n                    email,\n                    fullName,\n                    phoneNumber,\n                    address,\n                    dateOfBirth,\n                    gender,\n                    profilePicture\n                });\n            }\n            await personalDetails.save();\n            console.log(\"Personal details saved successfully for email:\", email);\n            // Cleanup old images in public/uploads except current profilePicture\n            const fs = __webpack_require__(/*! fs */ \"fs\");\n            const path = __webpack_require__(/*! path */ \"path\");\n            const uploadsDir = path.join(process.cwd(), \"public/uploads\");\n            fs.readdir(uploadsDir, (err, files)=>{\n                if (err) {\n                    console.error(\"Error reading uploads directory:\", err);\n                    return;\n                }\n                files.forEach((file)=>{\n                    const filePath = `/uploads/${file}`;\n                    if (filePath !== profilePicture) {\n                        const fullPath = path.join(uploadsDir, file);\n                        fs.unlink(fullPath, (unlinkErr)=>{\n                            if (unlinkErr) {\n                                console.error(\"Error deleting file:\", fullPath, unlinkErr);\n                            } else {\n                                console.log(\"Deleted old upload file:\", fullPath);\n                            }\n                        });\n                    }\n                });\n            });\n            return res.status(200).json({\n                message: \"Personal details saved successfully\"\n            });\n        } catch (error) {\n            console.error(\"Error saving personal details:\", error);\n            return res.status(500).json({\n                message: \"Server error\"\n            });\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"GET\",\n            \"POST\"\n        ]);\n        return res.status(405).end(`Method ${req.method} Not Allowed`);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaS1ub2RlKS8uL3BhZ2VzL2FwaS9hdXRoL2NsaWVudC1wZXJzb25hbC1kZXRhaWxzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTJEO0FBQ3lCO0FBQ3RCO0FBRXZELE1BQU1HLFNBQVM7SUFDcEJDLEtBQUs7UUFDSEMsWUFBWTtZQUNWQyxXQUFXO1FBQ2I7SUFDRjtBQUNGLEVBQUU7QUFFYSxlQUFlQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUc7SUFDNUMsTUFBTVQsOERBQVNBO0lBRWYsSUFBSVEsSUFBSUUsTUFBTSxLQUFLLE9BQU87UUFDeEIsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0gsSUFBSUksS0FBSztRQUMzQkMsUUFBUUMsR0FBRyxDQUFDLG1EQUFtREg7UUFFL0QsSUFBSSxDQUFDQSxPQUFPO1lBQ1ZFLFFBQVFFLEtBQUssQ0FBQztZQUNkLE9BQU9OLElBQ0pPLE1BQU0sQ0FBQyxLQUNQQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBb0M7UUFDekQ7UUFFQSxJQUFJO1lBQ0ZMLFFBQVFDLEdBQUcsQ0FBQyw4Q0FBOENIO1lBQzFELE1BQU1RLGtCQUFrQixNQUFNbEIsbUZBQTZCLENBQUM7Z0JBQUVVO1lBQU07WUFDcEUsSUFBSSxDQUFDUSxpQkFBaUI7Z0JBQ3BCTixRQUFRRSxLQUFLLENBQUMseUNBQXlDSjtnQkFDdkQsT0FBT0YsSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztvQkFBRUMsU0FBUztnQkFBNkI7WUFDdEU7WUFFQSwyQkFBMkI7WUFDM0IsTUFBTUcsbUJBQW1CO2dCQUN2QkMsSUFBSUgsZ0JBQWdCSSxHQUFHLENBQUNDLFFBQVE7Z0JBQ2hDQyxjQUFjTixnQkFBZ0JNLFlBQVksQ0FBQ0QsUUFBUTtnQkFDbkRiLE9BQU9RLGdCQUFnQlIsS0FBSztnQkFDNUJlLFVBQVVQLGdCQUFnQk8sUUFBUTtnQkFDbENDLGFBQWFSLGdCQUFnQlEsV0FBVztnQkFDeENDLFNBQVNULGdCQUFnQlMsT0FBTztnQkFDaENDLGFB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TSxDQUFDRCxVQUFVLENBQUNFOzRCQUNuQixJQUFJQSxXQUFXO2dDQUNieEMsUUFBUUUsS0FBSyxDQUFDLHdCQUF3Qm9DLFVBQVVFOzRCQUNsRCxPQUFPO2dDQUNMeEMsUUFBUUMsR0FBRyxDQUFDLDRCQUE0QnFDOzRCQUMxQzt3QkFDRjtvQkFDRjtnQkFDRjtZQUNGO1lBRUEsT0FBTzFDLElBQ0pPLE1BQU0sQ0FBQyxLQUNQQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBc0M7UUFDM0QsRUFBRSxPQUFPSCxPQUFPO1lBQ2RGLFFBQVFFLEtBQUssQ0FBQyxrQ0FBa0NBO1lBQ2hELE9BQU9OLElBQUlPLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBZTtRQUN4RDtJQUNGLE9BQU87UUFDTFQsSUFBSTZDLFNBQVMsQ0FBQyxTQUFTO1lBQUM7WUFBTztTQUFPO1FBQ3RDLE9BQU83QyxJQUFJTyxNQUFNLENBQUMsS0FBS3VDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRS9DLElBQUlFLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDL0Q7QUFDRiIsInNvdXJjZXMiOlsiRDpcXE5ldyBmb2xkZXJcXGNsaWVudFxccGFnZXNcXGFwaVxcYXV0aFxcY2xpZW50LXBlcnNvbmFsLWRldGFpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRiQ29ubmVjdCBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmVyL3V0aWxzL2RiQ29ubmVjdFwiO1xyXG5pbXBvcnQgQ2xpZW50UGVyc29uYWxEZXRhaWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2ZXIvbW9kZWxzL0NsaWVudFBlcnNvbmFsRGV0YWlsc1wiO1xyXG5pbXBvcnQgQ2xpZW50VXNlciBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmVyL21vZGVscy9DbGllbnRVc2VyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gIGFwaToge1xyXG4gICAgYm9keVBhcnNlcjoge1xyXG4gICAgICBzaXplTGltaXQ6IFwiNW1iXCIsIC8vIEluY3JlYXNlIHRoZSBib2R5IHNpemUgbGltaXQgdG8gNU1CIHRvIGFjY2VwdCBiYXNlNjQgaW1hZ2VzXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgYXdhaXQgZGJDb25uZWN0KCk7XHJcblxyXG4gIGlmIChyZXEubWV0aG9kID09PSBcIkdFVFwiKSB7XHJcbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEucXVlcnk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkdFVCAvY2xpZW50LXBlcnNvbmFsLWRldGFpbHMgY2FsbGVkIHdpdGggZW1haWw6XCIsIGVtYWlsKTtcclxuXHJcbiAgICBpZiAoIWVtYWlsKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFbWFpbCBxdWVyeSBwYXJhbWV0ZXIgbWlzc2luZ1wiKTtcclxuICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoNDAwKVxyXG4gICAgICAgIC5qc29uKHsgbWVzc2FnZTogXCJFbWFpbCBxdWVyeSBwYXJhbWV0ZXIgaXMgcmVxdWlyZWRcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ5aW5nIENsaWVudFBlcnNvbmFsRGV0YWlscyB3aXRoIGVtYWlsOlwiLCBlbWFpbCk7XHJcbiAgICAgIGNvbnN0IHBlcnNvbmFsRGV0YWlscyA9IGF3YWl0IENsaWVudFBlcnNvbmFsRGV0YWlscy5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICAgIGlmICghcGVyc29uYWxEZXRhaWxzKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlBlcnNvbmFsIGRldGFpbHMgbm90IGZvdW5kIGZvciBlbWFpbDpcIiwgZW1haWwpO1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGVyc29uYWwgZGV0YWlscyBub3QgZm91bmRcIiB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRm9ybWF0IHRoZSByZXNwb25zZSBkYXRhXHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZERldGFpbHMgPSB7XHJcbiAgICAgICAgaWQ6IHBlcnNvbmFsRGV0YWlscy5faWQudG9TdHJpbmcoKSxcclxuICAgICAgICBjbGllbnRVc2VySWQ6IHBlcnNvbmFsRGV0YWlscy5jbGllbnRVc2VySWQudG9TdHJpbmcoKSxcclxuICAgICAgICBlbWFpbDogcGVyc29uYWxEZXRhaWxzLmVtYWlsLFxyXG4gICAgICAgIGZ1bGxOYW1lOiBwZXJzb25hbERldGFpbHMuZnVsbE5hbWUsXHJcbiAgICAgICAgcGhvbmVOdW1iZXI6IHBlcnNvbmFsRGV0YWlscy5waG9uZU51bWJlcixcclxuICAgICAgICBhZGRyZXNzOiBwZXJzb25hbERldGFpbHMuYWRkcmVzcyxcclxuICAgICAgICBkYXRlT2ZCaXJ0aDogcGVyc29uYWxEZXRhaWxzLmRhdGVPZkJpcnRoXHJcbiAgICAgICAgICA/IHBlcnNvbmFsRGV0YWlscy5kYXRlT2ZCaXJ0aC50b0lTT1N0cmluZygpXHJcbiAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgZ2VuZGVyOiBwZXJzb25hbERldGFpbHMuZ2VuZGVyLFxyXG4gICAgICAgIHByb2ZpbGVQaWN0dXJlOiBwZXJzb25hbERldGFpbHMucHJvZmlsZVBpY3R1cmUsXHJcbiAgICAgICAgY3JlYXRlZEF0OiBwZXJzb25hbERldGFpbHMuY3JlYXRlZEF0XHJcbiAgICAgICAgICA/IHBlcnNvbmFsRGV0YWlscy5jcmVhdGVkQXQudG9JU09TdHJpbmcoKVxyXG4gICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIHVwZGF0ZWRBdDogcGVyc29uYWxEZXRhaWxzLnVwZGF0ZWRBdFxyXG4gICAgICAgICAgPyBwZXJzb25hbERldGFpbHMudXBkYXRlZEF0LnRvSVNPU3RyaW5nKClcclxuICAgICAgICAgIDogbnVsbCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUGVyc29uYWwgZGV0YWlscyBmb3VuZDpcIiwgZm9ybWF0dGVkRGV0YWlscyk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oZm9ybWF0dGVkRGV0YWlscyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgcGVyc29uYWwgZGV0YWlsczpcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIlNlcnZlciBlcnJvclwiIH0pO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIGZ1bGxOYW1lLFxyXG4gICAgICBwaG9uZU51bWJlcixcclxuICAgICAgYWRkcmVzcyxcclxuICAgICAgZGF0ZU9mQmlydGgsXHJcbiAgICAgIGdlbmRlcixcclxuICAgICAgcHJvZmlsZVBpY3R1cmUsXHJcbiAgICB9ID0gcmVxLmJvZHk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJQT1NUIC9jbGllbnQtcGVyc29uYWwtZGV0YWlscyBjYWxsZWQgd2l0aCBib2R5OlwiLCByZXEuYm9keSk7XHJcblxyXG4gICAgaWYgKCFlbWFpbCB8fCAhZnVsbE5hbWUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVtYWlsIG9yIGZ1bGxOYW1lIG1pc3NpbmcgaW4gcmVxdWVzdCBib2R5XCIpO1xyXG4gICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgLnN0YXR1cyg0MDApXHJcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIkVtYWlsIGFuZCBmdWxsTmFtZSBhcmUgcmVxdWlyZWRcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBGaW5kIGNsaWVudCB1c2VyIGJ5IGVtYWlsXHJcbiAgICAgIGNvbnN0IGNsaWVudFVzZXIgPSBhd2FpdCBDbGllbnRVc2VyLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuICAgICAgaWYgKCFjbGllbnRVc2VyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNsaWVudCB1c2VyIG5vdCBmb3VuZCBmb3IgZW1haWw6XCIsIGVtYWlsKTtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkNsaWVudCB1c2VyIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBGaW5kIGV4aXN0aW5nIHBlcnNvbmFsIGRldGFpbHMgYnkgZW1haWwgb3IgY3JlYXRlIG5ld1xyXG4gICAgICBsZXQgcGVyc29uYWxEZXRhaWxzID0gYXdhaXQgQ2xpZW50UGVyc29uYWxEZXRhaWxzLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuXHJcbiAgICAgIGlmIChwZXJzb25hbERldGFpbHMpIHtcclxuICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmdcclxuICAgICAgICBwZXJzb25hbERldGFpbHMuZnVsbE5hbWUgPSBmdWxsTmFtZTtcclxuICAgICAgICBwZXJzb25hbERldGFpbHMucGhvbmVOdW1iZXIgPSBwaG9uZU51bWJlcjtcclxuICAgICAgICBwZXJzb25hbERldGFpbHMuYWRkcmVzcyA9IGFkZHJlc3M7XHJcbiAgICAgICAgcGVyc29uYWxEZXRhaWxzLmRhdGVPZkJpcnRoID0gZGF0ZU9mQmlydGg7XHJcbiAgICAgICAgcGVyc29uYWxEZXRhaWxzLmdlbmRlciA9IGdlbmRlcjtcclxuICAgICAgICBwZXJzb25hbERldGFpbHMucHJvZmlsZVBpY3R1cmUgPSBwcm9maWxlUGljdHVyZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBDcmVhdGUgbmV3XHJcbiAgICAgICAgcGVyc29uYWxEZXRhaWxzID0gbmV3IENsaWVudFBlcnNvbmFsRGV0YWlscyh7XHJcbiAgICAgICAgICBjbGllbnRVc2VySWQ6IGNsaWVudFVzZXIuX2lkLFxyXG4gICAgICAgICAgZW1haWwsXHJcbiAgICAgICAgICBmdWxsTmFtZSxcclxuICAgICAgICAgIHBob25lTnVtYmVyLFxyXG4gICAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICAgIGRhdGVPZkJpcnRoLFxyXG4gICAgICAgICAgZ2VuZGVyLFxyXG4gICAgICAgICAgcHJvZmlsZVBpY3R1cmUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGF3YWl0IHBlcnNvbmFsRGV0YWlscy5zYXZlKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIlBlcnNvbmFsIGRldGFpbHMgc2F2ZWQgc3VjY2Vzc2Z1bGx5IGZvciBlbWFpbDpcIiwgZW1haWwpO1xyXG5cclxuICAgICAgLy8gQ2xlYW51cCBvbGQgaW1hZ2VzIGluIHB1YmxpYy91cGxvYWRzIGV4Y2VwdCBjdXJyZW50IHByb2ZpbGVQaWN0dXJlXHJcbiAgICAgIGNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xyXG4gICAgICBjb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcbiAgICAgIGNvbnN0IHVwbG9hZHNEaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJwdWJsaWMvdXBsb2Fkc1wiKTtcclxuXHJcbiAgICAgIGZzLnJlYWRkaXIodXBsb2Fkc0RpciwgKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmVhZGluZyB1cGxvYWRzIGRpcmVjdG9yeTpcIiwgZXJyKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBgL3VwbG9hZHMvJHtmaWxlfWA7XHJcbiAgICAgICAgICBpZiAoZmlsZVBhdGggIT09IHByb2ZpbGVQaWN0dXJlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gcGF0aC5qb2luKHVwbG9hZHNEaXIsIGZpbGUpO1xyXG4gICAgICAgICAgICBmcy51bmxpbmsoZnVsbFBhdGgsICh1bmxpbmtFcnIpID0+IHtcclxuICAgICAgICAgICAgICBpZiAodW5saW5rRXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZmlsZTpcIiwgZnVsbFBhdGgsIHVubGlua0Vycik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlZCBvbGQgdXBsb2FkIGZpbGU6XCIsIGZ1bGxQYXRoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IG1lc3NhZ2U6IFwiUGVyc29uYWwgZGV0YWlscyBzYXZlZCBzdWNjZXNzZnVsbHlcIiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgcGVyc29uYWwgZGV0YWlsczpcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIlNlcnZlciBlcnJvclwiIH0pO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXMuc2V0SGVhZGVyKFwiQWxsb3dcIiwgW1wiR0VUXCIsIFwiUE9TVFwiXSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmVuZChgTWV0aG9kICR7cmVxLm1ldGhvZH0gTm90IEFsbG93ZWRgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImRiQ29ubmVjdCIsIkNsaWVudFBlcnNvbmFsRGV0YWlscyIsIkNsaWVudFVzZXIiLCJjb25maWciLCJhcGkiLCJib2R5UGFyc2VyIiwic2l6ZUxpbWl0IiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImVtYWlsIiwicXVlcnkiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInBlcnNvbmFsRGV0YWlscyIsImZpbmRPbmUiLCJmb3JtYXR0ZWREZXRhaWxzIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsImNsaWVudFVzZXJJZCIsImZ1bGxOYW1lIiwicGhvbmVOdW1iZXIiLCJhZGRyZXNzIiwiZGF0ZU9mQmlydGgiLCJ0b0lTT1N0cmluZyIsImdlbmRlciIsInByb2ZpbGVQaWN0dXJlIiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0IiwiYm9keSIsImNsaWVudFVzZXIiLCJzYXZlIiwiZnMiLCJyZXF1aXJlIiwicGF0aCIsInVwbG9hZHNEaXIiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsInJlYWRkaXIiLCJlcnIiLCJmaWxlcyIsImZvckVhY2giLCJmaWxlIiwiZmlsZVBhdGgiLCJmdWxsUGF0aCIsInVubGluayIsInVubGlua0VyciIsInNldEhlYWRlciIsImVuZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api-node)/./pages/api/auth/client-personal-details.js\n");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mongoose","vendor-chunks/mongodb","vendor-chunks/whatwg-url","vendor-chunks/mquery","vendor-chunks/ip-address","vendor-chunks/socks","vendor-chunks/tr46","vendor-chunks/@mongodb-js","vendor-chunks/mpath","vendor-chunks/smart-buffer","vendor-chunks/sift","vendor-chunks/mongodb-connection-string-url","vendor-chunks/bcryptjs","vendor-chunks/aws4","vendor-chunks/bson","vendor-chunks/webidl-conversions","vendor-chunks/supports-color","vendor-chunks/sprintf-js","vendor-chunks/sparse-bitfield","vendor-chunks/memory-pager","vendor-chunks/kareem","vendor-chunks/jsbn","vendor-chunks/has-flag"], () => (__webpack_exec__("(api-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Fclient-personal-details&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cauth%5Cclient-personal-details.js&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();