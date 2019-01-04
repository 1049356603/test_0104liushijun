var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = [{
        title: "满300减30",
        img: "img/img1.jpg",
        price: 489
    },
    {
        title: "满300减50",
        img: "img/img2.jpg",
        price: 599
    },
    {
        title: "3件8折",
        img: "img/img3.jpg",
        price: 99
    },
    {
        title: "满999减100",
        img: "img/img4.jpg",
        price: 1299
    },
    {
        title: "满五免一",
        img: "img/img5.jpg",
        price: 39
    }
]

gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            host: "localhost",
            port: "8080",
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                var ext = path.extname(pathname);
                if (req.url == "/favicon.ico") {
                    return res.end();
                }
                if (pathname == "/data") {
                    console.log(111);
                    res.end(JSON.stringify({ data: data }));
                } else {
                    console.log(222);

                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }

            }
        }))
})
gulp.task('default', gulp.series('webserver'));