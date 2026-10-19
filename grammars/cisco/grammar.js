/**
 * @file Cisco configuration
 * @author yuyosy <yuyosy@outlook.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check


/**
 * @description Generates a keyword alias for Tree-sitter.
 * @param {any} $ - The Tree-sitter DSL object.
 * @param {string} text - The keyword text.
 * @returns {any} The keyword alias.
 */
const keyword = ($, text) => alias($[keyword_rule(text)], $.command_keyword);

/**
 * @description Generates a keyword rule name for Tree-sitter.
 * @param {string} text - The keyword text.
 * @returns {string} The keyword rule name.
 */
const keyword_rule = text => '_keyword_' + text.replaceAll('-', '_');

/**
 * @description Generates a case-insensitive keyword pattern for Tree-sitter.
 * @param {string} pattern - The keyword pattern to convert.
 * @returns {RegExp} The case-insensitive regular expression.
 */
const keyword_pattern = pattern => new RegExp(
  pattern.replace(/[a-z]/gi,
  letter => `[${letter.toLowerCase()}${letter.toUpperCase()}]`)
);

/**
 * @description Generates a repeated argument pattern for Tree-sitter.
 * @param {any} $ - The Tree-sitter DSL object.
 * @returns {any} The repeated argument pattern.
 */
const argument_tail = $ => repeat(field('argument', $._argument));


const keyword_rules = Object.fromEntries(
  [
    'interface',
    'router',
    'address-family'
  ].map(text => [keyword_rule(text), () => keyword_pattern(text)]),
);

// Tree-sitter grammar for Cisco configuration files
module.exports = grammar({
  name: "cisco",

  extras: $ => [/[ \t]+/],
  externals: $ => [
    $.prompt,
    $._newline,
    $._definition_start,
    $._ordinary_start,
    
    $._bgp_start,
    $._address_family_start,
  ],
  supertypes: $ => [
    $._cisco_atom,
    $._cisco_interface_token,
    $._cisco_address_token,
  ],
  word: $ => $.word,

  rules: {
    source_file: $ => repeat(choice(
      $.prompt_block,
      $._definition,
      $.top_level_line,
      $.orphan_child_line,
    )),
    ...keyword_rules,
    

    prompt_block: $ => prec.right(seq(
      field('header', $.prompt_record),
      repeat(choice(
        $._definition,
        $.prompt_body_line,
      )),
    )),
    prompt_record: $ => seq(
      alias($.prompt_line, $.line),
      optional($._newline),
    ),
    prompt_body_line: $ => choice(
      $.ordinary_line,
      $.orphan_child_line,
    ),
    prompt_line: $ => seq(field('prompt', $.prompt), optional(seq(
      $._command_record, optional(field('comment', alias($._trailing_comment, $.line_comment))),
    ))),
    top_level_line: $ => seq(
      $._ordinary_start,
      optional($.line),
      optional($._newline),
    ),
    line: $ => choice($.line_comment, seq($._command_record,
      optional(field('comment', alias($._trailing_comment, $.line_comment))))),
    _command_record: $ => choice(
      seq(field('modifier', $.command_modifier), optional(field('command', $._command))),
      field('command', $._command),
    ),
    _command: $ => choice(
      $.interface_command, $.router_command, $.address_family_command,$.generic_command,
    ),
    _argument: $ => choice($._cisco_atom, $.quoted_string, $.text),
    generic_command: $ => prec.right(-2, seq(
      field('head', choice($._cisco_atom, $.quoted_string, $.text)), argument_tail($),
    )),
    text: $ => prec.right(2, seq(field('keyword', $.text_keyword), optional(field('value', $.text_value)))),
    command_modifier: $ => choice($.no_modifier, $.default_modifier),
    
    ordinary_line: $ => seq($._ordinary_start, optional($.line), optional($._newline)),
    orphan_child_line: $ => choice(
      $.address_family_definition_line,
    ),
    _definition: $ => choice(
      $.bgp_definition,
      $.simple_definition,
    ),
    simple_definition: $ => prec.right(seq(
      field('header', $.definition_line),
      repeat($.definition_body_line),
    )),
    definition_line: $ => seq($._definition_start, optional($.line), optional($._newline)),
    definition_body_line: $ => choice($.ordinary_line, $.orphan_child_line),

    
    bgp_definition: $ => prec.right(seq(
      field('header', $.bgp_definition_line),
      repeat(choice(
        $.address_family_definition,
        $.bgp_body_line,
      )),
    )),
    bgp_body_line: $ => choice(
      $.ordinary_line,
    ),
    address_family_definition: $ => prec.right(seq(
      field('header', $.address_family_definition_line),
      repeat($.address_family_body_line),
    )),
    bgp_definition_line: $ => seq($._bgp_start, optional($.line), optional($._newline)),
    address_family_definition_line: $ => seq($._address_family_start, optional($.line), optional($._newline)),


    interface_command: $ => prec.right(2, seq(
      field('keyword', keyword($, 'interface')), optional(seq(field('name', $._cisco_atom), argument_tail($))),
    )),
    router_command: $ => prec.right(2, seq(
      field('keyword', keyword($, 'router')), optional(seq(field('protocol', $._cisco_atom),
        optional(seq(field('name', $._cisco_atom), argument_tail($))))),
    )),
    address_family_command: $ => prec.right(2, seq(
      field('keyword', keyword($, 'address-family')), optional(seq(field('name', $._cisco_atom), argument_tail($))),
    )),
    
    _cisco_atom: $ => prec(-1, choice(
      $._cisco_interface_token,
      $._cisco_address_token,
      $.word,
    )),
    _cisco_interface_token: $ => prec(-1, choice(
      $.token_type_cisco_interface_app_gigabitethernet,
      $.token_type_cisco_interface_async,
      $.token_type_cisco_interface_bdi,
      $.token_type_cisco_interface_bri,
      $.token_type_cisco_interface_bvi,
      $.token_type_cisco_interface_cellular,
      $.token_type_cisco_interface_dialer,
      $.token_type_cisco_interface_ethernet,
      $.token_type_cisco_interface_loopback,
      $.token_type_cisco_interface_management,
      $.token_type_cisco_interface_null,
      $.token_type_cisco_interface_nvi,
      $.token_type_cisco_interface_port_channel,
      $.token_type_cisco_interface_serial,
      $.token_type_cisco_interface_tunnel,
      $.token_type_cisco_interface_vasileft,
      $.token_type_cisco_interface_vasiright,
      $.token_type_cisco_interface_virtual_template,
      $.token_type_cisco_interface_vlan,
      $.token_type_cisco_interface_vmi,
      $.token_type_cisco_interface_wireless,
    )),
    _cisco_address_token: $ => prec(-1, choice(
      $.token_number_cisco_address_ipv4_cidr,
      $.token_number_cisco_address_ipv4,
      $.token_number_cisco_address_ipv6_condensed,
      $.token_number_cisco_address_ipv6_full,
      $.token_number_cisco_address_mac,
    )),
    address_family_body_line: $ => choice(
      $.ordinary_line,
    ),
    
    no_modifier: $ => token(keyword_pattern('no')),
    default_modifier: $ => token(keyword_pattern('default')),
    text_keyword: $ => token(keyword_pattern('description|description:|remark')),

    line_comment: $ => token(prec(2, /[!#][^\r\n]*/)),
    _trailing_comment: $ => token(/[!#]+([ \t][^\r\n]*)?/),
    
    quoted_string: $ => token(prec(2, /"([^"\\\r\n]|\\[^\r\n])*"/)),
    text_value: $ => token(prec(1, /[^ \t\r\n][^\r\n]*/)),

    token_type_cisco_interface_app_gigabitethernet: $ => token(/((App[Gg](ig)?(abit)?)([Ee](th(ernet)?)?)?(((\d+[\./])*)?\d+(\.\d+)?)?)/),
    token_type_cisco_interface_async: $ => token(/(([Aa]sync)(\d+)?)/),
    token_type_cisco_interface_bdi: $ => token(/((BDI|[Bb]ridge-?[Dd]omain)(\d+)?)/),
    token_type_cisco_interface_bri: $ => token(/((BRI)(\d+)?)/),
    token_type_cisco_interface_bvi: $ => token(/((BVI)(\d+)?)/),
    token_type_cisco_interface_cellular: $ => token(/(([Cc]ellular)(((\d+[\./])*)?\d+(\.\d+)?)?)/),
    token_type_cisco_interface_dialer: $ => token(/(([Dd]ialer)(\d+)?)/),
    token_type_cisco_interface_ethernet: $ => token(/((([Ff]ast|([Ff]ive|[Tt]en|[Tt]wenty[Ff]ive|[Ff](orty|ifty)|([Tt]wo)?[Hh]undred)?[Gg](ig)?(abit)?)[Ee](th(ernet)?)?|[Ee]th(ernet)?|Fa|Gi|Te|Fo|Fi)(((\d+[\./])*)?\d+(\.\d+)?)?)/),
    token_type_cisco_interface_loopback: $ => token(/(([Ll]oopback|Lo)(\d+)?)/),
    token_type_cisco_interface_management: $ => token(/((Management|[Mm]gmt)((\d+[\./])*)?(\d+)?)/),
    token_type_cisco_interface_null: $ => token(/(([Nn]ull)(\d+)?)/),
    token_type_cisco_interface_nvi: $ => token(/(([nN][vV][iI])(\d+)?)/),
    token_type_cisco_interface_port_channel: $ => token(/(([Pp]ort-?[Cc]hannel|Po)(12[0-8]|1[0-1][0-9]|[1-9][0-9]|[1-9])?)/),
    token_type_cisco_interface_serial: $ => token(/(([Ss]erial)(((\d+[\./])*)?\d+(\.\d+)?)?)/),
    token_type_cisco_interface_tunnel: $ => token(/(([Tt]unnel|Tu)(\d+)?)/),
    token_type_cisco_interface_vasileft: $ => token(/(([Vv]asi[Ll]eft)(\d+)?)/),
    token_type_cisco_interface_vasiright: $ => token(/(([Vv]asi[Rr]ight)(\d+)?)/),
    token_type_cisco_interface_virtual_template: $ => token(/(([Vv]irtual-[Tt]emplate)(\d+)?)/),
    token_type_cisco_interface_vlan: $ => token(/((VLAN|[Vv]lan)(409[0-4]|40[0-8][0-9]|[1-3][0-9]{3}|[1-9][0-9]{1,2}|[1-9])?)/),
    token_type_cisco_interface_vmi: $ => token(/(([vV][mM][iI])(\d+)?)/),
    token_type_cisco_interface_wireless: $ => token(/(([Dd]ot11[Rr]adio)(([0-1]([\./]\d)?(\.\d+)?)(\.\d+)?)?)/),
    
    token_number_cisco_address_ipv4_cidr: $ => token(/(((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\/(\d|[1-2]\d|3[0-2]))/),
    token_number_cisco_address_ipv4: $ => token(/(((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))/),
    token_number_cisco_address_ipv6_condensed: $ => token(/((([0-9a-fA-F]{1,4}:){6}(:[0-9a-fA-F]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-fA-F]{1,4}:){5}(((:[0-9a-fA-F]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-fA-F]{1,4}:){4}(((:[0-9a-fA-F]{1,4}){1,3})|((:[0-9a-fA-F]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-fA-F]{1,4}:){3}(((:[0-9a-fA-F]{1,4}){1,4})|((:[0-9a-fA-F]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-fA-F]{1,4}:){2}(((:[0-9a-fA-F]{1,4}){1,5})|((:[0-9a-fA-F]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-fA-F]{1,4}:){1}(((:[0-9a-fA-F]{1,4}){1,6})|((:[0-9a-fA-F]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-fA-F]{1,4}){1,7})|((:[0-9a-fA-F]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(\/([0-9]|[1-9][0-9]|1[01][0-9]|12[0-8]))?/),
    token_number_cisco_address_ipv6_full: $ => token(/(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})(\/([0-9]|[1-9][0-9]|1[01][0-9]|12[0-8]))?/),
    token_number_cisco_address_mac: $ => token(choice(/(([a-fA-F0-9]{4}\.?){2}[a-fA-F0-9]{4})/, /(([a-fA-F0-9]{2}[:.-]?){5}[a-fA-F0-9]{2})/)),
  
    word: $ => token(/[^ \t\r\n]+/),
  }
  
});
