# [gulp](https://github.com/wearefractal/gulp)-ref-hash

> Generates a hashed name for assets concatenated using the [useref](https://github.com/jonkemp/gulp-useref) build blocks.

## Install

Install with [npm](https://npmjs.org/package/gulp-ref-hash)

```
npm install --save-dev gulp-ref-hash
```

## Usage

The simple task below will iterate through all the templates, identify any defined useref build blocks with, or without a name, and generate a new unique filename.

```js
var gulp    = require('gulp')
var useref  = require('gulp-useref');
var refHash = require('gulp-ref-hash');

gulp.task('html', function () {
    return gulp.src('templates/*.html')
        .pipe(refHash()) // Generate hashed filenames for the build blocks
        .pipe(useref()) // Run useref
        .pipe(gulp.dest('built'));
});
```

Running the example above on the example below will yield the following results:

#### Input

```html
<html>
<head>
    <!-- build:css -->
    <link rel="stylesheet" href="css/one.css">
    <link rel="stylesheet" href="css/two.css">
    <!-- endbuild -->
</head>
<body>
    <!-- build:js -->
    <script type="text/javascript" src="scripts/one.js"></script>
    <script type="text/javascript" src="scripts/two.js"></script>
    <!-- endbuild -->
</body>
</html>
```

#### Output

```html
<html>
<head>
    <link href="/static/css/db688f358e9d4e90.css" rel="stylesheet">
</head>
<body>
    <script type="text/javascript" src="/static/js/5f7f7c23295e1f75.js"></script>
</body>
</html>
```

## Options

By default css/js asset paths will be set to `/static/[type]/...`, however you can change that by passing path options to ref-hash. For example:

```js
var gulp    = require('gulp')
var useref  = require('gulp-useref');
var refHash = require('gulp-ref-hash');

gulp.task('html', function () {
    return gulp.src('templates/*.html')
        .pipe(refHash({
            paths: {
                js: '/my/awesome/js/',
                css: '/not/bootstrap/css/',
            }
        })) // Generate hashed filenames for the build blocks
        .pipe(useref()) // Run useref
        .pipe(gulp.dest('built'));
});
```