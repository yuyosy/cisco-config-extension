; Cisco config

(command_keyword) @punctuation.special.cisco.command
(generic_command head: (_cisco_atom) @punctuation.special.cisco.command)

(quoted_string) @string.cisco.quoted

(default_modifier) @keyword.operator.cisco.default
(no_modifier) @keyword.operator.cisco.no

(token_type_cisco_interface_ethernet) @type.cisco.interface.ethernet

(line_comment) @comment.cisco.line

((line !prompt modifier: (command_modifier (no_modifier))) @meta.cisco.command-line.no)
((line !prompt modifier: (command_modifier (default_modifier))) @meta.cisco.command-line.default)
