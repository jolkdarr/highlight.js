/*
Language: Slice
Author: Brahim Djoudi <br.djoudi@gmail.com>
Category: protocols
*/

function(hljs) {

  var STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };

  var NUMBERS = {
    className: 'number',
    variants: [
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };

  var PREPROCESSOR =       {
    className: 'meta',
    begin: /#\s*[a-z]+\b/, end: /$/,
    keywords: {
      'meta-keyword':
        'if else elif endif define undef warning error line pragma ifdef ifndef include'
    },
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      hljs.inherit(STRINGS, {className: 'meta-string'}),
      {
        className: 'meta-string',
        begin: /<[^\n>]*>/, end: /$/,
        illegal: '\\n',
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  var SLICE_KEYWORDS = {
    keyword: 'bool byte class const dictionary double enum exception ' +
      'extends float idempotent implements int interface local ' +
      'long module optional out sequence short string struct throws void ',
    built_in: 'Object LocalObject Ice',
    literal: 'true false'
  };

  var SLICE_CLASS = {
    className: 'class',
    beginKeywords: 'module interface class struct exception enum',
    end: /[{\n;]/,
    excludeEnd: true,
    contains: [
      {
        beginKeywords: 'extends implements',
        relevance: 10
      },
      hljs.TITLE_MODE
    ]
  };

  var SLICE_EXPRESSION = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS,
    PREPROCESSOR,
    SLICE_CLASS
  ];

  return {
    aliases: ['slice'],
    case_insensitive: false,
    keywords: SLICE_KEYWORDS,
    contains: SLICE_EXPRESSION,
    exports: {
        preprocessor: PREPROCESSOR,
        strings: STRINGS,
        keywords: SLICE_KEYWORDS
    }
  };
}