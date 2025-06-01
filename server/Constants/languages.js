

const languages = [
    {
        "roomLanguage": "C",
        "codeLanguage": "c",
        "editorLanguage": "c",
        "extension": ".c",
        "helloWorld": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}"
    },
    {
        "roomLanguage": "C++",
        "codeLanguage": "cpp",
        "editorLanguage": "cpp",
        "extension": ".cpp",
        "helloWorld": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}"
    },
    {
        "roomLanguage": "Java",
        "codeLanguage": "java",
        "editorLanguage": "java",
        "extension": ".java",
        "helloWorld": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"
    },
    {
        "roomLanguage": "Python",
        "codeLanguage": "python3",
        "editorLanguage": "python",
        "extension": ".py",
        "helloWorld": "print(\"Hello, World!\")"
    },
    {
        "roomLanguage": "JavaScript",
        "codeLanguage": "javascript",
        "editorLanguage": "javascript",
        "extension": ".js",
        "helloWorld": "console.log(\"Hello, World!\");"
    },
    {
        "roomLanguage": "Ruby",
        "codeLanguage": "ruby",
        "editorLanguage": "ruby",
        "extension": ".rb",
        "helloWorld": "puts \"Hello, World!\""
    },
    {
        "roomLanguage": "PHP",
        "codeLanguage": "php",
        "editorLanguage": "php",
        "extension": ".php",
        "helloWorld": "<?php\necho \"Hello, World!\";\n?>"
    },
    {
        "roomLanguage": "Swift",
        "codeLanguage": "swift",
        "editorLanguage": "swift",
        "extension": ".swift",
        "helloWorld": "print(\"Hello, World!\")"
    },
    {
        "roomLanguage": "Go",
        "codeLanguage": "go",
        "editorLanguage": "go",
        "extension": ".go",
        "helloWorld": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}"
    },
    {
        "roomLanguage": "Kotlin",
        "codeLanguage": "kotlin",
        "editorLanguage": "kotlin",
        "extension": ".kt",
        "helloWorld": "fun main() {\n    println(\"Hello, World!\")\n}"
    },
    {
        "roomLanguage": "Rust",
        "codeLanguage": "rust",
        "editorLanguage": "rust",
        "extension": ".rs",
        "helloWorld": "fn main() {\n    println!(\"Hello, World!\");\n}"
    },
    {
        "roomLanguage": "Dart",
        "codeLanguage": "dart",
        "editorLanguage": "dart",
        "extension": ".dart",
        "helloWorld": "void main() {\n    print('Hello, World!');\n}"
    },
    {
        "roomLanguage": "Objective-C",
        "codeLanguage": "objectivec",
        "editorLanguage": "objectivec",
        "extension": ".m",
        "helloWorld": "#import <Foundation/Foundation.h>\n\nint main(int argc, const char * argv[]) {\n    @autoreleasepool {\n        NSLog(@\"Hello, World!\");\n    }\n    return 0;\n}"
    },
    {
        "roomLanguage": "TypeScript",
        "codeLanguage": "typescript",
        "editorLanguage": "typescript",
        "extension": ".ts",
        "helloWorld": "console.log(\"Hello, World!\");"
    },
    {
        "roomLanguage": "SQL (MySQL)",
        "codeLanguage": "mysql",
        "editorLanguage": "sql",
        "extension": ".sql",
        "helloWorld": "SELECT 'Hello, World!';"
    },
    {
        "roomLanguage": "SQL (PostgreSQL)",
        "codeLanguage": "postgresql",
        "editorLanguage": "sql",
        "extension": ".sql",
        "helloWorld": "SELECT 'Hello, World!';"
    },
    {
        "roomLanguage": "SQL (SQLite)",
        "codeLanguage": "sqlite",
        "editorLanguage": "sql",
        "extension": ".sql",
        "helloWorld": "SELECT 'Hello, World!';"
    },
    {
        "roomLanguage": "Markdown",
        "codeLanguage": "markdown",
        "editorLanguage": "markdown",
        "extension": ".md",
        "helloWorld": "# Hello, World!"
    },
    {
        "roomLanguage": "JSON",
        "codeLanguage": "json",
        "editorLanguage": "json",
        "extension": ".json",
        "helloWorld": "{\n    \"hello\": \"world\"\n}"
    }
];


module.exports = languages;