# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Refer to the GitHub main branch for the latest changes after release.

## [0.1.0] - 2026-10-20

### Added
- Initial Cisco configuration Tree-sitter grammar and Zed extension.
- Syntax highlighting for Cisco prompts, commands, modifiers, descriptions, remarks, and system log messages.
- Syntax highlighting for common Cisco keywords, interface types, IPv4/IPv6 and MAC addresses, IPv4 CIDR notation, and integer, range, and hexadecimal literals.
- Case-insensitive parsing for Cisco keywords and support for BGP/router and address-family definitions.
- Zed outline entries for interface, BGP/router, and address-family definitions.
- Command-line injection highlighting for lines using the `no` modifier.
