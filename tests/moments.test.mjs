import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'

// Use the project's existing compiler; no additional test runner or Node TS support required.
const source = await readFile(new URL('../src/utils/moments.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 },
})
const { cleanMomentCaption, getMomentYear, sortMoments, sortMomentsWithPriorities } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

test('captions retain wording and years while stripping photo sequence suffixes', () => {
  assert.equal(cleanMomentCaption('HackRice Rice University 2026 3.JPG'), 'HackRice Rice University 2026')
  assert.equal(cleanMomentCaption('Meta AITX Hackathon 2026 2.jpg'), 'Meta AITX Hackathon 2026')
  assert.equal(cleanMomentCaption('SXSW 2026 @Austin TX.jpg'), 'SXSW 2026 @Austin TX')
  assert.equal(cleanMomentCaption('  Demo__Event--2025   12.jpeg'), 'Demo Event 2025')
  assert.equal(cleanMomentCaption('Team 3 at HackTX 2025 2.jpg'), 'Team 3 at HackTX 2025')
  assert.equal(cleanMomentCaption('TXST Shipaton 2026 .jpg'), 'TXST Shipaton 2026')
  assert.equal(cleanMomentCaption("Dean's List Fall 2023.jpeg"), "Dean's List Fall 2023")
})

test('years can touch words, but are not extracted from longer numeric IDs', () => {
  assert.equal(getMomentYear('NVIDIA AITX Hackathon2025.jpg'), 2025)
  assert.equal(getMomentYear('Meta AITX Hackathon 2026 2.jpg'), 2026)
  assert.equal(getMomentYear('Season 2025-2027.jpg'), 2027)
  assert.equal(getMomentYear('Some Event.jpg'), null)
  assert.equal(getMomentYear('Photo 1232026123.jpg'), null)
})

test('recency wins over alphabetical order and undated photos are last', () => {
  const filenames = ['A undated.jpg', 'A 2023.jpg', 'Z 2026.jpg', 'A 2025.jpg', 'Future 2027.jpg']
  const input = filenames.map((filename) => ({ filename }))
  assert.deepEqual(sortMoments(input).map((item) => item.filename), [
    'Future 2027.jpg', 'Z 2026.jpg', 'A 2025.jpg', 'A 2023.jpg', 'A undated.jpg',
  ])
  assert.deepEqual(input.map((item) => item.filename), filenames, 'does not mutate source data')
})

test('same-year captions provide a secondary key; identical captions remain stable', () => {
  const input = ['Z 2026.jpg', 'HackRice 2026 3.jpg', 'HackRice 2026 1.jpg', 'A 2026.jpg']
    .map((filename) => ({ filename }))
  assert.deepEqual(sortMoments(input).map((item) => item.filename), [
    'A 2026.jpg', 'HackRice 2026 3.jpg', 'HackRice 2026 1.jpg', 'Z 2026.jpg',
  ])
  assert.deepEqual(sortMoments([]), [])
})

test('explicit Moments priorities bracket normal newest-first sorting', () => {
  const filenames = [
    'IEEE @TXST.jpeg', 'DELL @TXST.jpeg', 'A dated 2026.jpg',
    'WebAI_hackathon.jpg', 'Tech Startup Meetup @Houston TX.jpg', 'Older 2024.jpg',
    'Computer Sciecle Excellence Awardee.jpg',
  ].map((filename) => ({ filename }))
  assert.deepEqual(sortMomentsWithPriorities(filenames).map((item) => item.filename), [
    'Computer Sciecle Excellence Awardee.jpg', 'Tech Startup Meetup @Houston TX.jpg',
    'A dated 2026.jpg', 'Older 2024.jpg', 'WebAI_hackathon.jpg',
    'DELL @TXST.jpeg', 'IEEE @TXST.jpeg',
  ])
})
