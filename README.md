## JS: replace method with "$&", "$`", "$'"

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

## Authen & Author: 
Authen: 1 tiến trình xác thực và định danh

Author: 1 tiến trình xác thực những gì bạn được phép làm

## Sử dụng useContext cho component bố cục:
Link: https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Fjavascript.plainenglish.io%2Fcomponent-composition-in-react-a476c532a6fd

## UseRef
Dùng để lưu các giá trị qua một tham chiếu bên ngoài (lưu trữ giá trị mà không làm render component)

## UseCallback
- giữ/bảo tồn một hàm không được **tạo lại** nếu dependencies không thay đổi
- dùng khi truyền 1 hàm vào component con, ...

## UseMemo
- Giữ/bảo tồn một hàm không **thực thi lại** nếu dependencies không thay đổi
- dùng khi cần ngăn chặn việc thực thi một hàm tốn nhiều thời gian và tài nguyên

## React.memo
Là 1 HOC dùng cho function component, giảm số lần re-render không cần thiết
  
## PureComponent
Giống react.memo nhưng dùng cho class component
  
## forwardRef
Chuyển tiếp ref từ component cha sang một trong những element của component con

## Hoisting
Di chuyển khai báo lên đầu phạm vi hiện tại (áp dụng cho khai báo biến và khai báo hàm - declare function)

## Null & undefined
- Null là giá trị rõ ràng được gán cho biến hoặc trả về từ function
- Undefined là giá trị mặc định cho biến không được khai báo hoặc hàm không return bất cứ gì hoặc object không tồn tại

## Closure
Là 1 hàm nằm bên trong hàm khác và closure có thể sử dụng biến toàn cục, biến cục bộ của hàm cha ngày cả khi hàm cha đã đóng (thực thi xong), và biến cục bộ của chính nó
Ứng dụng: 
  - Function Factory: là hàm tạo ra một hàm khác

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

## React hook
Là các function cho phép kết nối React stage và lifecycle trong funtion component
