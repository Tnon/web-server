var express = require('express');
var fs = require('fs-extra');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/change', function (req, res) {
  let resultStr = `export default ${JSON.stringify(req.body.content)}`;
  fs.outputFileSync(
    req.body.currentLan === 'zh-CN'
      ? path.join(__dirname, '../src/i18n/lang/' + req.body.currentPage + '/zh_CN.ts')
      : path.join(__dirname, '../src/i18n/lang/' + req.body.currentPage + '/en_US.ts'),
    resultStr,
    'utf8',
    (err) => {
      if (err) throw err;
    },
  );
  res.send({});
});
app.listen(3000);
