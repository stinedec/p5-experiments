// Author: Vasili Sviridov
// http://github.com/vsviridov
module.exports =
{
    reporter: function (results)
    {
        "use strict";

        var files = {},
        out = [],
        pairs = {
            "&": "&amp;",
            '"': "&quot;",
            "'": "&apos;",
            "<": "&lt;",
            ">": "&gt;"
        },
        file, i, issue;

        function encode(s) {
            for (var r in pairs) {
                if (typeof(s) !== "undefined") {
                    s = s.replace(new RegExp(r, "g"), pairs[r]);
                }
            }
            return s || "";
        }


        results.forEach(function (result) {
            result.file = result.file.replace(/^\.\//, '');
            if (!files[result.file]) {
                files[result.file] = [];
            }
            files[result.file].push(result.error);
        });

        out.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
        out.push("<jslint>");

        for (file in files) {
            out.push("\t<file name=\"" + file + "\">");
            for (i = 0; i < files[file].length; i++) {
                issue = files[file][i];
                out.push("\t\t<issue line=\"" + issue.line + "\" char=\"" + issue.character + "\" reason=\"" + encode(issue.reason) + "\" evidence=\"" + encode(issue.evidence) + "\" />");
            }
            out.push("\t</file>");
        }

        out.push("</jslint>");

        process.stdout.on('end', function () {
            process.exit(results.length > 0 ? 1 : 0);
        });

        process.stdout.write(out.join("\n") + "\n");
    }
};