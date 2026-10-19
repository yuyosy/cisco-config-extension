; Cisco config
;
; SPDX-FileCopyrightText: 2026 yuyosy <yuyosy@outlook.com>
; SPDX-License-Identifier: MIT
;

(command_keyword) @punctuation.special.cisco.command
(generic_command head: (_cisco_atom) @punctuation.special.cisco.command)

(quoted_string) @string.cisco.quoted
(text_keyword) @punctuation.special.cisco.command
((text keyword: (text_keyword) @punctuation.special.cisco.command.description value: (text_value) @string.cisco.description) (#match? @punctuation.special.cisco.command.description "^[dD][eE][sS][cC][rR][iI][pP][tT][iI][oO][nN]:?$"))
((text keyword: (text_keyword) @punctuation.special.cisco.command.remark value: (text_value) @string.cisco.remark) (#match? @punctuation.special.cisco.command.remark "^[rR][eE][mM][aA][rR][kK]$"))

((prompt) @label.cisco.prompt.user (#match? @label.cisco.prompt.user ">$"))
((prompt) @label.cisco.prompt.privileged (#match? @label.cisco.prompt.privileged "#$"))
(token_tag_cisco_logging_system_message) @tag @tag.cisco.logging-system-message

(default_modifier) @keyword.operator.cisco.default
(no_modifier) @keyword.operator.cisco.no

(token_keyword_cisco_encapsulation_dot1q) @keyword.cisco.vlan.dot1q
(token_keyword_cisco_encapsulation_dot1q_tunnel) @keyword.cisco.vlan.dot1q-tunnel
(token_keyword_cisco_encapsulation_mac_vlan) @keyword.cisco.vlan.mac-vlan
(token_keyword_cisco_encapsulation_protocol_vlan) @keyword.cisco.vlan.protocol-vlan

(token_keyword_cisco_switchport_mode_trunk) @keyword.cisco.switchport-mode.trunk
(token_keyword_cisco_switchport_mode_access) @keyword.cisco.switchport-mode.access

(token_keyword_cisco_shutdown) @keyword.cisco.shutdown
(token_keyword_cisco_status_up) @keyword.cisco.status.up
(token_keyword_cisco_status_down) @keyword.cisco.status.down
(token_keyword_cisco_status_deleted) @keyword.cisco.status.deleted
(token_keyword_cisco_status_administratively_down) @keyword.cisco.status.administratively-down

(token_keyword_cisco_enable_disable_enable) @keyword.cisco.enable-disable.enable
(token_keyword_cisco_enable_disable_disable) @keyword.cisco.enable-disable.disable
(token_keyword_cisco_match_match_any) @keyword.cisco.match.match-any
(token_keyword_cisco_match_match_all) @keyword.cisco.match.match-all
(token_keyword_cisco_add_remove_add) @keyword.cisco.add-remove.add
(token_keyword_cisco_add_remove_remove) @keyword.cisco.add-remove.remove
(token_keyword_cisco_add_remove_except) @keyword.cisco.add-remove.except
(token_keyword_cisco_allowed_native_allowed) @keyword.cisco.allowed-native.allowed
(token_keyword_cisco_allowed_native_native) @keyword.cisco.allowed-native.native
(token_keyword_cisco_any_all_all) @keyword.cisco.any-all.all
(token_keyword_cisco_any_all_any) @keyword.cisco.any-all.any
(token_keyword_cisco_permit_deny_permit) @keyword.cisco.permit-deny.permit
(token_keyword_cisco_permit_deny_deny) @keyword.cisco.permit-deny.deny
(token_keyword_cisco_in_out_out) @keyword.cisco.in-out.out
(token_keyword_cisco_in_out_in) @keyword.cisco.in-out.in
(token_keyword_cisco_input_output_input) @keyword.cisco.input-output.input
(token_keyword_cisco_input_output_output) @keyword.cisco.input-output.output
(token_keyword_cisco_inside_outside_inside) @keyword.cisco.inside-outside.inside
(token_keyword_cisco_inside_outside_outside) @keyword.cisco.inside-outside.outside

(token_type_cisco_interface_app_gigabitethernet) @type.cisco.interface.app-gigabitethernet
(token_type_cisco_interface_async) @type.cisco.interface.async
(token_type_cisco_interface_bdi) @type.cisco.interface.bdi
(token_type_cisco_interface_bri) @type.cisco.interface.bri
(token_type_cisco_interface_bvi) @type.cisco.interface.bvi
(token_type_cisco_interface_cellular) @type.cisco.interface.cellular
(token_type_cisco_interface_dialer) @type.cisco.interface.dialer
(token_type_cisco_interface_ethernet) @type.cisco.interface.ethernet
(token_type_cisco_interface_loopback) @type.cisco.interface.loopback
(token_type_cisco_interface_management) @type.cisco.interface.management
(token_type_cisco_interface_null) @type.cisco.interface.null
(token_type_cisco_interface_nvi) @type.cisco.interface.nvi
(token_type_cisco_interface_port_channel) @type.cisco.interface.port-channel
(token_type_cisco_interface_serial) @type.cisco.interface.serial
(token_type_cisco_interface_tunnel) @type.cisco.interface.tunnel
(token_type_cisco_interface_vasileft) @type.cisco.interface.vasileft
(token_type_cisco_interface_vasiright) @type.cisco.interface.vasiright
(token_type_cisco_interface_virtual_template) @type.cisco.interface.virtual-template
(token_type_cisco_interface_vlan) @type.cisco.interface.vlan
(token_type_cisco_interface_vmi) @type.cisco.interface.vmi
(token_type_cisco_interface_wireless) @type.cisco.interface.wireless

(token_number_cisco_address_mac) @number.cisco.address.mac
(token_number_cisco_address_ipv6_full) @number.cisco.address.ipv6.full
(token_number_cisco_address_ipv6_condensed) @number.cisco.address.ipv6.condensed
(token_number_cisco_address_ipv4) @number.cisco.address.ipv4
(token_number_cisco_address_ipv4_cidr) @number.cisco.address.ipv4.cidr

(token_number_cisco_hex) @number.cisco.hex
(token_number_cisco_range) @number.cisco.range
(token_number_cisco_integer) @number.cisco.integer
(line_comment) @comment.cisco.line

((line !prompt modifier: (command_modifier (no_modifier))) @meta.cisco.command-line.no)
((line !prompt modifier: (command_modifier (default_modifier))) @meta.cisco.command-line.default)
