import compiler from 'rehype-react';
import React from 'react';
import print from './printAST';
import prism from '@mapbox/rehype-prism';
import { unified } from 'unified';
import parse from 'uniorg-parse';
import uniorg2rehype from 'uniorg-rehype';
import rehypeHighlight from  'rehype-highlight';
import katex from 'rehype-katex';

function test(content: string){
    return(
        unified()
            .use(parse)
            .use(uniorg2rehype)
            .use(print)
            .use(katex)
            .use(prism, {
                ignoreMissing: true,
                alias: {
                    lisp: 'common-lisp',
                }})
            .use(compiler, { createElement: React.createElement })
            .processSync(content)
            .result
    )

}
export default test;
