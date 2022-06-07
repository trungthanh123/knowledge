# Css hack 
\* { background-color: rgba(255,0,0,.2); }

\* \* { background-color: rgba(0,255,0,.2); }

\* \* \* { background-color: rgba(0,0,255,.2); }

\* \* \* \* { background-color: rgba(255,0,255,.2); }

\* \* \* \* \* { background-color: rgba(0,255,255,.2); }

\* \* \* \* \* \* { background-color: rgba(255,255,0,.2); }

\* \* \* \* \* \* \* { background-color: rgba(255,0,0,.2); }

\* \* \* \* \* \* \* \* { background-color: rgba(0,255,0,.2); }

\* \* \* \* \* \* \* \* \* { background-color: rgba(0,0,255,.2); }

# JS: replace method with $&, $`, $'

# Comment like a pro
NOTE: Description of how the code works (when it isn't self evident).

XXX: Warning about possible pitfalls, can be used as NOTE:XXX:.

HACK: Not very well written or malformed code to circumvent a problem/bug. Should be used as HACK:FIXME:.

FIXME: This works, sort of, but it could be done better. (usually code written in a hurry that needs rewriting).

BUG: There is a problem here.

TODO: No problem, but addtional code needs to be written, usually when you are skipping something.

# Authen & Author: 
Authen: 1 tiến trình xác thực và định danh

Author: 1 tiến trình xác thực những gì bạn được phép làm

# Sử dụng useContext cho component bố cục:
Link: https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Fjavascript.plainenglish.io%2Fcomponent-composition-in-react-a476c532a6fd

# UseRef
Dùng để lưu các giá trị qua một tham chiếu bên ngoài (lưu trữ giá trị mà không làm render component)

# UseMemo
Giảm chi phí tính toán mỗi lần render

# React.memo
Là 1 HOC dùng cho function component, giảm số lần re-render không cần thiết
  
# PureComponent
Giống react.memo nhưng dùng cho class component
  
# forwardRef
Chuyển tiếp ref từ component cha sang một trong những element của component con

# Hoisting
Di chuyển khai báo lên đầu phạm vi hiện tại (áp dụng cho khai báo biến và khai báo hàm - declare function)

# Null & undefined
- Null là giá trị rõ ràng được gán cho biến hoặc trả về từ function
- Undefined là giá trị mặc định cho biến không được khai báo hoặc hàm không return bất cứ gì hoặc object không tồn tại
