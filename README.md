## JS: replace method with "$&", "$`", "$'"
## DOM
is an acronym that stands for Document Object Model. It is an interface that allows computer programs to access and update the content, structure, and style of a document, such as an HTML file.

The DOM allows web developers to interact with the elements and components of their websites using programming languages like JavaScript.
## Real DOM
Là cấu trúc và nội dung của một trang web
Mọi sự thay đổi liên quan đến update DOM, sẽ phải reload lại trang web để DOM repaint => SPA => Vitural DOM

## Comment like a pro
NOTE: Description of how the code works (when it isn't self evident).

XXX: Warning about possible pitfalls, can be used as NOTE:XXX:.

HACK: Not very well written or malformed code to circumvent a problem/bug. Should be used as HACK:FIXME:.

FIXME: This works, sort of, but it could be done better. (usually code written in a hurry that needs rewriting).

BUG: There is a problem here.

TODO: No problem, but addtional code needs to be written, usually when you are skipping something.

## Commit like a pro
feat: Commits, which adds a new feature

fix: Commits, that fixes a bug

refactor: Commits, that rewrite/restructure your code, however, do not change any behavior

perf: Commits are special refactor commits, that improve performance

style: Commits, that do not affect the meaning (white space, formatting, missing semi-colons, etc)

test: Commits, that add missing tests or correct existing tests

docs: Commits, that affect documentation only

build: Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...

ops: Commits, that affect operational components like infrastructure, deployment, backup, recovery...

chore: Miscellaneous commits e.g. modifying .gitignore

## Authen & Author: 
Authen: 1 tiến trình xác thực và định danh

Author: 1 tiến trình xác thực những gì bạn được phép làm

## Sử dụng useContext cho component bố cục:
Link: https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Fjavascript.plainenglish.io%2Fcomponent-composition-in-react-a476c532a6fd

## UseRef
Dùng để lưu các giá trị qua một tham chiếu bên ngoài (lưu trữ giá trị mà không làm render component)

## UseCallback
- giữ/bảo tồn một hàm không được **tạo lại** nếu dependencies không thay đổi (mỗi lần render)
- dùng khi truyền 1 hàm vào component con, ...

## UseMemo
- Giữ/bảo tồn một giá trị không **thực thi hoặc tính toán lại** nếu dependencies không thay đổi (mỗi lần render)
- dùng khi cần ngăn chặn việc thực thi một hàm tốn nhiều thời gian và tài nguyên

## React.memo
Là 1 HOC dùng cho function component, giảm số lần re-render không cần thiết
shallow comparison các props để quyết định việc render 
  
## PureComponent
Giống react.memo nhưng dùng cho class component
  
## forwardRef
Chuyển tiếp ref từ component cha sang một trong những element của component con

## Hoisting
Di chuyển khai báo lên đầu phạm vi hiện tại (áp dụng cho khai báo biến và khai báo hàm - declare function)

## Null & undefined
- Null là giá trị rõ ràng được gán cho biến hoặc trả về từ function
- Undefined là giá trị mặc định cho biến không được khai báo hoặc hàm không return bất cứ gì hoặc object không tồn tại

## Changing the last commit message
```sh
git commit --amend -m "fix: image name correct message."
```
```sh
git push --force-with-lease origin your-branch
```
## Variables & Scope
### var là function scope (global scope): 
	- có thể định nghĩa lại (ví dụ var a = 0; ... var b = 1; => dễ lỗi => dùng let/const), có thể update lại giá trị
	- giá trị khởi tạo là undefined => có thể gọi trước khi định nghĩa
	
### const + let là 
	- block scope
	- không có giá trị khởi tạo => không thể gọi trước khi định nghĩa
		- const: không định nghĩa lại, không update lại giá trị
		- let: không định nghĩa lại, được update lại giá trị

### function scope: 
khi một biến được khai báo bên trong một hàm, nó chỉ có thể truy cập được bên trong hàm đó, bên ngoài hàm không truy cập được

### block scope: 
một biến khi được khai báo bên trong một lệnh if/switch hoặc vòng lặp, chúng chỉ có thể truy cập được trọng if/switch hoặc vòng lặp đó

### lexical scope (phạm vi biến Lexical)
trong một nhóm các hàm lồng nhau, các hàm bên trong có quyền truy cập vào các biến và các tài nguyên khác trong phạm vi hàm cha của chúng. Lexical scope đôi khi còn được gọi là Static scope

## React hook
Là các function cho phép kết nối React stage và lifecycle trong funtion component

## Arrow function
là 1 biểu thức hàm rút gọn

## Colors for console.log
```
const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};
```
## Closures
Closure là một hàm được khai báo bên trong một hàm khác và có thể truy cập vào các biến được khai báo bên ngoài hàm cha. Khi một hàm trả về một hàm khác, nó tạo ra một closure để lưu trữ tất cả các biến và giá trị của nó, cho đến khi hàm bên trong được thực thi. (là kết quả return của HOF và có thể truy xuất các biến bên trong HOF đó)
Ứng dụng:
+ creating private variables and functions
+ implementing callbacks
+ handling asynchronous code
+ function factory: là hàm tạo ra một hàm khác
  
## debounce & throttle
Debounce: ngăn chặn action thực thi liên tục trong một khoảng thời gian (vd: search funtion)

Throttle: delay thực hiện 1 function sau một khoảng thời gian, hạn chế function call liên tục (vd: auto save của Word)

## Curry function
Là nhiều hàm có 1 tham số
