# DOCX2STR
A simple library that converts .docx files to plain text. 


### To contribute
Since this is a very simple library, I don't have much to say, but I'll list some points to consider when building this project locally:

* Some commands in the scripts section of the package.json file might only work in a UNIX context.
* I use typescript to easily generate two builds -> one for ESM, and other for CommonJS

## Notes on Word's XMl format
<w:p> Are tags for paragraphs
<w:r> Are tags to divide fragments in one paragraph. They are called runs
<w:t> Are tags that have the actual text
[Info about the xml document](https://www.toptal.com/xml/an-informal-introduction-to-docx)