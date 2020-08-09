class MarkDownToText {
    /* Using lodash escape implementation: https://github.com/lodash/lodash/blob/master/escape.js */
    escapeHtml = (string) => {
        return angular.element("<textarea/>").html(string).text();
    };
    blockFn = (block) => block + '\n';
    inlineFn = (text) => text;
    newlineFn = () => '\n';
    emptyFn = () => '';
    renderer = {
        // Block elements
        code: this.blockFn,
        blockquote: this.blockFn,
        html: this.emptyFn,
        heading: this.blockFn,
        hr: this.emptyFn,
        list: this.blockFn,
        listitem: (text) => this.blockFn(text),
        paragraph: this.blockFn,
        table: (header, body) => this.blockFn(header) + this.blockFn(body),
        tablerow: this.blockFn,
        tablecell: this.blockFn,
        // Inline elements
        strong: this.inlineFn,
        em: this.inlineFn,
        codespan: this.inlineFn,
        br: this.newlineFn,
        del: this.inlineFn,
        link: (_0, _1, text) => this.inlineFn(text),
        image: (_0, _2, text) => this.inlineFn(text),
        text: this.inlineFn,
    };

    /**
     * Converts markdown to plaintext. Accepts an option object with the following
     * fields:
     *
     *  - escapeHtml (default: true) Escapes HTML in the final string
     *  - gfp (default: true) Uses github flavor markdown (passed through to marked)
     *  - pedantic (default: false) Conform to markdown.pl (passed through to marked)
     *
     * @param markdown the markdown to convert
     * @param options  the options to apply
     * @returns the unmarked string (plain text)
     */
    markdownToTxt(markdown, options = {
        escapeHtml: true,
        gfm: true,
        pedantic: false,
    }) {
        if (markdown) {
            const unmarked = marked(markdown, {
                gfm: options.gfm,
                pedantic: options.pedantic,
                renderer: this.renderer,
            });
            if (options.escapeHtml) {
                return this.escapeHtml(unmarked);
            }
            return unmarked;
        }
        return '';
    }
}
