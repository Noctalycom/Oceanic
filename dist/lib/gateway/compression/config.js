"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const node_zlib_1 = tslib_1.__importDefault(require("node:zlib"));
const Errors_1 = require("../../util/Errors");
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-require-imports */
const CompressionConfigs = {
    "zlib-stream": [
        {
            name: "zlib-sync",
            check: (client) => client.util._isModuleInstalled("zlib-sync"),
            getClass: () => require(node_path_1.default.join(__dirname, "zlib-sync")).default,
            getError: () => new Errors_1.DependencyError("zlib-sync based zlib-stream compression is not available: zlib-sync is not installed"),
        },
        {
            name: "pako",
            check: (client) => client.util._isModuleInstalled("pako"),
            getClass: () => require(node_path_1.default.join(__dirname, "pako")).default,
            getError: () => new Errors_1.DependencyError("pako based zlib-stream compression is not available: pako is not installed"),
        },
        {
            name: "native",
            check: (_client) => "createInflate" in node_zlib_1.default,
            getClass: () => require(node_path_1.default.join(__dirname, "zlib-native")).default,
            getError: () => new Errors_1.DependencyError("native zlib-stream compression is not available: zlib.createInflate does not exist"),
        },
    ],
    "zstd-stream": [
        {
            name: "zstd-napi",
            check: (client) => client.util._isModuleInstalled("zstd-napi"),
            getClass: () => require(node_path_1.default.join(__dirname, "zstd-napi")).default,
            getError: () => new Errors_1.DependencyError("zstd-napi based zstd-stream compression is not available: zstd-napi is not installed"),
        },
        {
            name: "native",
            check: (_client) => "createZstdDecompress" in node_zlib_1.default,
            getClass: () => require(node_path_1.default.join(__dirname, "zstd-native")).default,
            getError: () => new Errors_1.DependencyError("native zstd-stream compression is not available: zlib.createZstdDecompress does not exist"),
        },
    ],
};
/* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-require-imports */
exports.default = CompressionConfigs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2dhdGV3YXkvY29tcHJlc3Npb24vY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQUE2QjtBQUM3QixrRUFBNkI7QUFFN0IsOENBQW9EO0FBZ0JwRCw2RkFBNkY7QUFDN0YsTUFBTSxrQkFBa0IsR0FBNkM7SUFDakUsYUFBYSxFQUFFO1FBQ1g7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO1lBQ3RFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBRSxPQUFPLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUF1QixDQUFDLE9BQU87WUFDekYsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyxzRkFBc0YsQ0FBQztTQUM5SDtRQUNEO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ2pFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBRSxPQUFPLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUF1QixDQUFDLE9BQU87WUFDcEYsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyw0RUFBNEUsQ0FBQztTQUNwSDtRQUNEO1lBQ0ksSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLGVBQWUsSUFBSSxtQkFBSTtZQUNuRCxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUUsT0FBTyxDQUFDLG1CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBdUIsQ0FBQyxPQUFPO1lBQzNGLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLHdCQUFlLENBQUMsb0ZBQW9GLENBQUM7U0FDNUg7S0FDSjtJQUNELGFBQWEsRUFBRTtRQUNYO1lBQ0ksSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztZQUN0RSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUUsT0FBTyxDQUFDLG1CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBdUIsQ0FBQyxPQUFPO1lBQ3pGLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLHdCQUFlLENBQUMsc0ZBQXNGLENBQUM7U0FDOUg7UUFDRDtZQUNJLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxzQkFBc0IsSUFBSSxtQkFBSTtZQUMxRCxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUUsT0FBTyxDQUFDLG1CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBdUIsQ0FBQyxPQUFPO1lBQzNGLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLHdCQUFlLENBQUMsMkZBQTJGLENBQUM7U0FDbkk7S0FDSjtDQUNKLENBQUM7QUFDRiw0RkFBNEY7QUFFNUYsa0JBQWUsa0JBQWtCLENBQUMifQ==