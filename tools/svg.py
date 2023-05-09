#! /usr/bin/env python3

# SPDX-FileCopyRightText: Copyright (c) 2022-present Jeffrey LeBlanc
# SPDX-License-Indentifier: MIT

'''
This tool transforms a bootstrap svg file into a vue component file.
'''

import argparse
from pathlib import Path

VUE_TEMPLATE = '''<!-- {{name}} -->
<template>
{{svg}}
</template>
<script>export default {};</script>
'''

def create_vue(source_path, prefix="Icon"):
    # Make sure the source exists
    source = Path(source_path)
    if not source.is_file():
        raise Exception(f'Does not exist: {source}')
    assert source.suffix == '.svg'

    # Pull out information
    name = source.stem
    svg = source.read_text()

    # Update the svg and insert into template
    svg = svg.replace('height="16"','height="100%"');
    svg = svg.replace('width="16"','width="100%"')
    text = VUE_TEMPLATE.replace('{{svg}}',svg)
    text = text.replace('{{name}}',name)

    # Make new filename
    camel_case = ''.join(map(lambda e: e.capitalize(), name.split('-')))
    filename = f'{prefix}{camel_case}.vue'

    return filename,text


def main():
    parser = argparse.ArgumentParser(description="Turn svg files into vue components")
    parser.add_argument('source',help="Path to svg file")
    parser.add_argument('-d','--output-directory',help="Directory to write output to",default=None)
    args = parser.parse_args()

    filename,text = create_vue(args.source)

    if args.output_directory is None:
        print(filename)
        print(text)
    else:
        d = Path(args.output_directory)
        if not d.is_dir():
            raise Exception(f'Does not exist: {d}')
        out_path = d / filename
        with out_path.open('w') as f:
            f.write(text)

if __name__ == '__main__':
    main()
