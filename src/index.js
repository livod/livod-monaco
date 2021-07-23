function getContent(text, type) {
    const template = `<html>
  <head>
    <title>Monaco Editor</title>
    <style>
      body {
        margin: 0px;
        overflow: hidden;
      }
      #editor {
        width: 100%;
        height: 100%;
      }
    </style>
  
    <link data-name="vs/editor/editor.main" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/monaco-editor@0.23.0/min/vs/editor/editor.main.css" />
  </head>
  
  <body>
    <div id="editor"></div>
  
    <script>
      var require = { paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.23.0/min/vs' } };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.23.0/min/vs/loader.js"></script>
    <script>
      let editor;
      require(['vs/editor/editor.main'], function () {
        monaco.editor.setTheme('vs-dark');
        editor = monaco.editor.create(document.getElementById('editor'), {
          model: null,
        });
        var newModel = monaco.editor.createModel(\`${text.replaceAll('`', '\\`')}\`, \`${type}\`);
        editor.setModel(newModel);
      });
  
      window.onresize = function () {
        if (editor) {
          editor.layout();
        }
      };
    </script>
  </body>
  </html>`;

    return template;
}

const normalizeId = (value) => (value.indexOf('#') === 0 ? value.slice(1) : value);
const isEl = (value) => typeof value === 'object' && value.nodeType === 1;

class Editor {
    static editor(options) {
        const el = typeof options.container === 'string' ? document.getElementById(normalizeId(options.container)) : options.container;
        if (!isEl(el)) {
            throw new TypeError('The element or ID supplied is not valid.');
        }

        const { text, type } = options;

        const html = getContent(text, type);
        const blob = new Blob([html], { type: 'text/html' });
        const objUrl = URL.createObjectURL(blob);
        const frame = document.createElement('iframe');
        frame.src = objUrl;
        frame.style.borderWidth = '0px';
        frame.style.width = '100%';
        frame.style.height = '100%';

        el.append(frame);
    }
}

export default Editor;