; Cisco config outline
;
; SPDX-FileCopyrightText: 2026 yuyosy <yuyosy@outlook.com>
; SPDX-License-Identifier: MIT
;

; Require a command or modifier after the prompt; omit empty prompt lines.
((prompt_block header: (prompt_record (line prompt: (prompt) @_prompt . (_)) @name)) @item
 (#not-match? @_prompt "\\([Cc][Oo][Nn][Ff][Ii][Gg]"))

(simple_definition header: (definition_line (line command: (interface_command keyword: (_) @context name: (_) @name)))) @item
(bgp_definition header: (bgp_definition_line (line command: (router_command keyword: (_) @context protocol: (_) @context.extra name: (_) @name)))) @item
(address_family_definition header: (address_family_definition_line (line command: (address_family_command keyword: (_) @context name: (_) @name)))) @item
