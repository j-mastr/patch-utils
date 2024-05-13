import { Command } from 'commander';
import fs from 'fs';
import { sort, sortToTemplate, sortAlphabetically } from '../../lib/yaml';

type ArgOptions = {
  override: boolean;
  alphabetically: boolean;
  template: string;
};

export default function sortYaml(program: Command) {
  return program
    .command('sort-yaml')
    .argument('[input]', 'path to input file', 'stdin')
    .argument('[output]', 'path to output file', 'stdout')
    .option('-o, --override', 'write output to input file')
    .option('-a, --alphabetically', 'sort alphabetically, default')
    .option('-t, --template <template>', 'sort according to template file')
    .showHelpAfterError()
    .action(
      (inputFileArg: string, outputFileArg: string, options: ArgOptions) => {
        try {
          const inputFile = inputFileArg === 'stdin' ? 0 : inputFileArg;
          const outputFile =
            outputFileArg !== 'stdout'
              ? outputFileArg
              : options.override && inputFileArg !== 'stdin'
              ? inputFileArg
              : 1;
          const sortOrder = options.template
            ? sortToTemplate(fs.readFileSync(options.template, 'utf8'))
            : sortAlphabetically();

          const inputFileContents = fs.readFileSync(inputFile, 'utf8');

          fs.writeFileSync(outputFile, sort(inputFileContents, sortOrder));
        } catch (e) {
          console.error(e);
        }
      }
    );
}
