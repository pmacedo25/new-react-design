const fs = require('fs')
const path = require('path')
const readline = require('readline')

const projectRoot = process.cwd()
const packageJsonPath = path.join(projectRoot, 'package.json')
const indexHtmlPath = path.join(projectRoot, 'index.html')
const appMetadataPath = path.join(projectRoot, 'src', 'config', 'appMetadata.ts')

const args = process.argv.slice(2)
const isYesMode = args.includes('--yes')
const isDryRun = args.includes('--dry-run')

const toPackageName = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const toConstantName = (value) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")

const loadJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'))
const writeFile = (filePath, content) => fs.writeFileSync(filePath, content, 'utf8')

const buildAppMetadataFile = (answers) => `export const appMetadata = {
  productName: '${toConstantName(answers.productName)}',
  packageName: '${toConstantName(answers.packageName)}',
  shortLabel: '${toConstantName(answers.shortLabel)}',
  tagline: '${toConstantName(answers.tagline)}',
  description: '${toConstantName(answers.description)}',
}
`

const applyBootstrap = (answers) => {
  const packageJson = loadJson(packageJsonPath)
  packageJson.name = answers.packageName
  packageJson.description = answers.description

  const updatedIndexHtml = fs
    .readFileSync(indexHtmlPath, 'utf8')
    .replace(/<title>.*<\/title>/, `<title>${answers.productName}</title>`)

  const updatedMetadata = buildAppMetadataFile(answers)

  if (isDryRun) {
    console.log('\nDry run completed. The following values would be written:\n')
    console.log(JSON.stringify(answers, null, 2))
    return
  }

  writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
  writeFile(indexHtmlPath, updatedIndexHtml)
  writeFile(appMetadataPath, updatedMetadata)

  console.log('\nBootstrap complete.\n')
  console.log(`- package.json name: ${answers.packageName}`)
  console.log(`- index.html title: ${answers.productName}`)
  console.log('- src/config/appMetadata.ts updated')
  console.log('\nNext suggested steps:')
  console.log('- Update README.md with your project-specific description')
  console.log('- Replace starter pages and mock service content')
  console.log('- Run npm start to verify the customized shell')
}

const defaultAnswers = {
  productName: 'My React Project',
  packageName: 'my-react-project',
  shortLabel: 'React starter',
  tagline: 'Build your app with a clear structure from day one',
  description: 'A React project generated from the React Architecture Starter template.',
}

const askQuestions = async () => {
  if (isYesMode) {
    applyBootstrap(defaultAnswers)
    return
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const ask = (question, fallback) =>
    new Promise((resolve) => {
      rl.question(`${question} (${fallback}): `, (answer) => {
        const value = answer.trim() || fallback
        resolve(value)
      })
    })

  const productName = await ask('Project display name', defaultAnswers.productName)
  const suggestedPackageName = toPackageName(productName) || defaultAnswers.packageName
  const packageName = await ask('Package name', suggestedPackageName)
  const shortLabel = await ask('Short label for the shell eyebrow', defaultAnswers.shortLabel)
  const tagline = await ask('Main shell tagline', defaultAnswers.tagline)
  const description = await ask('Short project description', defaultAnswers.description)

  rl.close()

  applyBootstrap({
    productName,
    packageName: toPackageName(packageName) || defaultAnswers.packageName,
    shortLabel,
    tagline,
    description,
  })
}

askQuestions().catch((error) => {
  console.error('\nBootstrap failed.')
  console.error(error)
  process.exit(1)
})
