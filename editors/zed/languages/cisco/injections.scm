; Only modifier commands without a device prompt receive whole-line overrides.
((line !prompt modifier: (command_modifier)) @injection.content
 (#set! injection.language "Cisco Command Line Override"))
