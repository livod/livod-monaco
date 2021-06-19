## livod-monaco

### 使用示例

在页面顶部引入 index.min.js 文件，使用 LivodMonaco.editor 方法即可，传入参数中，container 是 dom 或 domid，text 是显示内容文本，type 为 text 的语言类型。

``` HTML
<html>
<head>
  <title>Editor</title>
  <script src="https://cdn.jsdelivr.net/npm/livod-monaco/dist/index.min.js"
    crossorigin="anonymous"></script>
  <style>
    body {
      margin: 0px;
    }
  </style>
</head>

<body>
  <div id="editor"></div>
  <script>
    const text = `const normalizeId = (value) => (value.indexOf('#') === 0 ? value.slice(1) : value);
const isEl = (value) => typeof value === 'object' && value.nodeType === 1;
`
    const type = 'javascript';

    LivodMonaco.editor({ container: '#editor', text, type });
  </script>
</body>

</html>
```