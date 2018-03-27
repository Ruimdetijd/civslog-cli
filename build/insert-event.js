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
const chalk_1 = require("chalk");
const readline_1 = require("./readline");
const utils_1 = require("./utils");
exports.default = (entity, dates) => __awaiter(this, void 0, void 0, function* () {
    const [dateMin, date, endDate, endDateMax] = dates;
    const sql = `INSERT INTO event
					(label, description, date_min, date, end_date, end_date_max, date_min_granularity, date_granularity, end_date_granularity, end_date_max_granularity, wikidata_identifier)
				VALUES
					($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
				ON CONFLICT (label)
				DO UPDATE SET
					description = $2,
					date_min = $3,
					date = $4,
					end_date = $5,
					end_date_max = $6,
					date_min_granularity = $7,
					date_granularity = $8,
					end_date_granularity = $9,
					end_date_max_granularity = $10,
					wikidata_identifier = $11
				RETURNING *`;
    console.log(dateMin, date, endDate, endDateMax);
    const confirmed = yield readline_1.confirm(chalk_1.default `\n{yellow About to insert event:}
{gray label}\t\t\t\t${entity.label}
{gray description}\t\t\t${entity.description}
{gray date min}\t\t\t${dateMin.dateString} (${dateMin.timestamp ? dateMin.timestamp.toString() : ''})
{gray date}\t\t\t\t${date.dateString} (${date.timestamp ? date.timestamp.toString() : ''})
{gray end date}\t\t\t${endDate.dateString} (${endDate.timestamp ? endDate.timestamp.toString() : ''})
{gray end date max}\t\t\t${endDateMax.dateString} (${endDateMax.timestamp ? endDateMax.timestamp.toString() : ''})
{gray date min granularity}\t\t${dateMin.granularity}
{gray date granularity}\t\t${date.granularity}
{gray end date granularity}\t\t${endDate.granularity}
{gray end date max granularity}\t${endDateMax.granularity}
{gray wikidata entity ID}\t\t${entity.id}\n\nIs this correct? {cyan (yes)}`);
    let event = null;
    if (confirmed) {
        const rows = yield utils_1.execSql(sql, [
            entity.label,
            entity.description,
            dateMin.timestamp,
            date.timestamp,
            endDate.timestamp,
            endDateMax.timestamp,
            dateMin.granularity,
            date.granularity,
            endDate.granularity,
            endDateMax.granularity,
            entity.id
        ]);
        if (rows.length) {
            console.log(chalk_1.default `{green Event "${entity.label}" inserted into db!}`);
            event = rows[0];
        }
    }
    return event;
});
