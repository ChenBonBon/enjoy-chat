## [0.0.1] - 2023-09-01

### Added

- 新增 styled-components
- 新增 Button 组件
- 新增 UserCard 组件
- 新增 indexeddb
- 新增 user 接口：addUser、updateUser
- 新增用户列表

## [0.0.2] - 2023-09-02

### Added

- 新增好友列表
- 新增大量 Icon
- 新增上线功能
- 新增下线功能
- 新增登录功能
- 新增添加好友功能
- 新增聊天功能
- 新增聊天页面
- 新增发送文本
- 新增发送图片

### Changed

- UserCard 新增登录弹窗

## [0.0.3] - 2023-09-03

### Added

- 新增输入框回车后发送

### Changed

- 将部分逻辑提取至自定义 hooks
- 将部分函数提取至 utils
- 移除大量无效 useCallback
- 固定 package 版本
- 导入用户按钮更名为初始化用户
- 导入用户按钮只在无用户情况下显示
- 为所有图标文件添加 props 通传

### Fixed

- 修复 Input 组件在受控情况下无法输入中文
- 修复切换用户 currentUser 未更新