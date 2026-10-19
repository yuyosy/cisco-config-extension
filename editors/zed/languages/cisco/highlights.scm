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

(default_modifier) @keyword.operator.cisco.default
(no_modifier) @keyword.operator.cisco.no

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

(line_comment) @comment.cisco.line

((line !prompt modifier: (command_modifier (no_modifier))) @meta.cisco.command-line.no)
((line !prompt modifier: (command_modifier (default_modifier))) @meta.cisco.command-line.default)
