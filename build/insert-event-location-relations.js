"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.default = (event, startLocations, endLocations) => __awaiter(this, void 0, void 0, function* () {
    startLocations = startLocations.map(bl => {
        bl.date = (event.date_min != null) ? event.date_min : event.date;
        bl.end_date = (event.date_min != null) ? event.date : null;
        return bl;
    });
    endLocations = endLocations.map(dl => {
        dl.date = event.end_date;
        dl.end_date = (event.end_date_max != null) ? event.end_date_max : null;
        return dl;
    });
    const locations = startLocations.concat(endLocations);
    const sql = `INSERT INTO event__location
					(event_id, location_id, date, end_date)
				VALUES
					${locations.map(location => `(${event.id}, ${location.id}, ${location.date}, ${location.end_date})`)}
				ON CONFLICT DO NOTHING`;
    const rows = yield utils_1.execSql(sql);
    if (rows.length)
        console.log(`${rows.length} location(s) inserted/updated in db!`);
});
