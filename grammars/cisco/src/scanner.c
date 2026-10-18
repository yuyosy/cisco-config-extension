#include "tree_sitter/parser.h"
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>


typedef struct
{
  bool at_line_start;
} Scanner;

void *tree_sitter_cisco_external_scanner_create(void)
{
  Scanner *scanner = calloc(1, sizeof(Scanner));
  if (scanner != NULL)
  {
    scanner->at_line_start = true;
  }
  return scanner;
}

void tree_sitter_cisco_external_scanner_destroy(void *payload)
{
  free(payload);
}

unsigned tree_sitter_cisco_external_scanner_serialize(void *payload, char *buffer)
{
  Scanner *scanner = payload;
  buffer[0] = scanner->at_line_start ? 1 : 0;
  return 1;
}

void tree_sitter_cisco_external_scanner_deserialize(void *payload, const char *buffer, unsigned length)
{
  Scanner *scanner = payload;
  scanner->at_line_start = length == 0 || buffer[0] != 0;
}


enum TokenType
{
  PROMPT,
  NEWLINE,
  DEFINITION_START,
  ORDINARY_START,
  BGP_START,
  ADDRESS_FAMILY_START,
};


static bool hostname_character(int32_t c)
{
  return (c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') ||
         (c >= 'A' && c <= 'Z');
}

static bool starts_with(const char *line, const char *prefix)
{
  while (*prefix != 0)
  {
    if (*line++ != *prefix++)
      return false;
  }
  return true;
}

static bool space(int32_t c) { return c == ' ' || c == '\t'; }
static bool word_boundary(char c) { return c == 0 || c == ' ' || c == '\t'; }
static int32_t ascii_lower(int32_t c) { return c >= 'A' && c <= 'Z' ? c + ('a' - 'A') : c; }

static bool command_prefix(const char *line, const char *prefix)
{
  size_t length = strlen(prefix);
  return starts_with(line, prefix) && word_boundary(line[length]);
}


static enum TokenType classify_line(const char *line)
{
  if (starts_with(line, "router bgp "))
    return BGP_START;
  if (command_prefix(line, "address-family"))
    return ADDRESS_FAMILY_START;

  if (command_prefix(line, "interface"))
  {
    return DEFINITION_START;
  }
  return ORDINARY_START;
}


static bool scan_newline(Scanner *scanner, TSLexer *lexer)
{
  if (lexer->lookahead == '\r')
  {
    lexer->advance(lexer, false);
    if (lexer->lookahead == '\n')
      lexer->advance(lexer, false);
  }
  else if (lexer->lookahead == '\n')
  {
    lexer->advance(lexer, false);
  }
  else
  {
    return false;
  }
  scanner->at_line_start = true;
  lexer->mark_end(lexer);
  lexer->result_symbol = NEWLINE;
  return true;
}


static bool scan_line_start(Scanner *scanner, TSLexer *lexer, const bool *valid_symbols)
{
  if (!scanner->at_line_start || lexer->eof(lexer))
    return false;
  bool indented = false;
  while (space(lexer->lookahead))
  {
    indented = true;
    lexer->advance(lexer, false);
  }
  lexer->mark_end(lexer);

  char line[160];
  unsigned length = 0;
  unsigned word_count = 0;
  bool previous_space = false;
  // Recognize the complete prompt once, independently of the bounded,
  // case-folded command prefix. Indented prompt-like text remains ordinary.
  enum { NOT_PROMPT, HOSTNAME, MODE, AFTER_MODE } prompt_state =
      !indented && hostname_character(lexer->lookahead) ? HOSTNAME : NOT_PROMPT;
  bool is_prompt = false;
  while (!lexer->eof(lexer) && lexer->lookahead != '\r' && lexer->lookahead != '\n')
  {
    int32_t c = lexer->lookahead;
    if ((prompt_state == HOSTNAME || prompt_state == AFTER_MODE) && (c == '#' || c == '>'))
    {
      lexer->advance(lexer, false);
      lexer->mark_end(lexer);
      is_prompt = true;
      break;
    }
    if (prompt_state == HOSTNAME)
    {
      if (c == '(')
        prompt_state = MODE;
      else if (!hostname_character(c) && c != '.' && c != '_' && c != '-')
        prompt_state = NOT_PROMPT;
    }
    else if (prompt_state == MODE && c == ')')
      prompt_state = AFTER_MODE;
    else if (prompt_state == AFTER_MODE)
      prompt_state = NOT_PROMPT;

    bool is_space = space(c);
    if (length + 1 < sizeof(line))
    {
      if (!is_space || !previous_space)
      {
        // Non-ASCII characters must not become ASCII punctuation on narrowing.
        line[length++] = is_space ? ' ' : c > 127 ? '?' :
            (char)ascii_lower(c);
      }
    }
    if (is_space && !previous_space)
      word_count++;
    previous_space = is_space;
    lexer->advance(lexer, false);
    // All command classifiers need at most three words and their boundary.
    // Do not inspect long descriptions, credentials, or other command tails.
    if (prompt_state == NOT_PROMPT && (word_count >= 3 || length + 1 == sizeof(line)))
    {
      if (!is_space && length + 1 == sizeof(line))
        line[length - 1] = '?'; // A truncated word is not a word boundary.
      break;
    }
  }
  line[length] = 0;
  enum TokenType type = is_prompt ? PROMPT : classify_line(line);
  if (!valid_symbols[type])
    return false;
  scanner->at_line_start = false;
  lexer->result_symbol = type;
  return true;
}



bool tree_sitter_cisco_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols)
{
  Scanner *scanner = payload;
  // A failed scan can already have advanced lookahead. Return immediately so
  // Tree-sitter can rewind it; never try a different token from that position.
  if (scanner->at_line_start)
    return scan_line_start(scanner, lexer, valid_symbols);
  // Internal extras may precede an external banner/newline. Skip only horizontal
  // space here; indentation has already been classified by scan_line_start.
  while (space(lexer->lookahead))
    lexer->advance(lexer, true);
  if (valid_symbols[NEWLINE] && (lexer->lookahead == '\r' || lexer->lookahead == '\n'))
    return scan_newline(scanner, lexer);
  return false;
}
