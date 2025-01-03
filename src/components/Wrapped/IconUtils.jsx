// Common/IconUtils.js
import { FaCode, FaGithub } from 'react-icons/fa';
import { Img } from "remotion"

export const getIconComponent = (name) => {
  const iconSize = 80;
  const iconColor = "white";

  switch (name.toLowerCase()) {
    case 'github':
      return <FaGithub size={iconSize} color={iconColor} />;
    case 'python':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"} alt="Python logo" width={iconSize} height={iconSize} />;
    case 'javascript':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"} alt="javascript logo" width={iconSize} height={iconSize} />;
    case 'java':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"} alt="javascript logo" width={iconSize} height={iconSize} />;
    case 'blender':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg"} alt="javascript logo" width={iconSize} height={iconSize} />;
    case 'c++':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"} alt="C++ logo" width={iconSize} height={iconSize} />;
    case '1c enterprise':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/9/93/1C_Company_logo.svg"} alt="1C Enterprise logo" width={iconSize} height={iconSize} />;
    case '4d':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/4d.svg"} alt="4D logo" width={iconSize} height={iconSize} />;
    case 'abap':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/abap/abap.png"} alt="ABAP logo" width={iconSize} height={iconSize} />;
    case 'actionscript':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/actionscript/actionscript.png"} alt="ActionScript logo" width={iconSize} height={iconSize} />;
    case 'ada':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/ada/ada.png"} alt="Ada logo" width={iconSize} height={iconSize} />;
    case 'advpl':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/b/b6/APL_%28programming_language%29_logo.svg"} alt="AdvPL logo" width={iconSize} height={iconSize} />;
    case 'antlr':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/antlr/antlr.png"} alt="ANTLR logo" width={iconSize} height={iconSize} />;
    case 'apacheconf':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/d/db/Apache_Software_Foundation_Logo_%282016%29.svg"} alt="ApacheConf logo" width={iconSize} height={iconSize} />;
    case 'apache config':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/d/db/Apache_Software_Foundation_Logo_%282016%29.svg"} alt="Apache Config logo" width={iconSize} height={iconSize} />;
    case 'apex':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/b/bc/APEX_Engine.svg"} alt="Apex logo" width={iconSize} height={iconSize} />;
    case 'apl':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apl/apl-original.svg"} alt="APL logo" width={iconSize} height={iconSize} />;
    case 'applescript':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/b/b6/APL_%28programming_language%29_logo.svg"} alt="AppleScript logo" width={iconSize} height={iconSize} />;
    case 'arc':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/arc.svg"} alt="Arc logo" width={iconSize} height={iconSize} />;
    case 'asciidoc':
      return <Img src={"https://upload.wikimedia.org/wikipedia/fr/d/d3/AsciiDoc-R-logo-color.svg"} alt="AsciiDoc logo" width={iconSize} height={iconSize} />;
    case 'asp.net':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/1/13/Asp.net.svg"} alt="ASP.NET logo" width={iconSize} height={iconSize} />;
    case 'assembly':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/assembly/assembly.png"} alt="Assembly logo" width={iconSize} height={iconSize} />;
    case 'astro':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg"} alt="Astro logo" width={iconSize} height={iconSize} />;
    case 'autohotkey':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/autohotkey.svg"} alt="AutoHotkey logo" width={iconSize} height={iconSize} />;
    case 'autoit':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/autoit.svg"} alt="AutoIt logo" width={iconSize} height={iconSize} />;
    case 'awk':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/awk/awk-original-wordmark.svg"} alt="Awk logo" width={iconSize} height={iconSize} />;
    case 'ballerina':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ballerina/ballerina-original.svg"} alt="Ballerina logo" width={iconSize} height={iconSize} />;
    case 'bash':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"} alt="Bash logo" width={iconSize} height={iconSize} />;
    case 'bibtex':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/3/30/BibTeX_logo.svg"} alt="BibTeX logo" width={iconSize} height={iconSize} />;
    case 'c':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"} alt="C logo" width={iconSize} height={iconSize} />;
    case 'c#':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"} alt="C# logo" width={iconSize} height={iconSize} />;
    case 'cairo':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cairo/cairo-original.svg"} alt="Cairo logo" width={iconSize} height={iconSize} />;
    case 'carbon':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/carbon/carbon-original.svg"} alt="Carbon logo" width={iconSize} height={iconSize} />;
    case 'ceylon':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ceylon/ceylon-original.svg"} alt="Ceylon logo" width={iconSize} height={iconSize} />;
    case 'chapel':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/chapel/chapel.png"} alt="Chapel logo" width={iconSize} height={iconSize} />;
    case 'clarity':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clarity/clarity-original.svg"} alt="Clarity logo" width={iconSize} height={iconSize} />;
    case 'clojure':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clojure/clojure-original.svg"} alt="Clojure logo" width={iconSize} height={iconSize} />;
    case 'cmake':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg"} alt="CMake logo" width={iconSize} height={iconSize} />;
    case 'coffeescript':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/coffeescript/coffeescript-original.svg"} alt="CoffeeScript logo" width={iconSize} height={iconSize} />;
    case 'common lisp':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg"} alt="Common Lisp logo" width={iconSize} height={iconSize} />;
    case 'coq':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/coq/coq.png"} alt="Coq logo" width={iconSize} height={iconSize} />;
    case 'crystal':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/crystal/crystal-original.svg"} alt="Crystal logo" width={iconSize} height={iconSize} />;
    case 'css':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/css.svg"} alt="CSS logo" width={iconSize} height={iconSize} />;
    case 'cuda':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/cuda/cuda.png"} alt="Cuda logo" width={iconSize} height={iconSize} />;
    case 'd':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/d.svg"} alt="D logo" width={iconSize} height={iconSize} />;
    case 'dart':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"} alt="Dart logo" width={iconSize} height={iconSize} />;
    case 'delphi':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/delphi.svg"} alt="Delphi logo" width={iconSize} height={iconSize} />;
    case 'dm':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dm.svg"} alt="DM logo" width={iconSize} height={iconSize} />;
    case 'docker':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"} alt="Docker logo" width={iconSize} height={iconSize} />;
    case 'dockerfile':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/dockerfile/dockerfile.png"} alt="Dockerfile logo" width={iconSize} height={iconSize} />;
    case 'dotenv':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dotenv.svg"} alt="Dotenv logo" width={iconSize} height={iconSize} />;
    case 'e':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/e.svg"} alt="E logo" width={iconSize} height={iconSize} />;
    case 'eagle':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/eagle.svg"} alt="Eagle logo" width={iconSize} height={iconSize} />;
    case 'edge':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg"} alt="Edge logo" width={iconSize} height={iconSize} />;
    case 'html':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"} alt="HTML logo" width={iconSize} height={iconSize} />;
    case 'html+django':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg"} alt="HTML+Django logo" width={iconSize} height={iconSize} />;
    case 'html+php':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"} alt="HTML+PHP logo" width={iconSize} height={iconSize} />;
    case 'html+razor':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/4f/Razor_logo.svg"} alt="HTML+Razor logo" width={iconSize} height={iconSize} />;
    case 'http':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/5/5b/HTTP_logo.svg"} alt="HTTP logo" width={iconSize} height={iconSize} />;
    case 'j':
      return <Img src={"https://code.jsoftware.com/mediawiki/images/d/dd/High_resolution_SVG.svg"} alt="J logo" width={iconSize} height={iconSize} />;
    case 'jetbrains mps':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/f/f5/MPS_logo.svg"} alt="JetBrains MPS logo" width={iconSize} height={iconSize} />;
    case 'jinja':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/8/87/Jinja_software_logo.svg"} alt="Jinja logo" width={iconSize} height={iconSize} />;
    case 'json':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/c/c9/JSON_vector_logo.svg"} alt="JSON logo" width={iconSize} height={iconSize} />;
    case 'json5':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/c/c9/JSON_vector_logo.svg"} alt="JSON5 logo" width={iconSize} height={iconSize} />;
    case 'jsx':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/8/83/Logo_of_JSX.svg"} alt="JSX logo" width={iconSize} height={iconSize} />;
    case 'jupyter notebook':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg"} alt="Jupyter Notebook logo" width={iconSize} height={iconSize} />;
    case 'kickstart':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/b/b5/Kickstarter_logo.svg"} alt="Kickstart logo" width={iconSize} height={iconSize} />;
    case 'kotlin':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/0/06/Kotlin_Icon.svg"} alt="Kotlin logo" width={iconSize} height={iconSize} />;
    case 'laravel template':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg"} alt="Laravel Template logo" width={iconSize} height={iconSize} />;
    case 'lark':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/42/Lark_Suite_logo_2022.png"} alt="Lark logo" width={iconSize} height={iconSize} />;
    case 'latex':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/9/92/LaTeX_logo.svg"} alt="LaTeX logo" width={iconSize} height={iconSize} />;
    case 'lean':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/d/dc/Lean_logo2.svg"} alt="Lean logo" width={iconSize} height={iconSize} />;
    case 'lean 4':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/d/dc/Lean_logo2.svg"} alt="Lean 4 logo" width={iconSize} height={iconSize} />;
    case 'less':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/8/81/LESS_Logo.svg"} alt="Less logo" width={iconSize} height={iconSize} />;
    case 'lex':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo_L%C3%A9man_Express_-_LEX.svg"} alt="Lex logo" width={iconSize} height={iconSize} />;
    case 'lfe':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/6/63/LFE_%28Lisp_Flavored_Erlang%29_Logo.png"} alt="LFE logo" width={iconSize} height={iconSize} />;
    case 'literate coffeescript':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/d/d3/CoffeeScript-logo.svg"} alt="Literate CoffeeScript logo" width={iconSize} height={iconSize} />;
    case 'literate haskell':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg"} alt="Literate Haskell logo" width={iconSize} height={iconSize} />;
    case 'lua':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/c/cf/Lua-Logo.svg"} alt="Lua logo" width={iconSize} height={iconSize} />;
    case 'luau':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/8/8f/Luau_Logo_%28Programming_Language%29.svg"} alt="Luau logo" width={iconSize} height={iconSize} />;
    case 'markdown':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg"} alt="Markdown logo" width={iconSize} height={iconSize} />;
    case 'matlab':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png"} alt="MATLAB logo" width={iconSize} height={iconSize} />;
    case 'mermaid':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/7/77/Mermaid_Logo.svg"} alt="Mermaid logo" width={iconSize} height={iconSize} />;
    case 'mint':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/45/The_Linux_Mint_Logo.svg"} alt="Mint logo" width={iconSize} height={iconSize} />;
    case 'newlisp':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg"} alt="newLISP logo" width={iconSize} height={iconSize} />;
    case 'newlisp':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg"} alt="NewLisp logo" width={iconSize} height={iconSize} />;
    case 'nextflow':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/6/60/Nextflow_logo.png"} alt="Nextflow logo" width={iconSize} height={iconSize} />;
    case 'nginx':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"} alt="Nginx logo" width={iconSize} height={iconSize} />;
    case 'nim':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nim/nim-original.svg"} alt="Nim logo" width={iconSize} height={iconSize} />;
    case 'nix':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/nix/nix.png"} alt="Nix logo" width={iconSize} height={iconSize} />;
    case 'npm config':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"} alt="NPM Config logo" width={iconSize} height={iconSize} />;
    case 'nsis':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nsis.svg"} alt="NSIS logo" width={iconSize} height={iconSize} />;
    case 'numpy':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg"} alt="NumPy logo" width={iconSize} height={iconSize} />;
    case 'nunjucks':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nunjucks.svg"} alt="Nunjucks logo" width={iconSize} height={iconSize} />;
    case 'nushell':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nushell.svg"} alt="Nushell logo" width={iconSize} height={iconSize} />;
    case 'objective-c':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg"} alt="Objective-C logo" width={iconSize} height={iconSize} />;
    case 'objective-c++':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"} alt="Objective-C++ logo" width={iconSize} height={iconSize} />;
    case 'ocaml':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ocaml/ocaml-original.svg"} alt="OCaml logo" width={iconSize} height={iconSize} />;
    case 'odin':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/odin.svg"} alt="Odin logo" width={iconSize} height={iconSize} />;
    case 'openapi specification v2':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/b/b2/OpenAPI_Specification_Logo_Pantone.svg"} alt="OpenAPI Specification v2 logo" width={iconSize} height={iconSize} />;
    case 'openapi specification v3':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/b/b2/OpenAPI_Specification_Logo_Pantone.svg"} alt="OpenAPI Specification v3 logo" width={iconSize} height={iconSize} />;
    case 'opencl':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencl/opencl-original.svg"} alt="OpenCL logo" width={iconSize} height={iconSize} />;
    case 'openscad':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openscad.svg"} alt="OpenSCAD logo" width={iconSize} height={iconSize} />;
    case 'org':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/org.svg"} alt="Org logo" width={iconSize} height={iconSize} />;
    case 'papyrus':
      return <Img src={"https://upload.wikimedia.org/wikipedia/fr/1/1d/Eclipse_papyrus_logo.svg"} alt="Papyrus logo" width={iconSize} height={iconSize} />;
    case 'parrot':
      return <Img src={"https://upload.wikimedia.org/wikipedia/en/a/ae/Snapcraft-logo-bird.svg"} alt="Parrot logo" width={iconSize} height={iconSize} />;
    case 'perl':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg"} alt="Perl logo" width={iconSize} height={iconSize} />;
    case 'php':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"} alt="PHP logo" width={iconSize} height={iconSize} />;
    case 'pip requirements':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/6/64/PyPI_logo.svg"} alt="Pip Requirements logo" width={iconSize} height={iconSize} />;
    case 'plantuml':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/3/30/Plantuml_Logo.svg"} alt="PlantUML logo" width={iconSize} height={iconSize} />;
    case 'plpgsql':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"} alt="PLpgSQL logo" width={iconSize} height={iconSize} />;
    case 'postcss':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postcss/postcss-original.svg"} alt="PostCSS logo" width={iconSize} height={iconSize} />;
    case 'powershell':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg"} alt="PowerShell logo" width={iconSize} height={iconSize} />;
    case 'prisma':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg"} alt="Prisma logo" width={iconSize} height={iconSize} />;
    case 'processing':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/processing/processing-original.svg"} alt="Processing logo" width={iconSize} height={iconSize} />;
    case 'prolog':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prolog/prolog-original.svg"} alt="Prolog logo" width={iconSize} height={iconSize} />;
    case 'pug':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pug.svg"} alt="Pug logo" width={iconSize} height={iconSize} />;
    case 'puppet':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/puppet.svg"} alt="Puppet logo" width={iconSize} height={iconSize} />;
    case 'purescript':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/purescript/purescript-original.svg"} alt="PureScript logo" width={iconSize} height={iconSize} />;
    case 'q':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/1/1b/Android_Q_Logo.svg"} alt="q logo" width={iconSize} height={iconSize} />;
    case 'r':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg"} alt="R logo" width={iconSize} height={iconSize} />;
    case 'racket':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/racket.svg"} alt="Racket logo" width={iconSize} height={iconSize} />;
    case 'raku':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/raku/raku.png"} alt="Raku logo" width={iconSize} height={iconSize} />;
    case 'reason':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/reason.svg"} alt="Reason logo" width={iconSize} height={iconSize} />;
    case 'red':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/red.svg"} alt="Red logo" width={iconSize} height={iconSize} />;
    case 'rescript':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/rescript.svg"} alt="ReScript logo" width={iconSize} height={iconSize} />;
    case 'ring':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/ring.svg"} alt="Ring logo" width={iconSize} height={iconSize} />;
    case 'robotframework':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/robotframework.svg"} alt="RobotFramework logo" width={iconSize} height={iconSize} />;
    case 'rpc':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/rpc/rpc.png"} alt="RPC logo" width={iconSize} height={iconSize} />;
    case 'ruby':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg"} alt="Ruby logo" width={iconSize} height={iconSize} />;
    case 'rust':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg"} alt="Rust logo" width={iconSize} height={iconSize} />;
    case 'sage':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/sage.svg"} alt="Sage logo" width={iconSize} height={iconSize} />;
    case 'saltstack':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/saltstack/saltstack.png"} alt="SaltStack logo" width={iconSize} height={iconSize} />;
    case 'sas':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/sas/sas.png"} alt="SAS logo" width={iconSize} height={iconSize} />;
    case 'sass':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"} alt="Sass logo" width={iconSize} height={iconSize} />;
    case 'scala':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-plain.svg"} alt="Scala logo" width={iconSize} height={iconSize} />;
    case 'scilab':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/scilab.svg"} alt="Scilab logo" width={iconSize} height={iconSize} />;
    case 'solidity':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg"} alt="Solidity logo" width={iconSize} height={iconSize} />;
    case 'sql':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/sql/sql.png"} alt="SQL logo" width={iconSize} height={iconSize} />;
    case 'ssh config':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/0/00/Unofficial_SSH_Logo.svg"} alt="SSH Config logo" width={iconSize} height={iconSize} />;
    case 'stata':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stata/stata-original-wordmark.svg"} alt="Stata logo" width={iconSize} height={iconSize} />;
    case 'stylus':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/stylus.svg"} alt="Stylus logo" width={iconSize} height={iconSize} />;
    case 'sublime text config':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/0/05/Sublime_Text_Logo_White.svg"} alt="Sublime Text Config logo" width={iconSize} height={iconSize} />;
    case 'svelte':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg"} alt="Svelte logo" width={iconSize} height={iconSize} />;
    case 'svg':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/svg.svg"} alt="SVG logo" width={iconSize} height={iconSize} />;
    case 'sway':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/sway.svg"} alt="Sway logo" width={iconSize} height={iconSize} />;
    case 'swift':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg"} alt="Swift logo" width={iconSize} height={iconSize} />;
    case 'tex':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tex/tex-original.svg"} alt="TeX logo" width={iconSize} height={iconSize} />;
    case 'toit':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/toit/toit.png"} alt="Toit logo" width={iconSize} height={iconSize} />;
    case 'toml':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/toml.svg"} alt="TOML logo" width={iconSize} height={iconSize} />;
    case 'tsconfig':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"} alt="TSConfig logo" width={iconSize} height={iconSize} />;
    case 'typescript':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"} alt="TypeScript logo" width={iconSize} height={iconSize} />;
    case 'typst':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/typst.svg"} alt="Typst logo" width={iconSize} height={iconSize} />;
    case 'unity3d asset':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg"} alt="Unity3D Asset logo" width={iconSize} height={iconSize} />;
    case 'unrealscript':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/unrealscript/unrealscript.png"} alt="UnrealScript logo" width={iconSize} height={iconSize} />;
    case 'v':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/v.svg"} alt="V logo" width={iconSize} height={iconSize} />;
    case 'vala':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vala/vala-original.svg"} alt="Vala logo" width={iconSize} height={iconSize} />;
    case 'vb':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg"} alt="VB logo" width={iconSize} height={iconSize} />;
    case 'vba':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/vba/vba.png"} alt="VBA logo" width={iconSize} height={iconSize} />;
    case 'vb.net':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg"} alt="VB.NET logo" width={iconSize} height={iconSize} />;
    case 'visual basic .net':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg"} alt="Visual Basic .NET logo" width={iconSize} height={iconSize} />;
    case 'vue':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/vue/vue.png"} alt="Vue logo" width={iconSize} height={iconSize} />;
    case 'vue.js':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"} alt="Vue.js logo" width={iconSize} height={iconSize} />;
    case 'vyper':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vyper/vyper-original.svg"} alt="Vyper logo" width={iconSize} height={iconSize} />;
    case 'webassembly':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/webassembly.svg"} alt="WebAssembly logo" width={iconSize} height={iconSize} />;
    case 'xml':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg"} alt="XML logo" width={iconSize} height={iconSize} />;
    case 'xml property list':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/2/2d/Extensible_Markup_Language_%28XML%29_logo.svg"} alt="XML Property List logo" width={iconSize} height={iconSize} />;
    case 'xojo':
      return <Img src={"https://upload.wikimedia.org/wikipedia/commons/3/31/Logomark_Xojo_Company.svg"} alt="Xojo logo" width={iconSize} height={iconSize} />;
    case 'xonsh':
      return <Img src={"https://raw.githubusercontent.com/github/explore/master/topics/xonsh/xonsh.png"} alt="Xonsh logo" width={iconSize} height={iconSize} />;
    case 'yaml':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg"} alt="YAML logo" width={iconSize} height={iconSize} />;
    case 'zap':
      return <Img src={"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/zap.svg"} alt="ZAP logo" width={iconSize} height={iconSize} />;
    case 'zig':
      return <Img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zig/zig-original.svg"} alt="Zig logo" width={iconSize} height={iconSize} />;

    default:
      return <FaCode size={iconSize} color={iconColor} />;
  }
};