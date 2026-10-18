/**
 * @file Cisco configuration
 * @author yuyosy <yuyosy@outlook.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "cisco",

  rules: {
    source_file: $ => "hello",
  }
});
