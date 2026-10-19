; Cisco command line highlights
;
; SPDX-FileCopyrightText: 2026 yuyosy <yuyosy@outlook.com>
; SPDX-License-Identifier: MIT
;
; Each injection contains one modifier line. Structural modifier kinds select
; the style; named descendants keep it active beneath parent-language captures.
;

(line modifier: (command_modifier (no_modifier) @meta.cisco.command-line.no) @meta.cisco.command-line.no) @meta.cisco.command-line.no
(line modifier: (command_modifier (no_modifier)) (_)* @meta.cisco.command-line.no)
(line modifier: (command_modifier (no_modifier)) (_ (_)* @meta.cisco.command-line.no))
(line modifier: (command_modifier (no_modifier)) (_ (_ (_)* @meta.cisco.command-line.no)))
(line modifier: (command_modifier (no_modifier)) (_ (_ (_ (_)* @meta.cisco.command-line.no))))
(line modifier: (command_modifier (no_modifier)) (_ (_ (_ (_ (_)* @meta.cisco.command-line.no)))))
(line modifier: (command_modifier (no_modifier)) (_ (_ (_ (_ (_ (_)* @meta.cisco.command-line.no))))))
(line modifier: (command_modifier (default_modifier) @meta.cisco.command-line.default) @meta.cisco.command-line.default) @meta.cisco.command-line.default
(line modifier: (command_modifier (default_modifier)) (_)* @meta.cisco.command-line.default)
(line modifier: (command_modifier (default_modifier)) (_ (_)* @meta.cisco.command-line.default))
(line modifier: (command_modifier (default_modifier)) (_ (_ (_)* @meta.cisco.command-line.default)))
(line modifier: (command_modifier (default_modifier)) (_ (_ (_ (_)* @meta.cisco.command-line.default))))
(line modifier: (command_modifier (default_modifier)) (_ (_ (_ (_ (_)* @meta.cisco.command-line.default)))))
(line modifier: (command_modifier (default_modifier)) (_ (_ (_ (_ (_ (_)* @meta.cisco.command-line.default))))))
