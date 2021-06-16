"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Createcategories1622808668227 = void 0;

var _typeorm = require("typeorm");

class Createcategories1622808668227 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "categories",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("categories");
  }

}

exports.Createcategories1622808668227 = Createcategories1622808668227;