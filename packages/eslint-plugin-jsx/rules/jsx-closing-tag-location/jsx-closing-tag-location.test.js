/**
 * @fileoverview Validate closing tag location in JSX
 * @author Ross Solomon
 */

import { RuleTester } from 'eslint'
import parsers from '../../test-utils/parsers'
import rule from './jsx-closing-tag-location'

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 2015,
  ecmaFeatures: {
    jsx: true,
  },
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions })
ruleTester.run('jsx-closing-tag-location', rule, {
  valid: parsers.all([
    {
      code: `
        <App>
          foo
        </App>
      `,
    },
    {
      code: `
        <App>foo</App>
      `,
    },
    {
      code: `
        <>
          foo
        </>
      `,
      features: ['fragment'],
    },
    {
      code: `
        <>foo</>
      `,
      features: ['fragment'],
    },
  ]),

  invalid: parsers.all([
    {
      code: `
        <App>
          foo
          </App>
      `,
      output: `
        <App>
          foo
        </App>
      `,
      errors: [{ messageId: 'matchIndent' }],
    },
    {
      code: `
        <App>
          foo</App>
      `,
      output: `
        <App>
          foo
        </App>
      `,
      errors: [{ messageId: 'onOwnLine' }],
    },
    {
      code: `
        <>
          foo
          </>
      `,
      features: ['fragment', 'no-ts-old'], // TODO: FIXME: remove no-ts-old and fix
      output: `
        <>
          foo
        </>
      `,
      errors: [{ messageId: 'matchIndent' }],
    },
    {
      code: `
        <>
          foo</>
      `,
      features: ['fragment', 'no-ts-old'], // TODO: FIXME: remove no-ts-old and fix
      output: `
        <>
          foo
        </>
      `,
      errors: [{ messageId: 'onOwnLine' }],
    },
  ]),
})
