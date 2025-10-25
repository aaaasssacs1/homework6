# React Todo Skeleton

这是一个基于 React + Vite 的任务管理项目骨架，包含组件、Context 状态管理和路由配置。

安装与运行：

```powershell
# 安装依赖
npm install

# 开发模式
npm run dev
```

文件结构概览：

- `src/main.jsx` - 应用入口
- `src/App.jsx` - 路由和布局
- `src/state/TodoContext.jsx` - Context + useReducer 状态管理
- `src/components` - 组件
- `src/pages` - 页面

后续：如果你希望我帮你安装依赖并在终端运行开发服务器，我可以执行（需要确认）。

高德天气 API 设置

- 在 `src/config.js` 中将 `AMAP_KEY` 替换为你在高德地图官网申请的 Web 服务 API Key（示例占位符为 `YOUR_AMAP_KEY_HERE`）。
- 启动开发服务器后，打开 “天气” 页面，点击 “获取默认城市天气（442000）” 即可看到实况数据（组件会在请求期间显示加载指示器）。