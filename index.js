var mach = require('mach');
var fs = require('fs');
var path = require('path');
var reactTools = require('react-tools');

var app = mach.stack();
var port = process.env.PORT || 5000;

app.use(mach.params);
app.use(mach.gzip);
app.use(mach.file, {
  root: path.join(__dirname, 'public'),
  index: true
});

app.post('/', function(request) {
  var err;
  try {
    var params = request.params;
    var options = {};
    var code;
    if (params.file) {
      // TODO: don't do anything sync dummy. need fs-promises library...
      code = fs.readFileSync(params.file.path, 'utf8');
    } else if (params.code) {
      code = params.code;
    } else {
      throw new Error('Must provide a file or code string');
    }
    options.harmony = !!params.harmony;
    options.sourceMap = !!params.sourceMap;

    var transformedCode = reactTools.transform(code, options);
    return {
      headers: { 'Content-Type': 'application/javascript' },
      content: transformedCode
    };
  } catch (e) {
    err = e;
  }

  return {
    status: 500,
    content: err.toString()
  };

});

mach.serve(app, port);
