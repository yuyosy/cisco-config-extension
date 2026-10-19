; Cisco config injections
;
; SPDX-FileCopyrightText: 2026 yuyosy <yuyosy@outlook.com>
; SPDX-License-Identifier: MIT
;
; Only modifier commands without a device prompt receive whole-line overrides.
;

((line !prompt modifier: (command_modifier)) @injection.content
 (#set! injection.language "Cisco Command Line Override"))
